const { XMLHttpRequest } = require('xmlhttprequest')
const { of } = require('rxjs')
const { ajax } = require('rxjs/ajax')
const { last, map, concatAll } = require('rxjs/operators')

of('tests', 'unit')
    .pipe(last())
    .pipe(map(v => v[0]))
    .subscribe(res => {
        console.info(res);
    });

ajax({
    createXHR: () => new XMLHttpRequest(),
    url: 'https://api.github.com/users/walesl04/repos' 
})
    .pipe(map(resp => JSON.parse(resp.xhr.responseText)))
    .pipe(concatAll())
    .pipe(map(resp => resp.full_name))
    .subscribe({ next: console.info, error: console.warn});

