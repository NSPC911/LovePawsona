
/*https://github.com/IseeJ
Please don't use my code without permission!*/


document.getElementById('start-button').addEventListener('click', function() {
const notifSound = document.getElementById('notifSound');
notifSound.play(); 
document.getElementById('start-page').style.display = 'none';
document.getElementById('phone-screen').style.display = 'flex';
});

let currentMessageIndex = 0;
const scores = { B: 0, S: 0, W: 0, C: 0, P: 0, D: 0, A: 0, R: 0};

const dialogue = [
    // 0 (0)
    {
        speaker: 'bot',
        text: ["*New notification from Unknown*"],
        choices: [
            { id:1, text: '*Open*', type: 'A', weight: 1, next: 2, followUpText: []},
            { id:2, text: '*Ignore it*', type: 'R',weight: 1, next: 1, followUpText: [] },
            { id:2, text: 'DEBUG', type: 'O',weight: 1, next: 30, followUpText: [] },
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
            { id:1, text: 'Chosen one?', type: 'C',weight: 1, next: 6, followUpText: [] },
            { id:2, text: 'lol idk what ur talking abt', type: 'P', weight: 1, next: 6 , followUpText: []},
            { id:3, text: 'Who are you?!', type: 'D',weight: 1, next: 6, followUpText: []}
        ]
    },
    // 4 (2_2)
    {
        speaker: 'bot',
        text: ['Me? I\'m no stranger! You know me!', 'Which is why you are the chosen one!',"Why else would you play this silly quiz on Valentine's Day? Hmm?"],
        choices: [
            { id:1, text: 'Chosen one?', type: 'C',weight: 1, next: 6, followUpText: [] },
            { id:2, text: 'lol idk what ur talking abt', type: 'P', weight: 1, next: 6 , followUpText: []},
            { id:3, text: 'No srly! Who are you?!', type: 'D',weight: 1, next: 6, followUpText: []}
        ]
    },
    // 5 (2_3)
    {
        speaker: 'bot',
        text: ["Cat got your tongue?", "Don\'t be shy. You are the chosen one!", "Why else would you play this silly quiz on Valentine's Day? Hmm?"],
        choices: [
            { id:1, text: 'Chosen one?', type: 'C',weight: 1, next: 6, followUpText: [] },
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
            { id:2, text: "Ok Cupid, what do you want?", type: 'C',weight: 1,next: 8, followUpText: [] },
            { id:3, text: "I thought this was just a personality quiz...", type: 'D',weight: 1,next: 8, followUpText: [] },
            
        ]
    },

    // 7 (4_1)
    {
        speaker: 'bot',
        text: ["Ouch! I'm trying my best here!","Anyways, let's get down to business","I'm here to ask you a few questions","To get to know you better!"],
        choices: [
            { id:1, text: "Uh huh", type: 'R',weight: 1,next: 9, followUpText: [] }, 
            { id:2, text: "Sounds fun, I'm down!", type: 'A',weight: 1,next: 9, followUpText: [] },
        ]
    },
    // 8 (4_2, 4_3)
    {
        speaker: 'bot',
        text: ["Straight to the point, I see","I'm here to ask you a few questions","To get to know you better!"],
        choices: [
            { id:1, text: "Uh huh", type: 'R',weight: 1,next: 9, followUpText: [] }, 
            { id:2, text: "Sounds fun, I'm down!", type: 'A',weight: 1,next: 9, followUpText: [] },
        ]
    },

    
    // 9 (5)
    {
        speaker: 'bot',
        text: ["There will be 12 questions!","Ready?"],
        choices: [
            { id:1, text: "Ok, ask away!", type: 'O',weight: 0,next: 10, followUpText: [] },
            { id:2, text: "I was born ready!", type: 'O',weight: 0,next: 10, followUpText: [] },
            { id:3, text: "Let's gooo", type: 'O',weight: 0,next: 10, followUpText: [] },
        ]
    },

    // 10
    {
        speaker: 'bot',
        text: ["There will be 12 questions!","Ready?"],
        choices: [
            { id:1, text: "Ok, ask away!", type: 'O',weight: 0,next: 11, followUpText: [] },
            { id:2, text: "I was born ready!", type: 'O',weight: 0,next: 11, followUpText: [] },
            { id:3, text: "Let's gooo", type: 'O',weight: 0,next: 11, followUpText: [] },
        ]
    },

    // 10 last
    {
        speaker: 'bot',
        text: ['Ready to see your result?'],
        choices: [
            { id:1, text: 'YES!', type: 'O',weight: 1,next: 30, followUpText: []},
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
    let topCPD = [];
    if (scores.C >= scores.P && scores.C >= scores.D) topCPD.push('C');
    if (scores.P >= scores.C && scores.P >= scores.D) topCPD.push('P');
    if (scores.D >= scores.C && scores.D >= scores.P) topCPD.push('D');
    resultType += topCPD[Math.floor(Math.random() * topCPD.length)];

    // A or R
    let topAR = [];
    if (scores.A >= scores.R) topAR.push('A');
    if (scores.R >= scores.A) topAR.push('R');
    resultType += topAR[Math.floor(Math.random() * topAR.length)];


    const resultsText = {
'BCA': 'Raccoon',
'BPA': 'Golden Retriever',
'BDA': 'Doberman',
'BCR': 'Black Cat',
'BPR': 'Chihuahua',
'BDR': 'Lion',
'SCA': 'Hamster',
'SPA': 'Orange Cat',
'SDA': 'Duck',
'SCR': 'Capybara',
'SPR': 'Red Fox',
'SDR': 'Sheep',
'WCA': 'Dove',
'WPA': 'Hedgehog',
'WDA': 'Snow Leopard',
'WCR': 'Red Panda',
'WPR': 'Bunny',
'WDR': 'Calico Cat'}

const resultImages = {
'BCA': 'GD.png',
'BPA': 'GD.png',
'BDA': 'GD.png',
'BCR': 'GD.png',
'BPR': 'GD.png',
'BDR': 'GD.png',
'SCA': 'GD.png',
'SPA': 'GD.png',
'SDA': 'GD.png',
'SCR': 'GD.png',
'SPR': 'GD.png',
'SDR': 'GD.png',
'WCA': 'GD.png',
'WPA': 'GD.png',
'WDA': 'GD.png',
'WCR': 'GD.png',
'WPR': 'GD.png',
'WDR': 'GD.png'
};
    document.getElementById('result-text').textContent = resultType+' '+resultsText[resultType];
    /*document.getElementById('result-image').src = resultImages[resultType];
    document.getElementById('result-overlay').style.display = 'flex';*/
    document.getElementById("phone-screen").style.display = "none";
    document.getElementById("result-page").style.display = "flex";
    document.getElementById("result-image").src = resultImages[resultType];
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
    scores.B = scores.S = scores.W = scores.C = scores.P = scores.D = scores.A = scores.R = 0;
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
C: ${scores.C}, P: ${scores.P}, D: ${scores.D}, 
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




