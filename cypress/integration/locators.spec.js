/// <reference types="cypress" />

describe('Trabalhando com elementos', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    });

    beforeEach(() => {
        cy.reload()
    });

    //Seletores jQuery https://www.w3schools.com/jquery/jquery_ref_selectors.asp
    it('Usando jQuery Selectors', () => {
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click();
        cy.get('[onclick*=\'Francisco\']')
        cy.get("[onclick*='Francisco']")
    });

    //https://www.red-gate.com/simple-talk/dotnet/net-framework/xpath-css-dom-and-selenium-the-rosetta-stone/
    it.only('Usando cypress-xpath', () => {
       cy.xpath("//input[contains(@onclick,'Francisco')]");
    })
});