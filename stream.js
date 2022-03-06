function getStream() {
    return (fn, time = 1000) => {
        let count = 0
        const control = setInterval(() => fn(count++), time)

        return () => {
            clearInterval(control)
        }
    }
    
}

const time = getStream()

const fn = (num) => console.info('#num: ', num)

const stop = time(fn)
setTimeout(stop, 4000)