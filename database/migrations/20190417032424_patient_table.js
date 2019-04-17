exports.up = function(knex, Promise) {
    return knex.schema.createTable("patientInfo", userInfoTbl => {
      userInfoTbl.increments();
  
      userInfoTbl.string("firstName").notNullable();
      userInfoTbl.string("lastName").notNullable();
      userInfoTbl.string("gender");
      userInfoTbl.date("dateOfBirth");
      userInfoTbl.text("whoCanAccess");
      userInfoTbl
        .integer("patientUserId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      userInfoTbl
        .integer("practitionerId")
        .unsigned()
        .references("id")
        .inTable("practitionerInfo")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("patientInfo");
  };
