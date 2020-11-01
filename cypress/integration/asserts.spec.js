/// <reference types="cypress" />

it('Assertivas de Igualdade', () => {
    const a = 1;

    expect(a).equal(1)
    // expect(a, "Mensagem caso falhe, Deveria ser 1").equal(2); 
    expect(a).to.be.equal(1);
   // expect(a).to.be.equal('b');
    expect(a).not.to.be.equal('b');
})