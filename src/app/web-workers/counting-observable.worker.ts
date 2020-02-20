import { DoWork, ObservableWorker } from 'observable-webworker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@ObservableWorker()
export class CountingObservableWorker implements DoWork<number, string> {
  work(input$: Observable<number>): Observable<string> {
    return input$.pipe(
      map(data => {
        for (let i = 0; i < data; i++) {
        }
        return 'Counted to ' + data;
      })
    );
  }
}
