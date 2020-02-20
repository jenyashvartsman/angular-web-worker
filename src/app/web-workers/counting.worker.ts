/// <reference lib="webworker" />

addEventListener('message', ({data}) => {
  for (let i = 0; i < data; i++) {
  }
  postMessage('Counted to ' + data);
});
