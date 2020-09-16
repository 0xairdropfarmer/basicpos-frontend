class Requirement {
  constructor() {
    if (new.target === Requirement) {
      throw new TypeError("Cannot construct Requirement instances directly");
    }
    this.isSatisfied = this.isSatisfied.bind(this);
  }

  isSatisfied(credentials) {
    throw new Error("Must override isSatisfied");
  }
}

export default Requirement;
