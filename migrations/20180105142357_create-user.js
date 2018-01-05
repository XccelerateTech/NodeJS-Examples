
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users",(table)=>{
    table.increments();
    table.string("name");
    table.string("first_name");
    table.string("last_name");
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
