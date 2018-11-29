import * as fs from 'fs';
import * as path from 'path';

import { SOURCEPATH, DESTPATH } from './config';

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
  deleteFolderRecursive(DESTPATH);
  fs.mkdirSync(DESTPATH);
}

function ensureSourceDir() {
  if (!fs.existsSync(SOURCEPATH)) {
    fs.mkdirSync(SOURCEPATH);
  }
}

export function init() {
  try {
    deleteDestFiles();
    ensureSourceDir();
  } catch (e) {
    throw e;
  }
}

init();
