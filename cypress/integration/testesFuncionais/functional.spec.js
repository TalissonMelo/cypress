/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Testes Funcionais', () => {
    before(() => {
        cy.login('TA@', '123');
        cy.resetApp();
    })

    it('Deve inserir uma conta', () => {
        cy.acessarMenuConta();
        cy.inserirConta('Conta Teste Cypress');
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it('Deve alterar uma conta', () => {
        cy.acessarMenuConta();
        cy.xpath(loc.CONTAS.XP_BTN_EDT).click();
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada com sucesso');
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Não deve inserir conta com mesmo nome!.', () => {
        cy.acessarMenuConta();
        cy.get(loc.CONTAS.NOME).type('Conta Alterada com sucesso');
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })
});