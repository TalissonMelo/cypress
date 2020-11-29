/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Testes Funcionais', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me');
        cy.get(loc.LOGIN.USER).type('TA@');
        cy.get(loc.LOGIN.PASSWORD).type('123');
        cy.get(loc.LOGIN.BTN_LOGIN).click();
        cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    it('Deve inserir uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME)
            .type('Conta Teste Cypress')
            .should('have.value', 'Conta Teste Cypress');
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    });

    it('Deve alterar uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_EDT).click();
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada com sucesso');
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })
});