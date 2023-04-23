// ЗДЕСЬ МЫ ПОЛУЧИЛИ ЭЛЕМЕНТА ТЕЛА ТАБЛИЦЫ (tbody)
// const employeeTableElem = document.getElementById('employee-table-body');

// ЗДЕСЬ МЫ СОЗДАЛИ(!) ЭЛЕМЕНТ СТРОКИ ТАБЛИЦЫ (tr)
// const trElem = document.createElement('tr');

// ЗДЕСЬ МЫ СОЗДАЛИ(!) ЭЛЕМЕНТ ЯЧЕЙКИ ТАБЛИЦЫ (td)
// const nameTdElem = document.createElement('td');

// ЗДЕСЬ МЫ ПРИСВОИЛИ(!) ЭЛЕМЕНТУ ЯЧЕЙКИ ТАБЛИЦЫ (td) КОНТЕНТ
// nameTdElem.innerText = employees[0].name;

// ЗДЕСЬ МЫ ПОЛОЖИЛИ В ЭЛЕМЕНТ СТРОКИ ТАБЛИЦЫ - ЯЧЕЙКУ ТАБЛИЦЫ
// trElem.appendChild(nameTdElem);

// ЗДЕСЬ МЫ ПОЛОЖИЛИ В ЭЛЕМЕНТ ТЕЛА ТАБЛИЦЫ - СТРОКУ ТАБЛИЦЫ
// employeeTableElem.appendChild(trElem);

// ЗДЕСЬ МЫ ХРАНИМ НАЗВАНИЕ ПОЛЯ ОБЪЕКТА К КОТОРМУ ХОТИМ ОБРАТИТЬСЯ В ВИДЕ СТРОКИ
// const objProp = 'name';

// СОЗДАЛИ ПРИМИТИВНЫЙ ОБЪЕКТ
// const city = {
//   name: 'Гродно',
//   population: 300000,
// };

// ЧЕРЕЗ СИНТАКСИС КВАДРАТНЫХ СКОБОЧЕК МЫ ПЕРЕДАЛИ НАВЗАНИЕ ПЕРЕМЕННОЙ, КОТОРАЯ ХРАНИТ НАЗВАНИЕ КЛЮЧА (ПОЛЯ) ОБЪЕКТА
// console.log(city[objProp]);

// ЧЕРЕЗ СИНТАКСИС КВАДРАТНЫХ МЫ ПЕРЕДАЛИ НАПРЯМУЮ СТРОКУ С ИМЕНЕМ СВОЙСТВА, К КОТОРОМУ ХОТИМ ОБРАТИТЬСЯ
// console.log(city['population']);

window.onload = function () {
  function render(users) {
    if (!users || !users.length) {
      return;
    }

    const employeeTableElem = document.getElementsByClassName('employee-table-body')[0];
    employeeTableElem.innerText = '';

    for (let i = 0; i < users.length; i++) {
      const rowContainer = document.createElement('div');
      rowContainer.classList.add('employee-table-row');
      let currentUser = users[i];

      for (let key in currentUser) {
        const cell = document.createElement('div');
        cell.classList.add('employee-table-item');

        if (key === 'id') {
          continue;
        }

        if (key === 'getFullName') {
          continue;
        }

        if (key === 'hasSickDay') {
          const mark = document.createElement('i');
          mark.classList.add('fa-solid');

          if (currentUser.hasSickDay) {
            mark.classList.add('fa-square-check', 'green');
            cell.appendChild(mark);
          } else {
            mark.classList.add('fa-square-xmark', 'red');
            cell.appendChild(mark);
          }
        } else {
          cell.innerText = currentUser[key];
        }

        rowContainer.appendChild(cell);
      }

      const cellButtonElem = document.createElement('div');
      cellButtonElem.classList.add('employee-table-item');
      const salaryButtonElement = document.createElement('button');

      salaryButtonElement.innerText = 'Pay Salary';

      salaryButtonElement.classList.add('button');

      salaryButtonElement.dataset.id = currentUser.id;

      cellButtonElem.appendChild(salaryButtonElement);

      rowContainer.appendChild(cellButtonElem);

      cellButtonElem.addEventListener('click', function (event) {
        const userId = Number.parseInt(event.target.dataset.id);
        const findedUser = users.find(function (user) {
          return user.id === userId;
        });

        alert('Выплачено: ' + findedUser.salary);
      });

      employeeTableElem.appendChild(rowContainer);
    }
  }

  render(employees);

  const searchInput = document.getElementById('search');

  const onKeyup = function (event) {
    const searchStr = event.target.value.toLocaleLowerCase();

    if (searchStr) {
      const result = employees.filter(function (employee) {
        const employeeName = employee.name.toLocaleLowerCase();
        const employeeSecondName = employee.secondName.toLocaleLowerCase();
        const employeePostion = employee.position.toLocaleLowerCase();

        return employeeName.includes(searchStr) || employeeSecondName.includes(searchStr) || employeePostion.includes(searchStr);
      });

      render(result);
    } else {
      render(employees);
    }
  };

  searchInput.addEventListener('keyup', onKeyup);

  const sortElem = document.getElementById('sort');

  const onSortChange = function (event) {
    const values = event.target.value.split(',');
    const field = values[0];
    const value = values[1];

    employees = employees.sort(function (currentEmployee, nextEmployee) {
      if (value === 'asc') {
        if (typeof nextEmployee[field] === 'number') {
          return nextEmployee[field] - currentEmployee[field];
        } else if (typeof nextEmployee[field] === 'string') {
          return currentEmployee[field].localeCompare(nextEmployee[field]);
        }
      } else {
        if (typeof currentEmployee[field] === 'number') {
          return currentEmployee[field] - nextEmployee[field];
        } else if (typeof nextEmployee[field] === 'string') {
          return nextEmployee[field].localeCompare(currentEmployee[field]);
        }
        return currentEmployee[field].toLocaleLowerCase() - nextEmployee[field].toLocaleLowerCase();
      }
    });

    render(employees);
  };

  sortElem.addEventListener('change', onSortChange);
};

console.log(performance.now());
