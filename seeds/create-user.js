
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name:"John", last_name:"Doe", email:"john.doe@gmail.com"},
        {first_name:"Tai Man",last_name:"Chan", email:"taiman.chan@gmail.com"}
      ]);
    });
};
