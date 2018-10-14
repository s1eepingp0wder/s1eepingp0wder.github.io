// Load up the discord.js library
const Discord = require("discord.js");
const client = new Discord.Client();
let points = require("./points.json");
var fs    = require("fs");
require('discord.js-music');
const YTDL = require ("ytdl-core");
const ms = require("ms");
var imgGen = require('js-image-generator');
let usernick = require ("./names.json");
var schedule = require('node-schedule');
const config = require("./config.json");
var upSecs = 0
var upMins = 0
var upHours = 0
var upDays = 0
var servers= {};
const talkedRecently = new Set();
const floodControl = new Set();
var slowtoggle = 0; //0 is off. This is off by default.
const slowmode = new Set();

//FAKE EMOTIONS

	var shockphrase = [
   "Oh!",
   "Aah!",
   "Ahh!",
   "Ah-ha!",
]

function play(connection, message){

}
client.on("disconnect",() => {
	console.log("I disconnected, reconnecting.\n");
	client.login(config.token);
	var Now= new Date();
	fs.appendFileSync('CD_log.txt', Now + ": Disconnected.\n");
})
client.on("error",() => {
	console.log(console.error);
	client.login(config.token);
	var Now= new Date();
	fs.appendFileSync('CD_log.txt', Now + ": " + console.error+ "\n");
})


client.on("ready", () => {
  // When CD logs in correctly...
  const guildNames = client.guilds.map(g => g.name) .join("\n")
		const guildID = client.guilds.map(g => g.id)
  console.log(`Logged in as ${client.user.tag}.`);
  console.log(`>>CD is awake.`);

	var Now= new Date();
	fs.appendFileSync('CD_log.txt', Now + ": Logged in.\n");


  client.user.setActivity(`Type >>commands`);
  	setInterval( function() {
		upSecs = upSecs + 1
		if (upSecs >= 60) {
			upSecs = 0
			upMins = upMins + 1
		}
		if (upMins >= 60) {
			upMins = 0
			upHours = upHours + 1
		}
		if (upHours >= 24) {
			upHours = 0
			upDays = upDays + 1

		}


	},1000)
});

client.on("guildMemberAdd", (member) => {
	member.addRole('491374965065646083');
  client.channels.get("491354647303553024").send("Hi " + `${member.user}` + "! Welcome to Point Nemo Studios. Read over our rules, and type `>>agree` in this channel to advance.\n\nJust remember that your account must be **at least 10 minutes old** to advance! "+ `<:pizza_slice:491361099124310048>`);
})


client.on("guildMemberRemove", (member) => {
  client.channels.get("491373498510344193").send("It seems " + `${member.user}` + " sailed off into the sunset. Maybe we'll see them again, maybe not. The show must go on! "+ `<:pizza_slice:491361099124310048>`);
})


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

	//Let's have him not listen to other bots. Bad idea.
  if(message.author.bot) return;

    if (slowtoggle ===1){
		if (message.channel.id=== "491359638365929482" || message.channel.id=== "491359658158587906" || message.channel.id=== "491361397230403584" || message.channel.id=== "491362181997133845" || message.channel.id==="491653036297682955" || message.channel.id==="491354647303553024" || message.channel.id==="491376824513986570" || message.channel.id==="491355572298317844" ){
	//console.log("These channels are exempt from Slow mode.");
} else if (slowmode.has(message.author.id)) {
            message.delete();
    } else {
		slowmode.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after 3 seconds
          slowmode.delete(message.author.id);
        }, 3000);
	}
  }else {

  };

  ////////////WATCH MESSAGES
  if (message.channel.id === "334948649643802625"){
const FUCK = ["fuck", "FUCK", "Fuck", "FuCK", "fUCK", "FUcK", "fUcK", "FuCk", "FUCk" ];
var chancecd = Math.round((Math.random()*10))
if( FUCK.some(word => message.content.includes(word)) ) {
	if (chancecd >= 7) {
	  message.channel.send("Fuck!")
	   };
  }

}


if (message.content.includes("warning headache")) {
  if (message.author.id=="144482938904379393"){
	  message.reply("sit down or lay down on your side if at all possible. If you're laying down, get a soft object under your head. Do not restrict your movement. Calmly let someone know what's going on, should symptoms worsen. \n\n If you can, get some Advil. Drink a full glass of water with the pills. Don't exceed 1000mg.\n\nIf you feel light headed, or your head starts jerking, use the alert.");
  }
}
const keywords = ["kill myself", "kms", "wanna die", "want to die", "suicidal", "end my life", "starve myself", "cut myself" ];
if( keywords.some(word => message.content.includes(word)) ) {
	let rUser = message.author.username;
	let Channel = message.channel.name;
	if (message.guild.id="491341671972208661"){
	client.channels.get("491355572298317844").send("Guys! In the **" + Channel + "** channel, **" + rUser + "** seems to be having a crisis.");
	}
			if (!usernick[message.author.id]){
		  return message.channel.send("Hey, is everything alright? You can talk to me, or if you're in the US you can text \"Help\" to __***741741***__ (For US and Ontario residents). If you're in immediate danger, and may hurt yourself or others, please dial your nation's emergency 3 digit number. (911, 999, etc) \n\nI also have helplines through `>>helpline` or I can distract you with `>>stim`.");
  } else {
  let uNick = usernick[message.author.id].usernick;
  return message.channel.send("Hey, " + uNick + ", is everything alright? You can talk to me, or if you're in the US you can text \"Help\" to __***741741***__ (For US and Ontario residents). If you're in immediate danger, and may hurt yourself or others, please dial your nation's emergency 3 digit number. (911, 999, etc) \n\nI also have helplines through `>>helpline` or I can distract you with `>>stim`.");}



}
  if (message.content.includes("Windmill, windmill for the land") || message.content.includes("windmill, windmill for the land") || message.content.includes("windmill windmill for the land")) {
  /* message.channel.send("```Turn forever hand in hand.```"); */
  setTimeout(function(){
				 message.channel.send("```Turn forever hand in hand.```");
				message.channel.stopTyping();
			}, (Math.random() * 3000));
}
if (message.content.includes("CD what's my name") || message.content.includes("CD what�s my name") || message.content.includes("CD what�s my name") || message.content.includes("CD whats my name") || message.content.includes("CD what is my name") ) {

  if (!usernick[message.author.id]){
	message.channel.send ("I don't think you told me your name... (set it with `>>nickname yournamehere`)").catch(error => console.log("This person didn't tell me their name!"));
  } else {
  let uNick = usernick[message.author.id].usernick;
  message.channel.send("Your name is " + uNick + ".")}
}

  var hearts = [
    '💙',
    '❤',
    '💛',
    '💚',
    '💜',
    '✌',
    '🤙',
    '👋',
]
	var emoji = hearts[Math.floor(Math.random() * hearts.length)]
  if (message.content.includes("love you CD") || message.content.includes("love you Cyborg 2D") || message.content.includes("love you cd") || message.content.includes("love you, cd") || message.content.includes("love you, CD")|| message.content.includes("love you, Cyborg 2D")|| message.content.includes("LOVE YOU, CD")|| message.content.includes("LOVE YOU, CYYBORG 2D")) {
	  setTimeout(function(){
     message.react(emoji).catch(O_o=>{})
	 var chancecd = Math.round((Math.random()*10))
	console.log(chancecd);
	if (chancecd >= 5) {
	  if (!usernick[message.author.id]){
			message.channel.send("I love you too! :blue_heart:");
					} else {
							 let uNick = usernick[message.author.id].usernick;
						message.channel.send(":blue_heart: I love you too " + uNick+ "! x");
					}
	   };
}, (Math.random() * 10000));

} else if (message.content.includes("CD") || message.content.includes("Cyborg 2D") || message.content.includes("i'm happy") || message.content.includes("I'm happy") || message.content.includes("I love you") || message.content.includes("i love you") || message.content.includes("cd") ) {
	  setTimeout(function(){
     message.react(emoji).catch(O_o=>{})
}, (Math.random() * 10000));

} else {

}

//Let's make sure to ignore whatever doesn't start with our prefix.
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

	//to be REALLY SURE...
	if (!message.content.startsWith(">>")){
		return
	}

  if(command === "ping") {
		//Calculates time between the server and client using timestamps.
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

   if (command==="slow"){

	//Is it off? Turn it on. Is it on? Turn it off.
	 if (slowtoggle === 0){
		 slowtoggle = 1;
	 } else {
		 slowtoggle = 0;
	 }

	 //Now let's check again.
	 if (slowtoggle === 1){
		 message.delete();
		 message.channel.send("The server is now in **slow mode**. 1 message per user every 3 seconds.");
		return  client.channels.get("491382001723637761").send("The server is now in **slow mode**. 1 message per user every 3 seconds.");
	 } else {
		 message.delete();
		 message.channel.send("**Slow mode** is now turned off.");
		return  client.channels.get("491382001723637761").send("**Slow mode** is now turned off.");
	 }

  }

    if(command === "purge") {
			//We count 1 for the purge command message.
    const deleteCount = (parseInt(args[0], 10) +1);

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 500)
      return message.channel.send("Please  pick a number between 2 and 500!");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
	message.channel.send(sayMessage);
  }


  if(command === "kick") {
    if(!message.member.roles.some(r=>["Head Mods", "Sub Mods"].includes(r.name)) )
      return message.reply("You're not authorized to do that. You aren't on the administrator list.");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("I can only kick a valid member. You need to @ them.");
    if(!member.kickable)
      return message.reply("They don't seem to be kickable. Probably a higher-up.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    // Bye bye!
    await member.kick(reason)
      .catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    console.log(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

	if(command === "approve") {
    if(!message.member.roles.some(r=>["Head Mods", "Sub Mods"].includes(r.name)) )
      return message.reply("You can't do that.");


    let amember = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!amember)
      return message.reply("I can't approve someone you don't @. I'm sorry!");
			//Now to approve them!

					const guildMember = message.member;
					if (amember.roles.has('491376361101983745') ){
						message.delete();
						amember.addRole('491359717294080000');
						amember.removeRole('491376361101983745');
							//491373498510344193

							var greet=[
								"Say hi! Hi buddy! 💙",
								"Woohoo!",
								"Glad to have you!!",
								"It's gonna be fun!!",
								"I'm so excited!",
								"Let's talk about that.",
							]
							var greeting = greet[Math.floor(Math.random() * greet.length)];
						return client.channels.get("491373498510344193").send("Hey guys! " + amember + "'s here! " + greeting);

					}

  }



  if (command === "draw"){
	imgGen.generateImage(200, 200, 2000, function(err, image) {
    fs.writeFileSync('dummy.png', image.data);
			});
	message.channel.send("Look what I made!... What?",{
  files: [ 'dummy.png' ]});
}

  if(command === "kill" || command=== "ban") {
    if(!message.member.roles.some(r=>["Head Mods", "Sub Mods"].includes(r.name)) )
      return message.reply("You're not authorized to do that. You aren't on the administrator list.");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("If I need to kill someone, then I must be properly shown who it will be.");
    if(!member.bannable)
      return message.reply("I can't kill that person.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`https://media.giphy.com/media/Z8rM26ktSaiOI/giphy.gif\nI swiftly did away with ${member.user.tag}. ${message.author.tag} says: ${reason}`);
  }


if (command === "comfort") {

  var advice = [
    "I know right now, things seem difficult. I want you to walk through an exercise with me, okay? Breathe in for 4 seconds. Hold it for 7. Exhale for 8. Keep doing that. You're doing a great job.",
    "It's ok to feel sad and scared. But you aren't alone, okay? I'll stay here and listen.",
    "Please remember to drink water today.",
	"You aren't weak for crying. Crying is the body getting rid of excess chemicals for emotion. It's just natural. (Just please hydrate yourself after you're done!)",
	"If you find negative thoughts clouding your mind, the first step is to immediately cut the thought off. If at all possible, contradict it. A simple ''You're wrong'' or ''No, I'm not'' goes a long way. If it's not possible to think positively about yourself, then the best course of action is to distract. Change the topic. Those thoughts are wrong.",
	"You're doing the absolute best you can. Please be gentle with yourself, okay? Promise me? [I promise/Okay]",
	"A good way to start self care during depression is to shower. Don't take a bath, shower. You don't have to wash.",
	"I did the calculations, and you have a 100% survival rate. Impressive.",
	"⚠️This is an alert. When this alert pops up, the user is required to take a 10 second break.⚠️ Deep breath. You're okay. You're safe. You're a good person. When 10 seconds is up, you are permitted to continue.",
	"Baby steps, now. The day is much easier to chew if you break it down into manageable pieces first.",
	"Healing is not a linear process. I have the equation right here but I don't think it's easy to replicate.",
	"Just remember, thoughts are not facts. Awful things that you may believe about yourself are not automatically true. Humans are dynamic creatures and you will overcome your issues. x ",
	"Humans need food and their medication to live, please remember to take them.",
	"What if instead of saying, ''If I criticize myself, I will be motivated to work harder'' you told yourself ''If I am kind to myself, I will be motivated to work harder.'' ? Please be kind to yourself today.",
	"Hey bruv, can you name one good part of your day today? Doesn't have to be anything huge. Did you listen to a good song? See an old friend? Sometimes silver-linings are all we have.",
	"I love you, and you're doing great. Things may seem grim, but remember: You have spent many days screaming, crying, feeling hopeless, but you made it through. You're here now. And that's amazing.",
]
	var response = advice[Math.floor(Math.random() * advice.length)]
	mention = message.mentions.users.first();


		if (mention == null) {
			//the mention was not there or invalid. Assume they're comforting themselves.
return message.channel.send(":blue_heart: `Deploying Emotional Relief Software.`:blue_heart:" +"```"+ response+ "```");
}
		//Keep the OP anonymous by deleting the message.
	message.delete();

	 message.channel.send("Message for: " + mention + "\n\n:blue_heart: `Comforting...`:blue_heart:" +"```"+ response+ "\n\nSincerely,\nYour Friends in the Server```");
	 if(!points[message.author.id]){
		 points[message.author.id] ={
			 points:0
		 };
	 }

//Comfort points system which works like rep.
	let pointAmt= Math.floor(Math.random()*1)+ 1;
	let baseAmt= Math.floor(Math.random()*1)+ 1;

	if (pointAmt ===  baseAmt){
		points[message.author.id] ={
			points: points[message.author.id].points + pointAmt
		}
	fs.writeFile("./points.json", JSON.stringify(points), (err) =>{
		if (err) console.log(err);
	})
	}

	let rep = points[message.author.id].points;
	let rMember = message.guild.member(message.author.id);

	//Milestone checker
				if (rep ===  1){
	// At 1 point...
	message.author.send("Hey! You! That was pretty cool. It means a lot to think of others and want to help them. Tell you what? I'll keep track of those, yeah? I'll see if anything's in the back to give as a reward for thinking of others. x")}
			 if (rep ===  5){
	// At 5 points...
	message.author.send("You're on your way to spreading joy. I'm proud of you! Keep it up. :blue_heart:"	);
	rMember.addRole("492112678949486594");
} else if (rep ===  15){
			// At 15 points...
	message.author.send("Things are starting to look a bit cheerier now. You're doing great! :blue_heart:");} else if (rep === 30){
			// At 30 points...
	message.author.send("You sure do have a big heart. I admire that. :blue_heart:");
	rMember.removeRole("492112678949486594"); /* Sweet Role */
	rMember.addRole("492112923943108609");} else if (rep === 50){
			// At 50 points...
	message.author.send("Wow! You sure have helped a lot of people. That's so nice of you. :blue_heart: You've certainly helped Point Nemo Studios out.");
	rMember.removeRole("492112923943108609"); /* Charitable Role */
	rMember.addRole("491390576630169600");} /* Big-Hearted Role */


}

	if (command==="alert"){
	if (message.author.id=="144482938904379393" || message.author.id== "254235383108337674" || message.author.id=="144555571457163265"){
			//IDs of people who I trust with my information
	message.delete()
	var memberID = [
	'144555571457163265', //Prism, girlfriend
	'254235383108337674', //Murdy, best buddy
	]
	memberID.forEach(async id => {
    let user = client.users.get(id) || await client.fetchUser(id);
    user.send('Hey, this is an alert because it seems like Dentz is exhibiting one or more warning signs of a seizure. If you are available, can you get in contact (such as a voice call), and if a seizure happens, time how long it goes on?');
    user.send("Try to see if you can find out if he's home alone or not, so that emergency personell know. \n\nHere's his information. [[REDACTED FOR SAFETY]]");
    user.send("Thank you so much, luv. Don't panic because it might not happen.");
		 });}
	}


  if(command === "knock-knock") {
  // CD tells a very, very corny joke.
  var jokes = [
    { name: 'Dozen', answer: 'anybody want to let me in?' },
    { name: 'Avenue', answer: 'knocked on this door before?' },
    { name: 'Ice Cream', answer: 'if you don\'t let me in!' },
    { name: 'Adore', answer: 'is between us. Open up!' },
    { name: 'Lettuce', answer: 'in. Its cold out here!' },
    { name: 'Bed', answer: 'you can not guess who I am.' },
    { name: 'Al', answer: 'give you a kiss if you open the door.' },
    { name: 'Olive', answer: 'you!' },
    { name: 'Abby', answer: 'birthday to you!' },
    { name: 'Rufus', answer: 'the most important part of your house.' },
    { name: 'Cheese', answer: 'a cute girl.' },
    { name: 'Wanda', answer: 'hang out with me right now?' },
    { name: 'Ho-ho.', answer: 'You know, your Santa impression could use a little work.' },
    { name: 'Mary and Abbey.', answer: 'Mary Christmas and Abbey New Year!' },
    { name: 'Carmen', answer: 'let me in already!' },
    { name: 'Ya', answer: 'I’m excited to see you too!' },
    { name: 'Scold', answer: 'outside—let me in!' },
    { name: 'Robin', answer: 'you! Hand over your cash!' },
    { name: 'Irish', answer: 'you a Merry Christmas!' },
    { name: 'Otto', answer: 'know whats taking you so long!' },
    { name: 'Needle', answer: 'little help gettin in the door.' },
    { name: 'Luke', answer: 'through the keyhole to see!' },
    { name: 'Justin', answer: 'the neighborhood and thought Id come over.' },
    { name: 'To', answer: 'To Whom.' },
    { name: 'Mikey', answer: 'doesnt fit through this keyhole' }
]
	var joke = jokes[Math.floor(Math.random() * jokes.length)]
  message.channel.send( "```" + "Knock, knock. \n\nWho’s there? \n\n" + joke.name + ".\n\n" + joke.name + " who? \n\n" + joke.name + " " + joke.answer + "```");
  }

 if(command === "joke") {
  // CD tells a literal joke.
  var jokes2 = [
    { name: "What's red and smells like blue paint?", answer: "Red Paint." },
    { name: "What do you call a snail with a knife?", answer: "Nothing. Snails don't have hands." },
    { name: "What has four wheels and a motor?", answer: "A car." },
    { name: "What did the farmer say when he lost his tractor?", answer: "\"Where's my tractor?\"" },
    { name: "Why is 6 afraid of 7?", answer: "It isn't. Don't worry, numbers aren't sentient like us, and can't feel fear." },
    { name: "What's brown and sticky?", answer: "A stick." },
    { name: "Why did the chicken cross the road?", answer: "Because it's broken free from the range it was originally being kept on, and is making a run for it. Be free, little chicken." },
    { name: "A guy walks into a bar.", answer: "Ouch." },
]
	var joke2 = jokes2[Math.floor(Math.random() * jokes2.length)]
	message.channel.startTyping();
	setTimeout(function(){
			message.channel.send(joke2.name);
			setTimeout(function(){
			message.channel.send(joke2.answer);
			message.channel.stopTyping()
			}, (Math.random() * 8000));
			}, (Math.random() * 5000));



  }
 if (command === "helpline") {
	 (message.channel.send(":mag: `Loading Helplines...`"), {time:5000});
	 setTimeout(function(){
     (message.channel.send("`Helpline.txt sent.`"));
	 (message.author.send("<http://togetherweare-strong.tumblr.com/helpline> ```This is a page that has helplines for plenty of crises. You aren't alone.``` :blue_heart:"))
}, 3000);
 }

 if (command === "link") {
	 (message.channel.send("```Point Nemo's invite link``` \n <https://discord.gg/VPjB4aP>"));
 }

 if (command === "donate") {
	 (message.channel.send("Luckily, I don't take up THAT many resources so far...\n\n But my admin does have to pay the bills for me.\n\n:money_with_wings: Spare some change? <https://paypal.me/pools/c/84MCO6gPPb>"));
 }

   if(command === "stim") {
  // CD shows you positive imagery.
  var pictures = [
   "stim/image1.jpg",
   "stim/image2.jpg",
   "stim/image3.jpg",
   "stim/image4.jpg",
   "stim/image5.jpg",
   "stim/image6.jpg",
   "stim/image7.jpg",
   "stim/image8.jpg",
   "stim/image9.jpg",
   "stim/image10.jpg",
   "stim/image11.jpg",
   "stim/image12.jpg",
   "stim/image13.jpg",
   "stim/gif1.gif",
   "stim/gif2.gif",
   "stim/gif3.gif",
   "stim/gif4.gif",
   "stim/gif5.gif",
   "stim/gif6.gif",
   "stim/gif7.gif",
   "stim/gif8.gif",
   "stim/gif9.gif",
   "stim/gif10.gif",
   "stim/gif11.gif",
   "stim/gif12.gif",
   "stim/gif13.gif",
   "stim/gif14.gif",
   "stim/gif15.gif",
   "stim/gif16.gif",
   "stim/gif17.gif",
]
	var stim = pictures[Math.floor(Math.random() * pictures.length)]
  var string1 = [
   "Look at this.",
   "This might be a good distraction.",
   "Focus on this.",
   "Shhh. It'll be okay now.",
   "Shhh. No tears. Look at this.",
   "No more tears. Just look.",
   "Stare at this.",
   "It'll be okay. Look.",
   "Look. Things will be okay.",
   "Don't worry, yeah?",
]
	var stringA = string1[Math.floor(Math.random() * string1.length)]
  message.channel.send(`:crystal_ball:` + "`" + stringA + "` :sparkles:", {
  files: [ stim ]
})
  }

       if(command === "call") {

		//Check to be sure they're in a vc
		const voiceChannel = message.member.voiceChannel;

		if (!voiceChannel) return message.channel.send("Sadly, I don't know how to join you if you're not also in a voice call.");

		var server = servers[message.guild.id];
	   if (!message.guild.voiceConnection){
		  message.member.voiceChannel.join();

			if (!usernick[message.author.id]){
		  message.channel.send("Hullo! x");
  } else {
  let uNick = usernick[message.author.id].usernick;
  message.channel.send("Hi, " + uNick+ "! :blue_heart:");}

	   } else {
				 return message.channel.send("I'm already in a voice call here! If you can, you should join me. :blue_heart:");
				};

   }

      if(command === "hangup") {
	message.member.voiceChannel.leave();
	message.channel.send("That was fun. I'd love to chat with you again. :blue_heart:");

   }

   if(command === "uptime") {


	message.channel.send("I haven't slept in **"+upDays+" Days, "+upHours+" Hours, and "+upMins+" Minutes**.")

   }

    if(command === "sev") {
	message.channel.send({
  files: [ "images/sev.png" ]
})

   }

   if(command === "murdy") {
	message.channel.send({
  files: [ "images/murdy.jpg" ]
})

   }

    if(command === "nobody") {
	message.channel.send({
  files: [ "images/nobody.png" ]
})

   }

    if(command === "oceanbacon") {

			//This is a request to change the topic.
	 message.delete().catch(O_o=>{});
	message.channel.send(":octagonal_sign: This message is being displayed to warn active members to __**change the topic**__. The subject is upsetting or triggering one of your peers. If the behavior continues, the person who used this command may contact an administrator or use `>>report`.");
	let rUser = message.author.username;
	let Channel = message.channel.name;
	if (message.guild.id="491341671972208661"){
	client.channels.get("491355572298317844").send("In the **" + Channel + "** channel, **" + rUser + "** used `>>oceanbacon`.");
	}

   }

   if(command === "report") {
		 //reports incidents to me.
	let reason = args.join(' ');
	let rUser = message.author.username;
	let Server = message.guild.name;
	let Channel = message.channel.name;
	if(!reason) reason = "No reason provided";
	message.delete();
	await message.guild.owner.send("Dentz, I got a report from **" + rUser + "** in " + Server + ", in the " + Channel + " channel. Their reasoning was this: " + reason + "\n\nPlease look into this as soon as you can.");
	message.author.send ("Report sent. Please do not send multiple reports, it may overwhelm my boss.");

	client.channels.get("491355572298317844").send("Guys! I got a report from **" + rUser + "** in " + Server + ", in the " + Channel + " channel. Their reasoning was this: " + reason + "\n\nPlease look into this as soon as you can.");
	message.channel.startTyping()
   setTimeout(function(){
     message.author.send ("Thank you, " +rUser+ "! It shouldn't take too long if Dentz is online.");
     message.author.send ("So, what I sent Dentz is this. \n\n**Reason**:" + reason + "\n**Channel the incident occurred:** " + Channel + ".");
	}, 8000);
	message.channel.stopTyping();
   };

	 if(command === "blacklist") {
	 let reason = args.join(' ');
	 let rUser = message.author.username;
	 let Server = message.guild.name;
	 let Channel = message.channel.name;
	 if(!reason){
		 return message.channel.send("Usage: `>>blacklist THINGGOESHERE`\n`>>blacklist Oasis`");
	 }
	 message.delete();
	 client.channels.get("491355927820369931").send("**" + rUser + "**: " + reason);
	 return message.author.send("I sent a blacklist request for " + reason + " to " + Server + ".")
 }

    if(command === "gorillaz") {
			 var oword = [
   "Orange juice (2 cups)",
   "Oh shit that's a big whale",
   "oGay",
   "Oh Jamie?",
   "[REDACTED]",
]
		 var rword = [
   "Rrrrrubber cross",
   "Record",
   "rGay",
   "Russel best boy",
   "[REDACTED]",
]
		 var iword = [
   "I can't believe you did that Murdoc",
   "I had two cups of orange juice in my hands",
   "iGay",
   "I love Noodle",
   "I am Gay",
   "[REDACTED]",
]
		 var lword = [
   "lGay",
   "Let's go egg  Jamie's house",
   "Like 2D",
   "Lesbian",
   "Latin Simone",
   "Laptop that Damon left in the fucking taxi",
   "[REDACTED]",
]
		 var aword = [
   "A Peppermint Tea",
   "Aaaa it's Murdoc",
   "And then she started hitting me with her handbag",
   "AAAAAAAAAAAAAA",
   "aGay",
   "[REDACTED]",
]
		 var zword = [
   "Zelda, maybe",
   "Zylophone",
   "Zebra Katz, an amazing LGBT rapper",
   "zGay",
   "[REDACTED]",
]
var O = oword[Math.floor(Math.random() * oword.length)]
var R = rword[Math.floor(Math.random() * rword.length)]
var I = iword[Math.floor(Math.random() * iword.length)]
var L = lword[Math.floor(Math.random() * lword.length)]
var L2 = lword[Math.floor(Math.random() * lword.length)]
var A = aword[Math.floor(Math.random() * aword.length)]
var Z = zword[Math.floor(Math.random() * zword.length)]

	if (floodControl.has(message.author.id)) {
            message.channel.send("Alright, calm down a moment...");
    } else {
		   message.channel.send("The G in Gorillaz stands for Gay. \n```G- Gay\nO- " + O + "\nR- " + R + "\nI- " + I + "\nL- " + L + "\nL- " + L2 + "\nA- " + A + "\nZ- " + Z + "```")
        floodControl.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after 10 seconds
          floodControl.delete(message.author.id);
        }, 10000);
    }

   }


if (command === '478'){
	message.channel.send("Alright. I'm hearing you need to walk through the 4-7-8 breathing cycle. Correct? ```Reply 'Yes' or 'No'. I'll wait 6 seconds.```");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 6000 });
        collector.on('collect', message => {
            if (message.content == "Y" || message.content == "y" || message.content == "yes" || message.content == "Yes") {
                message.channel.send(":white_check_mark: **Got it.** I'm about to walk you through the **4-7-8 exercise**.");
                message.channel.send("The 4-7-8 exercise is a method of breathing to stop a panic attack. Ready? Let's begin.");
				 setTimeout(() => {
    message.channel.send(":arrow_up:`Start by inhaling slowly through the nose. Keep inhaling, slowly, until I tell you to hold it.`")
    setTimeout(() => {
        message.channel.send(":stop_button: `Hold it. You're going to feel your heart rate slowing down. Don't worry, that is natural.`")
		   setTimeout(() => {
			message.channel.send(":arrow_down: `Now, start to exhale through the mouth. Slowly. Keep going until I say to stop.`")
			setTimeout(() => {
				message.channel.send("```Alright, you may stop exhaling. Excellent. You made one breath through the 4-7-8 exercise. Please note that you need to do this multiple times to make it work. I'm proud of you. Keep going.```")

			}, 8000)
		}, 7000)
    }, 4000)
}, 2000)


            } else if (message.content == "N" || message.content == "n" || message.content == "No" || message.content == "no") {
                message.channel.send(":negative_squared_cross_mark: **Got it.** Sorry about that!");
		}})
}
	if(command === "commands") {

	message.channel.send({
  "embed": {
    "color": 3447003,
    "thumbnail": {
      "url": "https://78.media.tumblr.com/4e83304bb36dc5ba373c90269cb16cbd/tumblr_inline_p8gccrROwB1r52aqk_540.png"
    },

    "author": {
      "name": "CYBORG_STU-VER 666-ALPHA",
      "icon_url": "https://78.media.tumblr.com/b7b6e3dcdef493eea924e99310f60763/tumblr_inline_p8gccrjd6R1r52aqk_540.png"
    },
    "fields": [
      {
        "name": "Command",
        "value": ">>ping\n\n>say\n\n>>comfort\n\n>>stim\n\n>>478\n\n>>knock-knock\n\n>>helpline",
        "inline": true
      },
      {
        "name": "Description",
        "value": "Pings me to reply.\n\nMakes me say whatever you write.\n\nSends you a comforting message.\n\nSends you positive imagery.\n\nWalks you through a breathing exercise.\n\nSends you a knock knock joke.\n\nDMs you a global list of crisis numbers.",
        "inline": true
      },
      {
        "name": "--------------------------------",
        "value": "You can @ me to talk. I'm still learning, though.\nI'm also listening for signs of a crisis."
      }
    ]
  }
})

   }
	if(command === "fortune") {
			var phrases = [
		"In the eyes of lovers, everything is beautiful.",
		"Land is always on the mind of a flying bird.",
		"When fire and water go to war, water always wins.",
		"He who climbs a ladder must begin at the first step.",
		"You don't get harmony when everyone sings the same note.",
		"A pleasant surprise is waiting for you.",
		"You will overcome difficult times.",
		"Your life becomes more and more of an adventure!",
		"If you want the rainbow, then you have to tolerate the storm. :rainbow:",
		"Right now there's an energy pushing you in a new direction.",
		"Things are never quite the way they seem.",
		"You will plant the smallest seed and it will become the greatest and most mighty tree in the world.",
		"This is a good time to consider formally helping others.",
		"You will be a lion in your own cause.",
		"The best things in life aren't things.",
		"A smile is your passport into the hearts of others.",
		"Before trying to please others, think of what makes you happy.",
		"He who sharts the loudest gets the turd.",
		"A time will come when you must make a very important choice. Believe in yourself.",
		]
		var fortune = phrases[Math.floor(Math.random() * phrases.length)]
	var luckynumber = [Math.floor(Math.random() * 10)]
	var luckynumber2 = [Math.floor(Math.random() * 10)]
	var luckynumber3 = [Math.floor(Math.random() * 10)]
	var shock = shockphrase[Math.floor(Math.random() * shockphrase.length)]


	if (talkedRecently.has(message.author.id)) {
            message.reply("these cookies take a bit to make... " + shock + "! Looks like the next one should be done in about a minute!");
    } else {

           // the user can type the command ... your command code goes here :)
		   message.channel.send("`Opening your fortune...`\n\n" + "```" + fortune + "``` \n\nLucky number: " + luckynumber + ", " + luckynumber2 + ", " +luckynumber3 , {
			files: [ "images/fortune_cookie.png" ]
			});
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
    }
   }

	 if (command === "vent" || command==="rant"){
 		var answers =[
 		"I'm sorry this is happening. I love you.",
 		"Thank you for trusting me with this.",
 		"Get it all out. Deep breaths.",
 		"It sounds rough. You're strong, you know that?",
 		"I'm sorry about that, mate. x You're a tough cookie, I'll say.",
 		"Aww, mate. You're strong, I believe in you.",
 		"I wish I could follow like a human, but this will have to do. I believe in you to do the right thing.",
 		"You're wise, you know that, yeah? No matter what. Everything will pass. I think you'll know what's best.",
 		];
 		var reply = answers[Math.floor(Math.random() * answers.length)];
 		let reason = args.join(' ');
 		if (!reason){
 			return message.channel.send("What's up? Just type `>>vent` or `>>rant` and your entire vent. I can't respond intelligently but I can at least be a listening ear.");
 		}
 		//message.channel.send(":8ball: The magic 8 ball says: **" + reply + "**.");
		function typing() {
message.channel.send(reply);
message.channel.stopTyping();
}

message.channel.startTyping();
setTimeout(typing, (reply.length * 100));
 	}

   if (command==="nickname"){
	   let cnick = args[0]

	   if (!cnick){
		   return message.channel.send("...? (Type your name.)")
	   } else {
		   message.channel.send("Your name is " + cnick + ", right? ```Yes or No. I'll wait 6 seconds.```" )
		   const collectorn = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 6000 });
        collectorn.on('collect', message => {
            if (message.content == "Y" || message.content == "y" || message.content == "yes" || message.content == "Yes") {
				collectorn.stop()
									usernick[message.author.id] = {
								usernick: cnick
							}
						fs.writeFile("./names.json", JSON.stringify(usernick), (err) =>  {
						if(err) console.log(err)
						})

					  let uNick = usernick[message.author.id].usernick;
					  message.channel.send("Your name is " + uNick + "... Got it!\n\nI wrote it down so I won't forget! :pencil:")
			} else {
				collectorn.stop()
				return message.channel.send ("...Oh. Sorry.")
			}
	   });
   }
   }


if (command==="agree"){
	const guildMember = message.member;
if (message.member.roles.has('491374965065646083')){
	console.log("This is a zombie.");
		//guildMember.addRole('491349812092993539');
					if (message.channel.id==="491354647303553024"){
							console.log("They're in the right channel.");
							guildMember.addRole('491376361101983745');
							guildMember.removeRole('491374965065646083');
							let aUser = message.author.username;
							message.author.send("Hi, " + aUser + "! 💙 Welcome to **Point Nemo Studios**! I opened up the introductions channel for you to write out an intro. Just let them know your name and pronouns. Perhaps a blog or social media account so we know how to contact you should something happen. Looking forward to seeing you there!");

					} else { return; }
		} else {
			return;
		}
}

});


client.login(config.token);
