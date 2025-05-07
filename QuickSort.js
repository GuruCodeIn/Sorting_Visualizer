const slider2 = document.getElementById('mySlider2');
const valueDisplay2 = document.getElementById('num');
const quick = document.getElementById('quick');

let num = parseInt(slider2.value);
let array2 = [];

// Update bars on slider input
slider2.addEventListener('input', () => {
    num = parseInt(slider2.value);
    valueDisplay2.textContent = num;
    initialize2();
});

// Initialize on page load
initialize2();

function initialize2() {
    init2();
}

let audioCtx2 = null;

function PlayNote2(freq) {
    if (audioCtx2 == null) {
        audioCtx2 = new(AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext)();
    }
    const dur = 0.1;
    const osc = audioCtx2.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx2.currentTime + dur);

    const node = audioCtx2.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx2.currentTime + dur
    );
    osc.connect(node);
    node.connect(audioCtx2.destination);
}

function init2() {
    array2 = []; // Clear previous array to allow decreasing bars
    for (let i = 0; i < num; i++) {
        array2.push(Math.random());
    }
    showbar2();
}

function play2() {
    const copy = [...array2];
    const moves = quicksort(copy);
    animate2(moves);
}

function animate2(moves) {
    if (moves.length === 0) {
        showbar2();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type === "swap") {
        [array2[i], array2[j]] = [array2[j], array2[i]];
    }

    PlayNote2(200 + array2[i] * 500);
    PlayNote2(200 + array2[j] * 500);

    showbar2(move);
    setTimeout(() => {
        animate2(moves);
    }, 50);
}

function quicksort(arr, left = 0, right = arr.length - 1, moves = []) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right, moves);
        quicksort(arr, left, pivotIndex - 1, moves);
        quicksort(arr, pivotIndex + 1, right, moves);
    }
    return moves;
}

function partition(arr, left, right, moves) {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        moves.push({
            indices: [j, right],
            type: "comp"
        });
        if (arr[j] < pivot) {
            i++;
            moves.push({
                indices: [i, j],
                type: "swap"
            });
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    moves.push({
        indices: [i + 1, right],
        type: "swap"
    });
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}

function showbar2(move) {
    quick.innerHTML = "";
    for (let i = 0; i < array2.length; i++) {
        const bar2 = document.createElement("div");
        bar2.style.height = array2[i] * 100 + "%";
        bar2.classList.add("bar2");

        if (move && move.indices.includes(i)) {
            bar2.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }
        quick.appendChild(bar2);
    }
}
