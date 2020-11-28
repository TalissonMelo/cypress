/// <reference types="cypress" />


describe('Trabalhando com testes dinamicos', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    const comidas = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    comidas.forEach(comida => {
        it(`Cadastro com comida a comida ${comida}`, () => {
            cy.get('#formNome').type('Tales')
            cy.get('#formSobrenome').type('Mello')
            cy.get(`[name=formSexo][value=M]`).click();
            cy.xpath(`//label[contains(., '${comida}')]/preceding-sibling::input`).click();
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida');

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

        });
    });
});