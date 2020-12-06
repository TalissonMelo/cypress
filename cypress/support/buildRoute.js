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
        response: [{ "conta": "Conta para movimentacoes", "id": 311146, "descricao": "Movimentacao para exclusao", "envolvido": "AAA", "observacao": null, "tipo": "DESP", "data_transacao": "2020-12-06T03:00:00.000Z", "data_pagamento": "2020-12-06T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 342186, "usuario_id": 12501, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta com movimentacao", "id": 311147, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2020-12-06T03:00:00.000Z", "data_pagamento": "2020-12-06T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 342187, "usuario_id": 12501, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 311148, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2020-12-06T03:00:00.000Z", "data_pagamento": "2020-12-06T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 342188, "usuario_id": 12501, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 311149, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2020-12-06T03:00:00.000Z", "data_pagamento": "2020-12-06T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 342188, "usuario_id": 12501, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para saldo", "id": 311150, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2020-12-06T03:00:00.000Z", "data_pagamento": "2020-12-06T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 342188, "usuario_id": 12501, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para extrato", "id": 311151, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2020-12-06T03:00:00.000Z", "data_pagamento": "2020-12-06T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 342189, "usuario_id": 12501, "transferencia_id": null, "parcelamento_id": null },
        { "conta": "Conta para extrato", "id": 311151, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2020-12-06T03:00:00.000Z", "data_pagamento": "2020-12-06T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 342189, "usuario_id": 12501, "transferencia_id": null, "parcelamento_id": null }]
    })
}

export default buildRoute;