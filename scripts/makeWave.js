// Constants
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Classes
class Wave{
  constructor(sr, t)
  {
    this.w_sample_rate = sr;
    this.w_type = t;
  }
}

class SquareWave extends Wave{
  constructor(sr, t, dc, dcy, rls, sus, atk, b)
  {
    super(sr, t);
    this.w_duty_cycle = dc;
    this.w_decay = dcy;
    this.w_release = rls;
    this.w_sustain = sus;
    this.w_attack = atk;
    this.bits = b;
  }
}

// Variables
var currentWave;

// Initial State
function initialState()
{
  rangeDutyCycle.value = DEFAULT_DUTY_CYCLE;
  rangeAttack.value = DEFAULT_ATTACK;
  rangeDecay.value = DEFAULT_DECAY;
  rangeRelease.value = DEFAULT_RELEASE;
  rangeSustain.value = DEFAULT_SUSTAIN;

  rangeAttack.setAttribute('disabled', 'disabled');
  rangeDecay.setAttribute('disabled', 'disabled');
  rangeRelease.setAttribute('disabled', 'disabled');
  rangeSustain.setAttribute('disabled', 'disabled');

  infoDC.innerHTML = DEFAULT_DUTY_CYCLE.toString() + '%';
  infoAtk.innerHTML = DEFAULT_ATTACK.toString() + ' ms';
  infoDec.innerHTML = DEFAULT_DECAY.toString() + ' ms';
  infoRlse.innerHTML = DEFAULT_RELEASE.toString() + ' ms';
  infoSus.innerHTML = DEFAULT_SUSTAIN.toString() + '%';

  selectWaveForm.value = DEFAULT_WAVE_TYPE;
  selectQuality.value = DEFAULT_SAMPLE_RATE.toString();
  selectBits.value = DEFAULT_BITS.toString();
  selectOctave.value = DEFAULT_OCTAVE.toString();

  numberFirstOctave.value = DEFAULT_FIRST_OCTAVE.toString();
  numberLastOctave.value = DEFAULT_LAST_OCTAVE.toString();

  currentWave = verifyWaveType();
}

initialState();

// Verify Wave Type
function verifyWaveType()
{
  if (wave_type == "SQUARE")
  {
    return new SquareWave(sample_rate, wave_type, dutyCycle, decay, release, sustain, attack, q_bits);
  }
  if (wave_type == "TRIANGLE")
  {
    return null;
  }
  if (wave_type == "SAWTOOTH")
  {
    return null;
  }
  // Noise
  return null;
}

// Generate Sound

function applyADSR(t, noteOnTime, noteOffTime, adsr)
{
  const elapsed = t - noteOnTime;
  const released = t > noteOffTime;
  const releaseElapsed = t - noteOffTime;

  if (released)
  {
    if (releaseElapsed >= adsr.release) return 0;
    return adsr.sustain * (1 - releaseElapsed / adsr.release);
  }

  if (elapsed < adsr.attack) return elapsed / adsr.attack;

  const decayElapsed = elapsed - adsr.attack;
  if (decayElapsed < adsr.decay)
  {
    return 1.0 - (1.0 - adsr.sustain) * (decayElapsed / adsr.decay);
  }

  return adsr.sustain;
}

function generateBufferSquare(wave, freq)
{
  let rate = wave.w_sample_rate || 44100;
  const msToSamples = ms => (ms / 1000) * rate;
  let duration = (wave.w_attack + wave.w_decay + wave.w_release)/1000 || 1;

  let samples_per_cycle = Math.floor(rate / freq)
  let duty = wave.w_duty_cycle ?? 50;
  let threshold = Math.floor(samples_per_cycle * (duty / 100));
  //let releaseSamples = msToSamples(wave.w_release);
  let total_samples = Math.floor(rate * duration);

  let buffer = audioCtx.createBuffer(1, total_samples, rate);
  let samples = buffer.getChannelData(0);

  let noteOnTime = 0;
  let noteOffTime = msToSamples(wave.w_attack + wave.w_decay);
  if (wave.bits == 1)
  {
    for (let i = 0; i < total_samples; i++)
    {
      let pos_in_cycle = i % samples_per_cycle;
      samples[i] = (pos_in_cycle < threshold) ? 1.0 : -1.0;
    }
  }
  else
  {
    for (let i = 0; i < total_samples; i++)
    {
      let pos_in_cycle = i % samples_per_cycle;
      let base = (pos_in_cycle < threshold) ? 1.0 : -1.0;

      let envelope = applyADSR(i,
        noteOnTime,
        noteOffTime,
        {
          attack: msToSamples(wave.w_attack),
          decay: msToSamples(wave.w_decay),
          sustain: wave.w_sustain / 100,
          release: msToSamples(wave.w_release),
        }
      );
      samples[i] = Math.max(-1, Math.min(1, base * envelope));
    }
  }
  return buffer;
}

function float32ToInt16(buffer) {
  const output = new Int16Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    output[i] = Math.max(-32768, Math.min(32767, buffer[i] * 32767));
  }
  return output;
}

function generateWav(freq)
{
  let b = new generateBufferSquare(currentWave, freq).getChannelData(0)
  let myBuffer = float32ToInt16(b);
  const wav = new wavefile.WaveFile();
  wav.fromScratch(1, currentWave.w_sample_rate, '16', myBuffer);

  const wavBlob = new Blob([wav.toBuffer()], { type: 'audio/wav' });
  return wavBlob;
}

function generateFile() {
  const wavArray = [];
  for (let i = first_octave; i <= last_octave; i++)
    for (let j = 0; j < 12; j++) {
      let midi_note = j + 12 * (i + 1);
      let freq = 440 * (2 ** ((midi_note - 69) / 12));
      wavArray.push(generateWav(freq));
    }

  const sfz_content = [];
  sfz_content.push("<group>");

  const zip = new JSZip();

  wavArray.forEach((blob, i) => {
    let key = notes[i%12];
    let midi_note = i + 12 * (first_octave + 1)
    let current_octave = Math.floor(i / 12) + first_octave;
    let filename = `${key}${current_octave}.wav`;

    sfz_content.push(`<region key=${midi_note} sample=${filename}>`)
    zip.file(`${filename}`, blob);
  })
  const sfzBlob = new Blob([sfz_content.join('\n')], { type: 'text/plain' });
  zip.file('Instrument.sfz', sfzBlob);

  zip.generateAsync({ type: "blob" }).then(content => {
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instrument.zip';
    a.click();
  });
}
