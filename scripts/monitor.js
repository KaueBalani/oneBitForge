const canvas = document.getElementById('canvas_monitor');
const ctx = canvas.getContext('2d');
const buffer_length = analyser.fftSize;
const dataArray = new Float32Array(buffer_length);

// Desenhar Onda Quadrada
function drawSquareWave()
{
  requestAnimationFrame(drawSquareWave);
  analyser.getFloatTimeDomainData(dataArray);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "blueviolet";
  ctx.beginPath();

  const sliceWidth = canvas.width / buffer_length;
  let x = 0;

  for (let i = 0; i < buffer_length; i++)
  {
    const v = dataArray[i];
    const y = canvas.height / 2 - v * (canvas.height / 2);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    x += sliceWidth;
  }

  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

// Desenhar Onda Triangular

// Desenhar Onda Dente-de-serra

// Desenhar Ruido

// Update

drawSquareWave();
