function printString(string, callback) {
    setTimeout(
        () => {
            console.log(string)
            callback()
        },
        Math.floor(Math.random() * 100) + 1
    );
}

// CALLBACK IMPLEMENTATION
function printAll() {
    printString("A", () => {
        printString("B", () => {
            printString("C", () => { })
        })
    })
}

printAll();