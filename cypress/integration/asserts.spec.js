/// <reference types="cypress" />

it('Assertivas de Igualdade (number, string)', () => {
    const a = 1;

    expect(a).equal(1)
    // expect(a, "Mensagem caso falhe, Deveria ser 1").equal(2); 
    expect(a).to.be.equal(1);
    // expect(a).to.be.equal('b');
    expect(a).not.to.be.equal('b');
});

it('Verdadeiros ou não', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true
    expect(b).to.be.null
    expect(a).not.to.be.null
    expect(a).to.be.not.null
    expect(c).to.be.undefined
});

it('Igualdade de Objeto', () => {
    const usuario = {
        id: 1,
        nome: "Talisson Melo"
    }

    expect(usuario).equal(usuario);
    expect(usuario).equals(usuario);
    expect(usuario).eq(usuario);
    expect(usuario).to.be.equal(usuario);

    //Verifica as propriedades do objeto se sao iguais com deep 
    expect(usuario).to.be.deep.equal({
        id: 1,
        nome: "Talisson Melo"
    })

    //Verifica as propriedades do objeto
    expect(usuario).eql({
        id: 1,
        nome: "Talisson Melo"
    })

    //Verificar se objeto possui alguma propriedade
    expect(usuario).include({ id: 1 })

    //Verificando propriedade
    expect(usuario).to.have.property('nome')

    //Verificando Propriedade 
    expect(usuario).to.have.property('nome')

    //Verificando Propriedade e valor
    expect(usuario).to.have.property('nome', 'Talisson Melo')

    //Verificando se objeto esta vazio
    expect(usuario).to.not.be.empty
});

it('Verificação de Arrays', () => {
    const arr = [1, 2, 3];

    //Array possua os membros
    expect(arr).to.be.members([1, 2, 3]);

    //Array possua os membros incluidos
    expect(arr).to.includes.members([1, 3]);
    expect(arr).to.not.be.empty
    expect([]).to.be.empty
});

it('Verificação de Tipos', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');
    expect({}).to.be.an('object');
    expect([]).to.be.an('array');
});

it('Verificação de String ', () => {
    const str = "String de teste";

    expect(str).to.be.equal("String de teste");
    expect(str).to.have.length(15)
    expect(str).to.contains('de')

    //Verifica se contem o valor na string
    expect(str).to.match(/de/)

    //Verifica se inicia com String
    expect(str).to.match(/^String/)

    //Verifica se termina com o valor teste
    expect(str).to.match(/teste$/)

    //Verifica se termina com o valor teste
    expect(str).to.match(/.{15}/)

    //Verifica se existe apenas palavras letras
    expect(str).to.match(/\w+/)

    //Verifica se não contem número
    expect(str).to.match(/\D+/)
});

it('Verificação de Números', () => {
    const number = 10
    const float = 5.2123

    expect(number).to.be.equal(10);
    expect(float).to.be.equal(5.2123);

    //Número aproximado
    expect(float).to.be.closeTo(5.2, 0.1);

    //Número acima de 
    expect(number).to.be.above(3);

    //Numero abaixo de 
    expect(number).to.be.below(11);
});