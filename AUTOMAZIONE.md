# Procedura del lotto settimanale — Battute Gelate

Istruzioni per l'attività programmata che riempie il calendario di @battutegelate.

## Regole fisse

- **Brand Metricool:** "Battute Gelate", blogId `7845959`, Instagram `@battutegelate`, fuso `Europe/Rome`. Non pubblicare mai su altri brand.
- **Cadenza:** 2 contenuti al giorno.
  - **19:30** un Reel, ruotando i 6 template: raffica (`reel` + `formato: raffica`), quiz, kinetic, ruota, classifica, indovina (`reel` + `formato: indovina`). Mai lo stesso template due giorni di fila.
  - **12:30** a giorni alterni: un carosello (Scorri e congela, 12 slide) o un post "Completa la battuta". Nel post, la risposta va nel primo commento (`firstCommentText`).
- **Pubblicazione:** `autoPublish: true`, `draft: false`.
- **Copertina Reel** (`videoCoverMilliseconds`): 1600 per raffica e indovina, 1000 per gli altri template.
- **Battute:** nessuna risposta già presente in `usate.txt`. Battute pulite, niente politica, religione o prese in giro di gruppi o persone reali. Ogni volta almeno metà inedite.

## Passaggi

1. Leggi `contenuti.json`, `usate.txt` e i template in `templates/`.
2. Con Metricool `getScheduledPosts`, guarda i prossimi 10 giorni e trova gli slot vuoti delle 12:30 e delle 19:30.
3. Con Metricool `getAnalyticsDataByMetrics`, leggi i risultati degli ultimi 14 giorni. Dai più spazio ai format con più condivisioni e salvataggi per copertura, e meno a quelli che vanno peggio, senza mai togliere un format del tutto.
4. Scrivi i nuovi contenuti in `contenuti.json` con id progressivi e aggiungi le risposte a `usate.txt`.
5. Genera i file: `python3 render.py reel <indici>` e `python3 render.py grafiche`. Controlla almeno un fotogramma per ogni Reel nuovo. Poi cancella i file `*-copertina.png`.
6. Fai commit e push su `main` e annota l'hash del commit con `git rev-parse HEAD`. Metricool scarica i file da `https://raw.githubusercontent.com/enneone/battute-gelate/<hash>/output/...`: usa l'hash, non `main`, perché la cache di `main` può restituire versioni vecchie per qualche minuto.
7. Programma ogni contenuto negli slot vuoti con `createScheduledPost`.
   - Reel: `instagramData.type: REEL`.
   - Caroselli: `type: POST` con le 12 immagini in ordine.
   - Didascalia: `didascalia` + riga vuota + `hashtag`.
8. Aggiorna `registro.md` con una riga per lotto: data, contenuti programmati e cosa hai cambiato in base ai dati.
