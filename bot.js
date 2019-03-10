const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'pong') {

       message.reply('pong');

       }

});

client.on('message', message => {

    if (message.content === 'oof') {

       message.reply('Waarom nou oof?');

       }

});

client.on('message', message => {

    if (message.content === 'new') {

       // ID van de categorie van de tickets.
    const categoryId = "519253534198333470";

    // Verkrijg Gebruikersnaam
    var userName = message.author.username;
    // Verkrijg discriminator
    var userDiscriminator = message.author.discriminator;

    // Als ticket al gemaakt is
    var bool = false;

    // Kijk na als ticket al gemaakt is.
    message.guild.channels.forEach((channel) => {

        // Als ticket is gemaakt, zend bericht.
        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send(":x:`nouja zeg bespaar onze tijd je hebt al een support ticket jemig man`");

            bool = true;

        }

    });

    // Als ticket return code.
    if (bool == true) return;

    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Je ticket wordt gemaakt...")
        .setColor(0x009d4f);

    message.channel.send(embedCreateTicket);

    // Maak kanaal en zet in juiste categorie.
    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => { // Maak kanaal

        createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.
            //Zet perms voor het team (verander) de rol Team naar jou'n team rol 
            settedParent.overwritePermissions(message.guild.roles.find('name', "Team"), {  
            "READ_MESSAGES": true, "SEND_MESSAGES": true,
            "ATTACH_FILES": true, "CONNECT": true,
            "CREATE_INSTANT_INVITE": true, "ADD_REACTIONS": true
         });
            // Zet perms voor iedereen
            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
            // Zet perms voor de gebruiker die ticket heeft aangemaakt.
            settedParent.overwritePermissions(message.author, {

                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": true, "ADD_REACTIONS": true

            });

            var embedParent = new discord.RichEmbed()
                .setTitle("Community Diphootn")
                .setDescription("Bedankt voor het contacteren van ons ondersteuningsteam! We komen zo snel mogelijk terug! Beschrijf ondertussen je vragen grondig.")
                .setColor(0x009d4f);

            settedParent.send(embedParent);

      ///  }).catch(err => {
           // message.channel.send("`:x: er ging iets fout`");
        });

  //  }).catch(err => {
    //    message.channel.send("`Oops. er ging iets fout`");
    });


});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
