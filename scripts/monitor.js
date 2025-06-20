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
const rangeOscScale = document.getElementById('OscScale');
const infoDC = document.getElementById('DCRangeInfo');
const infoDec = document.getElementById('DcyRangeInfo');
const infoAtk = document.getElementById('AtkRangeInfo');
const infoRlse = document.getElementById('RlseRangeInfo');
const infoSus = document.getElementById('SusRangeInfo');


const canvas = document.getElementById('canvas_monitor');
const ctx = canvas.getContext('2d');

//Valores padrao
const DEFAULT_SAMPLE_RATE = 8000;
const DEFAULT_FREQUENCY = 440;
const DEFAULT_AMPLITUDE = 1;
const DEFAULT_OSC_SCALE = 50;
const DEFAULT_WAVE_TYPE = "SQUARE";
const DEFAULT_DUTY_CYCLE = 0;
const DEFAULT_DECAY = 0;
const DEFAULT_RELEASE = 0;
const DEFAULT_SUSTAIN = 0;
const DEFAULT_ATTACK = 0;
const DEFAULT_OCTAVE = 1;
const DEFAULT_BITS = 1;

// Variaveis
var sample_rate = DEFAULT_SAMPLE_RATE;
var frequency = DEFAULT_FREQUENCY;
var amplitude = DEFAULT_AMPLITUDE;
var osc_scale = DEFAULT_OSC_SCALE;
var wave_type = DEFAULT_WAVE_TYPE;
var dutyCycle = DEFAULT_DUTY_CYCLE;
var decay = DEFAULT_DECAY;
var release = DEFAULT_RELEASE;
var sustain = DEFAULT_SUSTAIN;
var attack = DEFAULT_ATTACK;
var octave = DEFAULT_OCTAVE;

// Atualizar variaveis
function updateVars()
{
  let ch = false;
  selectQuality.addEventListener("change", () =>
  {
    sample_rate = parseFloat(selectQuality.value);
    ch = true;
  })
  rangeOscScale.addEventListener("change", () =>
  {
    osc_scale = parseFloat(rangeOscScale.value);
    ch = true;
  })
  selectWaveForm.addEventListener("change", () =>
  {
    wave_type = selectWaveForm.value;
    ch = true;
  })
  selectOctave.addEventListener("change", () =>{
    octave = selectOctave.value;
    ch = true;
  })
  rangeDutyCycle.addEventListener("change", () =>
  {
    dutyCycle = parseFloat(rangeDutyCycle.value);
    infoDC.innerHTML = dutyCycle.toString() + '%';
    ch = true;
  })
  rangeDecay.addEventListener("change", () =>
  {
    decay = parseFloat(rangeDecay.value);
    infoDec.innerHTML = decay.toString() + '%';
    ch = true;
  })
  rangeRelease.addEventListener("change", () =>
  {
    release = parseFloat(rangeRelease.value);
    infoRlse.innerHTML = release.toString() + '%';
    ch = true;
  })
  rangeSustain.addEventListener("change", () =>
  {
    sustain = parseFloat(rangeSustain.value);
    infoSus.innerHTML = sustain.toString() + '%';
    ch = true;
  })
  rangeAttack.addEventListener("change", () =>
  {
    attack = parseFloat(rangeAttack.value);
    infoAtk.innerHTML = attack.toString() + '%';
    ch = true;
  })
  if (ch == true)
  {
    verifyWaveType();
    ch = false;
  }
}

// Desenhar Onda Quadrada
function drawSquareWave()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  let bit = 0;
  var samp_half_cycle = canvas.width / (2 * frequency) * osc_scale;

  for (let i = 0; i < canvas.width; i++)
  {
    bit = (Math.floor(i/samp_half_cycle) % 2);
    let y = bit ? 20 : 100;
    ctx.lineTo(i, y);

  }
  ctx.strokeStyle = 'blueviolet';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Desenhar Onda Triangular

// Desenhar Onda Dente-de-serra

// Desenhar Ruido

setInterval(updateVars, 100);
//setInterval(verifyWaveType, 100)
