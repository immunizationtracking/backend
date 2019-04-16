exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTbl => {
    usersTbl.increments();

    usersTbl
      .string("username")
      .notNullable()
      .unique();
    usersTbl.string("password").notNullable();
    usersTbl.string("firstName").notNullable();
    usersTbl.string("lastName").notNullable();
    usersTbl.string("email").notNullable();
    usersTbl.string("role").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
