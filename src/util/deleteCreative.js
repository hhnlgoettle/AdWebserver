import fsPromise from './fsPromise';

export default async function deleteDirContent(path) {
  const dirContent = await fsPromise.readdir(path);
  const proms = [];
  dirContent.forEach((f) => {
    proms.push(fsPromise.unlink(`${path}/${f}`));
  });
  const result = await Promise.all(proms);
  return result.length;
}
