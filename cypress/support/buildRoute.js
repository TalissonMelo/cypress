const buildRoute = () => {

    cy.server()
    cy.route({
        method: 'POST',
        url: '/signin',
        response: { id: 1000, nome: 'Usuário Falso', token: 'Uma string muito grande que não pode ser aceita, entretanto vai ser aceita' }
    }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [{ conta_id: 8999, conta: "Conta falsa movimentação", saldo: 1000 },
        { conta_id: 90000, conta: "Conta falsa", saldo: 1 }]
    }).as('saldo')


    cy.route({
        method: 'GET',
        url: '/contas',
        response: [{ id: 1, nome: "Conta falsa movimentação", visivel: true, usuario_id: 1 },
        { id: 2, nome: "Conta falsa", visivel: true, usuario_id: 1 }]
    }).as('contas');

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: 'fixture:movimentacao'
    })
}

export default buildRoute;