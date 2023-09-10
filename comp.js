//lexer function

const lexer = str => {
    return str.split(' ').map(item => {
        return item.trim()
    })
}

