
        
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
        text: ['*New notification from Unknown*'],
        choices: [
            { id:1, text: '*Open*', type: 'O', weight: 0, next: 1, followUpText: []},
            { id:2, text: '*Ignore it*', type: 'O',weight: 0, next: 0, followUpText: [] },
            { id:2, text: 'DEBUG', type: 'O',weight: 0, next: 6, followUpText: [] },
        ]
    },
    // 1 (1_1)
    {
        speaker: 'bot',
        text: ['OMG hey there'],
        choices: [
            { id:1, text: '<3', type: 'B',weight: 2, next: 2, followUpText: [] },
            { id:2, text: 'who r u?', type: 'C', weight: 1, next: 2 , followUpText: []},
            { id:3, text: '*a scam? again?*', type: 'W',weight: 1, next: 1, followUpText: []}
        ]
    },
    // 2 (1_2)
    {
        speaker: 'bot',
        text: ['Omg hey! Happy Valentine Day!', 'What are you up to?'],
        choices: [
            { id:1, text: 'Who are you?!!', type: 'R', weight: 1, next: 3 , followUpText: []},
            { id:2, text: 'Nothing much, just another day...', type: 'A',weight: 5, next: 3 , followUpText: []},
            { id:3, text: 'but im single tho...', type: 'R', weight: 1, next: 3 , followUpText: []},
            { id:4, text: 'A2', type: 'A',weight: 1,next: 3, followUpText: []}
        ]
    },
    // 3 (1_3)
    {
        speaker: 'bot',
        text: ['Me? I\'m your personal Cupid!', 'I just need to take a quick survey so that we can customize your love experience'],
        choices: [
            { id:1, text: '...', type: 'C',weight: 1,next: 4, followUpText: ['Seriously?'] },
            { id:2, text: 'Oh wow, you\'re Cupid?', type: 'P',weight: 4,next: 6 , followUpText: []},
            { id:3, text: '*Great, another scam...*', type: 'D',weight: 2,next: 4, followUpText: []}
        ]
    },
    // 4
    {
        speaker: 'bot',
        text: ['In a very unlikely case...','How do you deal with heartbreak?'],
        choices: [
            { id:1, text: 'Improve myself!', type: 'B',weight: 1,next: 5, followUpText: ['New beginning awaits!', 'I will stay healthy and take care of myself!']},
            { id:2, text: 'Drown in sad love songs', type: 'S',weight: 1,next: 5 , followUpText: ['And maybe binge watch some old romcoms, too', 'IT HELPS']},
            { id:3, text: 'Seek comfort from friends/family', type: 'W',weight: 1,next: 5 , followUpText: ['they remind me the perks of being single', 'and offer shoulders to cry on ;;;']},
            { id:4, text: '(try to) Move on', type: 'S',weight: 1,next: 5, followUpText: ['It gets better with time...']},
            { id:5, text: 'I step out before I could get hurt', type: 'W',weight: 1,next: 5, followUpText: ['so I guess I’ve never really had my heart broken']},
        ]
    },
    // 5
    {
        speaker: 'bot',
        text: ['You got your cupid right here!','That won\'t happen, just curious!'],
        choices: [
            { id:1, text: 'Improve myself!', type: 'B',weight: 1,next: 6, followUpText: ['New beginning awaits!', 'I will stay healthy and take care of myself!']},
            { id:2, text: 'Drown in sad love songs', type: 'S',weight: 1,next: 6 , followUpText: ['And maybe binge watch some old romcoms, too', 'IT HELPS']},
            { id:3, text: 'Seek comfort from friends/family', type: 'W',weight: 1,next: 6 , followUpText: ['they remind me the perks of being single', 'and offer shoulders to cry on ;;;']},
            { id:4, text: '(try to) Move on', type: 'S',weight: 1,next: 6, followUpText: ['It gets better with time...']},
            { id:5, text: 'I step out before I could get hurt', type: 'W',weight: 1,next: 6, followUpText: ['so I guess I’ve never really had my heart broken']},
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
        choiceButton.onclick = () => handleChoice(choice.type, choice.weight, choice.id, choice.next);
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
    }, 400);
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
'BCA': 'You are bold, calm, and active! Full of energy and strength.',
'BPA': 'You are bold, playful, and active! Always ready for fun and action.',
'BDA': 'You are bold, devoted, and active! You put your heart into everything you do.',
'BCR': 'You are bold, calm, and relaxed! Strong yet serene, you know how to take it easy.',
'BPR': 'You are bold, playful, and relaxed! You’re the perfect mix of energy and chill.',
'BDR': 'You are bold, devoted, and relaxed! You’ve got a calm and steady approach to life.',
'SCA': 'You are steady, calm, and active! You move forward with a peaceful energy.',
'SPA': 'You are steady, playful, and active! A balanced person with a fun-loving attitude.',
'SDA': 'You are steady, devoted, and active! Your commitment to goals keeps you going strong.',
'SCR': 'You are steady, calm, and relaxed! You know how to stay grounded and composed.',
'SPR': 'You are steady, playful, and relaxed! You balance work and relaxation perfectly.',
'SDR': 'You are steady, devoted, and relaxed! You’re calm but still deeply dedicated to your passions.',
'WCA': 'You are wary, calm, and active! You approach life with caution but keep the energy high.',
'WPA': 'You are wary, playful, and active! You enjoy life’s fun but always keep your guard up.',
'WDA': 'You are wary, devoted, and active! A cautious and dedicated soul who stays on track.',
'WCR': 'You are wary, calm, and relaxed! You observe and analyze, finding peace in caution.',
'WPR': 'You are wary, playful, and relaxed! A mix of playfulness with a careful, laid-back vibe.',
'WDR': 'You are wary, devoted, and relaxed! Devoted, but you always take your time before jumping in.'
};

const resultImages = {
'BCA': 'GD.png',
'BPA': 'GD.png',
'BDA': '3.png',
'BCR': 'GD.png',
'BPR': '5.png',
'BDR': '6.png',
'SCA': '7.png',
'SPA': '8.png',
'SDA': '9.png',
'SCR': '10.png',
'SPR': '11.png',
'SDR': '12.png',
'WCA': '13.png',
'WPA': '14.png',
'WDA': '15.png',
'WCR': '16.png',
'WPR': '17.png',
'WDR': '18.png'
};
    /*document.getElementById('result-text').textContent = resultType+resultsText[resultType];
    document.getElementById('result-image').src = resultImages[resultType];
    document.getElementById('result-overlay').style.display = 'flex';*/
    document.getElementById("phone-screen").style.display = "none";
    document.getElementById("result-page").style.display = "flex";
    document.getElementById("result-image").src = resultImages[resultType];
    document.getElementById("result-text").innerText = resultType+resultsText[resultType];
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

function handleChoice(type, weight, id, nextIndex) {
    const dingSound = document.getElementById('dingSound');
    dingSound.play(); 
    if (type === 'restart') {
        restartQuiz();
    } else if (type === 'exit') {
        addMessage('bot', 'Okay, maybe next time :3');
        setTimeout(() => {
        addMessage('bot', 'Thanks for playing!');
        setTimeout(() => {
        addMessage('bot', 'Feel free to give Feedback Here', false, true);
        setTimeout(() => {}, 1000); 
            }, 1000); 
        }, 1000); 

document.getElementById('choices').innerHTML = ''; 
} else {
const chosenOption = dialogue[currentMessageIndex].choices.find(choice => choice.type === type && choice.id === id);
scores[type]+=weight;
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
            header.style.backgroundColor = 'var(--2-color)';
            const phoneScreen = document.getElementById("phone-screen"); 
            phoneScreen.style.backgroundColor = '#fff';  
        }

        if (currentMessageIndex >= 3) {
            const header = document.getElementById("header");
            header.textContent = 'Cupid'; 
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

        } else {
            setTimeout(() => {
                addMessage('bot', 'Amazing! I think I got what I needed');
                setTimeout(() => {
                    addMessage('bot', 'View attachment', true);
                    setTimeout(() => {}, 1000); 
                }, 1000); 
            }, 1000);
        }
    }, 1500); 
}, (chosenOption.followUpText.length * 1000) + 500); 
}
}


function restartQuiz() {
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "flex";
    currentMessageIndex = 0;
    scores.B = scores.S = scores.W = scores.C = scores.P = scores.D = scores.A = scores.R = 0;
    document.getElementById('chatbox').innerHTML = '';
    document.getElementById('choices').innerHTML = '';
    const header = document.getElementById("header");
    header.textContent = ''; 
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
startConversation();
