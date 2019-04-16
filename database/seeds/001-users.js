exports.seed = function(knex, Promise) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        {
          username: "assassin",
          password: "password",
          firstName: "Arya",
          lastName: "Stark",
          email: "astark@gmail.com",
          role: "Patient"
        },
        {
          username: "knight",
          password: "password",
          firstName: "Sandor",
          lastName: "Clegane",
          email: "sclegane@gmail.com",
          role: "Patient"
        },
        {
          username: "hand",
          password: "password",
          firstName: "Qyburn",
          lastName: "...",
          email: "qyburn@gmail.com",
          role: "Practitioner"
        },
        {
          username: "banner",
          password: "password",
          firstName: "Beric",
          lastName: "Dondarion",
          email: "bdondarion@gmail.com",
          role: "Practitioner"
        }
      ]);
    });
};
