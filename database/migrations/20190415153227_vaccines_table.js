exports.up = function(knex, Promise) {
  return knex.schema.createTable("vaccines", vaccinesTbl => {
    vaccinesTbl.increments();

    vaccinesTbl.string("immunizationName").notNullable();
    vaccinesTbl.date("dateReceived").notNullable();
    vaccinesTbl.text("placeReceived").notNullable();
    vaccinesTbl.string("givenBy").notNullable();
    vaccinesTbl.date("nextShotDue");
    vaccinesTbl.text("doseInfo");
    vaccinesTbl.text("doseNumber").notNullable();
    vaccinesTbl
      .integer("patientInfo_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("userInfo")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    vaccinesTbl
      .integer("institute_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('vaccines');
};
