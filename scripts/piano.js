// Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// Definicao das teclas
const keys = document.querySelectorAll('.key');

// Variables


// Metodo de pressionar tecla
const handleMouseDown = (key) => {
  if (key.className.includes('blackKey'))
    key.classList.add('blackPressed');
  else
    key.classList.add('whitePressed');

  if (audioCtx.state === "suspended")
  {
    audioCtx.resume(); // libera o contexto se estiver suspenso
  }

  let keys_array = Array.from(keys);
  let current_freq = 440 * (2 ** (((keys_array.indexOf(key) + 12 * (octave-1)) - 69) / 12));
  let audio = generateBuffer(currentWave, current_freq);
  let source = audioCtx.createBufferSource();
  source.buffer = audio;
  source.connect(audioCtx.destination);
  source.start();
};
// Metodo de soltar tecla
const handleMouseUp = (key) => {
  if (key.className.includes('blackKey'))
    key.classList.remove('blackPressed');
  else
    key.classList.remove('whitePressed');
};

// Metodo teclado fisico
const keyDownMapper = {
  "z": () => handleMouseDown(keys[0]),
  "s": () => handleMouseDown(keys[1]),
  "x": () => handleMouseDown(keys[2]),
  "d": () => handleMouseDown(keys[3]),
  "c": () => handleMouseDown(keys[4]),
  "v": () => handleMouseDown(keys[5]),
  "g": () => handleMouseDown(keys[6]),
  "b": () => handleMouseDown(keys[7]),
  "h": () => handleMouseDown(keys[8]),
  "n": () => handleMouseDown(keys[9]),
  "j": () => handleMouseDown(keys[10]),
  "m": () => handleMouseDown(keys[11]),
}

const keyUpMapper = {
  "z": () => handleMouseUp(keys[0]),
  "s": () => handleMouseUp(keys[1]),
  "x": () => handleMouseUp(keys[2]),
  "d": () => handleMouseUp(keys[3]),
  "c": () => handleMouseUp(keys[4]),
  "v": () => handleMouseUp(keys[5]),
  "g": () => handleMouseUp(keys[6]),
  "b": () => handleMouseUp(keys[7]),
  "h": () => handleMouseUp(keys[8]),
  "n": () => handleMouseUp(keys[9]),
  "j": () => handleMouseUp(keys[10]),
  "m": () => handleMouseUp(keys[11]),
}

// Verifica mouse
keys.forEach((key) => {
  key.addEventListener('mousedown', () => handleMouseDown(key));
  key.addEventListener('mouseup', () => handleMouseUp(key));
});

// Verifica teclado fisico
document.addEventListener('keydown', (event) => {
  event.preventDefault();
  keyDownMapper[event.key]();
});

document.addEventListener('keyup', (event) => {
  keyUpMapper[event.key]();
});

// Generate Sound
function generateBuffer(wave, freq)
{
  let samples_per_cycle = Math.floor(wave.w_sample_rate / freq)
  let buffer = audioCtx.createBuffer(1, wave.w_sample_rate, wave.w_sample_rate);

  let samples = buffer.getChannelData(0);

  for (let i = 0; i < wave.w_sample_rate; i++)
  {
    let pos_in_cycle = i % samples_per_cycle;
    samples[i] = (pos_in_cycle < samples_per_cycle / 2) ? 1 : -1;
  }

  return buffer;
}
