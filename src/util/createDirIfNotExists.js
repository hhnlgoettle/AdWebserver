import fs from 'fs';
import HttpError from '../error/HttpError';

/**
 * @function createDirIfNotExists
 * @desc creates a directory if it does not exist
 * @param {String} path
 * @return {Promise}
 */
export default async function createDirIfNotExists(path) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-unused-vars
    fs.stat(path, (err, stats) => {
      if (err) {
        fs.mkdir(path, { recursive: true }, (err2) => {
          if (err2) reject(err2);
          resolve(true);
        });
      } else if (stats.isDirectory()) {
        fs.readdir(path, (err3, data) => {
          if (err) reject(err);
          if (data && data.length > 0) reject(HttpError.Conflict('you already have a creative uploaded. delete the creative to upload'));
          resolve(true);
        });
      } else {
        reject(HttpError.InternalServerError('creative directory is a file. please contact server admin'));
      }
    });
  });
}
