import Utils from './Utils.js';

//Class to represent a pair of data
export default class DataPair {
  constructor(inputString) {
    this.isValid = false;
    //Check if the input string is valid
    if (this.#validateInputString(inputString)) {
      this.isValid = true;
    }
  }

  //Check if the input string is valid
  #validateInputString(inputString) {
    //Check if the input string contains one equal sign
    if (!Utils.checkOneCharString('=', inputString)) {
      return false;
    }

    const [name, value] = inputString.split('=');

    //Check if the name and value are not empty
    if (!Utils.isNotEmptyString(name) || !Utils.isNotEmptyString(value)) {
      return false;
    }

    //Set the name and value
    this.#setName(name);
    this.#setValue(value);

    return true;
  }

  //Set the name without spaces
  #setName(name) {
    this.name = name.trim();
  }

  //Set the value without spaces
  #setValue(value) {
    this.value = value.trim();
  }

  //Get the name
  getName() {
    return this.name;
  }

  //Get the value
  getValue() {
    return this.value;
  }

  //Get the pair as a string
  toString() {
    return `${this.name}=${this.value}`;
  }

  //Get the pair as an XML string with indentation
  toXml(indentLevel = 0) {
    const spaces = '  '.repeat(indentLevel); // Generate two spaces based on the indentLevel
    return `${spaces}<${this.name}>${this.value}</${this.name}>`;
  }
}
