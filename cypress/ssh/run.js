export const run = (params) => {
    const { username, host, remoteCommand, privateKey, projectFolder } = params // destructure the argument

    // returning promise, which is awaited by Cypress
    return new Promise((resolve, reject) => {

        const { NodeSSH } = require('node-ssh')
        const ssh = new NodeSSH()

        ssh.connect({
            host: host,
            username: username,
            privateKey: privateKey
        }).then(function () {
            ssh.execCommand(remoteCommand, { cwd: projectFolder })
                .then(result => {
                    return resolve(result)
                })
        })
    })
}
