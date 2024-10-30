---
title: "Change Detection in Angular"
subtitle: "Guida Pratica e Semplificata"
date: 2024-10-24
slug: "change-detection-made-simple"
tags: "angular"
---

Vi siete mai chiesti come fa Angular a capire quando deve fare un re render di un componente? Oppure come fa a sapere quando un dato è stato aggiornato?

La risposta breve è: attraverso un processo chiamato **Change Detection** ma se si vuole approfondire c'è molto altro da scoprire. In questo articolo, cercherò di semplificare questo concetto, in modo che sia possibile comprendere meglio come funziona.

## Dobbiamo davvero sapere tutto della Change Detection?

Nella maggior parte dei casi possiamo tranquillamente dire che la Change Detection funziona cosi com'è e non c'è altro da sapere. Eppure è ancora utile sapere come funziona, ecco alcuni esempi dei benefici che ne possiamo trarre:

- migliorare la performance, evitando check non necessari e riducendo il carico di lavoro dell'app.
- identificare più facilmente i bug di aggiornamento del DOM, comprendendo quando e come avviene la propagazione dei cambiamenti nello stato.
- capire come disattivarla momentaneamente per impedire a delle librerie esterne di attivarla inutilmente

## Cos'è la Change Detection e quale problema risolve?

La **Change Detection** è un meccanismo che Angular utilizza per mantenere sincronizzati il DOM (l'interfaccia utente) e il modello (i dati dell’app).
Ogni volta che i dati cambiano, Angular si assicura che queste modifiche si riflettano nel template HTML senza che questo richieda interventi manuali.

Immaginiamo di avere un'app che mostra un elenco di prodotti. Quando un utente aggiunge un prodotto al carrello, Angular aggiorna automaticamente la vista. Ma come fa?

## Zone.js

Qui entra in gioco **zone.js**. Questa libreria è disponibile di default su ogni applicativo Angular ed è responsabile del monitoraggio delle operazioni asincrone. Lo fa creando una "zona" chiamata **ngZone** che intercetta eventi come clic, input, e risposte da server, e informa Angular quando è il momento di eseguire il ciclo di change detection.

## Fasi della Change Detection

Ad alto livello il processo di change detection segue alcune fasi chiave:

1. **Trigger della Change Detection**: ngZone rileva un evento e attiva la change detection.
2. **Fase Dirty Marking**: ngZone segna il componente dove l'evento è partito e tutti i suoi antenati
3. **Traversata dei Componenti**: Angular controlla ogni componente nell'app top to bottom.
4. **Aggiornamento del DOM**: Se ci sono cambiamenti, il DOM viene aggiornato.

## Dirty Marking

Quando si verifica un evento, Angular segna come dirty il componente e tutti suoi antenati. Successivamente fa partire il ciclo di change detection partendo dalla root e passa per tutti i componenti (dirty e non-dirty) per verificare se qualcosa è cambiato.

Ma perchè Angular controlla tutti i componenti 🤔? Perchè non controlla solo quelli dirty 🤔?

Questo dipende dalla change detection strategy.

![https://www.angulartraining.com/daily-newsletter/wp-content/uploads/2023/10/Default-change-detection-1.gif](https://www.angulartraining.com/daily-newsletter/wp-content/uploads/2023/10/Default-change-detection-1.gif)

## Strategie di Change Detection

Angular offre due strategie principali per gestire la change detection:

- Default strategy (che come suggerisce il nome è il default di ogni componente)
- OnPush Strategy

Proviamo adesso a cambiare la change detection settandola su OnPush.

```typescript
  @Component({
      // ...
      changeDetection: ChangeDetectionStrategy.OnPush
  })
```

Quando utilizziamo la strategia di OnPush, Angular farà partire la Change Detection solo per un componente che è stato segnato come dirty, evitando check non necessary su quelli che non lo sono

La change detection  adesso verrà eseguita **solo** quando cambia il **valore di un input**, oppure se viene lanciato un **evento** all’interno di quel componente o in uno dei componenti annidati al suo interno

![https://www.angulartraining.com/daily-newsletter/wp-content/uploads/2023/10/onPush-change-detection.gif](https://www.angulartraining.com/daily-newsletter/wp-content/uploads/2023/10/onPush-change-detection.gif)


## OnPush e Signals

Angular è sempre in evoluzione e sta piano piano introducendo il concetto di [Signal](https://angular.dev/guide/signals).

I Signals in Angular sono una nuova API reattiva introdotta per semplificare la gestione dello stato e migliorare le performance dell'applicazione. A differenza degli Observable di RxJS, che necessitano di sottoscrizioni manuali e di gestione esplicita, i Signals funzionano come variabili reattive e tracciano automaticamente le dipendenze.

Quando un Signal cambia, Angular rileva automaticamente l'aggiornamento e lo riflette nel DOM solo dove necessario, ottimizzando il ciclo di change detection. In pratica:

Quando un componente utilizza un Signal, Angular “traccia” automaticamente queste dipendenze. Se il valore del Signal cambia, Angular esegue la change detection solo per i componenti che dipendono da quel Signal. Quindi i Signals non richiedono un controllo dell’intero albero dei componenti.

## Zoneless

In futuro è probabile che potremo fare a meno di zone.js, facendo affidamento solo sui Signals per aggiornare i componenti, ma attenzione: tutti i compoenti devono utilizzarli altrimenti avremo comunque bisogno di zone.js.

Ma possiamo già provare ad eliminare zone.js dal nostro progetto, utilizzando una feature sperimentale, ecco come fare:

1. Rimuovere l’entry “zone.js” dall’array dei polyfills dentro angular.json

```typescript
     "architect": {
      "build": {
        //..
        "options": {
          //..
          "polyfills": [
            "zone.js" // rimuovere
          ],
```

2. Aggiungere nell’array dei providers di main.ts l’entry **provideExperimentalZonelessChangeDetection()**

```typescript
  bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

Attenzione questo metodo come suggerisce il nome è ancora in fase sperimentale.

3. Fare un restart dell’applicativo

Ecco fatto, adesso abbiamo un'applicazione che non dipende da zone.js per la Change Detection!

Rivediamo insieme alcune delle pratiche che ci permettono di migliorare la performance di un applicativo

## Best Practices

- Usare OnPush quando possibile per ridurre il numero di controlli della change detection.
- Minimizzare le operazioni nel ciclo di change detection che potrebbero rallentare il processo.
- Utilizzare async pipe nei template per gestire gli Observable.
- Usare il metodo NgZone.runOutsideAngular() per dire a zone.js di ignorare quel blocco di codice e non rieseguire la change detection

## Conclusione

La change detection è un concetto fondamentale in Angular. Comprendere come funziona e come ottimizzarla può avere un grande impatto sulle performance della tua applicazione. Ricorda di considerare le strategie di change detection e il controllo manuale per migliorare l'esperienza dell'utente. Se sei curioso di approfondire, ti consiglio di dare un’occhiata alla documentazione ufficiale di Angular e a risorse online.

## Risorse Aggiuntive

- [A change detection, zone.js, zoneless, local change detection, and signals story](https://justangular.com/blog/a-change-detection-zone-js-zoneless-local-change-detection-and-signals-story)
- [Angular Change Detection - How Does It Really Work?](https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/)
