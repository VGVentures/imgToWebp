import * as sharp from 'sharp';
import * as path from 'path';

export class WebpConverter {
  filePath: string;
  fileName: string;
  destPath: string;
  pipeline: sharp.Sharp;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.fileName = path.parse(this.filePath).name;
    this.destPath = path.join(__dirname, '../dest', `${this.fileName}.webp`);
    this.pipeline = sharp();
  }

  async convert() {
    await sharp(this.filePath)
      .resize(undefined, 1080, { withoutEnlargement: true })
      .webp()
      .toFile(this.destPath);
    console.log('converted', this.destPath);
    return;
  }
}
