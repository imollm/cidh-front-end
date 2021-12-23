module.exports = on => {
    on('task', {
        ssh(params) {
            console.log("Running SSH Node Client")
            const run = require('../../ssh/run.js')
            run(params).then((result) => {
                console.log(`SSH RESULT ${result}`)
            })
            return null
        },
    });
    on('task', {
        'db:teardown': () => {
            const teardown = require('../db/teardown.js')
            return teardown()
        },
        'db:seed': () => {
            const seed = require('../db/seed.js')
            return seed()
        },
    });
};
