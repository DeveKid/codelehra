# CodeLehra 🎹🕉️
> A Premium, Minimalist Hindustani Legato Lehra & Tanpura Synthesizer for Tabla Practice

CodeLehra is an elegant, zero-dependency, professional-grade single-screen web application designed for classical Indian Tabla players. By synthesizing classical Indian musical instruments entirely in the browser using the **Web Audio API**, it delivers precise, organic, and highly customizable accompaniment for your daily *Riyaz* (practice).

*Made with love ❤️ by Gemini.*

---

## ✨ Core Features

1. **High-Precision Legato Audio Scheduler**
   * Built on a double-clock look-ahead scheduling architecture to ensure sample-accurate, drift-free tempo playback—even when running in background tabs.
   * **Seamless Pitch Glides (Meend)**: Notes smoothly slide into one another over a 0.08s to 0.12s window, sounding like a real singing instrument rather than a staccato beep metronome.
2. **Dynamic Visual Beat Chakra & Fixed HUD**
   * A beautiful, premium geometric circular visualizer that displays the current cycle, beats (Matras), and subdivisions (Vibhags).
   * **Absolute Spatial Locks**: Text elements inside the circle are strictly locked in place, ensuring the Matra count pulses perfectly in place without shifting up and down.
3. **Whistle-Free Coupled Reed Harmonium**
   * Synthesized using a warm **coupler Male Bass reed** and detuned **Female Middle registers** (detuned by +/- 7 cents chorus).
   * Bypasses high-Q whistling spikes by utilizing a single, flat **critically-damped lowpass filter (Q = 0.5 at 900Hz)**, delivering a rich, deep, woody vintage organ resonance.
   * Synchronized bellows LFO (4.2 Hz) modulates both amplitude (5%) and pitch detune (1.5 cents) together to simulate breathing manual air pressure.
4. **Hindustani Bansuri (Flute) & Tanpura Drone**
   * **Flute Tone**: Blends sine and triangle waves with continuous organic vibrato and slow breath glides.
   * **Tanpura Drone**: Blends warm triangle and soft buzzing sawtooth plucks through a bandpass bridge sweep, plucking strings sequentially (`Pa/Ma/Ni` -> `Sa` -> `Sa` -> `Sa`) in the background.
5. **Traditional Taal & Theka Visual Matrix**
   * Flat, low-profile horizontal ribbon that displays bols (e.g. *Dha Dhin Dhin Dha*) and beat designations (Sam, Khali, Tali claps) without visual clutter or scroll hijacking.

---

## 🎨 Technology Stack

* **Structure**: HTML5 Semantic markup, responsive 100vh viewport grid.
* **Aesthetics**: Modern Studio Dark UI using CSS custom variables, Outfit + Playfair typography, smooth keyframe micro-animations, beating heart signature.
* **Logic & Audio**: Pure JavaScript, Web Audio API, dynamic SVG rendering, Legato timeline synchronization.

---

## 🚀 How to Run the App

CodeLehra is built entirely with raw web standards, meaning it has **zero dependencies** and requires no build pipeline.

1. Navigate to the project directory: `C:\Users\dnyan\lehra-app`.
2. Right-click `index.html` and select **Open with...** -> **Google Chrome** (or Edge, Safari, Firefox).
3. Click the glowing **Enable Audio** button (browsers block autoplay audio until a user gestures).
4. Click the dedicated **PLAY** button directly below the circle, and start practicing!

---

## 🎼 Classical Music Details Included

### Supported Taals (Time Cycles):
* **Teental** (16 Beats)
* **Ektaal** (12 Beats)
* **Jhaptal** (10 Beats)
* **Keharwa** (8 Beats)
* **Rupak** (7 Beats)
* **Dadra** (6 Beats)

### Supported Ragas (Melodies):
* **Raga Yaman**: Lydian scale (sharp Ma)
* **Raga Bhairavi**: Phrygian scale (flat Re, Ga, Dha, Ni)
* **Raga Bhupali**: Pentatonic Major (Sa, Re, Ga, Pa, Dha)
* **Raga Kafi**: Dorian scale (flat Ga, Ni)
* **Raga Bilawal**: Major Scale (Natural notes)

*Enjoy your practice, and may your Laya remain unbroken!* 🥁🎹❤️
