// Import commands.js using ES2015 syntax:
import './commands'

//https://github.com/cypress-io/cypress-xpath
require('cypress-xpath')

// Alternatively you can use CommonJS syntax:
// require('./commands')

//Redefinir a prioridade dos seletores adcionando o ID como padrão
Cypress.SelectorPlayground.defaults({
    selectorPriority: ['data-wc', 'data-cy', 'data-test', 'data-testid', 'id', 'class', 'attributes', 'tag', 'nth-child']
});

