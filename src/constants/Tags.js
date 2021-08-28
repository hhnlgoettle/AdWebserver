import Tag from './Tag';

const baseTags = [
  new Tag('nudity', 'contains nudity or pornographic content'),
  new Tag('violence', 'contains graphic violence'),
  new Tag('game', 'is a game or an ad about a game'),
  new Tag('non-game', 'is a product or service which is not a game'),
  new Tag('idle-game', 'is about an idle game'),
  new Tag('clicker-game', 'is about a clicker game'),
  new Tag('turn-based-combat', 'is about a turn based combat game'),
  new Tag('casual', 'is about a casual game'),
];

function convertTagArrayToObject(arr) {
  const obj = {};
  arr.forEach((item) => {
    obj[item.name] = item;
  });
  return obj;
}

/**
 * @module
 * @class Tags
 * @description contains all known tags
 * @property {Array<Tag>}tags all known tags
 */
class Tags {
  /**
   * @constructor
   * @param tags
   */
  constructor(tags) {
    this.tags = tags;
    this.tagsObj = convertTagArrayToObject(tags);
    this.tagValues = this.tags.map((t) => t.name);
  }

  /**
   * @description return all tags
   * @return {Array<Tag>}
   */
  getTags() {
    return this.tags;
  }

  /**
   * @desc returns all tags as an Object where Tags' names are the keys
   * @return {Object}
   */
  getTagsAsObject() {
    return this.tagsObj;
  }

  /**
   * @desc looks up if tag is known
   * @param {String} tag
   * @return {*}
   */
  isKnownTag(tag) {
    return this.tagValues.includes(tag);
  }

  /**
   * @desc checks if all tags in an array are known
   * @param {Array<String>}tagArr
   * @return {Promise<boolean>}
   */
  async filterInput(tagArr) {
    tagArr.forEach((t) => {
      if (this.isKnownTag(t) === false) {
        throw Error(`tag ${t} is not known`);
      }
    });
    return true;
  }
}

export default new Tags(baseTags);
