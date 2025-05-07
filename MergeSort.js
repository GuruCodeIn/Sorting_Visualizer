const slider4 = document.getElementById('mySlider4');
const valueDisplay4 = document.getElementById('a1');
const merge = document.getElementById('merge');

let a1 = parseInt(slider4.value);
let array5 = [];

// Update bars on slider input
slider4.addEventListener('input', () => {
    a1 = parseInt(slider4.value);
    valueDisplay4.textContent = a1;
    initialize4(); // Reinitialize when the slider value changes
});

// Initialize on page load
initialize4();

function initialize4() {
    array5 = []; // Clear the array before initializing again
    init4();
}

let audioCtx5 = null;

function PlayNote1(freq) {
    if (!audioCtx5) {
        audioCtx5 = new(AudioContext || webkitAudioContext)();
    }

    const osc = audioCtx5.createOscillator();
    const gainNode = audioCtx5.createGain();

    // Optional: Add a second oscillator for a richer tone
    const osc2 = audioCtx5.createOscillator();
    osc2.frequency.value = freq * 1.5;
    osc2.type = "triangle";

    osc.frequency.value = freq;
    osc.type = "sine"; // Try 'square' or 'triangle' for different feel

    const currentTime = audioCtx5.currentTime;
    const duration = 0.15;

    gainNode.gain.setValueAtTime(0.2, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);

    osc.connect(gainNode);
    osc2.connect(gainNode); // richer tone
    gainNode.connect(audioCtx5.destination);

    osc.start(currentTime);
    osc.stop(currentTime + duration);

    osc2.start(currentTime);
    osc2.stop(currentTime + duration);
}

function init4() {
    for (let i = 0; i < a1; i++) {
        array5[i] = Math.random();
    }
    showbar5(); // Call showbar to display the initial bars
}

function play4() {
    const copy = [...array5];
    const { moves } = mergeSort(copy);
    animate5(moves);
}

function animate5(moves) {
    if (moves.length === 0) {
        showbar5();
        return;
    }

    const move = moves.shift();

    if (move.type === "comp") {
        showbar5(move);
    } else if (move.type === "swap") {
        const i = move.indices[0];
        array5[i] = move.value;
        PlayNote1(200 + array5[i] * 500);
        showbar5(move);
    }

    setTimeout(() => animate5(moves), 80);
}

function mergeSort(array) {
    const moves = [];

    function merge(start, mid, end, arr, temp) {
        let i = start;
        let j = mid + 1;
        let k = start;

        while (i <= mid && j <= end) {
            moves.push({ indices: [i, j], type: "comp" });

            if (arr[i] <= arr[j]) {
                temp[k] = arr[i];
                moves.push({ indices: [k], type: "swap", value: arr[i] });
                i++;
            } else {
                temp[k] = arr[j];
                moves.push({ indices: [k], type: "swap", value: arr[j] });
                j++;
            }
            k++;
        }

        while (i <= mid) {
            temp[k] = arr[i];
            moves.push({ indices: [k], type: "swap", value: arr[i] });
            i++;
            k++;
        }

        while (j <= end) {
            temp[k] = arr[j];
            moves.push({ indices: [k], type: "swap", value: arr[j] });
            j++;
            k++;
        }

        for (let l = start; l <= end; l++) {
            arr[l] = temp[l];
        }
    }

    function mergeSortHelper(arr, temp, start, end) {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        mergeSortHelper(arr, temp, start, mid);
        mergeSortHelper(arr, temp, mid + 1, end);
        merge(start, mid, end, arr, temp);
    }

    const temp = [...array];
    mergeSortHelper(array, temp, 0, array.length - 1);
    return { moves };
}

function showbar5(move) {
    merge.innerHTML = ""; // Clear existing bars
    for (let i = 0; i < array5.length; i++) {
        const bar4 = document.createElement("div");
        bar4.style.height = array5[i] * 100 + "%";
        bar4.classList.add("bar4");

        // Highlight the moving bars
        if (move && move.indices.includes(i)) {
            bar4.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }

        merge.appendChild(bar4);
    }
}