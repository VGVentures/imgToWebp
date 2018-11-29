# Converts images in a folder to .webp images

## Setup

1.  Ensure you have node installed (recommend using [NVM](https://github.com/creationix/nvm) and Node 8.11.1)
2.  `npm install`
3.  `npm run build` (only need to do this if first time install or files change)

## Run

1.  Place images you wish to convert in the `source` folder (JPEG, PNG, WebP, GIF, SVG, TIFF)
2.  `npm run convert` (or `npm run convert:build` if you want to re-compile first)
3.  Your converted files will be in the `dest` folder
