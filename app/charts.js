// Small canvas chart helpers for Japan in Figures. No library: every chart is
// drawn with the canvas 2D API, so the site stays light and fully offline.

const INK = '#22303f';
const GRID = '#d9d2c2';
const MUTED = '#6b7280';
const ACCENT = '#c2402a';
const TEAL = '#1f7a6d';
const INDIGO = '#2b3a67';

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(280, Math.round(rect.width));
  const height = Math.round(canvas.getAttribute('data-height') || 260);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = '12px system-ui, -apple-system, "Segoe UI", sans-serif';
  return { ctx, width, height };
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const real = nice * mag;
  const start = Math.floor(min / real) * real;
  const ticks = [];
  for (let v = start; v <= max + real * 0.001; v += real) ticks.push(v);
  return ticks;
}

function formatTick(v) {
  if (Math.abs(v) >= 100) return String(Math.round(v));
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// A line chart with points and value labels, for one series of {year, value}.
export function drawLineChart(canvas, series, options) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { l: 48, r: 16, t: 18, b: 28 };
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const values = series.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const padV = Math.max((max - min) * 0.25, 0.5);
  min -= padV;
  max += padV;
  const x = (i) => pad.l + (plotW * i) / (series.length - 1);
  const y = (v) => pad.t + plotH - ((v - min) / (max - min)) * plotH;

  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const t of niceTicks(min, max, 4)) {
    const ty = y(t);
    if (ty < pad.t - 1 || ty > pad.t + plotH + 1) continue;
    ctx.beginPath();
    ctx.moveTo(pad.l, ty);
    ctx.lineTo(width - pad.r, ty);
    ctx.stroke();
    ctx.fillText(formatTick(t) + (options.unit || ''), pad.l - 8, ty);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  series.forEach((p, i) => ctx.fillText(String(p.year), x(i), height - 20));

  ctx.strokeStyle = options.color || INDIGO;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  series.forEach((p, i) => (i === 0 ? ctx.moveTo(x(i), y(p.value)) : ctx.lineTo(x(i), y(p.value))));
  ctx.stroke();
  series.forEach((p, i) => {
    ctx.fillStyle = options.color || INDIGO;
    ctx.beginPath();
    ctx.arc(x(i), y(p.value), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(formatTick(p.value), x(i), y(p.value) - 8);
  });
}

// A vertical bar chart, for one series of {year, value}. Negative bars grow down.
export function drawBarChart(canvas, series, options) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { l: 48, r: 16, t: 26, b: 28 };
  const plotW = width - pad.l - pad.r;
  const plotH = height - pad.t - pad.b;
  const values = series.map((p) => p.value);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const y = (v) => pad.t + plotH - ((v - min) / (max - min)) * plotH;
  const slot = plotW / series.length;
  const barW = Math.min(52, slot * 0.6);

  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const t of niceTicks(min, max, 4)) {
    const ty = y(t);
    if (ty < pad.t - 1 || ty > pad.t + plotH + 1) continue;
    ctx.beginPath();
    ctx.moveTo(pad.l, ty);
    ctx.lineTo(width - pad.r, ty);
    ctx.stroke();
    ctx.fillText(formatTick(t) + (options.unit || ''), pad.l - 8, ty);
  }
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.l, y(0));
  ctx.lineTo(width - pad.r, y(0));
  ctx.stroke();

  series.forEach((p, i) => {
    const cx = pad.l + slot * i + slot / 2;
    const top = Math.min(y(0), y(p.value));
    const h = Math.abs(y(p.value) - y(0));
    ctx.fillStyle = p.value < 0 ? ACCENT : options.color || TEAL;
    ctx.fillRect(cx - barW / 2, top, barW, Math.max(h, 2));
    ctx.textAlign = 'center';
    if (p.value < 0 && h > 22) {
      // Negative bars: label inside the bar, just under the zero line, so it
      // never collides with the year labels below the axis.
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'top';
      ctx.fillText(formatTick(p.value), cx, y(0) + 5);
    } else {
      ctx.fillStyle = INK;
      ctx.textBaseline = p.value < 0 ? 'top' : 'bottom';
      ctx.fillText(formatTick(p.value), cx, p.value < 0 ? y(p.value) + 5 : y(p.value) - 5);
    }
    ctx.fillStyle = MUTED;
    ctx.textBaseline = 'top';
    ctx.fillText(String(p.year), cx, height - 20);
  });
}

// Horizontal bars with a label and a value at the end of each bar.
export function drawHorizontalBars(canvas, rows, options) {
  const { ctx, width } = setupCanvas(canvas);
  const rowH = 34;
  const height = rows.length * rowH + 8;
  canvas.height = height * (window.devicePixelRatio || 1);
  canvas.style.height = height + 'px';
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = '12px system-ui, -apple-system, "Segoe UI", sans-serif';
  const max = Math.max(...rows.map((r) => r.value));
  const labelW = options.labelWidth || 150;
  const valueW = 64;
  const barX = labelW + 8;
  const barW = width - barX - valueW - 8;
  rows.forEach((r, i) => {
    const cy = 8 + i * rowH + rowH / 2;
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(r.label, labelW, cy);
    ctx.fillStyle = '#e7e1d2';
    ctx.fillRect(barX, cy - 9, barW, 18);
    ctx.fillStyle = options.colors ? options.colors[i % options.colors.length] : INDIGO;
    ctx.fillRect(barX, cy - 9, Math.max((r.value / max) * barW, 2), 18);
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.fillText(r.display, barX + Math.max((r.value / max) * barW, 2) + 6, cy);
  });
}

// One stacked horizontal bar showing shares that add to 100%.
export function drawStackedBar(canvas, parts) {
  const { ctx, width } = setupCanvas(canvas);
  const barY = 34;
  const barH = 30;
  const colors = [TEAL, INDIGO, ACCENT, '#d9a441'];
  let x = 0;
  parts.forEach((p, i) => {
    const w = (p.share / 100) * width;
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, barY, w, barH);
    x += w;
  });
  x = 0;
  ctx.font = '13px system-ui, -apple-system, "Segoe UI", sans-serif';
  parts.forEach((p, i) => {
    const w = (p.share / 100) * width;
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const label = p.group + ' — ' + p.share.toFixed(1) + '%';
    // Keep short-segment labels inside the canvas instead of running off an edge.
    const half = ctx.measureText(label).width / 2;
    const cx = Math.min(Math.max(x + w / 2, half + 2), width - half - 2);
    ctx.fillText(label, cx, barY + barH + 10);
    x += w;
  });
}
