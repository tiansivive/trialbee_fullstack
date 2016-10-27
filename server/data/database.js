export class Admin extends Object { }

export class User extends Object {
  constructor(id, name, address, email, age, status) {
    super();
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.age = age;
    this.status = status;
  }
}



const admin = new Admin();
admin.id = 0;

const users = [
  new User(1, 'Ned', 'Winterfell', 'ned@got.hbo', 40, 'Dead'),
  new User(2, 'Robb', 'Winterfell', 'robb@got.hbo', 24, 'Dead'),
  new User(3, 'Benjen', 'North of the wall', 'benjen@got.hbo', 42, 'Undead'),
  new User(4, 'Arya', 'Braavos', 'arya@got.hbo', 16, 'Noone'),
  new User(5, 'Sansa', 'Moat Caitlin', 'sansa@got.hbo', 18, 'Victimized'),
  new User(6, 'Jon', 'Wall', 'jon@got.hbo', 21, 'Hero'),
  new User(7, 'Littlefinger', 'Eyrie', 'peter@got.hbo', 34, 'Who knows?'),
  new User(8, 'Tyrion', 'Travelling Cart', 'tyrion@got.hbo', 30, 'Depressed'),
  new User(9, 'Varys', 'Shadows', 'varys@got.hbo', 36, 'Unknown'),
  new User(10, 'Daenerys', 'Flying about', 'danny@got.hbo', 22, 'Killing khals')
];

/*
* Add feature in memory
*/

/* eslint-disable eqeqeq */
let currentUsers = 10;
function addUser(name, address, email, age, status, imageUrl) {
  const usr = new User(++currentUsers, name, address, email, age, status);

  if (imageUrl) usr.image = imageUrl;

  users.push(usr);
  return usr;
}

function removeUser(id) {
  let ind;

  users.forEach((u, i) => {
    if (u.id == id) ind = i;
  });

  users.splice(ind, 1);
}

function editUser(id, name, address, email, status, age) {
  let ind;
  users.forEach((u, i) => {
    if (u.id == id) ind = i;
  });

  users[ind].name = name;
  users[ind].address = address;
  users[ind].status = status;
  users[ind].email = email;
  users[ind].age = age;
}

function filter(arr, key, val) {
  const usrs = [];
  console.log('key', key, 'val', val);
  arr.forEach((elem) => {
    if (key === 'age') {
      if (val >= elem[key]) usrs.push(elem);
      else return;
    } else if (elem[key] && elem[key].match(val)) {
      usrs.push(elem);
    } else return;
  });
  return usrs;
}

function getUsers(order) {
  if (!order) return users;

  let a = -1;
  let b = 1;

  if (order.direction && order.direction == 'DESC') {
    a = 1;
    b = -1;
  }

  users.sort((first, second) => {
    if (first[order.field] < second[order.field]) return a;
    if (first[order.field] > second[order.field]) return b;
    return 0;
  });

  return users;
}

function getUser(id) {
  return users.find(u => u.id == id);
}

function getAdmin(id) {
  return id == admin.id ? admin : null;
}

/* eslint-enable */
export {
  addUser,
  getUser,
  getUsers,
  getAdmin,
  removeUser,
  editUser,
  filter
};
