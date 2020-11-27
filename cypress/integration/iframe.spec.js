/// <reference types="cypress" />

describe('Trabalhando com IFrame', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve preencher campo de texto', () => {
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body');
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?');
            cy.on('window:alert', msg => {
                expect(msg).to.be.equal('Alert Simples');
            })
            cy.wrap(body).find('#otherButton').click();
        })

    })

});
