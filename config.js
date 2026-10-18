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
  adminEmail: 'admin@example.com'
};
