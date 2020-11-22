/// <reference types="cypress" />

describe('Trabalhando com elementos', () => {

    //Executado antes de todos os testes
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    //Executado antes de cada um dos testes
    beforeEach(() => {
        //cy.visit('https://www.wcaquino.me/cypress/componentes.html');
        cy.reload()
    })

    it('Textos', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')

        //Tem que conter o texto correto da pagina (completo)
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    });

    it('Links e Botões', () => {
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text', 'Voltou!');

        //Atualiza a pagina
        cy.reload()

        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text', 'Voltou!');
    })

    it('Campos de Textos', () => {
        cy.get('#formNome').type('Cypress Testes');
        cy.get('#formNome').should('have.value', 'Cypress Testes');

        //Ficar atento sobre os caracteres especiais como os dois pontos e barra
        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea');

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???');

        cy.get('[data-cy=dataSobrenome]')
            .type('teste12345{backspace}{backspace}')
            .should('have.value', 'teste123');

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', { delay: 100 })
            .should('have.value', 'acerto');
    });

    it('Radio', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked');

        cy.get('#formSexoMasc')
            .should('not.be.checked');

        //busca pela propriedade name 
        cy.get("[name='formSexo']").should('have.length', 2);
    })

    it('CheckBox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked');

        cy.get("[name='formComidaFavorita']").click({multiple: true })

        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaCarne').should('be.checked')

    });

    it('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('Superior')
            .should('have.value', 'superior')
    });

    it.only('Combo Multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada']);
    });
})