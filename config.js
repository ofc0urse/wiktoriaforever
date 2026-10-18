/* Ustawienia gry.
   Dopóki firebase.apiKey jest pusty, strona działa w TRYBIE DEMO (hasło: demo).
   Wklej tu dane z Firebase: Ustawienia projektu → Twoje aplikacje → Konfiguracja.
   Te dane NIE są tajne: bezpieczeństwo zapewniają reguły Firestore. */
window.ZOSTAW_CONFIG = {
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  },
  // Konta zakładasz w Firebase → Authentication → Users → Add user.
  graczEmail: 'gracz@example.com',
  // Opcjonalnie: gdyby hasło miało mniej niż 6 znaków, strona dokleja tę końcówkę (Firebase wymaga min. 6).
  koncowkaHasla: '',
  adminEmail: 'admin@example.com'
};
