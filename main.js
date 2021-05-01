const { Client, Collection } = require('discord.js');
const { loadCommands,  loadEvents } = require("./util/loader");

const client = new Client({
              disableMentions: "everyone"

});
require("./util/functions")(client);
client.config = require("./config")
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(client.config.TOKEN);
