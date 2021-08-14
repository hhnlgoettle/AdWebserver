import multer from 'multer';
import createDirIfNotExists from '../../util/createDirIfNotExists';
import HttpError from '../../error/HttpError';
import CreativePath from '../../util/CreativePath';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const path = CreativePath.fsPath(req.campaign);
    createDirIfNotExists(path)
      .then(() => {
        callback(null, path);
      }).catch((err) => {
        callback(err);
      });
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});

export default class MultiFileUploadController {
  constructor() {
    this.filesCount = 0;
    this.fileFilterCounter = 0;
    this.hasIndexHtml = false;
    this.fileFilter = this.fileFilter.bind(this);
    this.multerUpload = multer({ storage, fileFilter: this.fileFilter });
  }

  fileFilter(req, file, cb) {
    this.filesCount = req.files.length;
    this.fileFilterCounter++;
    if (file.originalname === 'index.html') {
      this.hasIndexHtml = true;
    }
    if (this.filesCount === this.fileFilterCounter && this.hasIndexHtml === false) {
      cb(HttpError.BadRequest('file "index.html" is required'));
    }
    cb(null, true);
  }

  async upload(req, next) {
    return new Promise((resolve, reject) => {
      this.multerUpload.array('creative', 100)(req, next, (err) => {
        if (err) reject(err);
        resolve(null, true);
      });
    });
  }
}
