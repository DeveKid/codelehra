# CodeLehra 🎹🥁

> A Premium, Minimalist Hindustani Legato Lehra & Tanpura Synthesizer for Tabla Practice.

CodeLehra is an elegant, zero-dependency, professional-grade single-screen web application designed for classical Indian Tabla players. By synthesizing classical Indian musical instruments entirely in the browser using the **Web Audio API**, it delivers precise, organic, and highly customizable accompaniment for your daily *Riyaz* (practice).

🔗 **Play Live Now**: [https://devekid.github.io/codelehra/](https://devekid.github.io/codelehra/)

---

## ✨ Features

1. **High-Precision Legato Audio Scheduler**
   * Built on a double-clock look-ahead scheduling architecture to ensure sample-accurate, drift-free tempo playback—even when running in background tabs.
   * **Seamless Pitch Glides (Meend)**: Notes smoothly slide into one another over a 0.08s to 0.12s window, sounding like a real singing instrument rather than a staccato beep metronome.

2. **Spectrally Tuned Live Harmonium Voice**
   * **Custom Periodic Waveform**: Calibrated directly from a live harmonium recording using Fast Fourier Transform (FFT) analysis. Instead of generic flat sawtooth waves, it reproduces the exact physical coupled-reed frequency distribution (fundamental Sa=1.00, octave Madhya=1.39, teevra fifth=1.15, etc.).
   * **Bellows air pressure LFO**: A synchronized **3.0 Hz LFO** modulates the master amplitude swell by 8% and detunes the coupled reeds by **±12.5 cents** to replicate the lush, warm, breathing chorus of a physical bellows-pumped instrument.
   * **Critically Damped Filter**: Uses a low-pass filter with **Q = 0.5 at 900Hz** to eliminate high-pitched whistling and deliver a rich, deep, woody vintage organ resonance.

3. **Dynamic Visual Beat Chakra & Fixed HUD**
   * A beautiful, geometric circular visualizer displaying the current cycle, beats (Matras), and subdivisions (Vibhags).
   * **Absolute Spatial Locks**: HUD elements inside the circle are strictly locked in place, ensuring the Matra count pulses perfectly without shifting position dynamically.

4. **Hindustani Bansuri (Flute) & Tanpura Drone**
   * **Bansuri Tone**: Blends sine and triangle waves with continuous organic vibrato and slow breath glides.
   * **Tanpura Drone**: Blends warm triangle and soft buzzing sawtooth plucks through a bandpass bridge sweep, plucking strings sequentially (`Pa/Ma/Ni` -> `Sa` -> `Sa` -> `Sa`) to provide a shimmering, meditative background.

5. **Traditional Theka Visual Matrix**
   * A low-profile horizontal ribbon displaying time-cycle bols (e.g. *Dha Dhin Dhin Dha*) and beat designations (Sam `X`, Khali `0`, Tali numbers) with smooth automatic scroll-following.

---

## 🎹 Web Audio API DSP Architecture

CodeLehra bypasses simple, flat audio playback in favor of a specialized Digital Signal Processing (DSP) architecture built entirely on the native **Web Audio API**. Below is a breakdown of how the Web Audio node graph is configured to achieve an organic, drift-free, classical Hindustani feel:

### 1. Additive Synthesis & Coupled Reeds (`PeriodicWave`)
Rather than relying on harsh, synthetic sawtooth waves, the harmonium voice utilizes an additive synthesis model with a custom `PeriodicWave`.
* **Fourier Amplitudes**: We compiled custom real and imaginary Fourier coefficients derived from a real physical harmonium spectrum:
  $$\text{Amplitudes} = [0, 1.0, 1.39, 1.15, 0.68, 0.48, 0.62, 0.34, 0.26]$$
* **Coupled Reeds**: Three simultaneous oscillators are connected to simulate a real dual-reed box:
  * **Bass Reed (Mandra)**: Playing a base octave (`freq / 2`) detuned by +2 cents.
  * **Middle Reeds (Madhya)**: Two detuned oscillators playing at the base frequency (`freq`), detuned at $+8$ cents and $-8$ cents respectively. This creates a lush, organic beating chorus.

### 2. Double-Clock Look-Ahead Audio Scheduler
Browsers throttle `setInterval` and `requestAnimationFrame` when tabs go into the background. To guarantee drift-free, sample-accurate playback:
* **The Scheduler**: Runs a fast, low-overhead loop (`setInterval` every 25ms) that scans a timeline window `120ms` into the future.
* **Sample-Accurate Triggers**: Melodic glides, envelope changes, and tanpura plucks are scheduled using raw Web Audio clock timestamps (`AudioContext.currentTime`).
* **Frame Synchronization**: The visual needle and Matra counters scan a synchronized event queue from the audio thread, ensuring visual frames sync with audio beats within microseconds.

### 3. Continuous Legato & Meend (Portamento)
Classical Hindustani music relies on *Meend* (sliding pitches). Staccato beeping is highly unnatural.
* **Gliding Pitch**: We maintain a single, long-running oscillator structure per voice instead of constantly spawning new ones. When a note changes, we slide the frequency of all active oscillators using `AudioParam.exponentialRampToValueAtTime()` over a sliding window (`0.08s` to `0.12s`).
* **Air Flow Swells**: When legato holds sustain (`null` notes), we apply a gentle volume dip (8%) to mimic the subtle drop in bellows pressure during note transitions.

### 4. Bellows Air Flow LFO Modulation
A real harmonium is played by manually pumping a leather bellows, creating fluctuating air pressure.
* **Modulation Target**: A synchronized **3.0 Hz LFO** oscillator is mapped to:
  * **Amplitude**: A minor 8% gain swell to simulate manual pumping.
  * **Pitch**: A detune depth of **±12.5 cents** mapped to all three reed oscillators to simulate how reed pitches shift under dynamic air pressure.

### 5. Whistle-Free Critically-Damped Lowpass Filter
Harmonium reeds are encased in a solid wooden box, which naturally attenuates high frequencies. Simple oscillators sound shrill or "whistling" if filtered with resonance.
* **DSP Solution**: We pass the mixed reeds through a `BiquadFilterNode` configured as a lowpass filter with a cutoff of **`900Hz`** and a critically damped Q factor of **`0.5`**. This produces a perfectly flat frequency roll-off with zero resonance spikes, ensuring a deep, vintage organ warmth with zero high-pitched ringing.

---

## 🎨 Technology Stack

* **Structure**: HTML5 Semantic markup, responsive 100vh viewport grid.
* **Aesthetics**: Modern Studio Dark UI using CSS custom variables, Montserrat + Playfair typography, smooth keyframe micro-animations, beating heart signature.
* **Logic & Audio**: Pure JavaScript, Web Audio API, dynamic SVG rendering, Legato timeline synchronization.

---

## 🚀 How to Run Locally

CodeLehra is built entirely with raw web standards, meaning it has **zero dependencies** and requires no build pipeline.

1. Clone this repository:
   ```bash
   git clone https://github.com/DeveKid/codelehra.git
   cd codelehra
   ```
2. Run a simple local server to avoid browser Audio Policy and CORS warnings:
   * **Using Python**:
     ```bash
     python -m http.server 8000
     ```
   * **Using Node.js / npx**:
     ```bash
     npx serve
     ```
3. Open `http://localhost:8000` in your web browser.
4. Click the **Enable Audio** button (browsers block autoplay audio until a user gestures).
5. Click **PLAY** directly below the circle, and start practicing!

---

## 🎼 Classical Music Details

### Supported Taals (Time Cycles):
* **Teental** (16 Beats) — 4+4+4+4
* **Ektaal** (12 Beats) — 2+2+2+2+2+2
* **Jhaptal** (10 Beats) — 2+3+2+3
* **Keharwa** (8 Beats) — 4+4
* **Rupak** (7 Beats) — 3+2+2 (Starts on Khali `0`)
* **Dadra** (6 Beats) — 3+3

### Supported Ragas (Melodies):
* **Raga Yaman**: Lydian scale (sharp Ma)
* **Raga Bhairavi**: Phrygian scale (flat Re, Ga, Dha, Ni)
* **Raga Bhupali**: Pentatonic Major (Sa, Re, Ga, Pa, Dha)
* **Raga Kafi**: Dorian scale (flat Ga, Ni)
* **Raga Bilawal**: Major Scale (Natural notes)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

*Enjoy your practice, and may your Laya remain unbroken!* 🥁🎹❤️
