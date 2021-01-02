require  ('dotenv').config();

const { Client} = require('discord.js');
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
    }
});
client.on('messageReactionAdd',(reaction, user)=>{
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id ==='792858176390561812'){
        switch(name){
            case '🍎':
                member.roles.add('768218444000002048');
                break;
        }
    }
});
client.login(process.env.DISCORDJS_BOT_TOKEN);
