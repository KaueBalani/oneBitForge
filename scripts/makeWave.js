// Classes
class Wave{
  constructor(sr, t)
  {
    this.w_sample_rate = sr;
    this.w_type = t;
  }
}

class SquareWave extends Wave{
  constructor(sr, f, a, t, dc, dcy, rls, sus, atk, b)
  {
    super(sr, f, a, t);
    this.w_duty_cycle = dc;
    this.w_decay = dcy;
    this.w_release = rls;
    this.w_sustain = sus;
    this.w_attack = atk;
    this.bits = b;
  }
}

// Variables
var q_bits = DEFAULT_BITS;
var currentWave = new SquareWave(sample_rate, wave_type, dutyCycle, decay, release, sustain, attack, q_bits);;

// Verify Wave Type
function verifyWaveType()
{
  if (wave_type == "SQUARE")
  {
    currentWave = new SquareWave(sample_rate, wave_type, dutyCycle, decay, release, sustain, attack, q_bits);
  }
  if (wave_type == "TRIANGLE")
  {

  }
  if (wave_type == "SAWTOOTH")
  {

  }
  if (wave_type == "NOISE")
  {

  }
}
