/// <reference types="cypress" />

// skip => teste nao vai ser executado. Pode se usar para mais de 1 teste.
// only => executa apenas este teste se tiver 2 only executa o ultimo encontrado.

// it => estrutura basica para testes.
it.only('nome do teste', () => {
    console.log("estrutura do teste");
})

// describe agrupa grupos e pode ter sub grupos dentro do mesmo.
describe('Agrupa Testes', () => {
    describe('Testes Agrupos', () => {
        it('nome do teste', () => {
            console.log("estrutura do teste");
        })
    })
    it('nome do teste', () => {
        console.log("estrutura do teste");
    })
    it.skip('nome do teste 2', () => {
        console.log("estrutura do teste 2");
    })
    it('nome do teste 3', () => {
        console.log("estrutura do teste 3");
    })
})