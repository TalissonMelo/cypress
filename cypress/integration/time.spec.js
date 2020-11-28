/// <reference types="cypress" />

describe('Trabalhando com alerta', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    });

    it('Testando datas', () =>{
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '28/11/2020')

        
        // cy.clock()
        // cy.get('#buttonNow').click();
        // cy.get('#resultado > span').should('contain', '28/11/2020')

        const dt = new Date(2012,3,10,15,23,50);
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '10/04/2012')
    });

    it.only('Testando tempo corrido', () =>{
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '16065')
        cy.get('#resultado > span').invoke('text').should('gt', '1606579928980')
    });
})