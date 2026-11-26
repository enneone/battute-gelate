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

## 22 novembre 2026 (pomeriggio): nuovo marchio Che Numeri
- Su richiesta dell'utente: nome **Che Numeri** (@che_numeri), logo con la scritta minuscola "che numeri!" in Bricolage Grotesque (scelto tra varie proposte), foto profilo `output/che-numeri-foto-arancio.png`.
- Colori: tre temi alternati post dopo post (carta, arancio, nero) al posto di nero e lime. Fonti per la scelta: palette Pinterest 2026 (Persimmon, Cool Blue) e Pantone 2026 Cloud Dancer. Orari: 12:30 carta, 15:00 nero (pressa), 18:30 carta, 21:15 arancio; l'hype sempre nero.
- Copertine nuove: etichetta dell'argomento, icona grande, numero e titolo, così il tema si capisce dalla griglia.
- Nuovo formato **sfida** alle 18:30 (Italia contro Germania, Spagna, Francia, Grecia) con dati già verificati in sessione (OCSE stipendi 2024 e ore 2025, Eurostat casa 2025, luce 1° sem. 2026, NEET 2025, inflazione ottobre 2026).
- Domanda finale: l'etichetta "Scrivi…" non copre più le parole (prima succedeva in 14 Reel su 28, tutte le presse comprese).
- Calendario rifatto: 23/11 S01, 24/11 S04, 25/11 S02, 26/11 S03 alle 18:30; D05, D08, D11 e D14 spostati al 29/11-1/12; il 28/11 D21 alle 18:30 e D20 (hype, nero) alle 21:15. D02 delle 12:30 di oggi è uscito ancora col vecchio marchio.
- Aggiornato anche il testo del controllo automatico del mattino (nome, 4 Reel al giorno, sfida, analisi ogni giorno).
- Nome utente definitivo indicato dall'utente: **@che_numeri** (nella chiusura di ogni video). Tutti i Reel ancora da pubblicare rifatti con questo nome.
- Nuovo formato **spiegone** (template `spiegone`), sul modello del Reel di @fuoriditarget indicato dall'utente (McDonald's e "Mamma ho perso l'aereo", 33.238 riproduzioni). Primo: SP01 Black Friday (Altroconsumo, indagine ottobre 2026 su 2.017 italiani, via Affaritaliani 12/11/2026: 83% vuole comprare, budget medio 246 €, solo l'1,4% sa cosa deve mostrare un vero sconto; 35% nel 2025 ha comprato cose non previste o sforato il budget), il 26/11 alle 21:15. D15 (ore lavorate) spostato al 30/11 alle 21:15.
- Calendario finale su Metricool (tutti i video rifatti con marchio Che Numeri e @che_numeri; commit e03f51e, c02f1df, cbb03a3, fcaee94):
  - 22/11: 15:00 P01 · 18:30 D03 · 21:15 D01
  - 23/11: 12:30 D04 · 15:00 P02 · 18:30 S01 Italia-Germania · 21:15 D06
  - 24/11: 12:30 D07 · 15:00 P03 · 18:30 S04 Italia-Grecia · 21:15 D09
  - 25/11: 12:30 D10 · 15:00 P04 · 18:30 S02 Italia-Spagna · 21:15 D12
  - 26/11: 12:30 D13 · 15:00 P05 · 18:30 S03 Italia-Francia · 21:15 SP01 Black Friday
  - 27/11: 12:30 D16 · 15:00 P06 · 18:30 D17 · 21:15 D18
  - 28/11: 12:30 D19 · 15:00 P07 · 18:30 D21 · 21:15 D20
  - 29/11: 12:30 D05 · 21:15 D11 — 30/11: 12:30 D08 · 21:15 D15 — 1/12: 12:30 D14 (gli altri slot li riempie il rifornimento automatico)
- Countdown: il riquadro del primo classificato usava ancora il verde lime (colore impostato da JavaScript, che `recolor()` non traduce): ora usa `var(--top)`. Regola: nei template i colori impostati da JavaScript vanno scritti come variabili CSS (`var(--top)`, `var(--ink)`, `var(--foc)`).
- 22/11 pomeriggio, su richiesta dell'utente: spiegone in più su GTA 6 (SP02, tema nero, sfondo disegnato "vice", icone per punto, nessuna immagine ufficiale per scelta dell'utente) programmato oggi alle 20:00. Fonti: GamesRadar 14/10/2026, TechCrunch 5/12/2023, Take-Two 20/11/2026 e Q2 FY27.

## 23/11/2026 (controllo automatico del mattino)
- Post del 22/11 (D02, P01, D03, SP02, D01) tutti pubblicati, nessuno in errore; quelli di oggi in attesa. Nessuna riprogrammazione.
- Analisi 14 giorni (dettagli in `analisi.md`): mediana 152 visualizzazioni; pressa P01 1.513 (67,9% oltre 3 s), quasi 10 volte la mediana; i 3 Reel su GTA 6 dello stesso giorno 141-230; D01 stipendi 114 (18,3% oltre 3 s).
- Cambiato in base ai dati: **pressa a 2 slot al giorno**. Programmati P08 "Chi resiste più a lungo?" (29/11 15:00, nero) e P09 "Qualcuno si salva?" (29/11 18:30, carta, seconda pressa al posto della sfida). Template `pressa` corretto ("E infine…" solo sull'ultimo oggetto). Mai più di un Reel sullo stesso tema caldo nello stesso giorno.
- Video dal commit a7fd43c. Calendario pieno fino al 29/11 (4 Reel al giorno); 30/11 e 1/12 parziali, li completa il prossimo rifornimento.

## 24/11/2026 (controllo automatico del mattino)
- Post del 23/11 (D04, P02, S01, D06) tutti pubblicati, nessuno in errore; quelli di oggi in attesa. Nessuna riprogrammazione.
- Analisi 14 giorni (dettagli in `analisi.md`): mediana 144 visualizzazioni. P01 pressa 1.517; D03 GTA 6 copie salita a 454 (3,2 volte la mediana); P02 pressa Natale solo 147 (ma 54,7% oltre 3 s, la migliore tenuta del 23/11); S01 sfida 136, D04 140, D06 115.
- Cambiato in base ai dati: **D05 (GTA 6 voti) anticipato al 26/11 12:30** come seguito di D03 entro 2 giorni, scambiato con D13 (rincari, ora 29/11 12:30). Pressa confermata a 2 slot ma con ganci "a scommessa" e un oggetto che si rompe in apertura; se 3 presse di fila restano sotto 300, la seconda pressa torna sfida o dati.
- Programmati (video dal commit b65e9db): 30/11 15:00 P10 "Indovina chi si rompe" (nero) · 30/11 18:30 P11 "Ne resiste almeno uno?" (carta) · 1/12 15:00 P12 "Fai la tua scommessa" (nero) · 1/12 18:30 P13 "Chi arriva fino alla fine?" (carta).
- Calendario pieno fino al 30/11 (4 Reel al giorno). 1/12: manca solo il 21:15 (spiegone, lo fa il prossimo rifornimento).

## 25/11/2026 (controllo automatico del mattino)
- Post del 24/11 (D07, P03, S04, D09) tutti pubblicati, nessuno in errore; quelli di oggi (D10, P04, S02, D12) in attesa. Nessuna riprogrammazione.
- Analisi 14 giorni (dettagli in `analisi.md`): mediana 142. P03 pressa 136 ma 72,4% oltre 3 s (tenuta record); S04 124, D07 121, D09 luce 104 (il più basso). Seconda pressa di fila sotto 300: se anche P04 resta sotto, dal 2/12 la seconda pressa delle 18:30 torna sfida o dati.
- Programmato (video dal commit 938ea3c): 1/12 21:15 **SP03 spiegone regali di Natale** (arancio; mUp Research per Facile.it, 2.012 interviste, 28/10-1/11/2026: 6 regali a testa contro 7 nel 2025, 4,6 milioni già comprati a inizio novembre, 5,1 milioni aspettano la tredicesima, budget 316 €).
- Calendario pieno fino al 1/12 (4 Reel al giorno). Prossimo rifornimento: dal 2/12.

## 26/11/2026 (controllo automatico del mattino)
- Post del 25/11 (D10, P04, S02, D12) tutti pubblicati, nessuno in errore; quelli di oggi (D05, P05, S03, SP01) in attesa. Nessuna riprogrammazione.
- Analisi 14 giorni (dettagli in `analisi.md`): mediana 139. S02 Italia-Spagna 155 (47,8% oltre 3 s, la sfida migliore), P04 pressa 150 (66,9%), D10 NEET 129, D12 X Factor 14 dopo poche ore (tema TV debole, da ricontrollare).
- Cambiato in base ai dati: **terza pressa di fila sotto 300 → dal 2/12 la seconda pressa delle 18:30 torna sfida.** Test del template `punti` fuori dal gaming (D22). Template `punti`: il contatore mostra il valore esatto a fine riempimento.
- Programmati (video dal commit e101221), tutti il 2/12:
  - 12:30 **D22 italiani all'estero** (punti, carta, pubblico casa e giovani): Migrantes RIM 2026, 6.630.284 iscritti AIRE al 1/1/2026 (3,1 milioni nel 2006); Eurostat popolazione regioni 1/1/2025: sarebbero la 2ª regione dopo la Lombardia.
  - 15:00 **P14 pressa** "Scommetti su chi si salva" (nero): lattina, anguria, pallina dell'albero, pallina antistress, cellulare.
  - 18:30 **S05 Italia-Portogallo** (sfida, carta, 1-5): solo Eurostat (uscita di casa 2025, NEET 2025, luce e gas famiglie 1° sem. 2026, inflazione ottobre 2026, livello dei prezzi 2025).
  - 21:15 **SP04 spiegone ristoranti** (arancio, pubblico cibo e prezzi): TradeLab 1° sem. 2026 via Ristoranti Web/Vinetur (+3,2% locali sopra 35 €, settore -0,6%, fascia media -2/3%, 52% delle visite a cena, pizzerie +0,6%).
- Calendario pieno fino al 2/12 (4 Reel al giorno). Prossimo rifornimento: dal 3/12.
