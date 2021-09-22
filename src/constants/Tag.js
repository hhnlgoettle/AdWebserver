/**
 * @module
 * @class Tag
 * @property {String} name name of the tag
 * @property {String} description an explanation
 */
export default class Tag {
  /**
   * @constructor
   * @param {String} name
   * @param {String} description
   */
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  /**
   * @desc returns Tag as a simple object
   * @return {{name: String, description: String}}
   */
  toObject() {
    return { name: this.name, description: this.description };
  }
}
