# Converts images in a folder to .webp images

## Setup

1.  Ensure you have node installed (recommend using [NVM](https://github.com/creationix/nvm) and Node 8.11.1)
2.  `npm install`
3.  `npm run init` (only need to do this if first time using library)

## Run

1.  Place images you wish to convert in the `source` folder (JPEG, PNG, WebP, GIF, SVG, TIFF)
2.  `npm run convert`
3.  Your converted files will be in the `dest` folder

## Changes to source

If you modify the source, you must recompile the TypeScript. You can do this by

-   `npm run build`, or
-   `npm run convert:build` which will first recompile the code, then convert your images
