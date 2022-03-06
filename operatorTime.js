const { Observable, from } = require('rxjs')

const createPipeOperable = (fn) => {
    return (source) => {
        return new Observable((subscribe) => {
            source.subscribe(fn(source, subscribe))
        });
    }
}

const first = () => createPipeOperable((source, subscribe) => 
    ({
        next(value) {
            subscribe.next(value);
            subscribe.complete();
        }
    })
);

const last = () => createPipeOperable((source, subscribe) => {
    let last = null;
    return ({
        next(value) {
            last = value;
        },
        complete() {
            subscribe.next(last);
            subscribe.complete();
        }
    })
});

const withDelay = (time, ...items) => {
    return new Observable((subscribe) => {
        (items || []).forEach((item, index) => {
            setTimeout(() => {
                subscribe.next(item);
                console.info('time:', time * (index + 1));
                if(items.length === (index + 1)) {
                    subscribe.complete();
                }
            }, time * (index + 1));
        })
    })
}

const firstObs = () => {
    return (source) => {
        return new Observable((subscribe) => {
            source.subscribe({
                next(value) {
                    subscribe.next(value);
                    subscribe.complete();
                }
            })
        })
    }
}

const lastObs = () => (source) => new Observable((subscribe) => {
    let last = null;
    source.subscribe({
        next(value) {
            last = value;
        },
        complete() {
            subscribe.next(last);
            subscribe.complete();
        }
    })
})

const hasContent = (filterValue) => {
    return (source) => {
        return new Observable((subscribe) => {
            source.subscribe({
                next(value) {
                    if(Array.isArray(value)) {
                        subscribe.next(
                            value.filter(item => item.endsWith(filterValue))
                        )
                    }else if (value.endsWith(filterValue)) {
                        subscribe.next(value)
                    }
                },
                erro(err) {
                    subscribe.error(err)
                },
                complete() {
                    subscribe.complete()
                }
            })
        })
    }
}

withDelay(200, 1,2,4,5,6).subscribe(console.info);

from([1,2,4,5,6])
    .pipe(first())
    .pipe(last())
    .subscribe(console.info)

from(['Ichigo Kurosaki', 'Orihime Inoue', 'Aizen Sousuke', 'Grimmjow', 'Kenpachi Zaraki'])
    .pipe(hasContent('Kurosaki'))
    .subscribe(console.info)