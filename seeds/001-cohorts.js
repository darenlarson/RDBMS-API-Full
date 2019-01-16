
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'web1'},
        {name: 'web2'},
        {name: 'web3'},
        {name: 'web4'},
        {name: 'web5'},
        {name: 'web6'},
        {name: 'web7'},
        {name: 'web8'},
        {name: 'web9'},
        {name: 'web10'},
        {name: 'web11'},
        {name: 'web12'},
        {name: 'web13'},
        {name: 'web14'},
        {name: 'web15'},
      ]);
    });
};
