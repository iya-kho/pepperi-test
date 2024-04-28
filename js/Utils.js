//Class with utility functions

export default class Utils {
    //Check if a string is not empty
    static isNotEmptyString(str) {
      return str.trim().length > 0;
    }
  
    //Check if a string contains only one character
    static checkOneCharString(char, str) {
      const regex = new RegExp(char, 'g');
      const countChars = (str.match(regex) || []).length;
  
      return countChars === 1;
    }
  
    //Clear all selected items
    static clearSelected(elems) {
      for (let elem of elems) {
        elem.classList.remove('selected');
      }
    }
  
    //Add selected class to an item
    static addSelected(target) {
      target.classList.add('selected');
    }
  
    //Toggle selected class
    static toggleSelected(target) {
      target.classList.toggle('selected');
    }
  
    //Select a range of items
    static selectRange(target, element) {
      let items = Array.from(element.children);
  
      let selectedItems = Array.from(element.querySelectorAll('.selected'));
      this.clearSelected(selectedItems);
  
      if (selectedItems.length === 0) {
        for (let i = 0; i <= items.indexOf(target); i++) {
          this.addSelected(items[i]);
        }
      } else if (items.indexOf(selectedItems[0]) < items.indexOf(target)) {
        for (
          let i = items.indexOf(selectedItems.at(-1));
          i <= items.indexOf(target);
          i++
        ) {
          this.addSelected(items[i]);
        }
      } else {
        for (
          let i = items.indexOf(target);
          i <= items.indexOf(selectedItems[0]);
          i++
        ) {
          this.addSelected(items[i]);
        }
      }
    }
  
    //Escape html characters
    static escapeHtml(html) {
      return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  }
  