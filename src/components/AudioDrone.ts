// Ambient Investigation Sound Engine using Web Audio API
class ParanormalAudioEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private isRunning: boolean = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, now + 2);
      this.gainNode.connect(this.ctx.destination);

      // Low Infrasonic Sub-bass Drone (48Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(48, now);

      // Slow Detuned Drone (52Hz) for binaural phasing
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(51.8, now);

      // Filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, now);

      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.gainNode);

      this.osc1.start();
      this.osc2.start();
      this.isRunning = true;
    } catch (e) {
      console.warn('Web Audio not allowed or failed', e);
    }
  }

  public stop() {
    if (!this.isRunning || !this.ctx || !this.gainNode) return;
    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1);

      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
        } catch {}
        this.isRunning = false;
      }, 1000);
    } catch (e) {
      this.isRunning = false;
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const audioEngine = new ParanormalAudioEngine();
