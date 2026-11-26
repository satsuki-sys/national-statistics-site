// Japan in Figures — the numbers behind the site.
//
// Every figure below is a real published statistic, rounded for display.
// Each record names its source and year; the Sources page lists them in full.
// Figures were checked against the Statistics Bureau of Japan, the IMF World
// Economic Outlook (October 2025), the World Bank, the Ministry of Health,
// Labour and Welfare, the Ministry of Finance, and the Agency for Natural
// Resources and Energy.

export const COUNTRY = {
  name: 'Japan',
  nameJa: '日本',
  region: 'East Asia',
  capital: 'Tokyo',
  areaKm2: 377975,
  prefectures: 47,
  municipalities: 1718,
  islands: 14125,
  currency: 'Japanese yen (JPY)',
  updated: 'November 2026',
};

export const HEADLINE = [
  { label: 'Population', value: '123.8 m', note: '1 Oct 2024 estimate', source: 'Statistics Bureau of Japan' },
  { label: 'GDP (nominal)', value: '$4.03 tn', note: '2024', source: 'IMF, World Economic Outlook' },
  { label: 'GDP per person', value: '$32,500', note: '2024', source: 'IMF, World Economic Outlook' },
  { label: 'Life expectancy', value: '84.0 yrs', note: '2023', source: 'World Bank' },
  { label: 'Unemployment', value: '2.5%', note: '2024 average', source: 'Statistics Bureau of Japan' },
  { label: 'Fertility rate', value: '1.20', note: '2023', source: 'Ministry of Health, Labour and Welfare' },
];

// Total population, millions. Census years marked; the rest are 1 October estimates.
export const POPULATION_SERIES = [
  { year: 2010, value: 128.06, census: true },
  { year: 2015, value: 127.09, census: true },
  { year: 2020, value: 126.15, census: true },
  { year: 2021, value: 125.50, census: false },
  { year: 2022, value: 124.94, census: false },
  { year: 2023, value: 124.35, census: false },
  { year: 2024, value: 123.80, census: false },
];

// Age structure, 1 October 2024 (Statistics Bureau of Japan).
export const AGE_STRUCTURE = [
  { group: 'Aged 0–14', millions: 13.83, share: 11.2 },
  { group: 'Aged 15–64', millions: 73.55, share: 59.5 },
  { group: 'Aged 65+', millions: 36.24, share: 29.3 },
];

// Ten largest prefectures, 1 October 2024 estimates (Statistics Bureau of Japan).
// Area in km2 from the Geospatial Information Authority of Japan.
export const PREFECTURES = [
  { name: 'Tokyo', population: 14.18, area: 2194, capital: 'Shinjuku' },
  { name: 'Kanagawa', population: 9.26, area: 2416, capital: 'Yokohama' },
  { name: 'Osaka', population: 8.81, area: 1905, capital: 'Osaka' },
  { name: 'Aichi', population: 7.47, area: 5173, capital: 'Nagoya' },
  { name: 'Saitama', population: 7.33, area: 3798, capital: 'Saitama' },
  { name: 'Chiba', population: 6.29, area: 5158, capital: 'Chiba' },
  { name: 'Hyogo', population: 5.32, area: 8401, capital: 'Kobe' },
  { name: 'Fukuoka', population: 5.10, area: 4987, capital: 'Fukuoka' },
  { name: 'Hokkaido', population: 5.09, area: 83424, capital: 'Sapporo' },
  { name: 'Shizuoka', population: 3.55, area: 7777, capital: 'Shizuoka' },
];

// Economy: IMF World Economic Outlook, October 2025, unless noted.
export const GDP_GROWTH = [
  { year: 2020, value: -4.2 },
  { year: 2021, value: 2.6 },
  { year: 2022, value: 1.0 },
  { year: 2023, value: 1.5 },
  { year: 2024, value: -0.1 },
];

export const UNEMPLOYMENT = [
  { year: 2020, value: 2.8 },
  { year: 2021, value: 2.8 },
  { year: 2022, value: 2.6 },
  { year: 2023, value: 2.6 },
  { year: 2024, value: 2.5 },
];

// Consumer prices, all items, annual average (Statistics Bureau of Japan).
export const CPI = [
  { year: 2020, value: 0.0 },
  { year: 2021, value: -0.2 },
  { year: 2022, value: 2.5 },
  { year: 2023, value: 3.3 },
  { year: 2024, value: 2.7 },
];

// Shares of gross value added, 2023 (World Bank).
export const SECTORS = [
  { sector: 'Services', share: 71.1 },
  { sector: 'Industry', share: 27.9 },
  { sector: 'Agriculture, forestry and fishing', share: 1.0 },
];

// Goods trade, trillion yen (Ministry of Finance, Trade Statistics of Japan).
export const TRADE = { year: 2024, exports: 107.9, imports: 113.1, balance: -5.3 };

// Electricity generation mix, fiscal 2023 (Agency for Natural Resources and Energy).
export const ENERGY_MIX = [
  { source: 'Fossil fuels', share: 65.8 },
  { source: 'Renewables', share: 25.7 },
  { source: 'Nuclear', share: 8.5 },
];

export const ECONOMY_FACTS = [
  { label: 'Nominal GDP', value: '$4.03 trillion', year: '2024', source: 'IMF World Economic Outlook, Oct 2025' },
  { label: 'GDP per person', value: '$32,507', year: '2024', source: 'IMF World Economic Outlook, Oct 2025' },
  { label: 'Real GDP growth', value: '-0.1%', year: '2024', source: 'IMF World Economic Outlook, Oct 2025' },
  { label: 'Government gross debt', value: '236.7% of GDP', year: '2024', source: 'IMF World Economic Outlook, Oct 2025' },
  { label: 'Goods exports', value: '¥107.9 trillion', year: '2024', source: 'Ministry of Finance, Trade Statistics' },
  { label: 'Goods imports', value: '¥113.1 trillion', year: '2024', source: 'Ministry of Finance, Trade Statistics' },
  { label: 'Unemployment rate', value: '2.5%', year: '2024', source: 'Statistics Bureau of Japan, Labour Force Survey' },
  { label: 'Consumer price inflation', value: '2.7%', year: '2024', source: 'Statistics Bureau of Japan, CPI' },
];

export const SOCIETY_FACTS = [
  { label: 'Life expectancy at birth', value: '84.0 years', year: '2023', source: 'World Bank, World Development Indicators' },
  { label: 'Life expectancy, women', value: '87.1 years', year: '2023', source: 'Ministry of Health, Labour and Welfare' },
  { label: 'Life expectancy, men', value: '81.1 years', year: '2023', source: 'Ministry of Health, Labour and Welfare' },
  { label: 'Median age', value: '49.5 years', year: '2024', source: 'United Nations, World Population Prospects 2024' },
  { label: 'Total fertility rate', value: '1.20 children per woman', year: '2023', source: 'Ministry of Health, Labour and Welfare' },
  { label: 'Births', value: '720,988', year: '2024', source: 'Ministry of Health, Labour and Welfare' },
  { label: 'Deaths', value: '1,618,684', year: '2024', source: 'Ministry of Health, Labour and Welfare' },
  { label: 'Tertiary education, age 25–34', value: 'about 65%', year: '2023', source: 'OECD, Education at a Glance' },
];

export const KEY_FINDINGS = [
  {
    title: 'A smaller country every year',
    body: 'Japan has lost about 4.3 million people since the 2010 census — roughly the population of a prefecture the size of Shizuoka. The fall has run at about half a million a year since 2020.',
  },
  {
    title: 'Nearly three in ten are 65 or older',
    body: 'At 29.3% in 2024, Japan has the oldest population of any large country. The working-age share, 59.5%, keeps shrinking as the 65-and-over share grows.',
  },
  {
    title: 'One in nine Japanese lives in Tokyo',
    body: 'Tokyo holds 14.18 million people — 11.5% of the country — in 0.6% of its land. The three largest prefectures together hold more than a quarter of the population.',
  },
  {
    title: 'Prices rose while growth stalled',
    body: 'Consumer prices rose 2.7% in 2024, the third straight year above 2%, while real GDP shrank 0.1%. Unemployment stayed low at 2.5% through it all.',
  },
];

export const SOURCES = [
  { publisher: 'Statistics Bureau of Japan', what: 'Population Estimates (1 Oct 2024); Population Census 2010, 2015, 2020; Labour Force Survey; Consumer Price Index', url: 'www.stat.go.jp' },
  { publisher: 'International Monetary Fund', what: 'World Economic Outlook, October 2025 — nominal GDP, GDP per person, real growth, government debt', url: 'www.imf.org' },
  { publisher: 'World Bank', what: 'World Development Indicators — life expectancy; sector shares of GDP', url: 'data.worldbank.org' },
  { publisher: 'Ministry of Health, Labour and Welfare', what: 'Vital Statistics 2023–2024 — fertility rate, births, deaths, life expectancy by sex', url: 'www.mhlw.go.jp' },
  { publisher: 'Ministry of Finance', what: 'Trade Statistics of Japan 2024 — goods exports and imports', url: 'www.customs.go.jp' },
  { publisher: 'Agency for Natural Resources and Energy', what: 'Electricity generation mix, fiscal 2023', url: 'www.enecho.meti.go.jp' },
  { publisher: 'United Nations', what: 'World Population Prospects 2024 — median age', url: 'population.un.org' },
  { publisher: 'OECD', what: 'Education at a Glance 2024 — tertiary attainment, age 25–34', url: 'www.oecd.org' },
  { publisher: 'Geospatial Information Authority of Japan', what: 'Prefecture areas; island count (14,125, 2023)', url: 'www.gsi.go.jp' },
];
