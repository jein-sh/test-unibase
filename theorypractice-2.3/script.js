const tableContainer = document.querySelector('.table');
const search = document.querySelector('#search');
let dataTable;
let filterDataTable;
let sortType = 'up';

const getData = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem('table', JSON.stringify(data));
  })
};

const renderTable = (data) => {
  if(!tableContainer) {
    return;
  }

  const table = document.createElement('table');
  tableContainer.append(table);
  const tableHead = document.createElement('thead');
  table.append(tableHead);
  const tableHeadRow = document.createElement('tr');
  tableHead.append(tableHeadRow);

  const keys = Object.keys(data[0]);

  keys.forEach((key) => {
    const tableName = document.createElement('th');
    tableName.textContent = key;
    tableHeadRow.append(tableName);
  });

  const tableBody = document.createElement('tbody');
  table.append(tableBody);

};

const renderTableBody = (data) => {
  const tableBody = tableContainer.querySelector('tbody');

  if(!tableBody) {
    return;
  }
  tableBody.innerHTML = '';
  
  data.forEach((el) => {
    const tableRow = document.createElement('tr');
    tableBody.append(tableRow);

    const values = Object.values(el);

    values.forEach((value) => {
      const tableCol = document.createElement('td');

      tableCol.innerHTML = value;
      tableRow.append(tableCol);
    })
  });
}

const sortData = (evt) => {
  const sortData = search.value.length > 2 ? filterDataTable : dataTable;
  const sortCol = evt.target.closest('th').textContent;
  
  if(sortType === 'up') {
    sortData.sort((a, b) => {
      if (a[sortCol] > b[sortCol]) {
        return 1;
      }
      if (a[sortCol] < b[sortCol]) {
        return -1;
      }
  
      return 0;
    });

    sortType = 'down';

  } else if(sortType === 'down') {
    sortData.sort((a, b) => {
      if (a[sortCol] < b[sortCol]) {
        return 1;
      }
      if (a[sortCol] > b[sortCol]) {
        return -1;
      }
  
      return 0;
    });

    sortType = 'up';
  }

  renderTableBody(sortData);
}

const getFilterSearch = (search) => {
  filterDataTable = dataTable.filter((el) => (el.title.toLowerCase().indexOf(search.toLowerCase()) > -1) 
    || (el.body.toLowerCase().indexOf(search.toLowerCase()) > -1));

  renderTableBody(filterDataTable);
}

window.addEventListener('load', () => {
  getData();
  dataTable = JSON.parse(localStorage.getItem('table'));

  renderTable(dataTable)
  renderTableBody(dataTable);

  document.addEventListener('click', (evt) => {
 
    if(evt.target.closest('th')) {
      sortData(evt)
    }
  });
  
  document.addEventListener('input', (evt) => { 
    if(evt.target.closest('#search')) {
      const searchString = evt.target.closest('#search').value.trim();

      if(searchString.length > 2) {
        getFilterSearch(searchString);
      } else {
        renderTableBody(dataTable);
      }
    }
  });
});
