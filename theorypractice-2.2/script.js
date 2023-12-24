const tableContainer = document.querySelector('.table');
let dataTable;

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

window.addEventListener('load', () => {
  getData();
  dataTable = JSON.parse(localStorage.getItem('table'));

  renderTable(dataTable)
  renderTableBody(dataTable);
});
