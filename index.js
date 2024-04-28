import DataList from './js/DataList.js';

//Get saved data from the local storage
let data = [];
if (localStorage.getItem('data')) {
  data = JSON.parse(localStorage.getItem('data'));
}

// Create a DataList object
const dataList = new DataList(data);
