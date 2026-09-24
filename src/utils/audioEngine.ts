// Synthetic audio engine using Web Audio API so tracks produce real chill music playback
class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private volume = 0.7;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTrack(trackId: string, onTick?: (secDelta: number) => void) {
    this.initContext();
    if (!this.ctx) return;

    this.stop();
    this.isPlaying = true;

    // Create master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // Generate chill melodic chord progression base frequency based on trackId
    const baseFreqs = trackId.includes('bosca')
      ? [130.81, 164.81, 196.00, 246.94] // C3 maj7
      : trackId.includes('jakarta')
      ? [110.00, 130.81, 164.81, 196.00] // A2 min7
      : trackId.includes('vol')
      ? [146.83, 174.61, 220.00, 261.63] // D3 min7
      : [123.47, 146.83, 185.00, 220.00]; // B2 min7

    const chordOscs = baseFreqs.map((freq) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // Add gentle vibrato
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.setValueAtTime(2.5, this.ctx!.currentTime);
      lfoGain.gain.setValueAtTime(1.5, this.ctx!.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.12, this.ctx!.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.gainNode!);
      osc.start();

      return osc;
    });

    this.oscillators = chordOscs;

    if (this.timer) {
      window.clearInterval(this.timer);
    }

    this.timer = window.setInterval(() => {
      if (this.isPlaying && onTick) {
        onTick(1);
      }
    }, 1000);
  }

  public pause() {
    this.isPlaying = false;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    }
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  public resume(onTick?: (secDelta: number) => void) {
    if (!this.ctx) return;
    this.initContext();
    this.isPlaying = true;
    if (this.gainNode) {
      this.gainNode.gain.setTargetAtTime(this.volume * 0.15, this.ctx.currentTime, 0.05);
    }
    if (this.timer) {
      window.clearInterval(this.timer);
    }
    this.timer = window.setInterval(() => {
      if (this.isPlaying && onTick) {
        onTick(1);
      }
    }, 1000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.oscillators = [];
  }

  public setVolume(vol: number) {
    this.volume = vol;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(this.isPlaying ? this.volume * 0.15 : 0, this.ctx.currentTime, 0.05);
    }
  }
}

export const audioEngine = new AudioEngine();
