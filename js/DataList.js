import DataPair from './DataPair.js';
import Utils from './Utils.js';
import Modal from './Modal.js';

//Class to manipulate a list of data
export default class DataList {
  constructor(data = []) {
    //Get the input and output elements
    this.inputEl = document.getElementById('input');
    this.outputEl = document.getElementById('output');
    this.buttonsEls = Array.from(document.querySelectorAll('.action-button'));
    //Create a modal instance
    this.modal = new Modal();
    //Add event listeners to the buttons
    this.buttonsEls.forEach((button) => {
      button.addEventListener('click', this.clickHandler.bind(this));
    });
    //Set the data
    this.setData(data);
    //Show the data in the output element
    this.showData();
    //Handle the selection of items
    this.handleSelection();
  }

  //Add a new item
  add() {
    let newItem = this.inputEl.value;
    let dataPair = new DataPair(newItem);

    //Check if the input is valid
    if (!dataPair.isValid) {
      alert('Invalid input');
      return;
    }
    //Add the new item to the data
    this.data.push(dataPair);

    //Store the data in the local storage
    localStorage.data = JSON.stringify(this.data);

    //Show the data in the output element
    this.showData();

    //Clear the input
    this.inputEl.value = '';
  }

  //Sort by an attribute
  sort(attr) {
    this.data.sort((a, b) => {
      return a[attr].localeCompare(b[attr]);
    });

    this.showData();
  }

  //Delete items
  delete() {
    //Get the selected items
    let selectedItems = Array.from(this.outputEl.querySelectorAll('.selected'));
    //Remove the selected items from the data
    selectedItems.forEach((item) => {
      let index = this.data.findIndex(
        (dataPair) => dataPair.toString() === item.textContent,
      );
      this.data.splice(index, 1);
    });
    //Show the data in the output element
    this.showData();

    //Store the data in the local storage
    localStorage.data = JSON.stringify(this.data);
  }

  //Show the data as a XML string
  showXml() {
    //Create the XML string
    let xml = `
<?xml version="1.0" encoding="UTF-8"?>
<data>
${this.data.map((pair) => pair.toXml(1)).join('\n')}
</data>
        `;
    //Show the XML string in the modal
    this.modal.show(xml); // Wrap XML content inside <pre> tag
  }

  //Handle the click event on the buttons using event delegation
  clickHandler(event) {
    let action = event.target.dataset.action;
    let argument = event.target.dataset.argument;
    if (action) {
      this[action](argument);
    }
  }

  //Show the data in the output element
  showData() {
    this.outputEl.innerHTML = '';
    this.data.forEach((pair) => {
      let li = document.createElement('li');
      li.textContent = pair.toString();
      this.outputEl.appendChild(li);
    });
  }

  //Set the data from an array of objects
  setData(data) {
    this.data = [];
    data.map((item) => {
      let dataPair = new DataPair(`${item.name}=${item.value}`);
      this.data.push(dataPair);
    });
  }

  //Handle the selection of items
  handleSelection() {
    //Prevent the default behavior of the mousedown event
    this.outputEl.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });

    //Select items from the list depending on the key pressed
    this.outputEl.addEventListener('click', function (e) {
      if (e.target === this) {
        return false;
      }

      if (e.ctrlKey || e.metaKey) {
        Utils.toggleSelected(e.target);
      } else if (e.shiftKey) {
        Utils.selectRange(e.target, this);
      } else if (e.target.classList.contains('selected')) {
        Utils.clearSelected(this.children);
      } else {
        Utils.clearSelected(this.children);
        Utils.addSelected(e.target);
      }
    });

    //Unselect elements when clicking outside the list
    document.addEventListener('click', (e) => {
      if (!this.outputEl.contains(e.target)) {
        Utils.clearSelected(this.outputEl.children);
      }
    });
  }
}
