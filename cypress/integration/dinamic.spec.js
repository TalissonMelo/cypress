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

    it('Deve selecionar todos', () => {
        cy.get('#formNome').type('Tales')
        cy.get('#formSobrenome').type('Mello')
        cy.get(`[name=formSexo][value=M]`).click();
        cy.get('[name=formComidaFavorita]').click({ multiple: true });
        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida');

        cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?').click()
    })

    it.only('Deve selecionar todos usando o each', () => {
        cy.get('#formNome').type('Tales')
        cy.get('#formSobrenome').type('Mello')
        cy.get(`[name=formSexo][value=M]`).click();

        cy.get('[name=formComidaFavorita]').each($el => {

            if ($el.val() != 'vegetariano')
                cy.wrap($el).click()
        });

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida');

        //cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?').click()
    })
});