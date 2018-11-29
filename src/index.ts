import * as fs from 'fs';
import * as path from 'path';
import { WebpConverter } from './converter';

const sourcePath = path.join(__dirname, `../source`);
const destPath = path.join(__dirname, `../dest`);

function deleteFolderRecursive(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(function(file) {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

function deleteDestFiles() {
  deleteFolderRecursive(destPath);
  fs.mkdirSync(destPath);
}

function ensureSourceDir() {
  if (!fs.existsSync(sourcePath)) {
    fs.mkdirSync(sourcePath);
  }
}

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
    deleteDestFiles();
    ensureSourceDir();
    const files = await readdirAsync(sourcePath);
    for (const key in files) {
      const file = files[key];
      const converter = new WebpConverter(
        path.join(sourcePath, file).toString()
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
