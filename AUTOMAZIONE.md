# Procedura del lotto settimanale — Battute Gelate

Istruzioni per l'attività programmata che riempie il calendario di @battutegelate.

## Regole fisse

- **Brand Metricool:** "Battute Gelate", blogId `7845959`, Instagram `@battutegelate`, fuso `Europe/Rome`. Non pubblicare mai su altri brand.
- **Cadenza:** 2 contenuti al giorno.
  - **19:30** un Reel **gioco**, ruotando i 3 format interattivi: `trova` (trova il Gelo diverso, 3 livelli), `emoji` (indovina proverbio o modo di dire dalle emoji, 3 giri), `bicchieri` (segui il Gelo sotto i bicchieri). Mai lo stesso due giorni di fila. Dal 9 novembre sono il format principale: le battute da leggere tenevano solo il 18-36% delle persone oltre i 3 secondi, i giochi chiedono di fare qualcosa e si commentano.
  - Ogni 4 giorni circa, al posto di un gioco, uno dei vecchi template di battute (raffica, quiz, kinetic, ruota, classifica, indovina) con massimo 3 battute, per confrontare i dati.
  - Varia sempre i livelli: in `trova` le espressioni di Gelo (`furbo`, `gelato`, `ride`, `sveglio`, `serio`, `stupito`, oppure lo stesso con `specchiato: true` per il livello più difficile) e il `seme`; in `bicchieri` il `seme`, `scambi` (12-16) e `veloce` (0.18-0.25); in `emoji` proverbi e modi di dire italiani noti, l'ultimo giro il più difficile.
  - **12:30** un Reel breve "Battuta del giorno": template `kinetic` con `hook: ""`, `tag: "BATTUTA DEL GIORNO"` e una sola battuta, circa 8 secondi.
  - Caroselli e post "Completa la battuta" restano pronti nei template, ma si usano solo quando la pagina supera i 1.000 follower. Sotto quella soglia li vedono quasi solo i follower: nei primi giorni hanno raggiunto 1-3 persone contro le circa 180 dei Reel.
- **Durata dei Reel delle 19:30:** massimo 20 secondi. Il tempo medio di visione nei primi giorni è stato di 5 secondi. Usa 3 battute per raffica, 3 domande per il quiz e 3 indovinelli; per parola per parola e ruota bastano 2 o 3 battute.
- **Colori:** ogni contenuto ha `tema`. In ordine di pubblicazione ripeti la sequenza `cobalto`, `ghiacciolo`, `cobalto`, `limone` (in 3 colonne crea diagonali, non colonne dello stesso colore). Riparti da dove si è fermato l'ultimo lotto in `registro.md`.
- **Copertina:** ogni Reel ha `copertina` (testo breve, con `*parole*` evidenziate), `etichetta` e `copertina_gelo`. `render.py reel` crea `output/copertine/<id>.jpg`; passala come `videoThumbnailUrl` (URL raw con l'hash del commit), non usare `videoCoverMilliseconds`.
- **Pubblicazione:** `autoPublish: true`, `draft: false`.
- **Battute:** nessuna risposta già presente in `usate.txt`. Battute pulite, niente politica, religione o prese in giro di gruppi o persone reali. Ogni volta almeno metà inedite.

## Passaggi

1. Leggi `contenuti.json`, `usate.txt` e i template in `templates/`.
2. Con Metricool `getScheduledPosts`, guarda i prossimi 10 giorni e trova gli slot vuoti delle 12:30 e delle 19:30.
3. Con Metricool `getAnalyticsDataByMetrics`, leggi i risultati degli ultimi 14 giorni. Dai più spazio ai format con più condivisioni e salvataggi per copertura, e meno a quelli che vanno peggio, senza mai togliere un format del tutto.
4. Scrivi i nuovi contenuti in `contenuti.json` con id progressivi e aggiungi le risposte a `usate.txt`.
5. Genera i file: `python3 render.py reel <indici>` e `python3 render.py grafiche`. Controlla almeno un fotogramma per ogni Reel nuovo (`python3 render.py still <indice> <secondi>`) e la copertina.
6. Fai commit e push su `main` e annota l'hash del commit con `git rev-parse HEAD`. Metricool scarica i file da `https://raw.githubusercontent.com/enneone/battute-gelate/<hash>/output/...`: usa l'hash, non `main`, perché la cache di `main` può restituire versioni vecchie per qualche minuto.
7. Programma ogni contenuto negli slot vuoti con `createScheduledPost`.
   - Reel: `instagramData.type: REEL`.
   - Caroselli: `type: POST` con le 12 immagini in ordine.
   - Didascalia: `didascalia` + riga vuota + `hashtag`.
8. Aggiorna `registro.md` con una riga per lotto: data, contenuti programmati e cosa hai cambiato in base ai dati.
