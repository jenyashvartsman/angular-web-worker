import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fromWorker } from 'observable-webworker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  message = 'counting...';
  seconds: any;

  observableMessage = 'counting observable...';

  countTo = 5000000000;

  constructor() {
  }

  ngOnInit() {
    this.runCountingWebWorker();
    this.runObservableCountingWebWorker();
  }

  runCountingWebWorker() {
    const countingWebWorker = new Worker('./web-workers/counting.worker', {type: 'module'});

    countingWebWorker.onmessage = (message) => {
      console.log(message);
      this.message = message.data;
      this.seconds = message.timeStamp / 1000;
    };

    countingWebWorker.postMessage(this.countTo);
  }

  runObservableCountingWebWorker() {
    const input$: Observable<number> = of(this.countTo);

    fromWorker<number, string>(() => new Worker('./web-workers/counting-observable.worker', { type: 'module'}), input$)
      .subscribe(message => {
        console.log(message);
        this.observableMessage = message;
      });
  }
}
