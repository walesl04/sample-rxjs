const { Observable, scan } = require('rxjs');

const obs = new Observable((subscriber) => {
    subscriber.next('OK');
    subscriber.next('Fire second');
    setTimeout(() => subscriber.next('End'), 3000);
});

// format second
const createSub = (subscriber) => {
    subscriber.next('RxJS');
    if (Math.random() > 0.5) {
        subscriber.complete('Done');
    } else {
        subscriber.error('Error!');
    }
}
const obs2 = new Observable(createSub);

const next = (args) => console.info('Success:', args)
const error = (args) => console.info('Error:', args) 
const complete = (args) => console.info('Complete:', args)

obs2.pipe(scan(() => console.info('pipe running'))).subscribe({next, error, complete});
