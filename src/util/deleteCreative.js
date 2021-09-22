import fsPromise from './fsPromise';

/**
 * @function deleteDirContent
 * @param {String} path path to dir to be deleted
 * @return {Promise<number>} number of files deleted
 */
export default async function deleteDirContent(path) {
  const dirContent = await fsPromise.readdir(path);
  const proms = [];
  dirContent.forEach((f) => {
    proms.push(fsPromise.unlink(`${path}/${f}`));
  });
  const result = await Promise.all(proms);
  return result.length;
}
