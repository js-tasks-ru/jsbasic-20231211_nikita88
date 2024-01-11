/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.createTable(rows);
  }
  
  createTable(rows) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');
    const headers = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];

    for (let header of headers) {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    for (let row of rows) {
      const tr = document.createElement('tr');
      
      for (let key in row) {
        const td = document.createElement('td');
        td.textContent = row[key];
        tr.appendChild(td);
      }

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => tr.remove());
      const td = document.createElement('td');
      td.appendChild(deleteButton);
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }
}
