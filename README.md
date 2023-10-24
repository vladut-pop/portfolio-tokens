# portfolio-tokens

This repo contains figma tokens build with `Material Theme Builder` and exported with `Tokens Studio for Figma` plugin. The repo builds the exported Figma styles in supported `scss` tokens, colors and as well typography.

I chose to no not use the `style-dictionary` because is not supporting composite tokens as typographies, by using a custom solution the typography is represented as mixins.

The repo is a POC don't use this for production, but feel free to use as you wish.

Steps, to reproduce the tokens data:

- use `Material Theme Builder` to create a Design System for styles (colors and typography);
- use `Tokens Studio for Figma` to create a new set and import all the styles (Color, Typography and Shadows);
- manually adapt the json, remove `ref` or any categories that you are not going to not use or change the folder hierarchy which will impact the token nomenclature;

## Getting started

1. Install dependencies

```
# yarn
yarn add @hm-group/fabric-components
```

2. Build .scss file

```
yarn build:tokens
```
