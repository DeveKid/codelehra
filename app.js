/**
 * CodeLehra - High-Performance Web Audio Synthesizer & Visualizer
 * Highly optimized for classical Hindustani Tabla Practice with Legato Melodies.
 */

// --- DATA STRUCTURES & CONFIG ---

const TAALS = {
    teental: {
        id: "teental",
        name: "Teental",
        beats: 16,
        vibhags: [4, 4, 4, 4],
        symbols: ["X", "", "", "", "2", "", "", "", "0", "", "", "", "3", "", "", ""],
        bols: ["Dha", "Dhin", "Dhin", "Dha", "Dha", "Dhin", "Dhin", "Dha", "Dha", "Tin", "Tin", "Ta", "Ta", "Dhin", "Dhin", "Dha"],
        description: "16 beats cycle divided into 4 equal vibhags (4+4+4+4). The classic benchmark for solo tabla practice."
    },
    ektaal: {
        id: "ektaal",
        name: "Ektaal",
        beats: 12,
        vibhags: [2, 2, 2, 2, 2, 2],
        symbols: ["X", "", "0", "", "2", "", "0", "", "3", "", "4", ""],
        bols: ["Dhin", "Dhin", "Dhage", "Tirikit", "Tu", "Na", "Kat", "Ta", "Dhage", "Tirikit", "Dhi", "Na"],
        description: "12 beats cycle divided as 2+2+2+2+2+2. Known for its challenging syncopations."
    },
    jhaptal: {
        id: "jhaptal",
        name: "Jhaptal",
        beats: 10,
        vibhags: [2, 3, 2, 3],
        symbols: ["X", "", "2", "", "", "0", "", "3", "", ""],
        bols: ["Dhi", "Na", "Dhi", "Dhi", "Na", "Ti", "Na", "Dhi", "Dhi", "Na"],
        description: "10 beats cycle divided as 2+3+2+3. An expressive, asymmetrical scale."
    },
    keharwa: {
        id: "keharwa",
        name: "Keharwa",
        beats: 8,
        vibhags: [4, 4],
        symbols: ["X", "", "", "", "0", "", "", ""],
        bols: ["Dha", "Ge", "Na", "Ti", "Na", "Ka", "Dhi", "Na"],
        description: "8 beats cycle divided as 4+4. The pulse of light classical and popular rhythms."
    },
    rupak: {
        id: "rupak",
        name: "Rupak",
        beats: 7,
        vibhags: [3, 2, 2],
        symbols: ["0", "", "", "2", "", "3", ""],
        bols: ["Tin", "Tin", "Na", "Dhi", "Na", "Dhi", "Na"],
        description: "7 beats cycle divided as 3+2+2. Begins on Khali (0) rather than the heavy Sam (X)."
    },
    dadra: {
        id: "dadra",
        name: "Dadra",
        beats: 6,
        vibhags: [3, 3],
        symbols: ["X", "", "", "0", "", ""],
        bols: ["Dha", "Ge", "Na", "Dha", "Tin", "Na"],
        description: "6 beats cycle divided as 3+3. A lively, bouncing light classical rhythm."
    }
};

// Melodies defined by semitone offsets from Sa (0 = Sa, 12 = High Sa, etc.)
// Uses 'null' for legato holds, creating flowing, supportive melodic phrases (not staccato metronomes)
const MELODIES = {
    // Teental (16 Beats)
    teental: {
        yaman: [4, null, 2, 0, -1, null, 2, null, 4, null, 6, null, 7, null, 9, 11],     // G (2), R (1), S (1), N. (2), R (2), G (2), M# (2), P (2), D (1), N (1)
        bhairavi: [3, null, 1, 0, -2, null, 1, null, 3, null, 5, null, 7, null, 8, 10],  // g (2), r (1), S (1), n. (2), r (2), g (2), M (2), P (2), d (1), n (1)
        bhupali: [4, null, 2, 0, -3, null, 2, null, 4, null, 4, null, 7, null, 9, 12],   // G (2), R (1), S (1), D. (2), R (2), G (2), G (2), P (2), D (1), S' (1)
        kafi: [3, null, 2, 0, -2, null, 2, null, 3, null, 5, null, 7, null, 9, 10],      // g (2), R (1), S (1), n. (2), R (2), g (2), M (2), P (2), D (1), n (1)
        bilawal: [4, null, 2, 0, -1, null, 2, null, 4, null, 5, null, 7, null, 9, 11]    // G (2), R (1), S (1), N. (2), R (2), G (2), M (2), P (2), D (1), N (1)
    },
    // Ektaal (12 Beats)
    ektaal: {
        yaman: [0, null, 4, null, 6, 7, 9, 11, 12, null, 7, 4],                  // S (2), G (2), M# (1), P (1), D (1), N (1), S' (2), P (1), G (1)
        bhairavi: [0, null, 3, null, 5, 7, 8, 10, 12, null, 7, 3],               // S (2), g (2), M (1), P (1), d (1), n (1), S' (2), P (1), g (1)
        bhupali: [0, null, 4, null, 7, 7, 9, 12, 14, null, 9, 4],                // S (2), G (2), P (1), P (1), D (1), S' (1), R' (2), D (1), G (1)
        kafi: [0, null, 3, null, 5, 7, 9, 10, 12, null, 7, 3],                   // S (2), g (2), M (1), P (1), D (1), n (1), S' (2), P (1), g (1)
        bilawal: [0, null, 4, null, 5, 7, 9, 11, 12, null, 7, 4]                 // S (2), G (2), M (1), P (1), D (1), N (1), S' (2), P (1), G (1)
    },
    // Jhaptal (10 Beats)
    jhaptal: {
        yaman: [7, null, 9, 11, 12, 11, null, 9, 7, 6],                        // P (2), D (1), N (1), S' (1), N (2), D (1), P (1), M# (1)
        bhairavi: [7, null, 8, 10, 12, 10, null, 8, 7, 5],
        bhupali: [7, null, 9, 12, 14, 12, null, 9, 7, 4],
        kafi: [7, null, 9, 10, 12, 10, null, 9, 7, 5],
        bilawal: [7, null, 9, 11, 12, 11, null, 9, 7, 5]
    },
    // Keharwa (8 Beats)
    keharwa: {
        yaman: [0, 2, 4, null, 7, 6, 4, null],                                 // S (1), R (1), G (2), P (1), M# (1), G (2)
        bhairavi: [0, 1, 3, null, 7, 5, 3, null],
        bhupali: [0, 2, 4, null, 7, 9, 7, null],
        kafi: [0, 2, 3, null, 7, 5, 3, null],
        bilawal: [0, 2, 4, null, 7, 5, 4, null]
    },
    // Rupak (7 Beats)
    rupak: {
        yaman: [-1, 2, 4, 6, 7, 4, null],                                      // N. (1), R (1), G (1), M# (1), P (1), G (2)
        bhairavi: [-2, 1, 3, 5, 7, 3, null],
        bhupali: [0, 2, 4, 7, 9, 4, null],
        kafi: [-2, 2, 3, 5, 7, 3, null],
        bilawal: [-1, 2, 4, 5, 7, 4, null]
    },
    // Dadra (6 Beats)
    dadra: {
        yaman: [0, 4, 7, 9, null, 11],                                         // S (1), G (1), Pa (1), Dha (2), Ni (1)
        bhairavi: [0, 3, 7, 8, null, 10],
        bhupali: [0, 4, 7, 9, null, 7],
        kafi: [0, 3, 7, 9, null, 10],
        bilawal: [0, 4, 7, 9, null, 11]
    }
};

const FREQUENCIES = {
    "C4": 261.63,
    "C#4": 277.18,
    "D4": 293.66,
    "D#4": 311.13,
    "E4": 329.63,
    "F4": 349.23,
    "F#4": 369.99,
    "G4": 392.00,
    "G#4": 415.30,
    "A4": 440.00,
    "A#4": 466.16,
    "B4": 493.88
};

// --- STATE MANAGEMENT ---

let audioContext = null;
let isPlaying = false;
let bpm = 120;
let selectedTaal = "teental";
let selectedRaga = "yaman";
let selectedSa = "C#4";
let instrumentTone = "harmonium";

let harmoniumVolume = 0.7;
let tanpuraEnabled = true;
let tanpuraVolume = 0.6;
let tanpuraTuning = "Pa";

// Master gain nodes
let masterGainNode = null;
let harmoniumMasterGain = null;
let tanpuraMasterGain = null;

// Sustained continuous synth voice structure (avoids clicky, metronomic staccato sounds)
let activeLehraVoice = null;
let harmoniumWave = null; // Custom PeriodicWave matching your live harmonium reference recording

// Audio Scheduler Variables
const scheduleAheadTime = 0.12; 
const lookahead = 25.0;         
let nextNoteTime = 0.0;         
let currentBeatIndex = 0;       
let lastScheduledBeatIndex = -1;
let schedulerTimer = null;

// Tanpura Scheduler Variables
let nextTanpuraTime = 0.0;
let tanpuraStringIndex = 0;     
const tanpuraPluckInterval = 1.8; // Time between plucks in seconds

// Syncing Audio Context with Visual Thread
let scheduledNotesQueue = [];   

// Tap Tempo Variables
let lastTapTime = 0;
let tapDeltaTimes = [];

// --- DOM ELEMENTS ---

const doc = {
    statusBadge: document.getElementById("statusBadge"),
    taalSelect: document.getElementById("taalSelect"),
    ragaSelect: document.getElementById("ragaSelect"),
    keySelect: document.getElementById("keySelect"),
    instrumentSelect: document.getElementById("instrumentSelect"),
    initAudioBtn: document.getElementById("initAudioBtn"),
    audioInitOverlay: document.getElementById("audioInitOverlay"),
    playPauseBtn: document.getElementById("playPauseBtn"),
    bpmSlider: document.getElementById("bpmSlider"),
    bpmValue: document.getElementById("bpmValue"),
    layaLabel: document.getElementById("layaLabel"),
    tempoMinus: document.getElementById("tempoMinus"),
    tempoPlus: document.getElementById("tempoPlus"),
    tapTempoBtn: document.getElementById("tapTempoBtn"),
    harmoniumVolume: document.getElementById("harmoniumVolume"),
    harmoniumVolVal: document.getElementById("harmoniumVolVal"),
    tanpuraToggle: document.getElementById("tanpuraToggle"),
    tanpuraVolume: document.getElementById("tanpuraVolume"),
    tanpuraVolVal: document.getElementById("tanpuraVolVal"),
    tanpuraControlsSection: document.getElementById("tanpuraControlsSection"),
    tanpuraCard: document.querySelector(".tanpura-card"),
    tuningButtons: document.querySelectorAll(".tune-btn"),
    taalDescription: document.getElementById("taalDescription"),
    thekaBeadsContainer: document.getElementById("thekaBeadsContainer"),
    hudBeatNum: document.getElementById("hudBeatNum"),
    hudSymbol: document.getElementById("hudSymbol"),
    hudSwar: document.getElementById("hudSwar"),
    hudBolLabel: document.getElementById("hudBolLabel"),
    beatChakra: document.getElementById("beatChakra"),
    ringProgress: document.getElementById("ringProgress"),
    chakraNeedle: document.getElementById("chakraNeedle")
};

// --- INITIALIZE UI ---

window.addEventListener("DOMContentLoaded", () => {
    setupChakraBeads();
    setupThekaBeads();
    updateLayaLabel();
    
    // Bind Event Listeners
    doc.initAudioBtn.addEventListener("click", initializeAudioEngine);
    doc.taalSelect.addEventListener("change", handleTaalChange);
    doc.ragaSelect.addEventListener("change", handleRagaChange);
    doc.keySelect.addEventListener("change", handleSaChange);
    doc.instrumentSelect.addEventListener("change", handleInstrumentChange);
    
    doc.playPauseBtn.addEventListener("click", togglePlayback);
    
    doc.bpmSlider.addEventListener("input", (e) => {
        setBpm(parseInt(e.target.value));
    });
    
    doc.tempoMinus.addEventListener("click", () => setBpm(bpm - 5));
    doc.tempoPlus.addEventListener("click", () => setBpm(bpm + 5));
    doc.tapTempoBtn.addEventListener("click", handleTapTempo);
    
    doc.harmoniumVolume.addEventListener("input", (e) => {
        harmoniumVolume = parseFloat(e.target.value) / 100;
        doc.harmoniumVolVal.textContent = `${e.target.value}%`;
        if (harmoniumMasterGain) {
            harmoniumMasterGain.gain.setValueAtTime(harmoniumVolume, audioContext.currentTime);
        }
    });
    
    doc.tanpuraToggle.addEventListener("change", (e) => {
        tanpuraEnabled = e.target.checked;
        if (tanpuraEnabled) {
            doc.tanpuraCard.classList.remove("disabled");
            if (isPlaying && audioContext) {
                nextTanpuraTime = audioContext.currentTime + 0.1;
                tanpuraStringIndex = 0;
            }
        } else {
            doc.tanpuraCard.classList.add("disabled");
        }
    });
    
    doc.tanpuraVolume.addEventListener("input", (e) => {
        tanpuraVolume = parseFloat(e.target.value) / 100;
        doc.tanpuraVolVal.textContent = `${e.target.value}%`;
        if (tanpuraMasterGain) {
            tanpuraMasterGain.gain.setValueAtTime(tanpuraVolume * 0.5, audioContext.currentTime);
        }
    });
    
    doc.tuningButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            doc.tuningButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            tanpuraTuning = e.target.dataset.tune;
        });
    });
    
    const circle = doc.ringProgress;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
});

// --- AUDIO SYNTHESIS ENGINE ---

function initializeAudioEngine() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Custom premium harmonium wave built from Fast Fourier Transform (FFT) analysis of reference recording.
        // Captures physical coupled reeds (Bass + Madhya) and resonant warmth accurately without high whistling.
        const imag = new Float32Array([0, 1.0, 1.3896, 1.1494, 0.6848, 0.4758, 0.6177, 0.3372, 0.2563]);
        const real = new Float32Array(imag.length);
        harmoniumWave = audioContext.createPeriodicWave(real, imag, {disableNormalization: false});
        
        masterGainNode = audioContext.createGain();
        masterGainNode.gain.value = 1.0;
        
        harmoniumMasterGain = audioContext.createGain();
        harmoniumMasterGain.gain.value = harmoniumVolume;
        
        tanpuraMasterGain = audioContext.createGain();
        tanpuraMasterGain.gain.value = tanpuraVolume * 0.5; // low default volume for soothing drone
        
        harmoniumMasterGain.connect(masterGainNode);
        tanpuraMasterGain.connect(masterGainNode);
        masterGainNode.connect(audioContext.destination);
        
        doc.audioInitOverlay.classList.add("hidden");
        doc.playPauseBtn.removeAttribute("disabled");
        doc.statusBadge.className = "status-badge";
        
        // Auto-start playback immediately for an outstanding fluid UX
        togglePlayback();
        
        requestAnimationFrame(updateVisuals);
        
    } catch(err) {
        console.error("Web Audio API failed to initialize", err);
        doc.statusBadge.className = "status-badge error";
        alert("Failed to initialize audio engine.");
    }
}

function getSaFrequency() {
    return FREQUENCIES[selectedSa] || 277.18; 
}

function getNoteFrequency(offset) {
    const saFreq = getSaFrequency();
    return saFreq * Math.pow(2, offset / 12);
}

// --- CONTINUOUS LEGATO VOICE MANAGER ---

/**
 * Starts a sustained oscillator structure for supportive legato play.
 * Prevents staccato popping and "metronome beeps", sounding like a real singing instrument.
 */
function startLehraVoice(time) {
    if (activeLehraVoice) return;
    
    // Find initial pitch
    const melody = MELODIES[selectedTaal][selectedRaga];
    let initialOffset = 0;
    for (let i = 0; i < melody.length; i++) {
        if (melody[i] !== null) {
            initialOffset = melody[i];
            break;
        }
    }
    const freq = getNoteFrequency(initialOffset);
    
    if (instrumentTone === "harmonium") {
        // --- WHISTLE-FREE ACOUSTIC COUPLED REED HARMONIUM ---
        // 1. Dual coupled registers: Middle Female reeds (detuned) + Male Bass reed (coupler octave below).
        //    (Treble coupler register is removed to prevent high-pitched whistling/shrill overtones).
        // 2. Flat critically-damped lowpass filter (Q = 0.5, cutoff = 900Hz).
        //    By setting Q to 0.5, we ensure a perfectly smooth roll-off with zero resonant peaks, 
        //    which makes it mathematically impossible to create high-pitched ringing or whistling sounds!
        // 3. Gentle synchronized bellows LFO (subtle volume and pitch detune wobble for breathing air pressure).
        
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const subOsc = audioContext.createOscillator();
        
        if (harmoniumWave) {
            osc1.setPeriodicWave(harmoniumWave);
            osc2.setPeriodicWave(harmoniumWave);
            subOsc.setPeriodicWave(harmoniumWave);
        } else {
            osc1.type = 'sawtooth';
            osc2.type = 'sawtooth';
            subOsc.type = 'sawtooth';
        }
        
        osc1.frequency.setValueAtTime(freq, time);
        osc1.detune.setValueAtTime(8, time); // detuned up
        
        osc2.frequency.setValueAtTime(freq, time);
        osc2.detune.setValueAtTime(-8, time); // detuned down
        
        subOsc.frequency.setValueAtTime(freq / 2, time); // low coupler octave
        subOsc.detune.setValueAtTime(2, time);
        
        // Coupled Reed Mixer (warm blend)
        const g1 = audioContext.createGain();
        g1.gain.setValueAtTime(0.28, time);
        
        const g2 = audioContext.createGain();
        g2.gain.setValueAtTime(0.28, time);
        
        const gSub = audioContext.createGain();
        gSub.gain.setValueAtTime(0.44, time); // deep coupler body
        
        // Critically damped flat lowpass filter (Q = 0.5 completely cures resonant whistle)
        const filterLow = audioContext.createBiquadFilter();
        filterLow.type = 'lowpass';
        filterLow.Q.setValueAtTime(0.5, time); // perfectly flat response, no resonant spike
        filterLow.frequency.setValueAtTime(900, time); // warm, woody rolling off above 900Hz
        
        // Master Envelope Node (Bellows Air Flow)
        const bellowsGain = audioContext.createGain();
        bellowsGain.gain.setValueAtTime(0.0001, time);
        bellowsGain.gain.linearRampToValueAtTime(1.0, time + 0.15); // soft start
        
        // Connection chain
        osc1.connect(g1);
        osc2.connect(g2);
        subOsc.connect(gSub);
        
        g1.connect(filterLow);
        g2.connect(filterLow);
        gSub.connect(filterLow);
        
        filterLow.connect(bellowsGain);
        bellowsGain.connect(harmoniumMasterGain);
        
        // Synchronized Bellows LFO (slow manual air pump - calibrated to 3.0Hz LFO from reference MP3)
        const bellowsLfo = audioContext.createOscillator();
        bellowsLfo.frequency.setValueAtTime(3.0, time); 
        
        // Volume Modulation (8% swell for authentic breathing air flow)
        const lfoAmpGain = audioContext.createGain();
        lfoAmpGain.gain.setValueAtTime(0.08, time);
        bellowsLfo.connect(lfoAmpGain);
        lfoAmpGain.connect(bellowsGain.gain);
        
        // Pitch Pressure Modulation (±12.5 cents vibrato wobble from reference spectral analysis)
        const lfoPitchGain = audioContext.createGain();
        lfoPitchGain.gain.setValueAtTime(12.5, time); 
        bellowsLfo.connect(lfoPitchGain);
        lfoPitchGain.connect(osc1.detune);
        lfoPitchGain.connect(osc2.detune);
        lfoPitchGain.connect(subOsc.detune);
        
        // Start reeds
        osc1.start(time);
        osc2.start(time);
        subOsc.start(time);
        bellowsLfo.start(time);
        
        activeLehraVoice = {
            type: "harmonium",
            osc1: osc1,
            osc2: osc2,
            subOsc: subOsc,
            bellowsLfo: bellowsLfo,
            filterLow: filterLow,
            bellowsGain: bellowsGain,
            g1: g1, g2: g2, gSub: gSub
        };
    } else if (instrumentTone === "flute") {
        // --- HINDUSTANI BANSURI (FLUTE) ---
        // Warm sine wave + soft triangle wave, with continuous pitch vibrato
        
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        
        osc1.type = 'sine';
        osc2.type = 'triangle';
        
        osc1.frequency.setValueAtTime(freq, time);
        osc2.frequency.setValueAtTime(freq, time);
        
        const g1 = audioContext.createGain();
        g1.gain.setValueAtTime(0.85, time);
        const g2 = audioContext.createGain();
        g2.gain.setValueAtTime(0.15, time);
        
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, time);
        
        const breathGain = audioContext.createGain();
        breathGain.gain.setValueAtTime(0.0001, time);
        breathGain.gain.linearRampToValueAtTime(1.0, time + 0.18);
        
        // Deep Pitch Vibrato LFO (5.6 Hz continuous mod)
        const vibLfo = audioContext.createOscillator();
        vibLfo.frequency.setValueAtTime(5.6, time);
        
        const vibGain = audioContext.createGain();
        vibGain.gain.setValueAtTime(4.0, time); // detune depth
        
        vibLfo.connect(vibGain);
        vibGain.connect(osc1.frequency);
        vibGain.connect(osc2.frequency);
        
        osc1.connect(g1);
        osc2.connect(g2);
        
        g1.connect(filter);
        g2.connect(filter);
        
        filter.connect(breathGain);
        breathGain.connect(harmoniumMasterGain);
        
        osc1.start(time);
        osc2.start(time);
        vibLfo.start(time);
        
        activeLehraVoice = {
            type: "flute",
            osc1: osc1,
            osc2: osc2,
            vibLfo: vibLfo,
            filter: filter,
            breathGain: breathGain
        };
        
    } else {
        // --- SOFT SINE KEY ---
        const osc = audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        
        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.linearRampToValueAtTime(1.0, time + 0.1);
        
        osc.connect(gain);
        gain.connect(harmoniumMasterGain);
        
        osc.start(time);
        
        activeLehraVoice = {
            type: "sine",
            osc: osc,
            gain: gain
        };
    }
}

function stopLehraVoice(time) {
    if (!activeLehraVoice) return;
    
    const voice = activeLehraVoice;
    activeLehraVoice = null;
    
    if (voice.type === "harmonium") {
        voice.bellowsGain.gain.cancelScheduledValues(time);
        voice.bellowsGain.gain.setValueAtTime(voice.bellowsGain.gain.value, time);
        voice.bellowsGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
        
        voice.osc1.stop(time + 0.2);
        voice.osc2.stop(time + 0.2);
        voice.subOsc.stop(time + 0.2);
        voice.bellowsLfo.stop(time + 0.2);
        
    } else if (voice.type === "flute") {
        voice.breathGain.gain.cancelScheduledValues(time);
        voice.breathGain.gain.setValueAtTime(voice.breathGain.gain.value, time);
        voice.breathGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
        
        voice.osc1.stop(time + 0.25);
        voice.osc2.stop(time + 0.25);
        voice.vibLfo.stop(time + 0.25);
        
    } else {
        voice.gain.gain.cancelScheduledValues(time);
        voice.gain.gain.setValueAtTime(voice.gain.gain.value, time);
        voice.gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
        voice.osc.stop(time + 0.2);
    }
}

/**
 * Seamlessly glides the active continuous oscillators to a new pitch (Meend/Portamento).
 * Avoids raw jumps that copy staccato tabla beats.
 */
function glideLehraVoice(noteOffset, time) {
    if (!activeLehraVoice) return;
    
    const freq = getNoteFrequency(noteOffset);
    const voice = activeLehraVoice;
    
    if (voice.type === "harmonium") {
        // Glide oscillators (0.08s slide rate is highly natural for harmonium reeds)
        voice.osc1.frequency.exponentialRampToValueAtTime(freq, time + 0.08);
        voice.osc2.frequency.exponentialRampToValueAtTime(freq, time + 0.08);
        voice.subOsc.frequency.exponentialRampToValueAtTime(freq / 2, time + 0.08);
        
        // Soft volume bellows dip (volume drops only 15% briefly to accentuate the beat, NEVER fades to zero)
        voice.bellowsGain.gain.setValueAtTime(1.0, time);
        voice.bellowsGain.gain.linearRampToValueAtTime(0.85, time + 0.04);
        voice.bellowsGain.gain.linearRampToValueAtTime(1.0, time + 0.18);
        
    } else if (voice.type === "flute") {
        // Flute glides slower (0.12s) to simulate breath transition sliding (Meend)
        voice.osc1.frequency.exponentialRampToValueAtTime(freq, time + 0.12);
        voice.osc2.frequency.exponentialRampToValueAtTime(freq, time + 0.12);
        
        // Breath swell
        voice.breathGain.gain.setValueAtTime(1.0, time);
        voice.breathGain.gain.linearRampToValueAtTime(0.88, time + 0.05);
        voice.breathGain.gain.linearRampToValueAtTime(1.0, time + 0.22);
        
    } else {
        voice.osc.frequency.setValueAtTime(freq, time);
        voice.gain.gain.setValueAtTime(1.0, time);
        voice.gain.gain.linearRampToValueAtTime(0.9, time + 0.03);
        voice.gain.gain.linearRampToValueAtTime(1.0, time + 0.12);
    }
}

/**
 * Pulses the volume gently during sustained notes (where melody is null)
 * to mark the rhythmic beat flow without changing the pitch.
 */
function pulseLehraVolume(time) {
    if (!activeLehraVoice) return;
    
    const voice = activeLehraVoice;
    
    if (voice.type === "harmonium") {
        // Minor 6% volume dip (barely noticeable, keeps time supportive)
        voice.bellowsGain.gain.setValueAtTime(1.0, time);
        voice.bellowsGain.gain.linearRampToValueAtTime(0.94, time + 0.04);
        voice.bellowsGain.gain.linearRampToValueAtTime(1.0, time + 0.16);
    } else if (voice.type === "flute") {
        voice.breathGain.gain.setValueAtTime(1.0, time);
        voice.breathGain.gain.linearRampToValueAtTime(0.95, time + 0.05);
        voice.breathGain.gain.linearRampToValueAtTime(1.0, time + 0.2);
    } else {
        voice.gain.gain.setValueAtTime(1.0, time);
        voice.gain.gain.linearRampToValueAtTime(0.95, time + 0.03);
        voice.gain.gain.linearRampToValueAtTime(1.0, time + 0.1);
    }
}

// --- ORGANIC TANPURA DRONE ---

function playTanpuraPluck(stringIndex, time) {
    if (!audioContext || !tanpuraEnabled) return;
    
    let offset = 0;
    if (stringIndex === 0) {
        if (tanpuraTuning === 'Pa') offset = -5;      // G (down a fifth)
        else if (tanpuraTuning === 'Ma') offset = -7; // F (down a fourth)
        else if (tanpuraTuning === 'Ni') offset = -1; // B (down a semitone)
    } else if (stringIndex === 1 || stringIndex === 2) {
        offset = 0;   // Sa
    } else if (stringIndex === 3) {
        offset = -12;  // Low Sa
    }
    
    const baseSaFreq = getSaFrequency();
    const freq = baseSaFreq * Math.pow(2, offset / 12);
    
    // Custom blended pluck: Triangle (60% volume for warmth) + Soft Sawtooth (40% detuned for buzz)
    const oscSaw = audioContext.createOscillator();
    oscSaw.type = 'sawtooth';
    oscSaw.frequency.setValueAtTime(freq, time);
    
    const oscTri = audioContext.createOscillator();
    oscTri.type = 'triangle';
    oscTri.frequency.setValueAtTime(freq, time);
    
    const gSaw = audioContext.createGain();
    gSaw.gain.setValueAtTime(0.35, time);
    const gTri = audioContext.createGain();
    gTri.gain.setValueAtTime(0.65, time);
    
    // Warmer Bridge Sweep (cutoff frequency is kept lower for soothing drone)
    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(8, time);
    
    filter.frequency.setValueAtTime(freq * 6, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.3, time + 2.5);
    
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, time);
    
    // Instant attack, long, slow, soothing ring decay
    gainNode.gain.linearRampToValueAtTime(0.4, time + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.12, time + 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 4.2);
    
    oscSaw.connect(gSaw);
    oscTri.connect(gTri);
    
    gSaw.connect(filter);
    gTri.connect(filter);
    
    filter.connect(gainNode);
    gainNode.connect(tanpuraMasterGain);
    
    oscSaw.start(time);
    oscTri.start(time);
    
    oscSaw.stop(time + 4.8);
    oscTri.stop(time + 4.8);
}

// --- HIGH-PRECISION LOOK-AHEAD AUDIO SCHEDULER ---

function scheduler() {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        scheduleNote(currentBeatIndex, nextNoteTime);
        advanceBeat();
    }
    
    if (tanpuraEnabled) {
        while (nextTanpuraTime < audioContext.currentTime + scheduleAheadTime) {
            playTanpuraPluck(tanpuraStringIndex, nextTanpuraTime);
            tanpuraStringIndex = (tanpuraStringIndex + 1) % 4;
            nextTanpuraTime += tanpuraPluckInterval;
        }
    }
}

function scheduleNote(beatIndex, time) {
    const melody = MELODIES[selectedTaal][selectedRaga];
    const noteOffset = melody[beatIndex];
    const secondsPerBeat = 60.0 / bpm;
    
    if (noteOffset !== null) {
        if (!activeLehraVoice) {
            // First trigger: start active voice
            startLehraVoice(time);
        }
        // Legato pitch glide
        glideLehraVoice(noteOffset, time);
    } else {
        // Legato sustain with gentle bellows volume swell
        pulseLehraVolume(time);
    }
    
    scheduledNotesQueue.push({
        beatIndex: beatIndex,
        time: time,
        duration: secondsPerBeat
    });
}

function advanceBeat() {
    const taal = TAALS[selectedTaal];
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += secondsPerBeat;
    currentBeatIndex = (currentBeatIndex + 1) % taal.beats;
}

// --- DYNAMIC RENDERING INTERPOLATOR (UI FRAME SYNC) ---

function updateVisuals() {
    if (!isPlaying || !audioContext) {
        requestAnimationFrame(updateVisuals);
        return;
    }
    
    const currentTime = audioContext.currentTime;
    
    // Find the beat in the queue that covers the current time
    // i.e., time <= currentTime < time + duration
    let activeBeat = null;
    
    for (let i = 0; i < scheduledNotesQueue.length; i++) {
        const note = scheduledNotesQueue[i];
        if (currentTime >= note.time && currentTime < note.time + note.duration) {
            activeBeat = note;
            break;
        }
    }
    
    // If no exact match is found, but the queue has items, fall back to the most recent elapsed beat
    if (!activeBeat && scheduledNotesQueue.length > 0) {
        const lastNote = scheduledNotesQueue[scheduledNotesQueue.length - 1];
        if (currentTime >= lastNote.time) {
            activeBeat = lastNote;
        }
    }
    
    if (activeBeat) {
        const beatNum = activeBeat.beatIndex + 1;
        const taal = TAALS[selectedTaal];
        const melody = MELODIES[selectedTaal][selectedRaga];
        
        // Find the active pitch offset (traversing backwards to find sustained notes)
        let activeOffset = 0;
        for (let i = activeBeat.beatIndex; i >= 0; i--) {
            if (melody[i] !== null) {
                activeOffset = melody[i];
                break;
            }
        }
        
        // Only trigger UI updates when the integer beat index actually changes!
        if (activeBeat.beatIndex !== lastScheduledBeatIndex) {
            lastScheduledBeatIndex = activeBeat.beatIndex;
            triggerBeatUI(activeBeat.beatIndex, beatNum, taal, activeOffset);
        }
        
        // Sweep needle rendering using the active beat's precise timestamps
        const timeIntoBeat = Math.max(0, currentTime - activeBeat.time);
        const beatFraction = Math.min(1.0, timeIntoBeat / activeBeat.duration);
        
        const continuousBeat = activeBeat.beatIndex + beatFraction;
        const totalProgress = continuousBeat / taal.beats;
        
        const angle = (totalProgress * 360) - 90;
        doc.chakraNeedle.setAttribute("transform", `rotate(${angle} 200 200)`);
        
        const radius = doc.ringProgress.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (totalProgress * circumference);
        doc.ringProgress.style.strokeDashoffset = offset;
    }
    
    // Keep queue clean: remove any beats that ended more than 1 second ago
    while (scheduledNotesQueue.length > 0 && scheduledNotesQueue[0].time + scheduledNotesQueue[0].duration < currentTime - 1.0) {
        scheduledNotesQueue.shift();
    }
    
    requestAnimationFrame(updateVisuals);
}

function triggerBeatUI(beatIndex, beatNum, taal, noteOffset) {
    doc.hudBeatNum.textContent = beatNum;
    doc.hudBeatNum.classList.remove("pulse");
    void doc.hudBeatNum.offsetWidth; 
    doc.hudBeatNum.classList.add("pulse");
    
    const symbol = taal.symbols[beatIndex] || "•";
    doc.hudSymbol.textContent = symbol === "X" ? "Sam (X)" : symbol === "0" ? "Khali (0)" : symbol ? `Tali (${symbol})` : "•";
    doc.hudSwar.innerHTML = getSwarName(noteOffset);
    doc.hudBolLabel.textContent = taal.bols[beatIndex];
    
    const beads = document.querySelectorAll(".beat-bead");
    beads.forEach(b => b.classList.remove("active"));
    const activeBead = document.getElementById(`bead-${beatIndex}`);
    if (activeBead) {
        activeBead.classList.add("active");
    }
    
    const bottomBeads = document.querySelectorAll(".theka-bead");
    bottomBeads.forEach(b => b.classList.remove("active"));
    const activeBottomBead = document.getElementById(`bottom-bead-${beatIndex}`);
    if (activeBottomBead) {
        activeBottomBead.classList.add("active");
        
        // Scroll ONLY the horizontal ribbon container, leaving the page's vertical scroll completely alone
        const container = doc.thekaBeadsContainer;
        if (container) {
            const beadOffset = activeBottomBead.offsetLeft;
            const beadWidth = activeBottomBead.offsetWidth;
            const containerWidth = container.offsetWidth;
            container.scrollTo({
                left: beadOffset - (containerWidth / 2) + (beadWidth / 2),
                behavior: 'smooth'
            });
        }
    }
}

// --- DYNAMIC GEOMETRIC CHAKRA RENDERER ---

function setupChakraBeads() {
    const taal = TAALS[selectedTaal];
    const totalBeats = taal.beats;
    const radius = 160; /* Wider bead radius matching larger SVG circle (r=165) */
    
    const oldBeads = doc.beatChakra.querySelectorAll(".beat-bead");
    oldBeads.forEach(b => b.remove());
    
    for (let i = 0; i < totalBeats; i++) {
        const symbol = taal.symbols[i];
        const isSam = symbol === "X" || (selectedTaal === "rupak" && i === 0);
        const isKhali = symbol === "0";
        const isTali = symbol && symbol !== "X" && symbol !== "0";
        
        const angleRad = ((i / totalBeats) * 360 - 90) * Math.PI / 180;
        const x = 200 + radius * Math.cos(angleRad);
        const y = 200 + radius * Math.sin(angleRad);
        
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "beat-bead");
        g.setAttribute("id", `bead-${i}`);
        
        if (isSam) g.classList.add("sam");
        else if (isKhali) g.classList.add("khali");
        else if (isTali) g.classList.add("tali");
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", isSam ? 14 : 12);
        circle.setAttribute("fill", "#1b1511");
        circle.setAttribute("stroke", isSam ? "var(--accent-crimson)" : isKhali ? "var(--accent-teal)" : isTali ? "var(--accent-gold)" : "rgba(255,255,255,0.06)");
        g.appendChild(circle);
        
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.textContent = i + 1;
        g.appendChild(text);
        
        g.addEventListener("click", () => {
            if (audioContext && isPlaying) {
                currentBeatIndex = i;
                nextNoteTime = audioContext.currentTime;
                scheduledNotesQueue = [];
            }
        });
        
        doc.beatChakra.appendChild(g);
    }
}

// --- THEKA BEADS GENERATOR ---

function setupThekaBeads() {
    const taal = TAALS[selectedTaal];
    const melody = MELODIES[selectedTaal][selectedRaga];
    
    doc.thekaBeadsContainer.innerHTML = "";
    
    taal.bols.forEach((bol, idx) => {
        const symbol = taal.symbols[idx];
        
        // Find current pitch offset traversing legacy legato bounds
        let currentOffset = 0;
        for (let i = idx; i >= 0; i--) {
            if (melody[i] !== null) {
                currentOffset = melody[i];
                break;
            }
        }
        
        const swar = getSwarName(currentOffset);
        
        const bead = document.createElement("div");
        bead.className = "theka-bead";
        bead.id = `bottom-bead-${idx}`;
        
        const isSam = symbol === "X" || (selectedTaal === "rupak" && idx === 0);
        const isKhali = symbol === "0";
        const isTali = symbol && symbol !== "X" && symbol !== "0";
        
        if (isSam) bead.classList.add("sam");
        else if (isKhali) bead.classList.add("khali");
        else if (isTali) bead.classList.add("tali");
        
        bead.innerHTML = `
            <div class="bead-num">${idx + 1}</div>
            <div class="bead-bol">${bol}</div>
            <div class="bead-swar">${swar}</div>
            <span class="bead-symbol">${symbol ? symbol : "•"}</span>
        `;
        
        bead.addEventListener("click", () => {
            if (audioContext && isPlaying) {
                currentBeatIndex = idx;
                nextNoteTime = audioContext.currentTime;
                scheduledNotesQueue = [];
            }
        });
        
        doc.thekaBeadsContainer.appendChild(bead);
    });
}

// --- INDIAN SWARA METRIC TRANSLATOR ---

function getSwarName(offset) {
    const norm = ((offset % 12) + 12) % 12;
    const octave = Math.floor(offset / 12);
    
    let swara = "";
    switch(norm) {
        case 0: swara = "S"; break;
        case 1: swara = "r"; break;
        case 2: swara = "R"; break;
        case 3: swara = "g"; break;
        case 4: swara = "G"; break;
        case 5: swara = "m"; break;
        case 6: swara = "M"; break; // Teevra Ma
        case 7: swara = "P"; break;
        case 8: swara = "d"; break;
        case 9: swara = "D"; break;
        case 10: swara = "n"; break;
        case 11: swara = "N"; break;
    }
    
    if (octave > 0) {
        swara += " <sup style='font-size:0.55rem;'>•</sup>"; 
    } else if (octave < 0) {
        swara += " <sub style='font-size:0.55rem;'>•</sub>"; 
    }
    
    return swara;
}

// --- PERFORMANCE CONTROL FUNCTIONS ---

function togglePlayback() {
    if (!audioContext) return;
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    isPlaying = !isPlaying;
    const playText = document.getElementById("playBtnText");
    
    if (isPlaying) {
        doc.playPauseBtn.classList.remove("paused");
        doc.playPauseBtn.classList.add("playing");
        if (playText) playText.textContent = "PAUSE";
        doc.statusBadge.classList.add("playing");
        
        const startTime = audioContext.currentTime + 0.05;
        nextNoteTime = startTime;
        nextTanpuraTime = startTime + 0.1;
        currentBeatIndex = 0;
        tanpuraStringIndex = 0;
        lastScheduledBeatIndex = -1;
        scheduledNotesQueue = [];
        
        // Start continuous background instruments immediately
        startLehraVoice(startTime);
        
        schedulerTimer = setInterval(scheduler, lookahead);
    } else {
        doc.playPauseBtn.classList.remove("playing");
        doc.playPauseBtn.classList.add("paused");
        if (playText) playText.textContent = "PLAY";
        doc.statusBadge.classList.remove("playing");
        
        clearInterval(schedulerTimer);
        schedulerTimer = null;
        
        // Smoothly silence continuous voice
        stopLehraVoice(audioContext.currentTime);
        
        scheduledNotesQueue = [];
        resetVisualPositions();
    }
}

function resetVisualPositions() {
    doc.chakraNeedle.setAttribute("transform", "rotate(-90 200 200)");
    doc.ringProgress.style.strokeDashoffset = 2 * Math.PI * doc.ringProgress.r.baseVal.value;
    
    const beads = document.querySelectorAll(".beat-bead, .theka-bead");
    beads.forEach(b => b.classList.remove("active"));
    
    doc.playPauseBtn.classList.remove("playing");
    doc.playPauseBtn.classList.add("paused");
    const playText = document.getElementById("playBtnText");
    if (playText) playText.textContent = "PLAY";
    
    doc.hudBeatNum.textContent = "--";
    doc.hudSymbol.textContent = "-";
    doc.hudSwar.textContent = "-";
    doc.hudBolLabel.textContent = "Ready";
}

function setBpm(newBpm) {
    bpm = Math.max(40, Math.min(300, newBpm));
    
    doc.bpmSlider.value = bpm;
    doc.bpmValue.textContent = bpm;
    
    updateLayaLabel();
}

function updateLayaLabel() {
    let label = "";
    if (bpm < 80) {
        label = "Vilambit Laya (Slow)";
    } else if (bpm <= 160) {
        label = "Madhya Laya (Medium)";
    } else {
        label = "Drut Laya (Fast)";
    }
    doc.layaLabel.textContent = label;
}

// --- TAP TEMPO HANDLER ---

function handleTapTempo() {
    const currentTime = Date.now();
    
    if (lastTapTime > 0) {
        const delta = currentTime - lastTapTime;
        if (delta >= 170 && delta <= 1500) {
            tapDeltaTimes.push(delta);
            if (tapDeltaTimes.length > 4) {
                tapDeltaTimes.shift();
            }
            const averageDelta = tapDeltaTimes.reduce((a, b) => a + b) / tapDeltaTimes.length;
            const calculatedBpm = Math.round(60000 / averageDelta);
            setBpm(calculatedBpm);
        } else {
            tapDeltaTimes = [];
        }
    }
    lastTapTime = currentTime;
    
    doc.tapTempoBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
        doc.tapTempoBtn.style.transform = "scale(1)";
    }, 100);
}

// --- EVENT CHANGE HANDLERS ---

function handleTaalChange(e) {
    selectedTaal = e.target.value;
    
    const taal = TAALS[selectedTaal];
    doc.taalDescription.textContent = taal.description;
    
    const badge = document.getElementById("taalBadgeName");
    if (badge) {
        badge.textContent = taal.name;
    }
    
    setupChakraBeads();
    setupThekaBeads();
    
    if (isPlaying) {
        currentBeatIndex = 0;
        scheduledNotesQueue = [];
        if (audioContext) {
            nextNoteTime = audioContext.currentTime + 0.05;
        }
    }
}

function handleRagaChange(e) {
    selectedRaga = e.target.value;
    setupChakraBeads();
    setupThekaBeads();
    
    // If playing, smoothly glide to new initial note immediately
    if (isPlaying && audioContext && activeLehraVoice) {
        const melody = MELODIES[selectedTaal][selectedRaga];
        let initialOffset = 0;
        for (let i = 0; i < melody.length; i++) {
            if (melody[i] !== null) {
                initialOffset = melody[i];
                break;
            }
        }
        glideLehraVoice(initialOffset, audioContext.currentTime);
    }
}

function handleSaChange(e) {
    selectedSa = e.target.value;
    setupChakraBeads();
    setupThekaBeads();
    
    if (isPlaying && audioContext && activeLehraVoice) {
        const melody = MELODIES[selectedTaal][selectedRaga];
        let initialOffset = 0;
        for (let i = 0; i < melody.length; i++) {
            if (melody[i] !== null) {
                initialOffset = melody[i];
                break;
            }
        }
        glideLehraVoice(initialOffset, audioContext.currentTime);
    }
}

function handleInstrumentChange(e) {
    instrumentTone = e.target.value;
    
    // If playing, seamlessly crossfade the instruments
    if (isPlaying && audioContext) {
        const time = audioContext.currentTime;
        stopLehraVoice(time);
        
        // Let old oscillator fade out for 150ms before starting new tone
        setTimeout(() => {
            if (isPlaying && audioContext) {
                startLehraVoice(audioContext.currentTime);
            }
        }, 150);
    }
}
