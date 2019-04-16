exports.up = function(knex, Promise) {
  return knex.schema.createTable("practitionerInfo", practitionerTbl => {
    practitionerTbl.increments();
    practitionerTbl.string("firstName").notNullable();
    practitionerTbl.string("lastName").notNullable();
    practitionerTbl.string("title");
    practitionerTbl.string("nameOfOffice").notNullable();

    practitionerTbl
      .integer("practitionerUserId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('practitionerInfo');
};
