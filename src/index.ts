import * as fs from 'fs';
import * as path from 'path';
import { WebpConverter } from './converter';
import { init } from './init';
import { SOURCEPATH } from './config';

function readdirAsync(dirPath: string) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dirPath, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

async function convert() {
  try {
    init();
    const files = await readdirAsync(SOURCEPATH);
    for (const key in files) {
      const file = files[key];
      const converter = new WebpConverter(
        path.join(SOURCEPATH, file).toString()
      );
      await converter.convert();
    }
  } catch (e) {
    throw new Error(e);
  }
}

convert()
  .then(_done => {
    console.log('Done');
    process.exit();
  })
  .catch(err => {
    console.error('An error occurred', err);
  });
