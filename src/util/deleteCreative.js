import fs from 'fs';
import util from 'util';

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

export default async function deleteDirContent(path) {
  const dirContent = await readdir(path);
  const proms = [];
  dirContent.forEach((f) => {
    proms.push(unlink(`${path}/${f}`));
  });
  const result = await Promise.all(proms);
  return result.length;
}
