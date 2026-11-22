# Dati alla mano — regole per il rifornimento automatico

Pagina Instagram faceless di **dati e confronti animati sui temi del momento**, per un pubblico italiano ampio. Stesso account dell'ex @battutegelate: in Metricool il brand si chiama ancora "Battute Gelate" (**blogId 7845959**, fuso Europe/Rome). Non pubblicare mai su altri brand.

Il livello deve sembrare quello di una redazione con grafici, motion designer e fact-checker: dati veri, grafica curata, niente testi tagliati o sovrapposti. Tutto si fa in codice, **senza strumenti a pagamento** (niente Higgsfield, ElevenLabs o simili: l'utente ha scelto la strada gratuita).

## Cadenza
- **4 Reel al giorno: 12:30, 15:00, 18:30, 21:15.**
- **15:00 è sempre la pressa** (template `pressa`): è il format che finora ha tenuto di più (1.399 visualizzazioni e 63,9% oltre i 3 secondi il 21/11).
- Gli altri tre slot sono Reel di dati sui temi del momento.
- Riempi sempre fino a 6 giorni da oggi: **non devono mai esserci giorni vuoti.** Se la ricerca non trova abbastanza temi verificati, usa temi sempreverdi (stipendi, prezzi, città, sport, consumi) oppure una pressa in più, ma non lasciare slot vuoti.
- I post con `draft: true` o con contenuti vecchi di Battute Gelate (giochi, battute, emoji, pressa, plinko, gara) non contano come coperti: aggiornali con `updateScheduledPost` mettendo il nuovo Reel e `draft: false`, oppure lasciali in bozza e crea post nuovi negli slot giusti.

## Analisi automatica (ogni mattina, prima di scegliere i temi)
1. Leggi da Metricool le statistiche dei Reel degli ultimi 14 giorni (getAnalyticsDataByMetrics, metriche IGRE02, IGRE03, IGRE11 copertura, IGRE23 visualizzazioni, IGRE21 condivisioni, IGRE12 salvataggi, IGRE07 commenti, IGRE24 tempo medio di visione, IGRE28 percentuale oltre i 3 secondi).
2. Collega ogni Reel al suo id in `contenuti.json` (dalla didascalia) e quindi al **template** e al **pubblico/tema**.
3. Calcola per template e per tema: visualizzazioni medie, mediana, percentuale oltre i 3 secondi, tempo medio, condivisioni + salvataggi + commenti ogni 1.000 visualizzazioni.
4. Aggiorna `dati/analisi.md`: tabella per template, tabella per tema, i 3 Reel migliori e i 3 peggiori con il motivo probabile (gancio, tema, durata).
5. Decidi il mix dei prossimi giorni in base ai numeri:
   - un template o tema con visualizzazioni almeno il **doppio della mediana** sale a 2 slot al giorno (oppure diventa una serie);
   - uno sotto la **metà della mediana** per 4 uscite di fila esce dal piano per una settimana;
   - se un Reel supera di 3 volte la mediana, fai entro 2 giorni un seguito sullo stesso tema con un angolo nuovo.
   Scrivi le decisioni in fondo a `dati/analisi.md` e nel registro.

## La pressa (slot delle 15:00)
- Template `pressa`, campo `oggetti`: 4 oggetti più il finale `cellulare` (il "boss finale" che rompe la pressa, è un appuntamento fisso). Oggetti disponibili: uovo, anguria, pomodoro, pallina (resiste), budino (resiste), telefono, panettone, pallina_natale, lattina.
- Mai la stessa sequenza di oggetti due volte; alterna quelli che resistono e quelli che si rompono.
- Gancio sempre diverso (`hook`): "Il panettone resiste alla *pressa?*", "Indovina cosa *resiste*", "5 oggetti contro una *pressa*". Le `frasi` si generano da sole con i nomi degli oggetti.
- Domanda finale: "Cosa mettiamo sotto la *pressa?*". Leggi i commenti dei giorni prima: se qualcuno propone un oggetto e il template non lo ha, annotalo in `dati/analisi.md` come idea (aggiungere un oggetto richiede di disegnarlo in `pressa.html`).
- Nella pressa non ci sono dati, quindi niente `fonte`.

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

## Gancio, frasi e struttura (comunicazione chiara)
- **Una sola frase alla volta sullo schermo.** In alto compare prima il gancio (`hook`), poi le `frasi`, una dopo l'altra, parola per parola, come sottotitoli che raccontano il dato. Niente titoli fissi, niente righe di testo piccole sparse.
- `hook`: 1-2 righe, massimo 8-9 parole in tutto, con un numero concreto o un contrasto ("In Italia si esce di casa a *30 anni*"). La parola tra asterischi esce in corsivo verde.
- `frasi`: 3-4 frasi (per `punti` anche 4), **massimo 6-7 parole l'una**, una idea per frase, nell'ordine in cui il grafico mostra le cose. Esempio stipendi: ["Ecco gli stipendi medi in Europa", "Spagna e Francia *ci superano*", "Il Lussemburgo: *quasi il doppio*"].
- Il grafico deve muoversi già durante il gancio: il primo fotogramma ha sempre il gancio più un elemento visivo.
- Chiudi con una **domanda che chiede un commento** (`domanda`, `domanda2`).
- Audio: musica elettronica di sottofondo e suoni vengono generati da `dati/audio.py` in automatico durante il render (non serve fare niente).
- Durata 14-20 secondi, 60 fps (`"fps": 60`).

## Template disponibili (in `dati/`)
Copia la struttura di un esempio già presente in `dati/contenuti.json` e cambia solo i contenuti.

| Template | Quando usarlo | Esempio |
|---|---|---|
| `classifica3d` | 8-12 paesi o voci da confrontare, con una voce in evidenza (`focus`) | D01 stipendi in Europa |
| `hype` | un numero enorme in apertura (`titolo`, `valore`, `etichetta`, `kicker`) e 3 confronti, l'ultimo "rompe" il grafico; stile neon (gaming e intrattenimento). Qui il gancio è il titolo con il contatore: niente `hook`, solo `frasi` | D02 GTA VI incasso |
| `punti` | "se ogni X fosse una persona": pallini che si riempiono, gruppi di confronto, poi mini classifica | D03 GTA VI copie |
| `asse` | valori sulla stessa scala (età, ore, prezzi), con media e distacco | D04 uscita di casa |
| `countdown` | top 10 dal decimo al primo | D05 voti Metacritic |
| `barre` | classifica completa fino a 20 voci (squadre, città, marchi) | D06 Serie A stipendi |

Mai lo stesso template due volte nello stesso giorno. Nomi lunghi: accorciali (es. "Zelda: Ocarina of Time") e controlla che non escano dallo spazio.

**Quando compare ogni frase** (controlla sempre che tutte le frasi si vedano):
- `asse` e `barre`: fino a 4 frasi. 1ª mentre il grafico entra, 2ª a grafico completo (media o primo in classifica), 3ª sul distacco / chiusura, 4ª dopo (un confronto in più, "ma nel 2015…").
- `countdown`: usa `frasi_at` con la posizione in classifica a cui legare ogni frase (es. `[8, 2, 1, "fine"]`: la frase 1 esce con l'ottavo, la 2 con il secondo, la 3 con il primo, la 4 a classifica finita). Lascia almeno una posizione di distanza tra due frasi.
- `classifica3d`: usa `frasi_at` con il **nome** della voce a cui legare ogni frase (es. `["Germania", "Italia", "Grecia"]`) oppure `"fine"` per la vista d'insieme finale. Non ripetere nelle frasi il `sottotitolo`, che è già sullo schermo.
- `hype`: 3 frasi. `punti`: 4 frasi.
Dopo aver scritto le frasi, controlla i tempi: ogni frase deve restare almeno 1,5 secondi.

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
