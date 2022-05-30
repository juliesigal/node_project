const knex = require('knex')
// const config = require('config')
// const db_conn = config.get('db_conn')


const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: 'db1.db'
    }
})

module.exports = connectedKnex;

