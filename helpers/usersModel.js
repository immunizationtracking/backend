const userdb = require("../database/dbConfig.js");

module.exports = {
  find,
  findWithoutPassword,
  findById,
  insert,
  update,
  remove,
  add,
  findByIdII
};

function find() {
  return userdb("users").select(
    "id",
    "username",
    "password",
    "firstName",
    "lastName",
    "email",
    "role"
  );
}

function findWithoutPassword() {
  return userdb("users").select(
    "id",
    "username",
    "firstName",
    "lastName",
    "email",
    "role"
  );
}

function findById(id) {
  return userdb("users")
    .where({ id })
    .select("id", "username", "firstName", "lastName", "email", "role")
    .first();
}

function insert(creds) {
  return (user = userdb("users")
    .insert(creds)
    .then([ids => 1]));
};

function update(id, changes) {
  return userdb("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return userdb("users")
    .where({ id })
    .del();
};

async function add(user) {
  const [id] = await userdb('users').insert(user);
  return findById(id);
}

function findByIdII(id) {
  return db('users')
    .where({ id })
    .first();
}
