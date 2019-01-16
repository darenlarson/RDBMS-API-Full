
exports.up = function(knex, Promise) {
    // make changes to out database
    return knex.schema.createTable('cohorts', function(tbl) {
        // primary key
        tbl.increments(); // defaults to a column name of id

        // other fields
        tbl.string('name', 255);

        // timestamps
        tbl.timestamps(true, true);

        // constraints
        tbl.unique('name', 'uq_cohorts_name');
    });
};

exports.down = function(knex, Promise) {
  // rollback/undo the changes
};
