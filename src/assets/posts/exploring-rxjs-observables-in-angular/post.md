---
title: "Exploring RxJS Observables in Angular"
subtitle: "A Deep Dive into Reactive Programming with RxJS"
date: 2023-11-21
slug: "exploring-rxjs-observables-in-angular"
tags: "angular, rxjs"
---

RxJS Observables are a powerful way to handle asynchronous data streams in Angular, especially useful in handling HTTP requests and event-based programming. This post introduces Observables and their use cases in Angular projects.

## What is an Observable?

An Observable is a stream that produces values over time. Observables can emit multiple values and allow you to handle asynchronous tasks efficiently.

## Creating an Observable in Angular

Here’s a simple example to create an Observable that emits values:

```typescript
import { Observable } from 'rxjs';

const numberStream = new Observable<number>(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});
