var { prefix } = require('../config.json');

module.exports = {
    name: "ready",
    execute(client, message) {
      console.log(`${client.user.tag} is ready!`)
      client.user.setPresence({
              status: 'dnd',
              activity: {
               type: 'WATCHING',
               name: `${prefix}help || Developed on BBS`,
              },
             });
  }
  }
