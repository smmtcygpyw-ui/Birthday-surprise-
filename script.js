// --- PASSCODE LOGIC ---
let enteredPass = "";
const correctPass = "0408";
const dots = document.querySelectorAll('.dot');
const errorMsg = document.getElementById('error-msg');
const passcodeCard = document.querySelector('#passcode-screen .card');
const audio = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicPlaying = false;

function pressKey(num) {
    if (enteredPass.length < 4) {
        enteredPass += num;
        updateDots();
    }
}

function clearPass() {
    enteredPass = "";
    updateDots();
    errorMsg.classList.add('hidden');
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < enteredPass.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function checkPass() {
    if (enteredPass === correctPass) {
        // Correct Password!
        startMusic();
        nextScreen('question-screen');
    } else {
        // Wrong Password!
        errorMsg.classList.remove('hidden');
        passcodeCard.classList.add('shake');
        
        // Remove shake class after animation ends so it can shake again
        setTimeout(() => {
            passcodeCard.classList.remove('shake');
            clearPass();
        }, 400);
    }
}

// --- SCREEN TRANSITION LOGIC ---
function nextScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });

    // Show the target screen
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    target.classList.add('active');
    
    // Scroll to top just in case
    window.scrollTo(0, 0);
}

function startAgain() {
    clearPass();
    nextScreen('passcode-screen');
}

// --- MUSIC LOGIC ---
function startMusic() {
    // Browsers require a user interaction before playing audio. 
    // Pressing 'Unlock' counts as an interaction!
    audio.play().then(() => {
        isMusicPlaying = true;
        musicToggle.classList.remove('hidden');
        musicToggle.innerText = "🎵 Pause";
    }).catch(err => {
        console.log("Audio autoplay was blocked by browser", err);
        // Show button anyway so they can manually play
        musicToggle.classList.remove('hidden');
        musicToggle.innerText = "🎵 Play";
    });
}

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        audio.pause();
        musicToggle.innerText = "🎵 Play";
    } else {
        audio.play();
        musicToggle.innerText = "🎵 Pause";
    }
    isMusicPlaying = !isMusicPlaying;
});
