const slider = document.getElementById('mySlider');
const valueDisplay = document.getElementById('n');
const container = document.getElementById('container'); // Make sure you have this in HTML

let n = slider.value;
const array = [];

slider.addEventListener('input', () => {
    n = parseInt(slider.value);
    valueDisplay.textContent = n;
    initialize();
});

// Call initialize on load to show bars immediately
initialize();

function initialize() {
    init();
}

let audioCtx = null;

function PlayNote1(freq) {
    if (!audioCtx) {
        audioCtx = new(AudioContext || webkitAudioContext)();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;

    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);

    osc.connect(node);
    node.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}

function init() {
    // Create a new array with exactly n elements
    array.length = n; // Trims or expands to exactly n
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showbar();
}

function play() {
    const copy = [...array];
    const moves = bubblesort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length === 0) {
        showbar();
        return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type === "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }

    PlayNote1(200 + array[i] * 500);
    PlayNote1(200 + array[j] * 500);

    showbar(move);
    setTimeout(() => animate(moves), 50);
}

function bubblesort(arr) {
    const moves = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < arr.length; i++) {
            moves.push({ indices: [i - 1, i], type: "comp" });
            if (arr[i - 1] > arr[i]) {
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                moves.push({ indices: [i - 1, i], type: "swap" });
                swapped = true;
            }
        }
    } while (swapped);
    return moves;
}

function showbar(move) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = (array[i] * 100) + "%";
        bar.classList.add("bar");

        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}