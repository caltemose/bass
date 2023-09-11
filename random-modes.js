const NOTES = [
    'A','A♭','B','C','D♭','D','E♭','E','F','G♭','G'
]
const MODES = [
    'Ionian',
    'Dorian',
    'Phrygian',
    'Lydian',
    'Mixolydian',
    'Aeolian',
    'Locrian'
]

const MODE_SEQUENCES = {
    'Ionian': [
        ['1','Major'],
        ['2','minor'],
        ['3','minor'],
        ['4','Major'],
        ['5','Dominant'],
        ['6','minor'],
        ['7','1/2 diminished']
    ],
    'Dorian': [
        ['1','minor'],
        ['2','1/2 diminished'],
        ['♭3','Major'],
        ['4','minor'],
        ['5','minor'],
        ['6','Major'],
        ['♭7','Dominant']
    ],
    'Phrygian': [
        ['1','minor'],
        ['♭2','Major'],
        ['♭3','Dominant'],
        ['4','minor'],
        ['5','1/2 diminished'],
        ['♭6','Major'],
        ['♭7','minor']
    ],
    'Lydian': [
        ['1','Major'],
        ['2','Dominant'],
        ['3','minor'],
        ['♯4','1/2 diminished'],
        ['5','Major'],
        ['6','minor'],
        ['7','minor']
    ],
    'Mixolydian': [
        ['1','Dominant'],
        ['2','minor'],
        ['3','1/2 diminished'],
        ['4','Major'],
        ['5','minor'],
        ['6','minor'],
        ['♭7','Major'],
    ],
    'Aeolian': [
        ['1','minor'],
        ['2','1/2 diminished'],
        ['♭3','Major'],
        ['4','minor'],
        ['5','minor'],
        ['♭6','Major'],
        ['♭7','Dominant'],
    ],
    'Locrian': [
        ['1','1/2 diminished'],
        ['♭2','Major'],
        ['♭3','minor'],
        ['4','minor'],
        ['♭5','Major'],
        ['♭6','Dominant'],
        ['♭7','minor'],
    ]
}

const SCALE_NOTES = {
    'Major': '1-3-5-7',
    'minor': '1-♭3-5-♭7',
    'Dominant': '1-3-5-♭7',
    '1/2 diminished': '1-♭3-♭5-♭7'
}

function getScaleNotes (scale) {
    return SCALE_NOTES[scale];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate () {
    const $noteEl = document.getElementById('note');
    const $modeEl = document.getElementById('mode');
    const $msgEl = document.getElementById('msg');
    const currentMode = getRandomInt(0, MODES.length -1);

    const note = NOTES[getRandomInt(0, NOTES.length -1)];
    const mode = MODES[currentMode];

    const modeClass = [1,2,5,6].includes(currentMode) ? "minor" : "major";
    document.getElementById('title').setAttribute('class', modeClass);
    
    $noteEl.innerHTML = note;
    $modeEl.innerHTML = mode;

    $msgEl.innerHTML = getSequences(currentMode);
}

function getSequences (mode) {
    const modeArr = MODE_SEQUENCES[MODES[mode]];
    var html = '';
    for(var i = 0; i<modeArr.length; i++) {
        const noteNumber = modeArr[i][0];
        const scale = modeArr[i][1];
        const numberClass = noteNumber.includes('♭') ? 'flat' : '';
        html += `<div class="sequence"><span class="number ${numberClass}">${noteNumber}</span>`;
        html += `<span class="mode ${scale}">${scale}</span>`;
        html += `<span class="notes ${modeArr[i][1]}">${getScaleNotes(modeArr[i][1])}</span>`;
        html += `</div>`;
    }
    return html;
}


window.onload = () => {
    document.getElementById('btn')
        .addEventListener('click', generate);
    generate();
}