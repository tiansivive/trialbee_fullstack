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
  new User(10, 'Daenerys', 'Flying about', 'danny@got.hbo', 30, 'Killing khals')
];


/*
* Add feature in memory
*/

let currentUsers = 10;
function addUser(name, address, email, age, status) {
  const usr = new User(++currentUsers, name, address, email, age, status);
  users.push(usr);

  return usr;
}

function getUser(id) {
  return users.find(u => u.id === id);
}

function getUsers() {
  return users;
}

function getAdmin(id) {
  return id === admin.id ? admin : null;
}


export {
  addUser,
  getUser,
  getUsers,
  getAdmin
};
