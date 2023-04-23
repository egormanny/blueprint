function getRandomId() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const randomString = randomNumber.toString();
  const tenDigitNumber = randomString.slice(0, 10);
  return parseInt(tenDigitNumber);
}

function Employee(name, secondName, age, position, experience, salary, hasSickDay) {
  if (!name || !secondName) {
    console.error('ОШИБКА: name и secondName обязательные значения!');
    return;
  }

  this.id = getRandomId();
  this.name = name;
  this.secondName = secondName;
  this.age = age;
  this.position = position;
  this.experience = experience;
  this.salary = salary;

  if (hasSickDay === undefined) {
    this.hasSickDay = true;
  } else {
    this.hasSickDay = hasSickDay;
  }

  this.getFullName = function () {
    return this.name + ' ' + this.secondName;
  };
}

let employees = [
  new Employee('Svetlana', 'Oleynikova', 32, 'Copywriter', 2, 600, true),
  new Employee('Georgiy', 'Solovey', 24, 'UI/UX designer', 1, 1100, false),
  new Employee('Valeria', 'Del', 26, 'Project manager', 2, 900, false),
  new Employee('Alexey', 'Chernov', 33, 'Senior frontend developer', 4, 3600, false),
  new Employee('Evgenia', 'Strokova', 26, 'Middle frontend developer', 2.5, 2500, true),
  new Employee('Oleg', 'Tinkov', 30, 'Senior backend developer', 3.5, 3200, true),
  new Employee('Dmitry', 'Kuznetcov', 29, 'QA Engineer', 1.5, 800, true),
  new Employee('Afina', 'Jobs', 35, 'CEO / Owner', 5, 2850, false),
];

