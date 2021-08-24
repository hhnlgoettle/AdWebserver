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

class Tags {
  constructor(tags) {
    this.tags = tags;
    this.tagsObj = convertTagArrayToObject(tags);
    this.tagValues = this.tags.map((t) => t.name);
  }

  getTags() {
    return this.tags;
  }

  getTagsAsObject() {
    return this.tagsObj;
  }

  isKnownTag(tag) {
    return this.tagValues.includes(tag);
  }

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
