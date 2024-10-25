---
title: "An Introduction to Node.js Streams"
subtitle: "Handle Data Flow Efficiently with Node.js"
date: 2024-05-24
slug: "introduction-to-nodejs-streams"
tags: "node"
---

Node.js streams provide a way to work with large data efficiently by processing it in chunks rather than loading it all at once. This post covers the basics of streams and how to use them in your Node.js applications.

## What is a Stream?

A stream is a sequence of data read or written over time. There are four main types of streams in Node.js:
- **Readable**: For reading data.
- **Writable**: For writing data.
- **Duplex**: For both reading and writing.
- **Transform**: For modifying data during the read/write process.

## Creating a Readable Stream

Here's an example of a simple readable stream:

```javascript
const fs = require('fs');
const readableStream = fs.createReadStream('file.txt', { encoding: 'utf8' });

readableStream.on('data', chunk => {
  console.log(chunk);
});
