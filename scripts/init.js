// Elementos
const selectWaveForm = document.getElementById('WfSelect');
const selectQuality = document.getElementById('QSelect');
const selectBits = document.getElementById('BSelect');
const selectOctave = document.getElementById('selectOctave')
const rangeDutyCycle = document.getElementById('DCRange');
const rangeDecay = document.getElementById('DcyRange');
const rangeAttack = document.getElementById('AtkRange');
const rangeRelease = document.getElementById('RlseRange');
const rangeSustain = document.getElementById('SusRange');
const infoDC = document.getElementById('DCRangeInfo');
const infoDec = document.getElementById('DcyRangeInfo');
const infoAtk = document.getElementById('AtkRangeInfo');
const infoRlse = document.getElementById('RlseRangeInfo');
const infoSus = document.getElementById('SusRangeInfo');
const numberFirstOctave = document.getElementById('firstOctave');
const numberLastOctave = document.getElementById('lastOctave');

//Valores padrao
const DEFAULT_SAMPLE_RATE = 8000;
const DEFAULT_FREQUENCY = 440;
const DEFAULT_AMPLITUDE = 1;
const DEFAULT_OSC_SCALE = 50;
const DEFAULT_WAVE_TYPE = "SQUARE";
const DEFAULT_DUTY_CYCLE = 50;
const DEFAULT_DECAY = 0;
const DEFAULT_RELEASE = 0;
const DEFAULT_SUSTAIN = 0;
const DEFAULT_ATTACK = 0;
const DEFAULT_OCTAVE = 4;
const DEFAULT_BITS = 1;
const DEFAULT_FIRST_OCTAVE = 3;
const DEFAULT_LAST_OCTAVE = 7;

// Variaveis
var sample_rate = DEFAULT_SAMPLE_RATE;
var frequency = DEFAULT_FREQUENCY;
var amplitude = DEFAULT_AMPLITUDE;
var wave_type = DEFAULT_WAVE_TYPE;
var dutyCycle = DEFAULT_DUTY_CYCLE;
var decay = DEFAULT_DECAY;
var release = DEFAULT_RELEASE;
var sustain = DEFAULT_SUSTAIN;
var attack = DEFAULT_ATTACK;
var octave = DEFAULT_OCTAVE;
var q_bits = DEFAULT_BITS;
var first_octave = DEFAULT_FIRST_OCTAVE;
var last_octave = DEFAULT_LAST_OCTAVE;

// Atualizar variaveis
function updateVars()
{
  selectQuality.addEventListener("change", () =>
  {
    sample_rate = parseFloat(selectQuality.value);
    currentWave = verifyWaveType();
  })
  selectWaveForm.addEventListener("change", () =>
  {
    wave_type = selectWaveForm.value;
    currentWave = verifyWaveType();
  })
  selectBits.addEventListener("change", () => {
    q_bits = parseInt(selectBits.value);
    if (q_bits == 1)
    {
      rangeAttack.value = 0;
      rangeDecay.value = 0;
      rangeRelease.value = 0;
      rangeSustain.value = 0;

      infoAtk.innerHTML = '0%';
      infoDec.innerHTML = '0%';
      infoRlse.innerHTML = '0%';
      infoSus.innerHTML = '0%';


      rangeAttack.setAttribute('disabled', 'disabled');
      rangeDecay.setAttribute('disabled', 'disabled');
      rangeRelease.setAttribute('disabled', 'disabled');
      rangeSustain.setAttribute('disabled', 'disabled');
    }
    else
    {
      rangeAttack.removeAttribute('disabled');
      rangeDecay.removeAttribute('disabled');
      rangeRelease.removeAttribute('disabled');
      rangeSustain.removeAttribute('disabled');
    }
    currentWave = verifyWaveType();
  })
  selectOctave.addEventListener("change", () =>{
    octave = parseInt(selectOctave.value);
    currentWave = verifyWaveType();
  })
  rangeDutyCycle.addEventListener("change", () =>
  {
    dutyCycle = parseFloat(rangeDutyCycle.value);
    infoDC.innerHTML = dutyCycle.toString() + '%';
    currentWave = verifyWaveType();
  })
  rangeDecay.addEventListener("change", () =>
  {
    decay = parseFloat(rangeDecay.value);
    infoDec.innerHTML = decay.toString() + ' ms';
    currentWave = verifyWaveType();
  })
  rangeRelease.addEventListener("change", () =>
  {
    release = parseFloat(rangeRelease.value);
    infoRlse.innerHTML = release.toString() + ' ms';
    currentWave = verifyWaveType();
  })
  rangeSustain.addEventListener("change", () =>
  {
    sustain = parseFloat(rangeSustain.value);
    infoSus.innerHTML = sustain.toString() + '%';
    currentWave = verifyWaveType();
  })
  rangeAttack.addEventListener("change", () =>
  {
    attack = parseFloat(rangeAttack.value);
    infoAtk.innerHTML = attack.toString() + ' ms';
    currentWave = verifyWaveType();
  })
  numberFirstOctave.addEventListener("change", () =>
  {
    first_octave = parseInt(numberFirstOctave.value);
  })
  numberLastOctave.addEventListener("change", () =>
  {
    last_octave = parseInt(numberLastOctave.value);
  })
}

setInterval(updateVars, 100);
