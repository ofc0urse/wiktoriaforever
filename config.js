/* Ustawienia gry.
   Dopóki firebase.apiKey jest pusty, strona działa w TRYBIE DEMO (hasło: demo).
   Wklej tu dane z Firebase: Ustawienia projektu → Twoje aplikacje → Konfiguracja.
   Te dane NIE są tajne: bezpieczeństwo zapewniają reguły Firestore. */
window.ZOSTAW_CONFIG = {
  firebase: {
    apiKey: 'AIzaSyCO-OIiNDtm75acTK7soblSLLdVQVWLMrY',
    authDomain: 'wiktoria-26-03-2011.firebaseapp.com',
    projectId: 'wiktoria-26-03-2011',
    storageBucket: 'wiktoria-26-03-2011.firebasestorage.app',
    messagingSenderId: '932147418978',
    appId: '1:932147418978:web:e02bd963adff2ddee2fe3b'
  },
  // Konta zakładasz w Firebase → Authentication → Users → Add user.
  graczEmail: 'gracz@example.com',
  // Opcjonalnie: gdyby hasło miało mniej niż 6 znaków, strona dokleja tę końcówkę (Firebase wymaga min. 6).
  koncowkaHasla: '',
  adminEmail: 'admin@example.com'
};
