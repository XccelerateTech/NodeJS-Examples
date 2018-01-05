
exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects",(table)=>{
    table.increments();
    table.string("name");
    table.integer("group_id").unsigned();
    table.foreign("group_id").references("groups.id");
    table.timestamps(false,true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("projects");
};
