# Taccuino per iPad

Stessa app (stesso codice, stesse funzioni: penne, evidenziatori, tabelle, PDF, pagine infinite, Apple Pencil) adattata per iPad.
Due modi per installarla senza App Store.

## Modo 1 – Installazione immediata (consigliato, 1 minuto, niente Mac, niente store)
1. Metti la cartella `www/` su un qualsiasi hosting statico HTTPS gratuito (GitHub Pages, Netlify Drop, Cloudflare Pages).
   Esempio Netlify: vai su app.netlify.com/drop e trascina la cartella `www`.
2. Apri l'indirizzo con **Safari** sull'iPad → tasto Condividi → **Aggiungi a Home**.
3. Si apre a schermo intero come un'app, funziona offline, e gli appunti restano nel dispositivo (IndexedDB).
   Per importare i PDF la prima volta serve internet (scarica pdf.js e poi lo ricorda); in alternativa vedi `npm run prep` sotto.

Nessun certificato, nessuna scadenza, nessuna revoca.

## Modo 2 – File .ipa da installare con sideload
Serve un .ipa non firmato, costruito su macOS (non si può fare su Windows/Linux):
1. Crea un repository GitHub, carica tutto il contenuto di questa cartella.
2. Scheda **Actions → Build IPA → Run workflow**. Dopo ~5 minuti scarica l'artefatto `Taccuino-ipa` (Taccuino.ipa).
   (In alternativa, su un Mac con Xcode: `npm install && npm run prep && npx cap add ios && npx cap sync ios`, poi apri `ios/App` in Xcode.)
3. Installa il .ipa firmandolo con il tuo Apple ID tramite **AltStore**, **Sideloadly** o **TrollStore**
   (con Apple ID gratuito dura 7 giorni e va rifirmata; con TrollStore è permanente).

## Nota su AppValley
AppValley (e simili) è uno store di terze parti: non permette di caricare un proprio .ipa e funziona con certificati aziendali che Apple revoca
di continuo, quindi l'app smette di aprirsi senza preavviso (e rischi di perdere gli appunti). Per un'app personale i due modi sopra sono più sicuri e stabili.

## Backup
Dentro una nota: esporta in **.fulnote** (copia di sicurezza) e salvalo in File/iCloud. Importa con "Importa".
Se cancelli l'app dalla Home o i dati del sito da Safari, gli appunti si perdono: fai backup ogni tanto.

## Differenze rispetto alla versione Mac
- Salvataggio in IndexedDB invece di data.json; esportazioni tramite foglio di condivisione (Salva su File, AirDrop…).
- Il PDF esportato contiene le pagine come immagini (non testo selezionabile).
- Scorciatoie da tastiera ⌘ funzionano solo con tastiera collegata.
