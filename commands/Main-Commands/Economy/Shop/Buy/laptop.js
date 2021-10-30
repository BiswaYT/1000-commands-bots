const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['buy'], // You Can Keep Any Name
    description: 'Buy Laptop', // Optional

    callback: async(message, args, client) => {

        if(args[0].toLowerCase() === 'laptop') { // You Can Keep Any Name
            const user = message.member
            const amount = 10000 // Amount Of Laptop: $10,000
            const bal = db.fetch(`money_${user.id}`) // Get User's Money In Wallet

            if(bal <amount) { // If Balance In Wallet Is Less Then Amount Of Laptop
                return message.reply(`You Don't Have Enough Money(\`$10,000\`) In Wallet To But Laptop`)
            } else {
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Purchased`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
<@${user.id}> Successfully Purchased **1** *Laptop* For \`$10,000\`
                `)
                .setFooter('Shop')
                message.channel.send(embed)
                db.add(`laptop_${user.id}`, 1) // Add 1 Laptop To User
                db.subtract(`money_${user.id}`, amount) // Remove Money From Using
            }
        }
    }
}