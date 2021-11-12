const server = require('./server')

const port = 3002;
server.listen(port, () => console.log(`\nExpress departing now from port ${port}!\n`))