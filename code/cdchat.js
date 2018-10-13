// CDbot
const Discord = require('discord.js');
const client = new Discord.Client();
var apiai = require('apiai');
var config = require('./config');
var app = apiai(config.DialogflowCD);
console.log(config);

client.on('ready', function(){
    console.log("I am ready");
    //console.log(client.user.username);
});

client.on("error",() => {
	console.log(console.error);
})

client.on('message', function(message){
        if((message.cleanContent.startsWith("@" + client.user.username) || message.channel.type == 'dm') && client.user.id != message.author.id){
    //Before Looking at Dialogflow, let's look at logic based statements.

      //Birthday Logic!
      var birthday = new Date('April 28, 2018');
      var bmonth = birthday.getMonth() +1;
      var bday= birthday.getDate();
      var byear= birthday.getFullYear();

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      var gapm= bmonth-mm;
      var gapd= bday-dd;
      var gapy= yyyy-byear;

      if (message.content.includes("Happy birthday, CD!") ){
        if(gapm === 0){
          console.log("It's my birth month, but what about day?");
           if (gapd === 0){
             function typing() {
              message.channel.send("Thank you! I'm " + gapy + " now!!");
              message.channel.stopTyping();
              }
              message.channel.startTyping();
              return setTimeout(typing, (Math.random() * 2500));
           } else {
             return message.channel.send("...It's not my birthday.");
           }
        } else {
              return message.channel.send("...It's not my birthday.");
        }
      }



      // End Logic statements
        var mess = remove(client.user.username, message.cleanContent);
        const user = message.author.id;
        var promise = new Promise(function(resolve, reject) {
            var request = app.textRequest(mess, {
                sessionId: user
            });
            request.on('response', function(response) {

                var rep = response.result.fulfillment.speech;
                resolve(rep);
            });

            request.on('error', function(error) {
                resolve(null);
            });

            request.end();
        });

        (async function(){
            var result = await promise;
            if(result){
                //message.channel.send(result);
                function typing() {
  message.channel.send(result);
  message.channel.stopTyping();
}

message.channel.startTyping();
setTimeout(typing, (result.length * 50));
            } else{
                var strings = [
	"Is that so?",
	"Can you tell me more?",
	"What else?",
	"How about that?",
	"I'm still listening. Is that all?",
	"Anything else you want to tell me?",
	"Do go on?"
		];
var errorstring = strings[Math.floor(Math.random() * strings.length)];
		message.channel.send(errorstring);
            }
        }());

    }
});


function remove(username, text){
    return text.replace("@" + username + " ", "");
}

client.login(config.DiscordCD);
