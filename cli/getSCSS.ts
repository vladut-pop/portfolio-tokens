import { default as jsonVariables } from "../build/json/variables.json";
import fs from "fs";

const writeToScss = async (
  dir: string,
  fileName: string,
  scssContent: string,
  extraScss?: string
): Promise<void> => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  try {
    await fs.promises.writeFile(
      `${dir}/${fileName}.scss`,
      `${extraScss}\n` + scssContent
    );
  } catch (error) {
    console.error("scss", fileName, error);
  }
};

const transformTypography = (
  mixinName: string,
  typographyObject: any
  // TODO: This is how it should be, check below.
  // font-family: ${typographyObject.fontFamily}, serif;
  // TODO: Maybe add a prop for default, secondary font families.
): string => {
  return `@mixin ${mixinName} {
  font-family: Lora, serif;
  font-weight: ${typographyObject.fontWeight === "Regular" ? "normal" : "bold"};
  font-style: normal;
  line-height:  ${typographyObject.lineHeight}px;
  font-size:  ${typographyObject.fontSize}px;
  letter-spacing:  ${typographyObject.letterSpacing.replace("%", "px")};
  margin-top:  ${typographyObject.paragraphSpacing}px;
  text-indent:  ${typographyObject.paragraphIndent};
  text-transform:  ${typographyObject.textCase};
  text-decoration:  ${typographyObject.textDecoration};
};\n`;
};

const buildScss = (json: any, prevKey?: string): string => {
  let scssString = "";
  for (const objectKey of Object.keys(json)) {
    const attributeKey = (prevKey ? `${prevKey}-` : "") + objectKey;

    if (json[objectKey].hasOwnProperty("type")) {
      if (json[objectKey].type === "typography") {
        scssString += transformTypography(attributeKey, json[objectKey].value);
      } else {
        scssString += `$${attributeKey}: ${json[objectKey].value};\n`;
      }
    } else {
      scssString += buildScss(json[objectKey], attributeKey);
    }
  }
  return scssString;
};
const extraScss = `@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,700&display=swap");`;

writeToScss("./build/scss", "_variables", buildScss(jsonVariables), extraScss);
