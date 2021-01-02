require  ('dotenv').config();

const { Client,MessageEmbed} = require('discord.js');
const client = new Client({
    partials:['MESSAGE','REACTION']
});
const PREFIX ="$";

client.on('ready', () =>{
    console.log(`${client.user.tag} has logged in.`)

});
client.on('message',(message)=>{
    if(message.author.bot) return;
    console.log(`Channel:${message.channel.name} ${message.author.tag}: ${message.content}`);
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if (CMD_NAME === 'kick'){
            if (args.length === 0) return message.reply('Please provide an ID');
            const member = message.guild.members.cache.get(args[0]);
            if(member){
                member
                .kick()
                .then((member)=> message.channel.send(`${member} was kicked.`))
                .catch((err)=>message.channel.send('I cannot kick that user :/ '+`${member}`))
            } else {
                message.channel.send('That member was not found')
            }
        }else if(CMD_NAME === 'ban'){
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('You do not have permissons to use that command');
            if (args.length === 0) return message.reply('Please provide an ID');
            
            try{
                const user = message.guild.members.ban(args[0]);
                console.log(user);
            }catch(err){
                console.log(err);
            }
        }
        else if(CMD_NAME === 'sil'){
            message.channel.bulkDelete(args[0]).then(()=>message.delete(args[0]));
            
        }else if(CMD_NAME === 'embed') {
            const embed = new MessageEmbed()
            // Set the title of the field
            .setTitle('A slick little embed')
            // Set the color of the embed
            .setColor(0xff0000)
            // Set the main content of the embed
            .setDescription('Hello, this is a slick embed!');
          // Send the embed to the same channel as the message
            message.channel.send(embed);
        }
    }
});
client.on('messageReactionAdd',(reaction, user)=>{
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id ==='792871875331883019'){
        switch(name){
            case '🍎':
                member.roles.add('761917993080586260');
                member.roles.add('779415280954245131');
                break;
        }
    }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
