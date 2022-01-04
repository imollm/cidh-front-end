module.exports = async () => {
    const { Client } = require('pg')

    const client = new Client({
        user: 'postgres',
        host: '82.223.111.102',
        database: 'postgres',
        password: 'Pass2021!',
        port: 6432
    })

    try {
        console.log('Start TRUNCATE')
        await client.query("TRUNCATE TABLE category CASCADE")
        await client.query("TRUNCATE TABLE label CASCADE")
        await client.query('TRUNCATE TABLE "user" CASCADE')
        await client.query("TRUNCATE TABLE event_organizer CASCADE")
        await client.query("TRUNCATE TABLE event CASCADE")
        await client.query("TRUNCATE TABLE label_event CASCADE")
    } catch (err) {
        console.log(err.stack)
    }

    return null
}
