// Global declarations
let charClass;
let lexeme = '';
let nextChar;
let lexLen = 0;
let token;
let nextToken;

// Character classes
const LETTER = 0;
const DIGIT = 1;
const UNKNOWN = 99;

// Token codes
const INT_LIT = 10;
const IDENT = 11;
const ADD_OP = 21;
const SUB_OP = 22;
const MULT_OP = 23;
const DIV_OP = 24;
const LEFT_PAREN = 25;
const RIGHT_PAREN = 26;
const SEMICOLON = 27;

// Hardcoded input (expression to lex)
let input = "(sum + 47) / total;";
let inputIndex = 0; // For tracking position in the input string

// Function declarations
function addChar() {
    if (lexLen <= 98) {
        lexeme += nextChar;
        lexLen++;
    } else {
        console.log('Error - lexeme is too long');
    }
}

function getChar() {
    if (inputIndex < input.length) {
        nextChar = input.charAt(inputIndex++);
        if (/[a-zA-Z]/.test(nextChar)) {
            charClass = LETTER;
        } else if (/\d/.test(nextChar)) {
            charClass = DIGIT;
        } else if (nextChar === '') {
            charClass = 'EOF';
        } else {
            charClass = UNKNOWN;
        }
    } else {
        nextChar = 'EOF';
        charClass = 'EOF';
    }
}

function getNonBlank() {
    while (/\s/.test(nextChar)) {
        getChar();
    }
}

function lookup(ch) {
    switch (ch) {
        case '(':
            addChar();
            nextToken = LEFT_PAREN;
            break;
        case ')':
            addChar();
            nextToken = RIGHT_PAREN;
            break;
        case '+':
            addChar();
            nextToken = ADD_OP;
            break;
        case '/':
            addChar();
            nextToken = DIV_OP;
            break;
        case ';':
            addChar();
            nextToken = SEMICOLON;
            break;
        default:
            addChar();
            nextToken = 'EOF';
            break;
    }
    return nextToken;
}

function lex() {
    lexLen = 0;
    lexeme = '';  // Reset lexeme for each token
    getNonBlank(); // Skip whitespaces

    switch (charClass) {
        case LETTER:
            addChar();
            getChar();
            while (charClass === LETTER || charClass === DIGIT) {
                addChar();
                getChar();
            }
            nextToken = IDENT;
            break;
        case DIGIT:
            addChar();
            getChar();
            while (charClass === DIGIT) {
                addChar();
                getChar();
            }
            nextToken = INT_LIT;
            break;
        case UNKNOWN:
            lookup(nextChar); // Process the operator or parenthesis
            getChar();
            break;
        case 'EOF':
            nextToken = 'EOF';
            lexeme = 'EOF';
            break;
    }
    console.log(`Next token is: ${nextToken}, Next lexeme is ${lexeme}`);
    return nextToken;
}

// Main driver function
function main() {
    if (!input) {
        console.log('ERROR - cannot open input');
        return;
    }

    getChar(); // Get the first character
    do {
        lex(); // Lex the next token
    } while (nextToken !== 'EOF'); // Continue until EOF
}

// Start lexing
main();