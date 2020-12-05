import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click();
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message);
    })
})

Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('http://barrigareact.wcaquino.me');
    cy.get(loc.LOGIN.USER).type(usuario);
    cy.get(loc.LOGIN.PASSWORD).type(senha);
    cy.get(loc.LOGIN.BTN_LOGIN).click();
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
});

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.RESET).click();
})

Cypress.Commands.add('getToken', (usuario, senha) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: usuario,
            redirecionar: false,
            senha: senha
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        });
})

Cypress.Commands.add('resetarBaseDados', () => {
    cy.getToken('TA@', '123').then(token => {

        cy.request({
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
            url: '/reset',
        }).its('status').should('to.be.equal', 200);
    })
});

Cypress.Commands.add('getContaNome', nome => {
    cy.getToken('TA@', '123').then(token => {

        cy.request({
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            qs: "Conta testes API",
            body: {
                nome: nome
            }
        }).then(res => {
            return res.body[0].id;
        })

    })
})
