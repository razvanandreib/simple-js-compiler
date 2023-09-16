//creating the tokens

const lexer = str => {
    return str.split(" ").map(item => {
        return item.trim()
    })
}


console.log(lexer("add 5 with 5"))

//making the abstract tree
const parser = tokens => {
    let current_token_index = 0;

    const parseNumber = () => ({
        value: parseInt(tokens[current_token_index++]),
        type: "number",
    })

    const parseOperator = () => {
        const node = {
            value: tokens[current_token_index++],
            type: "operator",
            expression: []
        }

        while (tokens[current_token_index]) {
            node.expression.push(parseExpression())
        }

        return node;

    }

    const parseExpression = () => /\d/.test(tokens[current_token_index]) ? parseNumber() : parseOperator();

    return parseExpression();
}

console.log(parser(lexer("add 5 with 6")))

let ast = parser(lexer("add 5 with 6"));


//the transpiler
const transpile = ast => {
    const mapOperator = {
        add: '+', sub: '-', mul: '*', div: '/'
    };
    const transpileNode = ast => ast.type === 'number' ? transpileNumber(ast) : transpileOperator(ast);
    const transpileNumber = ast => ast.value;
    const transpileOperator = ast => `${ast.expression.map(transpileNode).join(' ' + mapOperator[ast.value] + ' ')}`;
    return transpileOperator(ast);
};

console.log(transpile(ast))
