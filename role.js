   function role(client) {
    console.log('role.js is loaded');
     const config = require('./config.json');
  client.on("guildMemberAdd", (member) => {
      const guild = member.guild;
       //set "name" role to auto add
      const role = guild.roles.cache.find((role) => role.name === "name");
      if (!role) {
        console.error("no add Role");
        return;
      }
    
      member.roles.add(role)
        .then(() => console.log("add role!"))
        .catch((error) => console.error(error));
    });
   
  }
  
  module.exports = {
   role
  };
  
