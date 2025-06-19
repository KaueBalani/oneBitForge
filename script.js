// Elementos
const selectWaveForm = document.getElementById('WfSelect');
const selectQuality = document.getElementById('QSelect');
const selectBits = document.getElementById('BSelect');
const rangeDutyCycle = document.getElementById('DCRange');
const rangeDecay = document.getElementById('DcyRange');
const rangeRelease = document.getElementById('RlseRange');
const rangeSustain = document.getElementById('SusRange');
const rangeOscScale = document.getElementById('OscScale');

const canvas = document.getElementById('canvas_monitor');
const ctx = canvas.getContext('2d');

//Valores padrao
const DEFAULT_SAMPLE_RATE = 8000;
const DEFAULT_FREQUENCY = 440;
const DEFAULT_AMPLITUDE = 1;
const DEFAULT_OSC_SCALE = 50;
const DEFAULT_WAVE_TYPE = "SQUARE";

// Variaveis
var sample_rate = DEFAULT_SAMPLE_RATE;
var frequency = DEFAULT_FREQUENCY;
var amplitude = DEFAULT_AMPLITUDE;
var osc_scale = DEFAULT_OSC_SCALE;
var wave_type = DEFAULT_WAVE_TYPE

// Atualizar variaveis
function updateVars()
{
  selectQuality.addEventListener("change", () =>
  {
    sample_rate = parseFloat(selectQuality.value);
  })
  rangeOscScale.addEventListener("change", () =>
  {
    osc_scale = parseFloat(rangeOscScale.value);
  })
  selectWaveForm.addEventListener("change", () =>
  {
    wave_type = selectWaveForm.value;
  })
}

// Verificar tipo de Onda

function verifyWaveType()
{
  if (wave_type === "SQUARE") drawSquareWave();
  if (wave_type === "TRIANGLE") pass;
  if (wave_type === "SAWTOOTH") pass;
  if (wave_type === "NOISE") pass;
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
setInterval(verifyWaveType, 100)
