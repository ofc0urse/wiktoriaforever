# Może ci się przydać

Strona gry: 15 paczek, 2 zagadki dziennie od 1 listopada, a 8 listopada finał.

## Co jest gdzie

| Plik | Gdzie trafia | Po co |
|---|---|---|
| `index.html` | GitHub | Strona gry, na którą prowadzi kod QR |
| `admin.html` | GitHub | Twój panel: szyfrownik, wgrywanie zagadek, postęp |
| `szyfry.js`, `config.js` | GitHub | Szyfry z karty i ustawienia |
| `firestore.rules` | Firebase (wklejasz) | Kto co może czytać |
| `zagadki.json` | **TYLKO u Ciebie** | Zagadki i odpowiedzi. Nigdy na GitHuba! |

Bez ustawionego Firebase strona działa w **trybie demo** (z tym samym hasłem co prawdziwa gra).

## 1. GitHub Pages

1. github.com → **New repository** → nazwa **wiktoriaforever** → Public → Create.
2. **Add file → Upload files** → przeciągnij `index.html`, `admin.html`, `szyfry.js`, `config.js` → Commit.
3. **Settings → Pages** → Source: *Deploy from a branch*, Branch: *main*, folder */ (root)* → Save.
4. Po 1–2 minutach działa: `https://ofc0urse.github.io/wiktoriaforever/` (to adres z kodu QR).

## 2. Firebase (darmowy plan Spark)

1. console.firebase.google.com → **Utwórz projekt** → nazwa np. `zostaw` → Google Analytics wyłącz.
2. **Authentication → Rozpocznij → E-mail/hasło → Włącz**.
3. **Authentication → Users → Add user** dwa razy:
   - `gracz@example.com` + hasło, które ona wpisze na stronie. **Nie zapisuj go w żadnym pliku w repozytorium.**
   - `admin@example.com` + Twoje hasło.
4. **Firestore Database → Utwórz bazę** → lokalizacja `eur3 (europe-west)` → tryb produkcyjny.
5. **Firestore → Reguły** → usuń wszystko, wklej `firestore.rules` → **Opublikuj**.
6. **Ustawienia projektu (zębatka) → Twoje aplikacje → ikona `</>`** → nazwa `zostaw` → Zarejestruj.
   Skopiuj wartości z `firebaseConfig` do `config.js` (apiKey, authDomain, projectId…) i wgraj nowy `config.js` na GitHuba.
   Te dane nie są tajne. Chronią je reguły z punktu 5.

## 3. Wgranie zagadek

1. Uzupełnij w `zagadki.json` wszystko, co ma `[UZUPEŁNIJ]` (zagadki 13, 14 i wiadomość w 15).
   Wiadomości do paczek wpisujesz w pole `wiadomosc`. Pokażą się po rozwiązaniu.
2. Wejdź na `https://ofc0urse.github.io/wiktoriaforever/admin.html` → zaloguj się jako admin.
3. Wczytaj `zagadki.json` → **Sprawdź plik** → **Wgraj do Firebase**.

## 4. Test przed 1 listopada (ważne!)

1. W `zagadki.json` ustaw `"start"` na dzisiejszą datę i wgraj.
2. Na telefonie otwórz stronę, zaloguj się jej hasłem i przejdź kilka zagadek, podpowiedź i pominięcie.
3. W panelu: **Wyczyść postęp**. Ustaw `"start": "2026-11-01"` i wgraj ponownie.

## Jak to działa

- Start: „Hejj, aby przejść dalej, wpisz hasło” → skan twarzy (przednia kamera, odliczanie 3-2-1, zdjęcie) → odliczanie do pierwszej łamigłówki albo 3-2-1 i gra.
- Na ekranie skanu jest napisane, że zdjęcie zostanie zachowane, i jest przycisk „Wolę bez zdjęcia”. Zapisane zdjęcia oglądasz w `admin.html` → **Zdjęcia ze skanu twarzy**. Gdy kamera nie działa, może zrobić zdjęcie aparatem albo przejść bez skanu.

- Zagadki otwiera **serwer** o ustalonej godzinie (`"godzina": 6` → 6:00 czasu polskiego). Zmiana daty w telefonie nic nie da.
- Odpowiedzi są zapisane w bazie tylko jako skróty SHA-256. Wielkość liter, spacje i polskie znaki nie mają znaczenia (`grudziadz` = `Grudziądz`).
- Podpowiedzi i pominięcia: po 3 na całą grę. Limit pilnuje serwer. Pominięcie też otwiera paczkę i daje literę.
- Litery dni 1–7 układają się w hasło finału (paczka 15).
- Jeśli zmienisz e-maile kont, zmień je w `config.js` **i** w `firestore.rules`.
- **Strych:** gdy wpisze `strych` w dowolne pole odpowiedzi, otwiera się tajna strona (ciemna, z pajęczyną). Później ma na górze przycisk „Wejdź na strych”. Treści dodajesz w `admin.html` → **Strych**: napisy i linki do filmików (YouTube „Niepubliczny” albo Dysk Google „każda osoba z linkiem”).
- **Podpisy:** przy pierwszym logowaniu podpisuje się palcem, a potem robi skan twarzy (oba tylko raz). Każdą rozwiązaną lub pominiętą paczkę „odbiera” podpisem i dopiero wtedy widzi „Otwórz paczkę nr X” i literę. Podpisy oglądasz w `admin.html` → **Podpisy odbioru**.
- **Sekrety:** wpisanie `easter egg` (albo `sekrety`, `jajka`, `osiągnięcia`, `achievementy`) otwiera gablotę z 33 osiągnięciami. Nieznalezione mają kłódkę, znalezione ikonkę. Po odkryciu w stopce pojawia się ikonka jajka. Zapisują się w przeglądarce telefonu.
- **Zabawy:** na dole strony (i na ekranie odliczania) jest „Jeżeli się nudzisz, to tutaj możesz się pobawić :3”. W środku: quiz o Tobie, prawda czy fałsz i układanie topek (przytrzymaj i przeciągnij albo strzałki). Wynik to ocena 1–6. Treść wgrywasz w `admin.html` → **Zabawy** z pliku `zabawy.json` (trzymaj go u siebie).
- **Kot:** pojawia się, gdy wpisze `kot`, `kotek`, `Chivas` albo `Nefera`. Stuknięcie = głaskanie. **Przytrzymanie** (ok. pół sekundy) otwiera menu: **Nakarm** (rybka, „mniam!”, serduszka) i **Nazwij** (imię widać pod kotem). Imię i licznik karmień zapisują się w przeglądarce telefonu.
