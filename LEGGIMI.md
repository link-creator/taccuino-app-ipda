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

## Novità della versione 1.10.3 – codici monouso attivi
Il registro dei codici è già creato e collegato (`www/config.js`). Un codice, una volta attivato su un iPad, non funziona più su un altro: serve internet solo al momento dell'inserimento. Lo stesso iPad può rimetterlo; un altro iPad vede "Questo codice è già stato usato".
Il registro è un Google Foglio privato nel tuo account Google (le prime 2 righe sono segnaposto, non toccarle). Per liberare un codice (es. hai reinstallato l'app) cancella la riga corrispondente nel foglio.
Dopo l'aggiornamento carica su GitHub la cartella `www` e `package.json` e rifai la build.

## Novità della versione 1.9.1
- **Scrivere su PDF**: già presente. Importa il PDF dalla home ("Importa → Importa PDF"): ogni pagina diventa un foglio su cui scrivi, disegni, evidenzi, firmi e metti timbri.
- **Scrivere su foto**: già presente. Con l'icona delle immagini in alto inserisci una foto nel foglio e ci scrivi sopra con qualsiasi penna.
- **Copiare solo una parte di una foto (novità)**: con "Seleziona" tocca la foto, poi premi **Copia parte** nella barra che compare, e trascina un rettangolo sulla zona che ti serve. La parte scelta diventa un'immagine a sé, già selezionata sul foglio. Rimane in memoria: con l'icona **Incolla** in alto (o il tasto Incolla della barra di selezione) la incolli anche in un'altra pagina. Viene copiata solo la foto, non quello che ci hai scritto sopra.

## Novità della versione 1.9.0
- **Firma (solo Business)**: nella barra strumenti, icona della firma. "Nuova firma" apre un riquadro dove firmi con Pencil o dito (nero o blu); se sbagli, "Cancella". Puoi salvarne **fino a 10**; per aggiungerne altre elimini una con la × rossa. Per usarla tocchi la firma scelta: compare sul foglio già selezionata, la trascini e ridimensioni con "Seleziona". Le firme restano salvate sull'iPad e non vengono incluse nei file .fulnote esportati come impostazione, ma una firma inserita nel foglio sì.

## Novità della versione 1.8.0 – Personal e Business
- **Codice prodotto**: durante il tutorial l'app chiede un codice (formato `TACP-XXXX-XXXX-XXXX` o `TACB-XXXX-XXXX-XXXX`). Con un codice Business compare "Benvenuto su Taccuino Business", altrimenti "Benvenuto su Taccuino Personal". Si può cambiare dall'ingranaggio → "Codice prodotto" (per esempio per passare a Business).
- **Strumenti solo Business**: **Righello** (in cm, si sposta trascinando la parte bassa, si ruota con il pallino azzurro a destra con scatti ogni 15°; le penne si agganciano al bordo e tracciano linee dritte), **Timbri** (APPROVATO, BOZZA, URGENTE, RICEVUTO, RIVISTO, CONFIDENZIALE, data di oggi) e **Note adesive** colorate. Timbri e note si spostano/ridimensionano con "Seleziona".
- **900 codici** (450 Business + 450 Personal) sono nel file separato `Taccuino-Codici-Prodotto.txt` / `.csv`: tienilo privato e non metterlo su GitHub. Nell'app ci sono solo i codici cifrati (`www/keys.js`), non si possono ricavare i codici originali.
- Importante: la verifica è offline, quindi **un codice funziona su qualsiasi iPad e può essere usato più volte**; non c'è un contatore di utilizzi. Chi ha il file `.ipa` e un codice può usarlo. Se vuoi codici monouso serve un piccolo server.
- Rimossi: blocco con Face ID/codice. Chi aveva già la 1.7.0 vedrà una volta sola la schermata del codice prodotto.

## Novità della versione 1.7.0
- **Animazioni** ovunque: libreria, taccuini, menu, finestre, barra strumenti, cestino e sblocco.
- **Foglio non più ruotabile**: con due dita resti in zoom e spostamento, il foglio rimane sempre dritto.
- **Tutorial e primo avvio a passi**: "Benvenuto in Taccuino", 3 schermate di tutorial (si possono saltare), poi nome, età, uso e blocco, **una domanda alla volta**.
- ~~Blocco app con Face ID / codice~~: rimosso nella 1.8.0, sostituito dai codici prodotto.

## Novità della versione 1.6.0
- **Matita a pressione**: più premi con la Apple Pencil, più il tratto è scuro e grosso; leggero = sottile e chiaro. Con il dito o il mouse il tratto resta di spessore medio.
- **Gomma a pressione**: la gomma diventa più grande premendo di più (lo slider fissa la misura massima). Funziona a pixel o a tratto.
- **Modalità Apple Pencil** (icona scudo in alto, o ingranaggio): si disegna solo con la Pencil e il palmo viene ignorato (tocchi larghi, 4+ dita o appoggiati subito dopo la penna). Con "Disegna con le dita" attivo la modalità si disattiva.
- **Riempimento colore** (secchiello): tocca un'area chiusa da tratti o forme e viene riempita col colore scelto. Ritoccando la stessa area con un altro colore lo cambia. Se la forma ha un buco, il colore esce: chiudila o annulla. Il riempimento sta sotto i tratti, non considera lo sfondo dei PDF; la gomma a pixel non lo cancella (usa la gomma a tratto, la selezione o Annulla).
- Testato solo su browser simulato, non su iPad/Pencil reali: se il feeling della pressione non ti piace, dimmelo e lo regolo.

## Novità della versione 1.5.0
- **Gomma pixel**: cancella solo la parte toccata. La grandezza si regola con lo slider in basso nella barra a sinistra. Toccando di nuovo la gomma scegli tra pixel, a tratto e "Svuota pagina".
- **Blocco del foglio**: l'icona del lucchetto in alto blocca scorrimento, zoom e rotazione, così il foglio non si sposta mentre scrivi (e i tocchi accidentali non fanno annulla).
- **Penna più reattiva**: tratti disegnati subito e con tutti i punti anche scrivendo veloce, il palmo appoggiato viene ignorato. Rimossi i vari tipi di penna: ora c'è una penna e un evidenziatore.
- **Geometria**: 22 forme (linea, tratteggiata, frecce, misura in cm, quadrato, cerchio, triangoli, rombo, trapezio, pentagono, esagono, stella, croce, assi cartesiani, cubo, griglia...). Tocca lo strumento Forme per sceglierle.
- ~~Ruotare il foglio~~: rimosso nella 1.7.0 (restano zoom con due dita e spostamento).
- **Primo avvio**: chiede nome, età (minimo 10 anni) e per cosa usi Taccuino. In alto compare "Ciao, nome". Dall'ingranaggio puoi modificare il profilo. I dati restano solo sul tuo iPad.
- **Taccuini**: i tre pallini aprono Cestina, Rinomina, Sposta a… Puoi anche trascinare un taccuino su una cartella (tocco: tieni premuto un attimo, poi trascina).
- **Cestino** in basso a destra nella home: ripristina o elimina definitivamente i taccuini cestinati.
- Per aggiornare l'app già installata: ricarica i file sul tuo hosting (o rifai il .ipa) e riapri l'app due volte; gli appunti restano.
