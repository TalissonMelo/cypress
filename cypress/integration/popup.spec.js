/// <reference types="cypress" />

describe('Trabalhando com Popup', () => {
    it('Deve testar popup diretamente', () => {
        cy.visit('https://www.wcaquino.me/cypress/frame.html');
        cy.get('#otherButton').click();
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!');
        });
    });

    it.only('Deve verificar se popup foi invocado', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen');
        });
        cy.get('#buttonPopUp').click();
        cy.get('@winOpen').should('be.called')
    });

});

describe.only('PopUp com links', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    });

    it('Deve verificar se popup foi clicado', () => {
        cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('equal', 'https://www.wcaquino.me/cypress/frame.html')
    });

    it('Acessar PouUp', () => {
        cy.contains('Popup2').then($a => {
            const href = $a.prop('href');
            cy.visit(href);
            cy.get('#tfield').type('Funciona')
        })
    })

    it('Link PopUp', () => {
        cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#tfield').type('Funciona')
    });
});
