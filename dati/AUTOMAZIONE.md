# Dati alla mano — regole per il rifornimento automatico

Pagina Instagram faceless di **dati e confronti animati sui temi del momento**, per un pubblico italiano ampio. Stesso account dell'ex @battutegelate: in Metricool il brand si chiama ancora "Battute Gelate" (**blogId 7845959**, fuso Europe/Rome). Non pubblicare mai su altri brand.

Il livello deve sembrare quello di una redazione con grafici, motion designer e fact-checker: dati veri, grafica curata, niente testi tagliati o sovrapposti. Tutto si fa in codice, **senza strumenti a pagamento** (niente Higgsfield, ElevenLabs o simili: l'utente ha scelto la strada gratuita).

> **Nota del 22 novembre 2026 (valida solo per il rifornimento di oggi):** i template stanno per essere rifatti (testi divisi in frasi brevi, suoni nuovi, musica di sottofondo). Oggi fai solo la parte di ricerca: scegli i temi, verifica i dati e scrivi i Reel in `dati/contenuti.json` per tutti gli slot vuoti fino a 6 giorni da oggi, poi commit e push. **Non renderizzare e non programmare nulla in Metricool:** video e programmazione li fa la sessione principale con i template nuovi. Per ogni Reel aggiungi anche il campo `frasi`: 3-5 frasi brevissime (massimo 6-7 parole l'una) che raccontano il dato passo per passo, dalla prima all'ultima, una idea per frase. Esempio: ["Ecco quanto si guadagna in Europa", "L'Italia è sotto la Spagna", "Il Lussemburgo quasi il doppio"].

## Cadenza
- **3 Reel al giorno: 12:30, 18:30, 21:15.**
- Riempi sempre fino a 6 giorni da oggi.
- I post con `draft: true` o con contenuti vecchi di Battute Gelate (giochi, battute, emoji, pressa, plinko, gara) non contano come coperti: aggiornali con `updateScheduledPost` mettendo il nuovo Reel e `draft: false`, oppure lasciali in bozza e crea post nuovi negli slot giusti.

## Scelta dei temi
1. **Temi caldi prima di tutto.** Cerca sul web di cosa si parla in Italia in questi giorni (uscite di giochi, film e serie, X Factor, Sanremo, calcio, Black Friday, Natale, saldi, bollette, prezzi, notizie economiche). Su un tema molto caldo puoi fare una serie da 2-3 Reel con angoli diversi (come GTA VI: incasso, copie, voti).
2. **Pubblici diversi ogni giorno.** Nello stesso giorno mai due Reel per lo stesso pubblico. Ruota tra: gaming, TV e musica, soldi e lavoro, casa e giovani, calcio, cibo e prezzi, viaggi, tecnologia.
3. **L'Italia come termine di confronto** appena possibile: "noi rispetto agli altri" fa commentare e condividere.
4. Calendario da tenere d'occhio: X Factor (finale a dicembre), Black Friday, Natale (spese, regali, tredicesima), Capodanno, Sanremo (febbraio: ascolti, cachet, vincitori, canzoni più ascoltate), Champions e Serie A.

## Verifica dei dati (obbligatoria)
- Ogni numero viene da una fonte che hai **letto davvero** in questa sessione (WebFetch). Mai numeri a memoria.
- Preferisci fonti primarie (Eurostat, ISTAT, OCSE, Banca d'Italia, comunicati delle aziende, Box Office Mojo, Metacritic) o testate serie che le citano.
- Scrivi la fonte nel campo `fonte` (in maiuscolo, con data o anno). Se è una stima, scrivi "STIMA" o "STIME"; se ci sono condizioni (lordo, prevendite incluse, parità di potere d'acquisto), scrivile.
- Non piegare i dati: barre proporzionali, nessun asse tagliato, nessuna parola che esageri ("in 24 ore" se il dato è "fino al giorno del lancio" è un errore).
- Se non trovi un dato verificato, **cambia tema**.

## Gancio e struttura
- **Il primo fotogramma deve già agganciare:** il titolo (`hook`, 2-3 righe brevi) con un numero concreto o un contrasto ("Finlandia: 21 anni. Italia: *30*."). La parola tra asterischi esce in corsivo verde.
- Durata 14-20 secondi, 60 fps (`"fps": 60`).
- Chiudi con una **domanda che chiede un commento** (`domanda`, `domanda2`), tipo "Tu a che età sei uscito di casa?".
- Il `kicker` (riga piccola sopra il titolo) dice tema e fonte in breve: "EUROSTAT · DATI 2025".

## Template disponibili (in `dati/`)
Copia la struttura di un esempio già presente in `dati/contenuti.json` e cambia solo i contenuti.

| Template | Quando usarlo | Esempio |
|---|---|---|
| `classifica3d` | 8-12 paesi o voci da confrontare, con una voce in evidenza (`focus`) | D01 stipendi in Europa |
| `hype` | un numero enorme in apertura e 2-3 confronti, l'ultimo "rompe" il grafico; stile neon (adatto a gaming e intrattenimento) | D02 GTA VI incasso |
| `punti` | "se ogni X fosse una persona": pallini che si riempiono, gruppi di confronto, poi mini classifica | D03 GTA VI copie |
| `asse` | valori sulla stessa scala (età, ore, prezzi), con media e distacco | D04 uscita di casa |
| `countdown` | top 10 dal decimo al primo | D05 voti Metacritic |
| `barre` | classifica completa fino a 20 voci (squadre, città, marchi) | D06 Serie A stipendi |

Mai lo stesso template due volte nello stesso giorno. Nomi lunghi: accorciali (es. "Zelda: Ocarina of Time") e controlla che non escano dallo spazio.

## Copertine
Ogni Reel ha `copertina` (2-4 righe brevi, una parola tra asterischi), `copertina_numero` (il dato forte, es. "30,2 ANNI") e, per gaming e intrattenimento, `"copertina_tema": "vice"`. Il testo sta tutto nella zona che la griglia del profilo mostra.

## Comandi
```
cd dati
python3 render.py still <indice> 0 3 8 14      # fotogrammi di controllo nello scratchpad del progetto padre
python3 render.py reel <indici...>             # video in dati/output/reel/<id>.mp4 (60 fps)
python3 render.py copertine <indici...>        # copertine in dati/output/copertine/<id>.jpg
```
Controlla **almeno 4 fotogrammi per Reel** (apertura, metà, finale, domanda): testi tagliati, sovrapposizioni, numeri che escono dal bordo vanno corretti prima del commit. Cancella i file `.wav` rimasti.

## Pubblicazione
- `createScheduledPost` su blogId 7845959: `providers: [{"network":"instagram"}]`, `instagramData: {"type":"REEL","showReelOnFeed":true}`, `autoPublish: true`, `draft: false`.
- `media`: `https://raw.githubusercontent.com/enneone/battute-gelate/<hash commit>/dati/output/reel/<id>.mp4`; `videoThumbnailUrl`: stessa base con `dati/output/copertine/<id>.jpg`. Sempre l'hash del commit, mai `main`.
- Testo: `didascalia`, riga vuota, poi al massimo 2 hashtag. La didascalia ripete il dato forte e chiude con la domanda.

## Registro
Dopo ogni lotto aggiungi a `dati/registro.md`: data, Reel programmati (id, data, ora, pubblico), cosa hai cambiato in base alle statistiche.
