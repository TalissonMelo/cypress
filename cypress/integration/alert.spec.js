/// <reference types="cypress" />

describe('Trabalhando com alerta',() => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        cy.get('#alert').click();
        cy.on('window:alert', msg => {
            console.log(msg);
            expect(msg).to.be.equal('Alert Simples');
        })
    });

    it.only('Alert com mock', () => {
        const stub = cy.stub().as('Alerta')
        cy.on('window:alert',stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })
})
