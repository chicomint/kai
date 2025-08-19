const readline = require('readline');
const config = require('./config.json');
console.log("terminal.js loaded");

function setupTerminal(client) {
  if (!client.isReady()) {
    console.log("Waiting for client to be ready...");
    client.once('ready', () => {
      setupTerminal(client);
    });
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const channel = client.channels.cache.get(config.terminal);
  if (!channel) {
    console.error("Channel not found");
    return;
  }

  console.log('Type here! and press Enter to send a message to Discord.');

  rl.on('line', (input) => {
    if (input.trim() !== '') {
      channel.send(input)
        .then(() => console.log(`Sent: ${input}`))
        .catch(console.error);
    }
  });
}

module.exports = setupTerminal;
