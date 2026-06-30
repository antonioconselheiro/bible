const booksNames = {
  'gn': 'GEN',
  'ex': 'EXO',
  'lv': 'LEV',
  'nm': 'NUM',
  'dt': 'DEU'
};

const booksContent = {
  GEN: {},
  EXO: {},
  LEV: {},
  NUM: {},
  DEU: {}
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchVerse(book, chapter, verse) {
  const url = `https://samaritantorah.com/${book}${chapter}-${verse}`;
  let attempts = 0;
  while (attempts < Infinity) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const text = await res.text();
      console.log(`✅ Fetched verse ${book}, ${chapter}:${verse}`);
      const dom = await fetchChapter(text);
      const parser = new DOMParser();
      const doc = parser.parseFromString(dom, "text/html");
      return dom;
    } catch (err) {
      attempts++;
      console.warn(`⚠️ Retry ${attempts} for verse ${book}, ${chapter}:${verse}`);
      await sleep(3000);
    }
  }
}

async function loadRecusively() {
  const booksKeys = Object.keys(booksNames);
  let html, book = 'gn', chapter = 1, verse = 1;
  
  do {
    html = await fetchVerse(book, chapter, verse);
    
    const hasNext = document.querySelector('[rel="next"]');
    if (hasNext) {
      const nextHref = hasNext.getAttribute('href');
      [, book, chapter, verse] = nextHref.match(/([^/]+)(\d+\-)(\d+)$/) || [ null, null, null, null ];
    }

  } while (hasNext);
  
  
}