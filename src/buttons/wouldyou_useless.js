const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const guildLang = require('../util/Models/guildModel');

module.exports = {
  data: {
    name: 'wouldyou_useless',
    description: 'Would you useful',
  },
  async execute(interaction, client) {
    let power;
    let wouldyouembed;
    guildLang
      .findOne({ guildID: interaction.guild.id })
      .then(async (result) => {
        const { WouldYou } = await require(`../languages/${result.language}.json`);
        const { Useless_Powers } = await require(`../data/power-${result.language}.json`);
        const button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Invite')
            .setStyle(5)
            .setEmoji('🤖')
            .setURL('https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=274878294080&scope=bot%20applications.commands'),
        );
        const newbutton = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Replay')
            .setStyle(1)
            .setEmoji('🔄')
            .setCustomId('wouldyou_useless'),
        );
        let rbutton;
        if (Math.round(Math.random() * 15) < 3) {
          rbutton = [button, newbutton];
        } else {
          rbutton = [newbutton];
        }
        power = Useless_Powers[Math.floor(Math.random() * Useless_Powers.length)];
        wouldyouembed = new EmbedBuilder()
          .setColor('#F00505')
          .setFooter({
            text: `${WouldYou.embed.footer}`,
            iconURL: client.user.avatarURL(),
          })
          .setTimestamp()
          .addFields({
            name: WouldYou.embed.Usefulname,
            value: `> ${power}`,
            inline: false,
          });
        await interaction.reply({
          embeds: [wouldyouembed],
          fetchReply: true,
          components: rbutton,
        }).catch((err) => { return; });
      });
  },
};
