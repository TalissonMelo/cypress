/// <reference types="cypress" />

describe('Entendendo a espera do Cypress', () => {

    //Executado antes de todos os testes
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
    })

    it('Deve aguardar elemento disponivel', () => {

        cy.get('#novoCampo')
            .should('not.exist')

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            .should('not.exist');

        cy.get('#novoCampo')
            .should('exist')

        cy.get('#novoCampo')
            .type('funciona')

    });

    it('Deve fazer retrys', () => {

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            //    .should('not.exist')
            .should('exist')
            .type('funciona')

    })

    it.only('Usar busca', () => {

        cy.get('#buttonList').click();
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1');

        cy.get('#lista li')
            .should('contain', 'Item 2');
    });

    it('Usando o Timeout', () => {

        // cy.get('#buttonListDOM').click();
        // cy.get('#lista li', { timeout: 30000 })
        //     .should('contain', 'Item 1');

        // cy.get('#buttonListDOM').click();
        // //cy.wait(5000) //Evitar usar,utilizado em casos específicos  
        // cy.get('#lista li', { timeout: 30000 })
        //     .should('contain', 'Item 2');

        cy.get('#buttonListDOM').click();
        cy.get('#lista li')
            .should('have.length', 1);
        cy.get('#lista li')
            .should('have.length', 2);


        //Tempo padrao de timeout cyprees e 4s
        //Modificando para outro timeout em todas as bucas modicar o arquivo cyprees.json "defaultCommandTimeout" : 1000
    });

    it.only('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.length', 1);
    });

    it.only('Should vs Then', () => {

        // Then aguarda a busca para ser executado
        cy.get('#buttonListDOM').then(res => {
            expect(res).to.have.length(1);
        }).and('have.id', 'buttonListDOM')

        //Faz a busca e ja faz as tentativas fica executando, e ignora o return 
        cy.get('#buttonListDOM').click();
        cy.get('#lista li').should(res => {
         //   return 2;
            expect(res).to.have.length(1);
        });
    })
})
