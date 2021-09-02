let keys = {}
let keyMap = {
    "KeyA":  0,
    "KeyS":  1,
    "KeyD":  2,
    "KeyF":  3,
    "KeyG":  4,
    "KeyH":  5,
    "KeyJ":  6,
    "KeyW":  7,
    "KeyE":  8,
    "KeyT":  9,
    "KeyY": 10,
    "KeyU": 11,
}
let audioMap = [
    "white_keys/A.mp3",
    "white_keys/S.mp3",
    "white_keys/D.mp3",
    "white_keys/F.mp3",
    "white_keys/G.mp3",
    "white_keys/H.mp3",
    "white_keys/J.mp3",
    "black_keys/W.mp3",
    "black_keys/E.mp3",
    "black_keys/T.mp3",
    "black_keys/Y.mp3",
    "black_keys/U.mp3",
]
let buttonList = []
let delayTimeouts = {}
let audios = {}

function keyToAudio(key) {
    let mapped = keyMap[key];
    if (typeof (mapped) !== "number") {
        return;
    }
    return audioMap[mapped];
}

function setButton(key, active = true, delay = 0) {
    let mapped = keyMap[key];
    if (typeof (mapped) !== "number") {
        return;
    }
    let button = buttonList[mapped];
    if (!button) {
        throw new Error();
    }
    if (delayTimeouts[key]) {
        clearTimeout(delayTimeouts[key]);
    }
    delayTimeouts[key] = setTimeout(() => {
        active ? button.classList.add("active") : button.classList.remove("active");
        delayTimeouts[key] = null;
    }, delay)
    return true;
}

function play(key) {
    if (keys[key] != null) {
        return;
    }
    let audio = new Audio(keyToAudio(key));
    audio.play()
    audios[key] = audio;
}
function stop(key) {
    let audio = audios[key]
    if (audio && audio.pause) {
        audio.pause();
    }
}

function addNoteEl(el) {
    let index = buttonList.length
    buttonList.push(el);
    el.addEventListener("mousedown", () => {
        let audio = new Audio(audioMap[index]);
        audio.play()
    })
}
document.querySelectorAll(".white-keys kbd").forEach(addNoteEl);
document.querySelectorAll(".black-keys kbd").forEach(addNoteEl);

document.addEventListener("keypress", ev => {
    if (setButton(ev.code, true)) {
        play(ev.code);
    }
    keys[ev.code] = true;
})
document.addEventListener("keyup", ev => {
    keys[ev.code] = null;
    setButton(ev.code, false, 100);
    // stop(ev.code);
})