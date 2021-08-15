const isTestEnvironment = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testing';

export default class CreativePath {
  static basePath() {
    return isTestEnvironment ? '/test/data/creatives/' : '/public/creatives/';
  }

  static fsBasePath() {
    return `.${CreativePath.basePath()}`;
  }

  /**
   *
   * @param {Campaign.js}campaign
   */
  static path(campaign) {
    return `${CreativePath.basePath()}${campaign.owner}/${campaign._id}`;
  }

  static fsPath(campaign) {
    return `${CreativePath.fsBasePath()}${campaign.owner}/${campaign._id}`;
  }

  static joinPathAndFile(path, file) {
    if (path.endsWith('/')) return `${path}${file}`;
    return `${path}/${file}`;
  }
}
