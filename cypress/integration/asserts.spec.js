/// <reference types="cypress" />

it('Assertivas de Igualdade', () => {
    const a = 1;

    expect(a).equal(1)
    // expect(a, "Mensagem caso falhe, Deveria ser 1").equal(2); 
    expect(a).to.be.equal(1);
   // expect(a).to.be.equal('b');
    expect(a).not.to.be.equal('b');
})

it('Verdadeiros ou não', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true
    expect(b).to.be.null
    expect(a).not.to.be.null
    expect(a).to.be.not.null
    expect(c).to.be.undefined
})