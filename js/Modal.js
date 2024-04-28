import Utils from './Utils.js';

//Class to manipulate a modal

export default class Modal {
  constructor() {
    //Get the modal elements
    this.modal = document.getElementById('modal');
    this.modalContent = document.getElementById('modal-content');
    this.modalClose = document.getElementById('modal-close');
    //Add a close event listener
    this.addCloseEventListener();
  }

  //Show the modal
  show(content = '') {
    this.modal.style.display = 'block';
    this.modalContent.innerHTML = `<pre>${Utils.escapeHtml(content)}</pre>`;
  }

  //Hide the modal
  hide() {
    this.modal.style.display = 'none';
  }

  //Add a close event listener
  addCloseEventListener() {
    this.modalClose.addEventListener('click', this.hide.bind(this));
  }
}
