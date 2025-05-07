const slider1 = document.getElementById('mySlider1');
const valueDisplay1 = document.getElementById('m');
const selection = document.getElementById('selection');

let m = parseInt(slider1.value);
let array1 = [];

slider1.addEventListener('input', () => {
    m = parseInt(slider1.value);
    valueDisplay1.textContent = m;
    initialize1(); // call init1 through initialize1
});

// Call initialize on page load
initialize1();

let audioCtx1 = null;

function PlayNote1(freq) {
    if (audioCtx1 == null) {
        audioCtx1 = new(AudioContext || webkitAudioContext)();
    }

    const dur = 0.1;
    const osc = audioCtx1.createOscillator();
    const node = audioCtx1.createGain();

    osc.frequency.value = freq;
    node.gain.value = 0.1;

    osc.connect(node);
    node.connect(audioCtx1.destination);

    osc.start();
    osc.stop(audioCtx1.currentTime + dur);

    node.gain.linearRampToValueAtTime(0, audioCtx1.currentTime + dur);
}

function initialize1() {
    init1(); 
}

function init1() {
    array1 = []; // Clear old array completely
    for (let i = 0; i < m; i++) {
        array1.push(Math.random());
    }
    showbar1();
}

function play1() {
    const copy = [...array1];
    const moves = selectionsort(copy);
    animate1(moves);
}

function animate1(moves) {
    if (moves.length === 0) {
        showbar1();
        return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type === "swap") {
        [array1[i], array1[j]] = [array1[j], array1[i]];
    }

    PlayNote1(200 + array1[i] * 500);
    PlayNote1(200 + array1[j] * 500);

    showbar1(move);
    setTimeout(() => animate1(moves), 50);
}

function selectionsort(arr) {
    const moves = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            moves.push({ indices: [minIndex, j], type: "comp" });
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            moves.push({ indices: [i, minIndex], type: "swap" });
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return moves;
}

function showbar1(move) {
    selection.innerHTML = ""; // Clear all previous bars
    for (let i = 0; i < array1.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array1[i] * 100 + "%";
        bar.classList.add("bar1");

        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }

        selection.appendChild(bar);
    }
}
