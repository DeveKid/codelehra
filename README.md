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
