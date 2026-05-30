import os
import numpy as np
import soundfile as sf

# Path to the reference file
AUDIO_PATH = "Madhya Teentaal Lehra  Kirwani  C#  Live Harmonium  80bpm  108 cycles  Saadhana - ShubhaSur Creations.mp3"

def main():
    print("=" * 60)
    print("CODELEHRA AUDIO SPECTRAL ANALYZER")
    print("=" * 60)
    
    if not os.path.exists(AUDIO_PATH):
        print(f"Error: Reference file '{AUDIO_PATH}' not found in the directory.")
        return
        
    print(f"Opening reference file: {AUDIO_PATH}")
    try:
        # Open file using soundfile
        with sf.SoundFile(AUDIO_PATH) as f:
            samplerate = f.samplerate
            channels = f.channels
            frames = f.frames
            duration = frames / samplerate
            
            print(f"Sample Rate : {samplerate} Hz")
            print(f"Channels    : {channels}")
            print(f"Duration    : {duration:.2f} seconds (~{duration/60:.2f} minutes)")
            print(f"Total Frames: {frames}")
            print("-" * 60)
            
            # Read a 15-second stable section of the audio (e.g., around 12-27 seconds in)
            start_sec = 12.0
            duration_sec = 15.0
            
            f.seek(int(start_sec * samplerate))
            data = f.read(int(duration_sec * samplerate))
            
            # Convert to mono if stereo
            if len(data.shape) > 1 and channels > 1:
                data = np.mean(data, axis=1)
                
            print(f"Analyzing {duration_sec}s snippet from t={start_sec}s...")
            
            # --- FFT SPECTRAL ANALYSIS ---
            # Use a Hanning window to prevent spectral leakage
            window = np.hanning(len(data))
            windowed_data = data * window
            
            # FFT
            fft_result = np.fft.rfft(windowed_data)
            frequencies = np.fft.rfftfreq(len(data), d=1.0/samplerate)
            amplitudes = np.abs(fft_result)
            
            # Find the peak frequency in the vocal/harmonium range (100Hz - 2000Hz)
            valid_idx = (frequencies >= 100) & (frequencies <= 2000)
            peak_idx = np.argmax(amplitudes[valid_idx])
            peak_freq = frequencies[valid_idx][peak_idx]
            
            print(f"\nDominant Peak Frequency: {peak_freq:.2f} Hz")
            
            # Sa in Hindustani Music C#4 is ~277.18Hz
            # Let's find the true fundamental frequency F0
            # Look for the highest peak below 350Hz as the likely fundamental Sa/Pa
            low_idx = (frequencies >= 120) & (frequencies <= 320)
            if np.any(low_idx):
                f0_peak_idx = np.argmax(amplitudes[low_idx])
                f0 = frequencies[low_idx][f0_peak_idx]
            else:
                f0 = peak_freq
                
            print(f"Detected Base Fundamental (Sa): {f0:.2f} Hz (ideal C#4 is 277.18 Hz)")
            
            # Analyze harmonics of f0: 1*f0, 2*f0, 3*f0, 4*f0, 5*f0, 6*f0, etc.
            harmonics = []
            print("\nHarmonic Spectrum Analysis:")
            print(f"{'Harmonic':<12} | {'Ideal Freq (Hz)':<15} | {'Detected Freq (Hz)':<18} | {'Relative Strength':<18}")
            print("-" * 70)
            
            fundamental_amp = 0
            for i in range(1, 9):
                target_f = f0 * i
                # Scan a narrow window around target frequency
                scan_win = (frequencies >= target_f - 15) & (frequencies <= target_f + 15)
                if np.any(scan_win):
                    h_idx = np.argmax(amplitudes[scan_win])
                    actual_f = frequencies[scan_win][h_idx]
                    amp = amplitudes[scan_win][h_idx]
                    
                    if i == 1:
                        fundamental_amp = amp
                    
                    rel_strength = amp / fundamental_amp if fundamental_amp > 0 else 0
                    harmonics.append((i, actual_f, rel_strength))
                    print(f"{f'{i}x (f0*{i})':<12} | {target_f:<15.2f} | {actual_f:<18.2f} | {rel_strength:<18.4f}")
                else:
                    harmonics.append((i, target_f, 0.0))
                    print(f"{f'{i}x (f0*{i})':<12} | {target_f:<15.2f} | {'Not Detected':<18} | {0.0:<18.4f}")
            
            # --- VIBRATO (BELLOWS LFO) RATE DETECTION ---
            print("\nAnalyzing Vibrato / Bellows Modulations...")
            segment_length = int(0.25 * samplerate) # 250ms chunks
            hop_length = int(0.05 * samplerate)     # 50ms overlap
            
            t_centers = []
            freq_track = []
            amp_track = []
            
            num_segments = (len(data) - segment_length) // hop_length
            for j in range(num_segments):
                start = j * hop_length
                end = start + segment_length
                chunk = data[start:end] * np.hanning(segment_length)
                
                chunk_fft = np.fft.rfft(chunk)
                chunk_freqs = np.fft.rfftfreq(segment_length, d=1.0/samplerate)
                chunk_amps = np.abs(chunk_fft)
                
                # Look for the peak around our base fundamental f0
                chunk_win = (chunk_freqs >= f0 - 20) & (chunk_freqs <= f0 + 20)
                if np.any(chunk_win):
                    p_idx = np.argmax(chunk_amps[chunk_win])
                    p_freq = chunk_freqs[chunk_win][p_idx]
                    p_amp = chunk_amps[chunk_win][p_idx]
                    
                    t_centers.append((start + segment_length/2) / samplerate)
                    freq_track.append(p_freq)
                    amp_track.append(p_amp)
            
            # Find the frequency of this track's fluctuation (LFO Rate)
            if len(freq_track) > 10:
                freq_track = np.array(freq_track)
                amp_track = np.array(amp_track)
                
                # Detrend frequency track to find modulation rate
                freq_detrended = freq_track - np.mean(freq_track)
                freq_fft = np.fft.rfft(freq_detrended)
                fft_lfo_freqs = np.fft.rfftfreq(len(freq_track), d=0.05) # 50ms hop
                
                # Look for LFO between 2Hz and 8Hz (standard bellows range)
                lfo_win = (fft_lfo_freqs >= 2) & (fft_lfo_freqs <= 8)
                if np.any(lfo_win):
                    lfo_peak = np.argmax(np.abs(freq_fft)[lfo_win])
                    lfo_rate = fft_lfo_freqs[lfo_win][lfo_peak]
                    
                    # Vibrato depth in cents: cents = 1200 * log2(f_max / f_min)
                    f_max = np.percentile(freq_track, 95)
                    f_min = np.percentile(freq_track, 5)
                    vibrato_cents = 1200 * np.log2(f_max / f_min) if f_min > 0 else 0
                    
                    print(f"Detected Bellows LFO Rate : {lfo_rate:.2f} Hz")
                    print(f"Detected Vibrato Depth     : ±{vibrato_cents/2:.1f} cents")
                else:
                    print("Bellows LFO Rate : Slow/Manual (no regular vibrato detected)")
                    
                # Volume amplitude fluctuations
                amp_detrended = amp_track - np.mean(amp_track)
                amp_percent = (np.percentile(amp_track, 95) - np.percentile(amp_track, 5)) / np.mean(amp_track) * 100
                print(f"Volume Pulsing Depth       : ~{amp_percent:.1f}% amplitude swell")
            
            # --- LOWPASS FILTER ROLL-OFF ESTIMATION ---
            print("\nEstimating Lowpass Filter Profile (Woody Tone):")
            active_h_strengths = [h[2] for h in harmonics[1:] if h[2] > 0.01]
            if len(active_h_strengths) > 1:
                x_log = np.log([h[0] for h in harmonics if h[2] > 0.01])
                y_log = np.log([h[2] for h in harmonics if h[2] > 0.01])
                slope, intercept = np.polyfit(x_log, y_log, 1)
                
                db_per_octave = slope * 6.02
                print(f"Spectral Slope             : {slope:.2f} (decay of {db_per_octave:.1f} dB per octave)")
                
                # Recommend cutoff frequency
                # Find where the amplitude falls below -24dB (0.063 relative strength)
                cutoff_freq = 900
                for h in harmonics:
                    if h[2] < 0.06:
                        cutoff_freq = h[1]
                        break
                print(f"Recommended Filter Cutoff  : {cutoff_freq:.1f} Hz")
            else:
                print("Recommended Filter Cutoff  : 950 Hz (Standard Woody Harmonium Roll-off)")
                
    except Exception as e:
        print(f"Error decoding or analyzing audio file: {e}")
        
    print("=" * 60)

if __name__ == "__main__":
    main()
