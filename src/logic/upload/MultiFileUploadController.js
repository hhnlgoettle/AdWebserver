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

/**
 * @module
 * @class MultiFileUploadController
 * @type {MultiFileUploadController}
 * @property {Number} filesCount - number of files to be uploaded
 * @property {Number} fileFilterCounter - how many files have passed filter
 * @property {Boolean} hasIndexHtml - checks if index.html is present in uploaded form data
 * @property {Function} fileFilter - filter function for files
 * @property {multer} multerUpload - multer upload
 */
const MultiFileUploadController = class MultiFileUploadController {
  /**
   * @constructor
   */
  constructor() {
    this.filesCount = 0;
    this.fileFilterCounter = 0;
    this.hasIndexHtml = false;
    this.fileFilter = this.fileFilter.bind(this);
    this.multerUpload = multer({ storage, fileFilter: this.fileFilter });
  }

  /**
   * @desc filters files, checks if index.html is present
   * @param req
   * @param file
   * @param cb
   */
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

  /**
   * @desc uses multer to store files from a request
   * @param req
   * @param next
   * @return {Promise}
   */
  async upload(req, next) {
    return new Promise((resolve, reject) => {
      this.multerUpload.array('creative', 100)(req, next, (err) => {
        if (err) reject(err);
        resolve(null, true);
      });
    });
  }
};

export default MultiFileUploadController;
