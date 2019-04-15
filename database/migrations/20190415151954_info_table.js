exports.up = function(knex, Promise) {
  return knex.schema.createTable("userInfo", userInfoTbl => {
    userInfoTbl.increments();

    userInfoTbl.string("firstName").notNullable();
    userInfoTbl.string("lastName").notNullable();
    userInfoTbl.string("gender");
    userInfoTbl.string("title");
    userInfoTbl.date("dateOfBirth");
    userInfoTbl.string("nameOfOffice");
    userInfoTbl.text("whoCanAccess");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("userInfo");
};
