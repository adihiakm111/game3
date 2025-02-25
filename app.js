let c = document.getElementById("c");
let b = document.getElementById("b");
let e = document.getElementById("e");
let dw = document.getElementById("dw");
let lb = document.getElementById("lb");
let f = document.getElementById("f");
let g = document.getElementById("g");
let col = document.getElementById("color");
let colorButton = document.querySelector("button"); // Color change button
let zz = document.getElementById("zzz")

let isdrw = false;
let ofsetx, ofsety;
dw.offsetLeft = 0;

function mm() {
    let marginC = parseFloat(window.getComputedStyle(c).marginLeft) || 0;
    let marginB = parseFloat(window.getComputedStyle(b).marginLeft) || 0;
    let difference = marginC - marginB;

    if ((difference >= -50) && (difference <= 50)) {
        console.log("match");
        up(true);
    } else {
        console.log("mis-match");
        up(false);
    }
}

function up(isMatch) {
    let currentHeight = parseFloat(window.getComputedStyle(e).height) || 0;
    
    if (isMatch) {
        e.style.height = (currentHeight + 20) + "px";
    } else {
        e.style.height = (currentHeight - 40) + "px";
    }
    
    if (e.offsetHeight >= 400) {
        e.style.height = "0px";
        f.innerText = parseInt(f.innerText || 0) + 25;
    }
    
    updateLevel();
}

function updateLevel() {
    let height = e.offsetHeight;
    let level = height / 40;
    
    if (level >= 1 && level <= 10) {
        e.innerText = `lv=${level}`;
    } else {
        e.innerText = "lv=0";
    }
}

dw.addEventListener("mousedown", (e) => {
    if (parseInt(lb.innerText) > 0) {
        isdrw = true;
        ofsetx = e.clientX - dw.offsetLeft;
        dw.style.cursor = "move";
    }
});

dw.addEventListener("mousemove", (e) => {
    if (isdrw) {
        dw.style.left = (e.clientX - ofsetx) + "px";
        lb.innerText = dw.offsetLeft;
    }
});

dw.addEventListener("mouseup", () => {
    isdrw = false;
    dw.style.cursor = "move";
});

dw.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

updateLevel();

let colors = ["red", "yellow", "green"];

function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    g.style.backgroundColor = colors[randomIndex];
    
    let betAmount = parseInt(lb.innerText) || 0;
    let currentScore = parseInt(f.innerText) || 0;
    
    if (g.style.backgroundColor === col.value) {
        f.innerText = currentScore + betAmount;
        alert("win");
    } else {
        f.innerText = currentScore - betAmount;
        alert("lose");
    }

    updateButtonState();
}

// **Button Enable/Disable Logic**
function updateButtonState() {
    let currentScore = parseInt(f.innerText) || 0;
    colorButton.disabled = currentScore < 0; 
}

// **Ensure button updates on page load**
updateButtonState();
window.addEventListener("DOMContentLoaded", () => {
    const bgMusic = new Audio("8-bit-background-music-for-arcade-game-come-on-mario-164702.mp3"); // Replace with your audio file
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "e") {
            if (bgMusic.paused) {
                bgMusic.play();
                console.log("🎵 Music Enabled");
            }
        } else if (event.key.toLowerCase() === "d") {
            if (!bgMusic.paused) {
                bgMusic.pause();
                console.log("🔇 Music Disabled");
            }
        }
    });
});
