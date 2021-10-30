const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['sell'], // You Can Keep Any Name
    description: 'Sell Laptop', // Optional

    callback: async(message, args, client) => {

        if(args[0].toLowerCase() === 'laptop') { // You Can Keep Any Name
            const user = message.member
            const amount = 6000 // Amount Of Laptop To Sell: $6,000
            const laptop = db.fetch(`laptop_${user.id}`) // Get User's Laptop 
            if(laptop === null || laptop === 0) { // If User Doesn't Have Laptop
                return message.reply(`You Don't Have Laptop To Sell It`)
            } else if(laptop !== null || laptop !== 0) { // If User Has Laptop
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Sold`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
<@${user.id}> Sold **1** *Laptop* For \`$6,000\`
                `)
                .setFooter('Shop')
                message.channel.send(embed)
                db.subtract(`laptop_${user.id}`, 1) // Remove 1 Laptop From User
                db.add(`money_${user.id}`, amount) // Add Money To User
            }
        }
    }
}