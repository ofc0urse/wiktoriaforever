/* Szyfry z karty „Może ci się przydać”.
   Używane przez panel admina (Szyfrownik) i do sprawdzania odpowiedzi. */
(function (root) {
  'use strict';

  var ALFABET = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł',
    'M', 'N', 'Ń', 'O', 'Ó', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Y', 'Z', 'Ź', 'Ż'];
  var BAZA = { 'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z' };
  var MORSE = {
    A: '•–', B: '–•••', C: '–•–•', D: '–••', E: '•', F: '••–•', G: '––•', H: '••••', I: '••',
    J: '•–––', K: '–•–', L: '•–••', M: '––', N: '–•', O: '–––', P: '•––•', Q: '––•–', R: '•–•',
    S: '•••', T: '–', U: '••–', V: '•••–', W: '•––', X: '–••–', Y: '–•––', Z: '––••'
  };
  var KLAWISZE = ['', '', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'];
  var PARY = ['GA', 'DE', 'RY', 'PO', 'LU', 'KI'];
  var POLIBIUSZ = [
    ['A', 'Ą', 'B', 'C', 'Ć', 'D'],
    ['E', 'Ę', 'F', 'G', 'H', 'I'],
    ['J', 'K', 'L', 'Ł', 'M', 'N'],
    ['Ń', 'O', 'Ó', 'P', 'R', 'S'],
    ['Ś', 'T', 'U', 'W', 'Y', 'Z'],
    ['Ź', 'Ż', '.', ',', '?', '!']
  ];

  function duze(s) { return String(s || '').toLocaleUpperCase('pl-PL'); }
  function baza(ch) { return BAZA[ch] || ch; }
  function slowa(s) { return duze(s).trim().split(/\s+/).filter(Boolean); }
  function znaki(s) { return Array.from(s); }

  // Szyfry „kodowe”: każda litera to grupa, litery dzieli spacja (lub ·), słowa ukośnik.
  function kodowy(mapa, sep) {
    return function (tekst) {
      return slowa(tekst).map(function (w) {
        return znaki(w).map(function (ch) { return mapa(ch); }).join(sep);
      }).join('  /  ');
    };
  }
  function odwrotny(mapa) {
    return function (kod) {
      return String(kod || '').split('/').map(function (w) {
        return w.trim().split(/[\s·]+/).filter(Boolean).map(function (g) {
          return Object.prototype.hasOwnProperty.call(mapa, g) ? mapa[g] : '?';
        }).join('');
      }).join(' ');
    };
  }

  var morseOdwr = {};
  Object.keys(MORSE).forEach(function (k) { morseOdwr[MORSE[k]] = k; });
  var klawMapa = {};
  KLAWISZE.forEach(function (lit, cyfra) {
    znaki(lit).forEach(function (ch, i) { klawMapa[ch] = new Array(i + 2).join(String(cyfra)); });
  });
  var klawOdwr = {};
  Object.keys(klawMapa).forEach(function (k) { klawOdwr[klawMapa[k]] = k; });
  var poliMapa = {};
  POLIBIUSZ.forEach(function (w, r) { w.forEach(function (ch, c) { poliMapa[ch] = String(r + 1) + String(c + 1); }); });
  var poliOdwr = {};
  Object.keys(poliMapa).forEach(function (k) { poliOdwr[poliMapa[k]] = k; });
  var numOdwr = {};
  ALFABET.forEach(function (ch, i) { numOdwr[String(i + 1)] = ch; });
  var paraMapa = {};
  PARY.forEach(function (p) { paraMapa[p[0]] = p[1]; paraMapa[p[1]] = p[0]; });

  function przesun(tekst, n) {
    n = ((Number(n) || 0) % 32 + 32) % 32;
    return znaki(duze(tekst)).map(function (ch) {
      var i = ALFABET.indexOf(ch);
      return i < 0 ? ch : ALFABET[(i + n) % 32];
    }).join('');
  }
  function atbasz(tekst) {
    return znaki(duze(tekst)).map(function (ch) {
      var i = ALFABET.indexOf(ch);
      return i < 0 ? ch : ALFABET[31 - i];
    }).join('');
  }
  function gaderypoluki(tekst) {
    return znaki(duze(tekst)).map(function (ch) { return paraMapa[ch] || ch; }).join('');
  }

  var SZYFRY = {
    numery: {
      nazwa: 'Numery liter',
      koduj: kodowy(function (ch) { var i = ALFABET.indexOf(ch); return i < 0 ? ch : String(i + 1); }, ' · '),
      dekoduj: odwrotny(numOdwr)
    },
    przesuniecie: {
      nazwa: 'Przesunięcie',
      liczba: true,
      koduj: function (t, n) { return przesun(t, n); },
      dekoduj: function (t, n) { return przesun(t, -n); }
    },
    morse: {
      nazwa: 'Morse',
      koduj: kodowy(function (ch) { return MORSE[baza(ch)] || ch; }, '   '),
      dekoduj: odwrotny(morseOdwr)
    },
    klawiatura: {
      nazwa: 'Klawiatura',
      koduj: kodowy(function (ch) { return klawMapa[baza(ch)] || ch; }, ' '),
      dekoduj: odwrotny(klawOdwr)
    },
    gaderypoluki: { nazwa: 'Gaderypoluki', koduj: gaderypoluki, dekoduj: gaderypoluki },
    polibiusz: {
      nazwa: 'Polibiusz',
      koduj: kodowy(function (ch) { return poliMapa[ch] || ch; }, ' '),
      dekoduj: odwrotny(poliOdwr)
    },
    atbasz: { nazwa: 'Atbasz', koduj: atbasz, dekoduj: atbasz }
  };

  // Odpowiedź po normalizacji: wielkie litery, bez polskich znaków, bez spacji i interpunkcji.
  function normalizuj(s) {
    return duze(s).replace(/Ł/g, 'L').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Z0-9]/g, '');
  }

  // Ile milisekund Warszawa jest „do przodu” względem UTC w danej chwili (zima +1 h, lato +2 h).
  function przesuniecieWarszawy(ms) {
    var p = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Warsaw', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(new Date(ms)).forEach(function (x) { p[x.type] = x.value; });
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(ms / 1000) * 1000;
  }
  // Chwila (ms) dla godziny h w Warszawie, dnia y-m-d (m od 1). Dzień może „przelać się” na kolejny miesiąc.
  function warszawaNaUtc(y, m, d, h) {
    var lokalnie = Date.UTC(y, m - 1, d, h);
    var t = lokalnie - przesuniecieWarszawy(lokalnie);
    return lokalnie - przesuniecieWarszawy(t);
  }
  // Dzień gry dla paczki: po 2 paczki dziennie (1–14), paczka 15 to dzień 8.
  function dzienPaczki(nr) { return nr >= 15 ? 8 : Math.ceil(nr / 2); }

  var api = {
    ALFABET: ALFABET, SZYFRY: SZYFRY, normalizuj: normalizuj,
    warszawaNaUtc: warszawaNaUtc, dzienPaczki: dzienPaczki
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Szyfry = api;
})(this);
