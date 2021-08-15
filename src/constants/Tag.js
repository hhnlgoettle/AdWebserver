export default class Tag {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  toObject() {
    return { name: this.name, description: this.description };
  }
}
