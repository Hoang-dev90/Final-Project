const canvas = document.getElementById("tradingChart");
const ctx = canvas.getContext("2d");
const volumeCanvas = document.getElementById("volumeChart");
const volumeCtx = volumeCanvas ? volumeCanvas.getContext("2d") : null;

// Zoom variables
let zoomLevel = 1;
let candleCount = 100;
const MIN_CANDLES = 20;
const MAX_CANDLES = 200;
let volumeData = []; // Store volume data globally

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  if (volumeCanvas) {
    volumeCanvas.width = volumeCanvas.offsetWidth;
    volumeCanvas.height = volumeCanvas.offsetHeight;
  }

  drawChart();
}

function drawChart() {
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Vẽ lưới
  ctx.strokeStyle = "#1e2329";
  ctx.lineWidth = 1;

  // Vẽ lưới ngang
  for (let i = 0; i < 10; i++) {
    const y = (height / 10) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Vẽ lưới dọc
  for (let i = 0; i < 20; i++) {
    const x = (width / 20) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Tạo dữ liệu nến giả
  const priceAxisWidth = 70; // Khoảng trống cho trục giá bên phải
  const chartWidth = width - priceAxisWidth; // Chiều rộng thực tế cho biểu đồ
  const candleWidth = chartWidth / candleCount;
  const basePrice = 88000;

  let currentPrice = basePrice;
  const candles = [];
  volumeData = []; // Reset volume data

  for (let i = 0; i < candleCount; i++) {
    const change = (Math.random() - 0.5) * 500;
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * 200;
    const low = Math.min(open, close) - Math.random() * 200;
    const volume = Math.random() * 5 + 0.5; // Random volume between 0.5 and 5.5
    const isGreen = close > open;

    candles.push({ open, high, low, close });
    volumeData.push({ volume, isGreen });
    currentPrice = close;
  }

  // Vẽ nến
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceScale = height / (maxPrice - minPrice);

  candles.forEach((candle, i) => {
    const x = i * candleWidth;
    const isGreen = candle.close > candle.open;

    // Vẽ đường nến (bấc)
    ctx.strokeStyle = isGreen ? "#0ecb81" : "#f6465d";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(
      x + candleWidth / 2,
      height - (candle.high - minPrice) * priceScale
    );
    ctx.lineTo(
      x + candleWidth / 2,
      height - (candle.low - minPrice) * priceScale
    );
    ctx.stroke();

    // Vẽ thân nến
    ctx.fillStyle = isGreen ? "#0ecb81" : "#f6465d";
    const openY = height - (candle.open - minPrice) * priceScale;
    const closeY = height - (candle.close - minPrice) * priceScale;
    const bodyHeight = Math.abs(closeY - openY);

    ctx.fillRect(
      x + candleWidth * 0.2,
      Math.min(openY, closeY),
      candleWidth * 0.6,
      Math.max(bodyHeight, 1)
    );
  });

  // Vẽ MA lines
  const ma5 = calculateMA(candles, 5);
  const ma10 = calculateMA(candles, 10);
  const ma15 = calculateMA(candles, 15);
  const ma30 = calculateMA(candles, 30);

  drawMALine(ma5, "#2962ff", minPrice, priceScale, candleWidth);
  drawMALine(ma10, "#ff6d00", minPrice, priceScale, candleWidth);
  drawMALine(ma15, "#9c27b0", minPrice, priceScale, candleWidth);
  drawMALine(ma30, "#f6465d", minPrice, priceScale, candleWidth);

  // Vẽ giá trên trục Y
  ctx.fillStyle = "#848e9c";
  ctx.font = "12px Arial";
  ctx.textAlign = "right";
  for (let i = 0; i <= 10; i++) {
    const price = minPrice + (maxPrice - minPrice) * (i / 10);
    const y = height - (height / 10) * i;
    ctx.fillText(price.toFixed(2), width - 5, y + 3);
  }

  // Update chart info
  updateChartInfo(candles, ma5, ma10, ma15, ma30);

  // Draw volume chart
  drawVolumeChart();
}

function calculateMA(candles, period) {
  const ma = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      ma.push(null);
    } else {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += candles[i - j].close;
      }
      ma.push(sum / period);
    }
  }
  return ma;
}

function drawMALine(ma, color, minPrice, priceScale, candleWidth) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();

  let started = false;
  ma.forEach((value, i) => {
    if (value !== null) {
      const x = i * candleWidth + candleWidth / 2;
      const y = canvas.height - (value - minPrice) * priceScale;

      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
  });

  ctx.stroke();
}

function drawVolumeChart() {
  if (!volumeCanvas || !volumeCtx) return;

  const width = volumeCanvas.width;
  const height = volumeCanvas.height;

  volumeCtx.clearRect(0, 0, width, height);

  // Draw background
  volumeCtx.fillStyle = "#0a0e12";
  volumeCtx.fillRect(0, 0, width, height);

  // Calculate dimensions
  const priceAxisWidth = 70;
  const chartWidth = width - priceAxisWidth;
  const barWidth = chartWidth / candleCount;

  // Find max volume for scaling
  if (volumeData.length === 0) return;

  const maxVolume = Math.max(...volumeData.map((d) => d.volume));
  const volumeScale = height / maxVolume;

  // Draw volume bars
  volumeData.forEach((data, i) => {
    const x = i * barWidth;
    const barHeight = data.volume * volumeScale;

    // Set color based on candle direction
    volumeCtx.fillStyle = data.isGreen
      ? "rgba(14, 203, 129, 0.5)"
      : "rgba(246, 70, 93, 0.5)";

    volumeCtx.fillRect(
      x + barWidth * 0.1,
      height - barHeight,
      barWidth * 0.8,
      barHeight
    );
  });

  // Draw volume label background
  volumeCtx.fillStyle = "rgba(19, 23, 34, 0.9)";
  volumeCtx.fillRect(8, 2, 90, 16);

  // Draw volume text label
  volumeCtx.fillStyle = "#848e9c";
  volumeCtx.font = "10px Arial";
  volumeCtx.textAlign = "left";
  volumeCtx.fillText("Volume", 12, 12);

  // Draw current volume value
  const currentVolume = volumeData[volumeData.length - 1]?.volume || 0;
  volumeCtx.fillStyle = "#f6465d";
  volumeCtx.font = "10px Arial";
  volumeCtx.fillText(currentVolume.toFixed(6), 55, 12);
}

function updateChartInfo(candles, ma5, ma10, ma15, ma30) {
  const lastCandle = candles[candles.length - 1];
  const previousCandle = candles[candles.length - 2];

  const change = lastCandle.close - previousCandle.close;
  const changePercent = ((change / previousCandle.close) * 100).toFixed(2);

  // Format number with comma separator
  const formatPrice = (price) => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Update OHLC values
  document.getElementById("chartOpen").textContent = formatPrice(
    lastCandle.open
  );
  document.getElementById("chartHigh").textContent = formatPrice(
    lastCandle.high
  );
  document.getElementById("chartLow").textContent = formatPrice(lastCandle.low);
  document.getElementById("chartClose").textContent = formatPrice(
    lastCandle.close
  );

  // Update change value
  const changeElement = document.getElementById("chartChange");
  changeElement.textContent = `${change > 0 ? "+" : ""}${change.toFixed(
    2
  )} (${changePercent}%)`;
  changeElement.className =
    change >= 0 ? "chart-change positive" : "chart-change";

  // Update MA values
  const lastIndex = candles.length - 1;
  if (ma5[lastIndex]) {
    document.getElementById("ma5Value").textContent = formatPrice(
      ma5[lastIndex]
    );
  }
  if (ma10[lastIndex]) {
    document.getElementById("ma10Value").textContent = formatPrice(
      ma10[lastIndex]
    );
  }
  if (ma15[lastIndex]) {
    document.getElementById("ma15Value").textContent = formatPrice(
      ma15[lastIndex]
    );
  }
  if (ma30[lastIndex]) {
    document.getElementById("ma30Value").textContent = formatPrice(
      ma30[lastIndex]
    );
  }
}

// Mouse wheel zoom functionality
canvas.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    const zoomSpeed = 0.1;
    const delta = e.deltaY > 0 ? -1 : 1;

    // Update candle count based on zoom direction
    const newCandleCount = candleCount - delta * 10;

    // Clamp to min/max values
    if (newCandleCount >= MIN_CANDLES && newCandleCount <= MAX_CANDLES) {
      candleCount = newCandleCount;
      zoomLevel = 100 / candleCount;
      drawChart();
    }
  },
  { passive: false }
);

// Add wheel event to volume canvas too
if (volumeCanvas) {
  volumeCanvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      const delta = e.deltaY > 0 ? -1 : 1;
      const newCandleCount = candleCount - delta * 10;

      if (newCandleCount >= MIN_CANDLES && newCandleCount <= MAX_CANDLES) {
        candleCount = newCandleCount;
        zoomLevel = 100 / candleCount;
        drawChart();
      }
    },
    { passive: false }
  );
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Ticker functionality
const tickerData = [
  { name: "BTCUSDT", price: "87,848.37", change: -0.91 },
  { name: "ETHUSDT", price: "3,312.54", change: 2.34 },
  { name: "SOLUSDT", price: "234.67", change: 4.82 },
  { name: "XRPUSDT", price: "1.42", change: 7.7 },
  { name: "BNBUSDT", price: "612.45", change: 1.23 },
  { name: "ADAUSDT", price: "0.89", change: -2.15 },
  { name: "DOGEUSDT", price: "0.38", change: 5.67 },
  { name: "DOTUSDT", price: "7.23", change: -1.45 },
  { name: "MATICUSDT", price: "0.92", change: 3.21 },
  { name: "LTCUSDT", price: "85.34", change: 0.89 },
  { name: "LINKUSDT", price: "14.67", change: 2.56 },
  { name: "AVAXUSDT", price: "38.92", change: -0.78 },
];

function createTicker() {
  const tickerContent = document.getElementById("tickerContent");
  if (!tickerContent) return;

  let tickerHTML = "";
  const tickerDataDouble = [...tickerData, ...tickerData];

  tickerDataDouble.forEach((crypto) => {
    const isPositive = crypto.change > 0;
    const changeClass = isPositive ? "positive" : "negative";
    const changeSign = isPositive ? "+" : "";

    tickerHTML += `
      <div class="ticker-item">
        <span class="ticker-pair">${crypto.name.replace(
          "USDT",
          " / USDT"
        )}</span>
        <span class="ticker-price">$${crypto.price}</span>
        <span class="ticker-change ${changeClass}">${changeSign}${
      crypto.change
    }%</span>
      </div>
    `;
  });

  tickerContent.innerHTML = tickerHTML;
}

// Initialize ticker on page load
document.addEventListener("DOMContentLoaded", createTicker);
createTicker();
