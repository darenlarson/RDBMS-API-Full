
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'daren', cohort_id: 1},
        {name: 'jon', cohort_id: 2},
        {name: 'emily', cohort_id: 3},
        {name: 'noi', cohort_id: 4},
        {name: 'baxter', cohort_id: 5},
        {name: 'dexter', cohort_id: 6},
        {name: 'aaron', cohort_id: 7}
      ]);
    });
};
