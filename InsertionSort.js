const slider3 = document.getElementById('mySlider3');
const valueDisplay3 = document.getElementById('a');
const insertion = document.getElementById('insertion');

let a = parseInt(slider3.value);
let array3 = [];

// Update bars on slider input
slider3.addEventListener('input', () => {
    a = parseInt(slider3.value);
    valueDisplay3.textContent = a;
    initialize3();
});

// Initialize on page load
initialize3();

function initialize3() {
    init3();
}

let audioCtx3 = null;

function PlayNote1(freq) {
    if (audioCtx3 == null) {
        audioCtx3 = new(AudioContext ||
            webkiitAudioContext ||
            window.webkiitAudioContext)();
    }
    const dur = 0.1;
    const osc = audioCtx3.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx3.currentTime + dur);

    const node = audioCtx3.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx3.currentTime + dur
    );
    osc.connect(node);
    node.connect(audioCtx3.destination);
}

function init3() {
    array3 = []; // 
    for (let i = 0; i < a; i++) {
        array3.push(Math.random());
    }
    showbar3();
}

function play3() {
    const copy = [...array3];
    const moves = Insertionsort(copy);
    animate3(moves);
}

function animate3(moves) {
    if (moves.length == 0) {
        showbar3();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type == "swap") {
        [array3[i], array3[j]] = [array3[j], array3[i]];
    }

    PlayNote1(200 + array3[i] * 500);
    PlayNote1(200 + array3[j] * 500);

    showbar3(move);
    setTimeout(function() {
        animate3(moves);
    }, 50);
}

function Insertionsort(array3) {
    const moves = [];
    for (let i = 1; i < array3.length; i++) {
        let key = array3[i];
        let j = i - 1;
        while (j >= 0 && array3[j] > key) {
            moves.push({
                indices: [j, j + 1],
                type: "comp"
            });
            moves.push({
                indices: [j, j + 1],
                type: "swap"
            });
            array3[j + 1] = array3[j];
            j--;
        }
        array3[j + 1] = key;
    }
    return moves;
}

function showbar3(move) {
    insertion.innerHTML = ""; 
    for (let i = 0; i < array3.length; i++) {
        const bar3 = document.createElement("div");
        bar3.style.height = array3[i] * 100 + "%";
        bar3.classList.add("bar3");

        if (move && move.indices.includes(i)) {
            bar3.style.backgroundColor = move.type == "swap" ? "red" : "blue";
        }
        insertion.appendChild(bar3);
    }
}
