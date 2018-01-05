
exports.up = function(knex, Promise) {
  return knex.schema.createTable("groups",(table)=>{
    table.increments();
    table.string("name");
    table.timestamps(false,true);
  }).then(()=>{
    return knex.schema.table("users",(userTable)=>{
        userTable.integer('group_id').unsigned();
        userTable.foreign("group_id").references("groups.id");
    }); 
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users",(userTable)=>{
    userTable.dropForeign("group_id");
    userTable.dropColumn("group_id");
  }).then(()=>{
      return knex.schema.dropTable("groups");
  });
};
