# Registro Dati alla mano

## 22 novembre 2026: lancio della nuova direzione
- Nuova identità: nome "Dati alla mano", foto profilo "d" lime (`output/foto-profilo-A.png`), colori lime #C8FF2E e corallo #FF5B4A su nero, font Big Shoulders, Geist Mono, Instrument Serif, Outfit.
- Template: classifica3d, hype, punti, asse, countdown, barre, copertina. Tutti a 60 fps.
- Programmati: 22/11 12:30 D02 GTA VI incasso (gaming) · 18:30 D03 GTA VI copie vs paesi (gaming) · 21:15 D01 stipendi Europa (lavoro) · 23/11 12:30 D04 uscita di casa (giovani) · 18:30 D05 GTA VI top 10 voti (gaming) · 21:15 D06 Serie A stipendi (calcio).
- Vecchi post Battute Gelate dal 24 al 26/11 messi in bozza: il rifornimento automatico li sostituisce con Reel nuovi.

## 22 novembre 2026: rifornimento automatico (solo ricerca, come da nota in AUTOMAZIONE.md)
- Controllo Metricool: post del 21/11 pubblicati senza errori; 22 e 23/11 coperti (6 Reel D01-D06). Dal 24/11 solo le vecchie bozze Battute Gelate (12:30 e 19:30, draft: true), che non contano.
- Scritti in `contenuti.json` 15 Reel nuovi (D07-D21) con `frasi`, per gli slot dal 24 al 28/11. **Non renderizzati e non programmati**: li fa la sessione principale con i template nuovi.
- Piano slot (id · template · pubblico):
  - 24/11: 12:30 D07 affitti città (barre, casa) · 18:30 D08 top 10 Marvel / Doomsday (countdown, cinema) · 21:15 D09 luce in Europa (asse, bollette)
  - 25/11: 12:30 D10 NEET (asse, giovani) · 18:30 D11 spettatori Serie A, Lazio ultima (barre, calcio) · 21:15 D12 ascolti live X Factor (countdown, TV; semifinale giovedì 26)
  - 26/11: 12:30 D13 rincari ottobre ISTAT (barre, cibo) · 18:30 D14 console più vendute (countdown, gaming) · 21:15 D15 ore lavorate OCSE (classifica3d, lavoro)
  - 27/11 (Black Friday): 12:30 D16 prezzo iPhone 18 Pro per paese (classifica3d, tech) · 18:30 D17 gas in Europa (asse, bollette) · 21:15 D18 film più visti in Italia 2026 (barre, cinema)
  - 28/11: 12:30 D19 skipass 2026/27 (classifica3d, viaggi) · 18:30 D20 Spider-Man record 2026 (hype, cinema) · 21:15 D21 inflazione ottobre in Europa (asse, soldi)
- Fonti lette in sessione: Idealista 03/11/2026; The Numbers e Box Office Mojo 22/11; Eurostat 30/10 e Euronews 12/11 (luce e gas); Eurostat NEET 28/05/2026; Transfermarkt 21/11; Sky/ANSA/Sky TG24 (X Factor); ISTAT 17/11; Nintendo IR, Sony via GamingBolt, Wikipedia (console); OCSE via statisticsoftheworld e Wikipedia; apple.com 22/11 e cambio BCE 20/11; Altroconsumo 18/11; Eurostat HICP 18/11.
- Da ricontrollare prima del render: D11 (Transfermarkt si aggiorna dopo ogni giornata), D16 (prezzi Apple possono cambiare col Black Friday), D18/D20 (incassi in aggiornamento).
- Scartati perché non verificabili oggi: tredicesima 2026 (stime non ancora uscite, quelle trovate erano del 2025), spesa di Natale per paese (nessuna indagine 2026 con dati per paese), Hunger Games (weekend non ancora definitivo). I template `punti` e `hype` non reggono percentuali o valori non in dollari: per Black Friday e regali di Natale servirebbe un template adatto.
- Statistiche ultimi 14 giorni (contenuti vecchi Battute Gelate, i Reel dati non sono ancora usciti): migliore la pressa idraulica del 21/11 (1.399 visualizzazioni, 63,9% oltre i 3 secondi); quasi zero condivisioni, salvataggi e commenti su tutto. Lezione applicata: movimento forte dal primo fotogramma e gancio con un numero; domande finali facili da commentare (SÌ/NO, la tua squadra, il tuo affitto).

## 22 novembre 2026 (mezzogiorno): render e programmazione 24-28/11
- Renderizzati D07-D21 e P03-P07 (60 fps, musica e suoni). Controllati i fotogrammi di tutti i Reel.
- Corretti i template prima del render: la 4ª frase non compariva in 13 Reel (ora `asse` e `barre` ne mostrano 4; `countdown` e `classifica3d` legano ogni frase a una voce con `frasi_at`); suffisso del countdown che andava a capo; nel countdown la riga del primo si sovrapponeva al secondo per un attimo; barre che si adattano al numero di voci (righe più alte, nomi lunghi rimpiccioliti, spazio per l'etichetta del valore); scala di `asse` abbassata sotto il gancio; in `classifica3d` etichette del focus e del primo non più sovrapposte quando sono vicine.
- D11: tolta dal gancio e dalla didascalia "Lazio prima in classifica" (dopo la 12ª giornata può cambiare prima del 25/11); nuovo gancio "Inter 75mila a partita, la Lazio 10mila". D19: "+33% in cinque stagioni" confermato da Teleborsa 18/11/2026 (dati Altroconsumo).
- Programmati su Metricool (blogId 7845959), 4 al giorno, nessuna bozza rimasta:
  - 24/11: 12:30 D07 affitti · 15:00 P03 pressa frutta · 18:30 D08 Marvel · 21:15 D09 luce
  - 25/11: 12:30 D10 NEET · 15:00 P04 pressa uovo · 18:30 D11 stadi Serie A · 21:15 D12 X Factor
  - 26/11: 12:30 D13 rincari · 15:00 P05 pressa smartphone · 18:30 D14 console · 21:15 D15 ore lavorate
  - 27/11: 12:30 D16 iPhone · 15:00 P06 pressa budino · 18:30 D17 gas · 21:15 D18 film 2026
  - 28/11: 12:30 D19 skipass · 15:00 P07 pressa mix · 18:30 D20 Spider-Man · 21:15 D21 inflazione
- Video dal commit ff6aaaa (24/11) e 4d27b07 (dal D11 in poi).
- Prossimo rifornimento: dal 29/11. Prima analisi vera dei Reel di dati appena escono i primi (22-23/11).
