const isTestEnvironment = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testing';

/**
 * @module
 * @class CreativePath
 * @type {CreativePath}
 * @desc class to create paths for creatives
 */
const CreativePath = class CreativePath {
  /**
   * @desc returns the base path
   * @return {string}
   */
  static basePath() {
    return isTestEnvironment ? '/test/data/creatives/' : '/public/creatives/';
  }

  /**
   * @desc returns the base path for filesystem
   * @return {string}
   */
  static fsBasePath() {
    return `.${CreativePath.basePath()}`;
  }

  /**
   * @desc returns path for a campaign
   * @param {Campaign.js}campaign
   */
  static path(campaign) {
    return `${CreativePath.basePath()}${campaign.owner}/${campaign._id}`;
  }

  /**
   * @desc returns filesystem path for campaign
   * @param {Campaign.js}campaign
   * @return {string}
   */
  static fsPath(campaign) {
    return `${CreativePath.fsBasePath()}${campaign.owner}/${campaign._id}`;
  }

  /**
   * @desc joins a path and a file
   * @param {String} path the path to the directory
   * @param {String} file the filename
   * @return {string} full pathname to file
   */
  static joinPathAndFile(path, file) {
    if (path.endsWith('/')) return `${path}${file}`;
    return `${path}/${file}`;
  }
};

export default CreativePath;
