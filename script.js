
/*https://github.com/IseeJ
Please don't use my code without permission!*/


document.getElementById('start-button').addEventListener('click', function() {
const notifSound = document.getElementById('notifSound');
notifSound.play(); 
document.getElementById('start-page').style.display = 'none';
document.getElementById('phone-screen').style.display = 'flex';
});

let currentMessageIndex = 0;
const scores = { B: 0, S: 0, W: 0, G: 0, P: 0, D: 0, A: 0, R: 0};

const dialogue = [
    // 0 (0)
    {
        speaker: 'bot',
        text: ["*New notification from Unknown*"],
        choices: [
            { id:1, text: '*Open*', type: 'A', weight: 1, next: 2, followUpText: []},
            { id:2, text: '*Ignore it*', type: 'R',weight: 1, next: 1, followUpText: [] },
            { id:2, text: 'DEBUG', type: 'O',weight: 1, next: 20, followUpText: [] },
        ]
    },
    // 1
    {
        speaker: 'bot',
        text: ['*Are you sure? It could be important!*'],
        choices: [
            { id:1, text: 'FINE I\'ll open it', type: 'O', weight: 1, next: 2, followUpText: []},
        ]
    },
    // 2 (2)
    {
        speaker: 'bot',
        text: ['Hey hey hey! Happy Valentine\'s Day!'],
        choices: [
            { id:1, text: 'I think you got the wrong number', type: 'B',weight: 1, next: 3, followUpText: [] },
            { id:2, text: 'Thanks, but who r u?', type: 'S', weight: 1, next: 4 , followUpText: []},
            { id:3, text: '*don\'t reply, it could be a scam!*', type: 'W',weight: 1, next: 5, followUpText: []},
        ]
    },

    // 3 (2_1)
    {
        speaker: 'bot',
        text: ['Wrong number?! Pfftt that\'s not possible', 'You\'re the chosen one!', "Why else would you play this silly quiz on Valentine's Day? Hmm?"],
        choices: [
            { id:1, text: 'Chosen one?', type: 'G',weight: 1, next: 6, followUpText: [] },
            { id:2, text: 'lol idk what ur talking abt', type: 'P', weight: 1, next: 6 , followUpText: []},
            { id:3, text: 'Who are you?!', type: 'D',weight: 1, next: 6, followUpText: []}
        ]
    },
    // 4 (2_2)
    {
        speaker: 'bot',
        text: ['Me? I\'m no stranger! You know me!', 'Which is why you are the chosen one!',"Why else would you play this silly quiz on Valentine's Day? Hmm?"],
        choices: [
            { id:1, text: 'Chosen one?', type: 'G',weight: 1, next: 6, followUpText: [] },
            { id:2, text: 'lol idk what ur talking abt', type: 'P', weight: 1, next: 6 , followUpText: []},
            { id:3, text: 'No srly! Who are you?!', type: 'D',weight: 1, next: 6, followUpText: []}
        ]
    },
    // 5 (2_3)
    {
        speaker: 'bot',
        text: ["Cat got your tongue?", "Don\'t be shy. You are the chosen one!", "Why else would you play this silly quiz on Valentine's Day? Hmm?"],
        choices: [
            { id:1, text: 'Chosen one?', type: 'G',weight: 1, next: 6, followUpText: [] },
            { id:2, text: 'lol idk what ur talking abt', type: 'P', weight: 1, next: 6 , followUpText: []},
            { id:3, text: 'Who are you?!', type: 'D',weight: 1, next: 6, followUpText: []}
        ]
    },

    // 6 (3)
    {
        speaker: 'bot',
        text: ["Ok ok, I'll explain everything", "I'm your personal Cupid!", "Your love life is my job!!"],
        choices: [
            { id:1, text: "Oh really? Clearly you need to work harder", type: 'P',weight: 1,next: 7, followUpText: [] },
            { id:2, text: "Ok Cupid, what do you want?", type: 'G',weight: 1,next: 8, followUpText: [] },
            { id:3, text: "I thought this was just a personality quiz...", type: 'D',weight: 1,next: 8, followUpText: [] },
            
        ]
    },

    // 7 (4_1)
    {
        speaker: 'bot',
        text: ["Ouch! I'm trying my best here!","Anyways, let's get down to business","I'm here to ask you a few questions","To get to know you better!"],
        choices: [
            { id:1, text: "Fine, I'll do it", type: 'R',weight: 1,next: 9, followUpText: [] }, 
            { id:2, text: "Sounds fun, I'm down!", type: 'A',weight: 1,next: 9, followUpText: ["Hopefully this helps improve your Cupid performance!"] },
        ]
    },
    // 8 (4_2, 4_3)
    {
        speaker: 'bot',
        text: ["Straight to the point, I see","Indeed, I'm here to ask you a few questions","For research purposes, ofc"],
        choices: [
            { id:1, text: "Ok", type: 'R',weight: 1,next: 9, followUpText: [] }, 
            { id:2, text: "Sounds fun, I'm down!", type: 'A',weight: 1,next: 9, followUpText: [] },
        ]
    },

    
    // 9 (5)
    {
        speaker: 'bot',
        text: ["There will be 12 questions!","Ready?"],
        choices: [
            { id:1, text: "Alright, ask away!", type: 'O',weight: 0,next: 10, followUpText: [] },
            { id:2, text: "I was born ready!", type: 'O',weight: 0,next: 10, followUpText: [] },
            { id:3, text: "Let's gooo", type: 'O',weight: 0,next: 10, followUpText: [] },
        ]
    },

    // 10 (Q1)
    {
        speaker: 'bot',
        text: ["Let's start with the basics", "How do you define 'love'?"],
        choices: [
            { id:1, text: "a safe space, to be yourself and to simply be together", type: 'G',weight: 2,next: 11, followUpText: [] },
            { id:2, text: "an adventure, filled with fun and unforgettable memories", type: 'P',weight: 2,next: 11, followUpText: [] },
            { id:3, text: "a commitment, being there for each other no matter what", type: 'D',weight: 2,next: 11, followUpText: [] },
        ]
    },

    // 11 (Q2)
    {
        speaker: 'bot',
        text: ["Is that so? I bet you're quite romantic!", "Now you've got me curious about your past love experiences","What kind of people do you usually crush on?"],
        choices: [
            { id:1, text: "coworker / classmate", type: 'W',weight: 1,next: 12, followUpText: ["I mean, I see them everyday!"] },
            { id:2, text: "hard to say, it's often love at first sight", type: 'B',weight: 2,next: 12, followUpText: [] },
            { id:3, text: "Someone I've been close to for a while, like a best friend", type: 'S',weight: 2,next: 12, followUpText: [] },
            { id:4, text: "I've never really have a crush on anyone...", type: 'W',weight: 2,next: 12, followUpText: ["unless celebrity crushes count!"] },
            { id:5, text: "I don't have a type, I kinda t know it when I feel it", type: 'B', type2: 'S',weight: 1,next: 12, followUpText: [] },
        ]
    },


    // 12 (Q3)
    {
        speaker: 'bot',
        text: ["Hmm, that makes senses...","Say you have a crush right now, what's next?"],
        choices: [
            { id:1, text: "Tell them!", type: 'B',weight: 2,next: 14, followUpText: ["What's the worst that could happen?"] },
            { id:2, text: "Let things develop naturally", type: 'S',weight: 2,next: 14, followUpText: ["Consistency is the key!"] },
            { id:3, text: "Do absolutely NOTHING", type: 'W',weight: 2,next: 13, followUpText: ["I will never ever let them know..."] },
            { id:4, text: "Avoid them", type: 'W',weight: 1,next: 13, followUpText: ["I will run if I have to"] },
            { id:5, text: "Make subtle moves", type: 'B', type2: 'S',weight: 1,next: 14, followUpText: ["It won't hurt if I don't make it obvious!","*likes their ig story*"] },
        ]
    },
    // 13 (Q4_3,4)
    {
        speaker: 'bot',
        text: ["Playing it safe, huh?","Seems like you'll have time to plan ahead","What kind of dates excite you the most?"],
        choices: [
            { id:1, text: "Chill and relaxed, where we can just be ourselves", type: 'G',weight: 2, next: 15, followUpText: [] },
            { id:2, text: "Fun and spontaneous, a lot of cute moments!", type: 'P', weight: 2,next: 16, followUpText: [] },
            { id:3, text: "Sweet and intimate, cherishing each other’s company", type: 'D' ,weight: 2, next: 17, followUpText: [] },
        ]
    },
    // 14 (Q4_1,2,5)
    {
        speaker: 'bot',
        text: ["Aww, I love the spirit!!","Let's say it went well", "What kind of dates excite you the most?"],
        choices: [
            { id:1, text: "Chill and relaxed, where we can just be ourselves", type: 'G',weight: 2, next: 15, followUpText: [] },
            { id:2, text: "Fun and spontaneous, a lot of cute moments together!", type: 'P', weight: 2,next: 16, followUpText: [] },
            { id:3, text: "Sweet and intimate, cherishing each other’s company", type: 'D' ,weight: 2, next: 17, followUpText: [] },
        ]
    },

    // 15 (Q4_1C)
    {
        speaker: 'bot',
        text: ["Going for the comfortable vibes, I see","Any idea what might that date be?"],
        choices: [
            { id:1, text: "Bookstores - pick a book for each other!", type: 'R',weight: 2, next: 18, followUpText: [] },
            { id:2, text: "Gym - friendly sports challenge to strengthen our bond", type: 'A', weight: 2,next: 18, followUpText: ["Loser gets a hug. win-win!"] },
            { id:3, text: "Park - picnic date and some boat paddling", type: 'A' ,weight: 2, next: 18, followUpText: [] },
            { id:4, text: "Home - cooking our favorite dish", type: 'R',weight: 2,next: 18, followUpText: [] },
            { id:5, text: "Planetarium - traveling the universe while holding hands", type: 'A', type:'R' ,weight: 1, next: 18, followUpText: [] },
        ]
    },
    // 16 (Q4_2P)
    {
        speaker: 'bot',
        text: ["Exciting! you're up for some surprises, I see","Any idea what might that date be?"],
        choices: [
            { id:1, text: "Aquarium - exploring sea lives while holding hands", type: 'R',weight: 2, next: 18, followUpText: [] },
            { id:2, text: "Concert - singing our hearts out", type: 'A', weight: 2,next: 18, followUpText: [] },
            { id:3, text: "Art museum - peaceful stroll with beautiful backdrops", type: 'A', type:'R' ,weight: 1, next: 18, followUpText: [] },
            { id:4, text: "Amusement park - ferris wheel and roller coasters, yippieee", type: 'A' ,weight: 2, next: 18, followUpText: [] },
            { id:5, text: "My sofa - cuddling and watching movies", type: 'R',weight: 2,next: 18, followUpText: [] },
        ]
    },
    // 17 (Q4_2D)
    {
        speaker: 'bot',
        text: ["How romantic!","Any idea what might that date be?"],
        choices: [
            { id:1, text: "Fancy Diner - candle lit and wine...perfect!", type: 'R',weight: 2, next: 18, followUpText: [] },
            { id:2, text: "Bowling alley - game on!", type: 'A', weight: 2,next: 19, followUpText: ["Loser gets a hug. win-win!"] },
            { id:3, text: "Library - working/studying together", type: 'R',weight: 2,next: 18, followUpText: [] },
            { id:4, text: "Hiking trails - be one with the nature, together!", type: 'A' ,weight: 2, next: 18, followUpText: [] },
            { id:5, text: "Orchard - holding hands and apple picking", type: 'A', type:'R' ,weight: 1, next: 18, followUpText: [] },
        ]
    },
    // 18 (Q5)
    {
        speaker: 'bot',
        text: ["Cuuuute, don't forget to invite me!","enough about 'hypothetical' love life of yours","Let's get to know you more!"],
        choices: [
            { id:1, text: "lol I haven't left home in months", type: 'R',weight: 2, next: 19, followUpText: [] },
            { id:2, text: "I don't have anyone to go with!", type: 'A', weight: 2,next: 19, followUpText: [] },
            { id:3, text: "Oh it WILL. Lemme hit them up right now", type: 'A', weight: 2,next: 19, followUpText: [] },
        ]
    },
    // 19 (Q6)
    {
        speaker: 'bot',
        text: ["enough about 'hypothetical' love life of yours","Let's get to know you more!"],
        choices: [
            { id:1, text: "lol I haven't left home in months", type: 'R',weight: 2, next: 20, followUpText: [] },
            { id:2, text: "I don't have anyone to go with!", type: 'A', weight: 2,next: 20, followUpText: [] },
            { id:3, text: "Oh it WILL. Lemme hit them up right now", type: 'A', weight: 2,next: 20, followUpText: [] },
        ]
    },




    // 14 (Q4)
    /*{
        speaker: 'bot',
        text: ["How cute!"],
        choices: [
            { id:1, text: "C", type: 'C',weight: 2,next: 15, followUpText: [] },
            { id:2, text: "P", type: 'P',weight: 2,next: 15, followUpText: [] },
            { id:3, text: "D", type: 'D',weight: 2,next: 15, followUpText: [] },
        ]
    },
    // 15 (Q5)
    {
        speaker: 'bot',
        text: ["5"],
        choices: [
            { id:1, text: "S", type: 'S',weight: 2,next: 16, followUpText: [] },
            { id:2, text: "B", type: 'B',weight: 2,next: 16, followUpText: [] },
            { id:3, text: "W", type: 'W',weight: 2,next: 16, followUpText: [] },
        ]
    },
    // 16 (Q6)
    {
        speaker: 'bot',
        text: ["6"],
        choices: [
            { id:1, text: "R", type: 'R',weight: 2,next: 17, followUpText: [] },
            { id:2, text: "A", type: 'A',weight: 2,next: 17, followUpText: [] },
        ]
    },

    // 17 (Q7)
    {
        speaker: 'bot',
        text: ["4"],
        choices: [
            { id:1, text: "C", type: 'C',weight: 2,next: 18, followUpText: [] },
            { id:2, text: "P", type: 'P',weight: 2,next: 18, followUpText: [] },
            { id:3, text: "D", type: 'D',weight: 2,next: 18, followUpText: [] },
        ]
    },
    // 18 (Q8)
    {
        speaker: 'bot',
        text: ["7"],
        choices: [
            { id:1, text: "S", type: 'S',weight: 2,next: 19, followUpText: [] },
            { id:2, text: "B", type: 'B',weight: 2,next: 19, followUpText: [] },
            { id:3, text: "W", type: 'W',weight: 2,next: 19, followUpText: [] },
        ]
    },
    // 19 (Q9)
    {
        speaker: 'bot',
        text: ["6"],
        choices: [
            { id:1, text: "R", type: 'R',weight: 2,next: 20, followUpText: [] },
            { id:2, text: "A", type: 'A',weight: 2,next: 20, followUpText: [] },
        ]
    },


    // 20 (Q10)
    {
        speaker: 'bot',
        text: ["4"],
        choices: [
            { id:1, text: "C", type: 'C',weight: 2,next: 21, followUpText: [] },
            { id:2, text: "P", type: 'P',weight: 2,next: 21, followUpText: [] },
            { id:3, text: "D", type: 'D',weight: 2,next: 21, followUpText: [] },
        ]
    },
    // 21 (Q11)
    {
        speaker: 'bot',
        text: ["7"],
        choices: [
            { id:1, text: "S", type: 'S',weight: 2,next: 22, followUpText: [] },
            { id:2, text: "B", type: 'B',weight: 2,next: 22, followUpText: [] },
            { id:3, text: "W", type: 'W',weight: 2,next: 22, followUpText: [] },
        ]
    },
    // 22 (Q12)
    {
        speaker: 'bot',
        text: ["6"],
        choices: [
            { id:1, text: "R", type: 'R',weight: 2,next: 23, followUpText: [] },
            { id:2, text: "A", type: 'A',weight: 2,next: 23, followUpText: [] },
        ]
    },*/


    // 15 last
    {
        speaker: 'bot',
        text: ['Ready to see your result?'],
        choices: [
            { id:1, text: 'YES!', type: 'O', weight: 0,next: 100, followUpText: []},
        ]
    },

];


function addMessage(speaker, text, isLink = false, opt=false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', speaker);
    if (isLink) {
        const link = document.createElement('a');
        link.innerText = text;
        link.onclick = displayResult;
        messageElement.appendChild(link);
    } 
    else if (opt) {
        const link = document.createElement('a');
        link.innerText = text;
        link.href = "https://www.instagram.com/izonfalzo/?hl=en"; 
        link.target = "_blank"; 
        messageElement.appendChild(link);
    } 
    else {
        messageElement.textContent = text;
    }
    document.getElementById('chatbox').appendChild(messageElement);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
}

function showChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.classList.add('choice-button');
        choiceButton.textContent = choice.text;
        choiceButton.onclick = () => handleChoice(choice.type, choice.type2, choice.type3, choice.weight, choice.id, choice.next);
        choicesContainer.appendChild(choiceButton);
    });
}

let typingInterval;
let typingDots = 0;

function showTypingDots() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'typing...';
    document.getElementById('chatbox').appendChild(typingIndicator);
    typingIndicator.style.display = 'inline';

    typingDots = 0;

    typingInterval = setInterval(() => {
        typingIndicator.textContent = '.'.repeat(typingDots % 5);
        typingDots++;
    }, 250);
}

function stopTypingDots() {
    clearInterval(typingInterval);
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function displayResult() {
    let resultType = '';


    // B, S, or W
    let topBSW = [];
    if (scores.B >= scores.S && scores.B >= scores.W) topBSW.push('B');
    if (scores.S >= scores.B && scores.S >= scores.W) topBSW.push('S');
    if (scores.W >= scores.B && scores.W >= scores.S) topBSW.push('W');
    resultType += topBSW[Math.floor(Math.random() * topBSW.length)];

    // C, P, or D
    let topGPD = [];
    if (scores.G >= scores.P && scores.G >= scores.D) topGPD.push('G');
    if (scores.P >= scores.G && scores.P >= scores.D) topGPD.push('P');
    if (scores.D >= scores.G && scores.D >= scores.P) topGPD.push('D');
    resultType += topGPD[Math.floor(Math.random() * topGPD.length)];

    // A or R
    let topAR = [];
    if (scores.A >= scores.R) topAR.push('A');
    if (scores.R >= scores.A) topAR.push('R');
    resultType += topAR[Math.floor(Math.random() * topAR.length)];


    const resultsText = {
        'BGA': 'Raccoon',
        'BGR': 'Black Cat',
        'BDA': 'Doberman',
        'BDR': 'Lion',
        'BPA': 'Golden Retriever',
        'BPR': 'Red Fox',
        'SGA': 'Hamster',
        'SGR': 'Capybara',
        'SDA': 'Duck',
        'SDR': 'Sheep',
        'SPA': 'Orange Cat',
        'SPR': 'Chihuahua',
        'WGA': 'Bird',
        'WGR': 'Deer',
        'WDA': 'Snow Leopard',
        'WDR': 'Hedgehog',
        'WPA': 'Bunny',
        'WPR': 'Red Panda'}

const resultImages = {
    'BGA': '1.png',
    'BGR': '2.png',
    'BDA': '3.png',
    'BDR': '4.png',
    'BPA': '5.png',
    'BPR': '6.png',
    'SGA': '7.png',
    'SGR': '8.png',
    'SDA': '9.png',
    'SDR': '10.png',
    'SPA': '11.png',
    'SPR': '12.png',
    'WGA': '13.png',
    'WGR': '14.png',
    'WDA': '15.png',
    'WDR': '16.png',
    'WPA': '17.png',
    'WPR': '18.png',
};
    document.getElementById('result-text').textContent = resultType+' '+resultsText[resultType];
    /*document.getElementById('result-image').src = resultImages[resultType];
    document.getElementById('result-overlay').style.display = 'flex';*/
    document.getElementById("phone-screen").style.display = "none";
    document.getElementById("result-page").style.display = "flex";
    document.getElementById("result-image").src = "IMG/"+resultImages[resultType];
    document.getElementById("result-image").alt = resultType+resultsText[resultType];
}

/*function closeResult() {
    document.getElementById('result-overlay').style.display = 'none';
    setTimeout(() => {
        addMessage('bot', 'Would you like to play again?');
        showChoices([
            { text: 'Yes, let’s go!', type: 'restart' },
            { text: 'No, thanks.', type: 'exit' }
        ]);
    }, 500);
}*/

function handleChoice(type, type2, type3, weight, id, nextIndex) {
    const dingSound = document.getElementById('dingSound');
    dingSound.play(); 
    const chosenOption = dialogue[currentMessageIndex].choices.find(choice => choice.type === type && choice.id === id);
    scores[type]+=weight;
    scores[type2]+=weight;
    scores[type3]+=weight;



    updateDebugScores();
    currentMessageIndex = nextIndex;
    document.getElementById('choices').innerHTML = '';
    addMessage('user', chosenOption.text, false);

    if (chosenOption.followUpText && chosenOption.followUpText.length > 0) {
        chosenOption.followUpText.forEach((followUp, index) => {
            setTimeout(() => {
                addMessage('user', followUp);
        }, (index+1) * 1000);
        });
    }

    setTimeout(() => {
    showTypingDots(); 

    setTimeout(() => {
        stopTypingDots(); 
        const popSound = document.getElementById('popSound');
        popSound.play(); 
        if (currentMessageIndex >= 1) {
            const header = document.getElementById("header");
            header.textContent = 'Unknown'; 
            header.style.color = 'var(--6-color)';
            header.style.backgroundColor = 'var(--2-color)';
            const phoneScreen = document.getElementById("phone-screen"); 
            phoneScreen.style.backgroundColor = '#fff';  
        }

        if (currentMessageIndex >= 6) {
            const header = document.getElementById("header");
            header.textContent = 'Cupid'; 
            header.style.color = 'var(--6-color)';
        }
      
        if (currentMessageIndex < dialogue.length) {
            const currentDialogue = dialogue[currentMessageIndex];
            currentDialogue.text.forEach((text, index) => {
                setTimeout(() => {
                    addMessage(currentDialogue.speaker, text);
                }, index * 1000);
            });
            setTimeout(() => {
                showChoices(currentDialogue.choices);
            }, currentDialogue.text.length * 1000); 

        }
       else{
        triggerIconShower();
        displayResult();
       }

    }, 1500); 
}, (chosenOption.followUpText.length * 1000) + 500); 
}
//}


function restartQuiz() {
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "flex";
    currentMessageIndex = 0;
    scores.B = scores.S = scores.W = scores.G = scores.P = scores.D = scores.A = scores.R = 0;
    document.getElementById('chatbox').innerHTML = '';
    document.getElementById('choices').innerHTML = '';
    const header = document.getElementById("header");
    header.textContent = '02/14'; 
    header.style.color = '#fff';
    header.style.backgroundColor = 'rgb(22, 22, 22)';
    const phoneScreen = document.getElementById("phone-screen"); 
    phoneScreen.style.backgroundColor = 'rgb(22, 22, 22)';  
    startConversation();
}

function startConversation() {
addMessage('bot', dialogue[0].text);
showChoices(dialogue[0].choices);

}

function updateDebugScores() {
    const debugScoresElement = document.getElementById('debug-scores');
    const formattedScores = `
    ${currentMessageIndex}
B: ${scores.B}, S: ${scores.S}, W: ${scores.W},
G: ${scores.G}, P: ${scores.P}, D: ${scores.D}, 
A: ${scores.A}, R: ${scores.R}`;
    debugScoresElement.textContent = formattedScores.trim();
}




function share() {
    const link = window.location.href; 
    navigator.clipboard.writeText(link) 
      .then(() => {
        alert('Link copied to clipboard!'); 
      })
      .catch(err => {
        alert('Failed to copy the link: ' + err); 
      });
  }


  function triggerIconShower(event) {
    for (let i = 0; i < 15; i++) { 
      const icon = document.createElement('div');
      icon.classList.add('icon');
    
      const iconContent = Math.random() > 0.5 ? '♥': '★'; 
      icon.textContent = iconContent;

     
      if (iconContent === '♥') {
        icon.classList.add('heart');
      }
      else{
        icon.classList.add('star');
      }

     
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      icon.style.left = `${x}px`;
      icon.style.top = `${y}px`;

     
      document.body.appendChild(icon);

      
      setTimeout(() => {
        icon.remove();
      }, 3000); 
    }
  }

startConversation();




