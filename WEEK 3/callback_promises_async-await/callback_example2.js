function addString(previous, current, callback) {
    setTimeout(
        () => {
            callback((previous + ' ' + current))
        },
        Math.floor(Math.random() * 100) + 1
    )
}

function addAll() {
    addString('', 'A', result => {
        addString(result, 'B', result => {
            addString(result, 'C', result => {
                console.log(result);
            })
        })
    })
}

addAll();