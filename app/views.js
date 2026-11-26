// Page renderers for Japan in Figures. Each route is a hash link, so every
// page is reachable by a link and works from the site's own files alone.
import {
  AGE_STRUCTURE, COUNTRY, CPI, ECONOMY_FACTS, ENERGY_MIX, GDP_GROWTH,
  HEADLINE, KEY_FINDINGS, POPULATION_SERIES, PREFECTURES, SECTORS,
  SOCIETY_FACTS, SOURCES, TRADE, UNEMPLOYMENT,
} from './data.js';
import { drawBarChart, drawHorizontalBars, drawLineChart, drawStackedBar } from './charts.js';

const $ = (sel, root) => (root || document).querySelector(sel);

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function kpiCards() {
  return '<section class="kpis" aria-label="Headline figures">' + HEADLINE.map((h) =>
    '<article class="kpi"><p class="kpi-label">' + esc(h.label) + '</p>' +
    '<p class="kpi-value">' + esc(h.value) + '</p>' +
    '<p class="kpi-note">' + esc(h.note) + ' · ' + esc(h.source) + '</p></article>').join('') + '</section>';
}

function sourceLine(text) {
  return '<p class="source">Source: ' + esc(text) + '</p>';
}

function factTable(rows) {
  return '<table class="facts"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>' +
    rows.map((r) => '<tr><td>' + esc(r.label) + '</td><td class="num">' + esc(r.value) + '</td><td class="num">' + esc(r.year) + '</td><td>' + esc(r.source) + '</td></tr>').join('') +
    '</tbody></table>';
}

// ---- Home -----------------------------------------------------------------
function renderHome(root) {
  root.innerHTML =
    '<section class="hero"><p class="eyebrow">Japan · 日本 · National statistics, plainly told</p>' +
    '<h1>Japan in Figures</h1>' +
    '<p class="lede">One country, counted. Population, the economy, health and daily life — ' +
    'real figures from Japan’s own statistical offices, with the source and year on every number.</p>' +
    '<p class="hero-meta">' + COUNTRY.prefectures + ' prefectures · ' + COUNTRY.islands.toLocaleString('en-US') + ' islands · ' +
    COUNTRY.areaKm2.toLocaleString('en-US') + ' km² · Capital ' + esc(COUNTRY.capital) + ' · Updated ' + esc(COUNTRY.updated) + '</p></section>' +
    kpiCards() +
    '<section class="panel"><div class="panel-head"><h2 id="chart-title">Population is falling</h2>' +
    '<div class="toggle" role="group" aria-label="Choose chart">' +
    '<button data-chart="population" class="active" type="button">Population</button>' +
    '<button data-chart="growth" type="button">GDP growth</button>' +
    '<button data-chart="cpi" type="button">Inflation</button></div></div>' +
    '<canvas id="home-chart" data-height="280" aria-label="Chart"></canvas>' +
    '<p class="source" id="chart-source">Source: Statistics Bureau of Japan, Population Estimates and Census. Census years: 2010, 2015, 2020.</p></section>' +
    '<section class="panel"><h2>What the numbers say</h2><div class="findings">' +
    KEY_FINDINGS.map((f) => '<article><h3>' + esc(f.title) + '</h3><p>' + esc(f.body) + '</p></article>').join('') +
    '</div></section>' +
    '<section class="panel"><h2>Explore the data</h2><nav class="cards">' +
    '<a href="#/population"><strong>Population</strong><span>Trend since 2010, age structure, all 10 largest prefectures.</span></a>' +
    '<a href="#/economy"><strong>Economy</strong><span>Growth, jobs, prices, trade and the energy mix.</span></a>' +
    '<a href="#/society"><strong>Society &amp; health</strong><span>How long people live, births, and schooling.</span></a>' +
    '<a href="#/data"><strong>Data &amp; sources</strong><span>Every table in one place, with sources to check.</span></a>' +
    '</nav></section>';

  const chart = $('#home-chart', root);
  const titles = {
    population: 'Population is falling',
    growth: 'Growth stalled in 2024',
    cpi: 'Prices stayed above 2%',
  };
  const sources = {
    population: 'Source: Statistics Bureau of Japan, Population Estimates and Census. Census years: 2010, 2015, 2020.',
    growth: 'Source: IMF, World Economic Outlook, October 2025. Real GDP growth, percent per year.',
    cpi: 'Source: Statistics Bureau of Japan, Consumer Price Index, all items, annual average.',
  };
  function draw(which) {
    if (which === 'population') drawLineChart(chart, POPULATION_SERIES, { unit: ' m', color: '#2b3a67' });
    if (which === 'growth') drawBarChart(chart, GDP_GROWTH, { unit: '%', color: '#1f7a6d' });
    if (which === 'cpi') drawBarChart(chart, CPI, { unit: '%', color: '#c2402a' });
    $('#chart-title', root).textContent = titles[which];
    $('#chart-source', root).textContent = sources[which];
  }
  draw('population');
  root.querySelectorAll('.toggle button').forEach((b) => {
    b.addEventListener('click', () => {
      root.querySelectorAll('.toggle button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      draw(b.getAttribute('data-chart'));
    });
  });
}

// ---- Population ------------------------------------------------------------
function renderPopulation(root) {
  const rows = PREFECTURES.map((p, i) => {
    const density = Math.round((p.population * 1000000) / p.area);
    const share = ((p.population / 123.8) * 100).toFixed(1);
    return '<tr data-name="' + esc(p.name.toLowerCase()) + '"><td class="num">' + (i + 1) + '</td><td>' + esc(p.name) +
      '</td><td class="num">' + p.population.toFixed(2) + '</td><td class="num">' + share + '%</td><td class="num">' +
      density.toLocaleString('en-US') + '</td><td>' + esc(p.capital) + '</td></tr>';
  }).join('');
  root.innerHTML =
    '<section class="hero slim"><p class="eyebrow">Population</p><h1>123.8 million people, and fewer every year</h1>' +
    '<p class="lede">Japan peaked at 128.06 million in the 2010 census. Fourteen years on it has ' +
    'lost 4.26 million people — and the 65-and-over share has passed 29%.</p></section>' +
    '<section class="panel"><h2>Population, 2010–2024</h2>' +
    '<canvas id="pop-chart" data-height="280"></canvas>' +
    sourceLine('Statistics Bureau of Japan, Population Estimates (1 October) and Census. Census years: 2010, 2015, 2020.') + '</section>' +
    '<section class="panel"><h2>Who is Japan in 2024?</h2>' +
    '<canvas id="age-chart" data-height="110"></canvas>' +
    '<p class="age-note">0–14: 13.83 million · 15–64: 73.55 million · 65+: 36.24 million</p>' +
    sourceLine('Statistics Bureau of Japan, Population Estimates, 1 October 2024.') + '</section>' +
    '<section class="panel"><div class="panel-head"><h2>Ten largest prefectures</h2>' +
    '<label class="filter">Filter <input id="pref-filter" type="search" placeholder="Type a prefecture…" aria-label="Filter prefectures"></label></div>' +
    '<p class="hint">Tap a column heading to sort. Tap a row to see its share of Japan.</p>' +
    '<div class="table-wrap"><table id="pref-table" class="sortable"><thead><tr>' +
    '<th data-key="rank">#</th><th data-key="name">Prefecture</th><th data-key="pop">Population (m)</th>' +
    '<th data-key="share">Share of Japan</th><th data-key="density">People per km²</th><th data-key="capital">Capital</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<p class="detail" id="pref-detail">Tap a row above to see a prefecture in context.</p>' +
    sourceLine('Statistics Bureau of Japan, Population Estimates, 1 October 2024; areas from the Geospatial Information Authority of Japan.') + '</section>';

  drawLineChart($('#pop-chart', root), POPULATION_SERIES, { unit: ' m', color: '#2b3a67' });
  drawStackedBar($('#age-chart', root), AGE_STRUCTURE);

  const table = $('#pref-table', root);
  const tbody = table.querySelector('tbody');
  let sortKey = 'rank';
  let sortDir = 1;
  const data = PREFECTURES.map((p, i) => ({
    rank: i + 1, name: p.name, pop: p.population,
    share: (p.population / 123.8) * 100,
    density: Math.round((p.population * 1000000) / p.area), capital: p.capital,
  }));
  function renderRows(list) {
    tbody.innerHTML = list.map((p) =>
      '<tr data-name="' + esc(p.name.toLowerCase()) + '"><td class="num">' + p.rank + '</td><td>' + esc(p.name) +
      '</td><td class="num">' + p.pop.toFixed(2) + '</td><td class="num">' + p.share.toFixed(1) + '%</td><td class="num">' +
      p.density.toLocaleString('en-US') + '</td><td>' + esc(p.capital) + '</td></tr>').join('');
  }
  table.querySelectorAll('th').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-key');
      if (key === sortKey) {
        sortDir = -sortDir;
      } else {
        // First click on a number column shows the largest first; on a name
        // column it shows A to Z. Clicking again reverses it.
        sortDir = key === 'name' || key === 'capital' ? 1 : -1;
      }
      sortKey = key;
      const sorted = [...data].sort((a, b) => {
        const av = a[key]; const bv = b[key];
        return (typeof av === 'string' ? av.localeCompare(bv) : av - bv) * sortDir;
      });
      renderRows(sorted);
      $('#pref-filter', root).value = '';
    });
  });
  $('#pref-filter', root).addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    tbody.querySelectorAll('tr').forEach((tr) => {
      tr.style.display = tr.getAttribute('data-name').includes(q) ? '' : 'none';
    });
  });
  tbody.addEventListener('click', (e) => {
    const tr = e.target.closest('tr');
    if (!tr) return;
    const p = data.find((d) => d.name.toLowerCase() === tr.getAttribute('data-name'));
    if (!p) return;
    $('#pref-detail', root).textContent =
      p.name + ': ' + p.pop.toFixed(2) + ' million people — ' + p.share.toFixed(1) +
      '% of Japan, ranked #' + p.rank + ' of 47 prefectures, at ' +
      p.density.toLocaleString('en-US') + ' people per km². Capital: ' + p.capital + '.';
  });
}

// ---- Economy ---------------------------------------------------------------
function renderEconomy(root) {
  root.innerHTML =
    '<section class="hero slim"><p class="eyebrow">Economy</p><h1>The world’s fourth-largest economy</h1>' +
    '<p class="lede">Japan’s nominal GDP was $4.03 trillion in 2024. Growth has been flat, prices have ' +
    'risen three years running, and the public debt is the highest among large economies.</p></section>' +
    '<section class="panel"><div class="panel-head"><h2 id="econ-title">Real GDP growth, 2020–2024</h2>' +
    '<div class="toggle" role="group" aria-label="Choose indicator">' +
    '<button data-metric="growth" class="active" type="button">Growth</button>' +
    '<button data-metric="unemployment" type="button">Unemployment</button>' +
    '<button data-metric="cpi" type="button">Inflation</button></div></div>' +
    '<canvas id="econ-chart" data-height="280"></canvas>' +
    '<p class="source" id="econ-source">Source: IMF, World Economic Outlook, October 2025.</p></section>' +
    '<section class="panel"><h2>What Japan makes and sells</h2>' +
    '<div class="split"><div><h3>Share of the economy, 2023</h3>' +
    '<canvas id="sector-chart" data-height="140"></canvas>' +
    sourceLine('World Bank, World Development Indicators.') + '</div>' +
    '<div><h3>Goods trade, 2024</h3><p class="big">Exports ¥' + TRADE.exports.toFixed(1) + ' tn<br>Imports ¥' + TRADE.imports.toFixed(1) + ' tn<br>' +
    'Balance ¥' + TRADE.balance.toFixed(1) + ' tn</p>' +
    sourceLine('Ministry of Finance, Trade Statistics of Japan.') + '</div></div></section>' +
    '<section class="panel"><h2>Electricity: where it comes from</h2>' +
    '<canvas id="energy-chart" data-height="140"></canvas>' +
    sourceLine('Agency for Natural Resources and Energy, fiscal 2023 generation mix.') + '</section>' +
    '<section class="panel"><h2>Economy in numbers</h2>' + factTable(ECONOMY_FACTS) + '</section>';

  const chart = $('#econ-chart', root);
  const titles = {
    growth: 'Real GDP growth, 2020–2024',
    unemployment: 'Unemployment rate, 2020–2024',
    cpi: 'Consumer price inflation, 2020–2024',
  };
  const sources = {
    growth: 'Source: IMF, World Economic Outlook, October 2025. Percent change per year.',
    unemployment: 'Source: Statistics Bureau of Japan, Labour Force Survey, annual average.',
    cpi: 'Source: Statistics Bureau of Japan, Consumer Price Index, all items, annual average.',
  };
  function draw(which) {
    if (which === 'growth') drawBarChart(chart, GDP_GROWTH, { unit: '%', color: '#1f7a6d' });
    if (which === 'unemployment') drawBarChart(chart, UNEMPLOYMENT, { unit: '%', color: '#2b3a67' });
    if (which === 'cpi') drawBarChart(chart, CPI, { unit: '%', color: '#c2402a' });
    $('#econ-title', root).textContent = titles[which];
    $('#econ-source', root).textContent = sources[which];
  }
  draw('growth');
  root.querySelectorAll('.toggle button').forEach((b) => {
    b.addEventListener('click', () => {
      root.querySelectorAll('.toggle button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      draw(b.getAttribute('data-metric'));
    });
  });
  drawHorizontalBars($('#sector-chart', root), SECTORS.map((s) => ({ label: s.sector, value: s.share, display: s.share.toFixed(1) + '%' })), { labelWidth: 190, colors: ['#1f7a6d', '#2b3a67', '#c2402a'] });
  drawHorizontalBars($('#energy-chart', root), ENERGY_MIX.map((s) => ({ label: s.source, value: s.share, display: s.share.toFixed(1) + '%' })), { labelWidth: 120, colors: ['#6b7280', '#1f7a6d', '#d9a441'] });
}

// ---- Society ----------------------------------------------------------------
function renderSociety(root) {
  root.innerHTML =
    '<section class="hero slim"><p class="eyebrow">Society &amp; health</p><h1>The longest-lived large country</h1>' +
    '<p class="lede">Japanese babies born in 2023 can expect 84.0 years of life — the longest of any ' +
    'large country. At the same time, births fell to 720,988 in 2024, the fewest on record.</p></section>' +
    '<section class="panel"><h2>Society in numbers</h2>' + factTable(SOCIETY_FACTS) + '</section>' +
    '<section class="panel"><h2>Births and deaths, 2024</h2>' +
    '<div class="split"><div><p class="big">720,988<br><span>babies born</span></p></div>' +
    '<div><p class="big">1,618,684<br><span>people died</span></p></div>' +
    '<div><p class="big">−897,696<br><span>natural change</span></p></div></div>' +
    '<p>Deaths outnumbered births by nearly 900,000 in a single year — the gap that drives the population fall.</p>' +
    sourceLine('Ministry of Health, Labour and Welfare, Vital Statistics 2024.') + '</section>' +
    '<section class="panel"><h2>Reading these numbers</h2><ul class="notes">' +
    '<li>Life expectancy is a period measure: it assumes a baby born today lives through today’s death rates at every age.</li>' +
    '<li>The fertility rate of 1.20 means 120 children per 100 women over a lifetime at current rates — well below the 2.1 needed to replace the population.</li>' +
    '<li>Median age 49.5 means half of Japan is older than 49.5 — the highest median age of any country with more than 10 million people.</li>' +
    '</ul></section>';
}

// ---- Data & sources ---------------------------------------------------------
function renderData(root) {
  root.innerHTML =
    '<section class="hero slim"><p class="eyebrow">Data &amp; sources</p><h1>Every table, every source</h1>' +
    '<p class="lede">All the figures on this site in one place. Type in the box to filter every table at once.</p></section>' +
    '<section class="panel"><label class="filter">Search all tables <input id="data-search" type="search" placeholder="Try “GDP”, “Tokyo”, “2024”…"></label>' +
    '<h2>Headline indicators</h2><div class="table-wrap"><table class="facts" id="t-headline"><thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>' +
    HEADLINE.map((h) => '<tr><td>' + esc(h.label) + '</td><td class="num">' + esc(h.value) + '</td><td class="num">' + esc(h.note) + '</td><td>' + esc(h.source) + '</td></tr>').join('') +
    '</tbody></table></div>' +
    '<h2>Population by year</h2><div class="table-wrap"><table class="facts" id="t-pop"><thead><tr><th>Year</th><th>Population (millions)</th><th>Note</th></tr></thead><tbody>' +
    POPULATION_SERIES.map((p) => '<tr><td class="num">' + p.year + '</td><td class="num">' + p.value.toFixed(2) + '</td><td>' + (p.census ? 'Census' : '1 October estimate') + '</td></tr>').join('') +
    '</tbody></table></div>' +
    '<h2>Economy</h2><div class="table-wrap">' + factTable(ECONOMY_FACTS) + '</div>' +
    '<h2>Society</h2><div class="table-wrap">' + factTable(SOCIETY_FACTS) + '</div></section>' +
    '<section class="panel"><h2>Sources</h2><ul class="sources">' +
    SOURCES.map((s) => '<li><strong>' + esc(s.publisher) + '</strong> — ' + esc(s.what) + ' <span class="url">' + esc(s.url) + '</span></li>').join('') +
    '</ul><p class="note">Figures are rounded for display; where sources disagree slightly, the figure shown follows the source named on its row. No figure on this site was fetched from the internet — everything is stored in the site’s own files.</p></section>';

  $('#data-search', root).addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    root.querySelectorAll('tbody tr').forEach((tr) => {
      tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ---- About ------------------------------------------------------------------
function renderAbout(root) {
  root.innerHTML =
    '<section class="hero slim"><p class="eyebrow">About</p><h1>How this site is made</h1>' +
    '<p class="lede">Japan in Figures is an independent statistics site. It is not affiliated with ' +
    'any government office; it quotes their published figures and names them.</p></section>' +
    '<section class="panel"><h2>Method</h2><ul class="notes">' +
    '<li>Population figures are the Statistics Bureau’s 1 October estimates and census counts.</li>' +
    '<li>GDP, growth and debt come from the IMF World Economic Outlook, October 2025.</li>' +
    '<li>Life expectancy, sector shares and the energy mix come from the World Bank and the ministries named on each figure.</li>' +
    '<li>Money is shown in the currency the source uses — dollars for IMF figures, yen for trade.</li>' +
    '<li>Figures are rounded to one or two decimals; shares may not add to 100% because of rounding.</li>' +
    '</ul></section>' +
    '<section class="panel"><h2>What this site does not do</h2><ul class="notes">' +
    '<li>It sends no data anywhere and loads nothing from the internet — it works offline, from its own files.</li>' +
    '<li>It makes no forecasts. Where a trend is described, it is the published past, not a prediction.</li>' +
    '</ul></section>' +
    '<section class="panel"><h2>Sources</h2><ul class="sources">' +
    SOURCES.map((s) => '<li><strong>' + esc(s.publisher) + '</strong> — ' + esc(s.what) + '</li>').join('') +
    '</ul></section>';
}

export const ROUTES = {
  '/': { title: 'Japan in Figures — national statistics', render: renderHome },
  '/population': { title: 'Population — Japan in Figures', render: renderPopulation },
  '/economy': { title: 'Economy — Japan in Figures', render: renderEconomy },
  '/society': { title: 'Society & health — Japan in Figures', render: renderSociety },
  '/data': { title: 'Data & sources — Japan in Figures', render: renderData },
  '/about': { title: 'About — Japan in Figures', render: renderAbout },
};
