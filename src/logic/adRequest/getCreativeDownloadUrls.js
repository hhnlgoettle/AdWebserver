import fsPromise from '../../util/fsPromise';
import CreativePath from '../../util/CreativePath';

/**
 * @module
 * @function getCreativeDownloadUrls
 * @desc returns an array of all urls that need to be downloaded for a creative
 * @param {String} url the base url of the creative
 * @return {Promise<Array<String>>} urls for the creative content
 */
export default async function getCreativeDownloadUrls(url) {
  if (url == null || url.length === 0) {
    throw new Error(`cannot generate download urls. url ${url} is null or empty`);
  }
  // wrap in new error because fs doesn't provide useful stacktrace
  const dirContent = await fsPromise.readdir(`.${url}`).catch((err) => { throw new Error(err.message); });
  const urls = [];
  dirContent.forEach((f) => {
    urls.push({ url: CreativePath.joinPathAndFile(url, f), filename: f });
  });
  return urls;
}
