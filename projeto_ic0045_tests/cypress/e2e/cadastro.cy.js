describe('Cadastro', () => {
    beforeEach(() => {
        //ir para a tela de login
        cy.visit('http://localhost:4400/')
    })

    context('Cadastro', () => {
        it.only('Cadastrar novo usuário', () => {
            cy.fixture('cadastro/cadastroFixtures.json').then(dados => {
                //ir para a tela de cadastro
                cy.get('a > .chakra-text').click()
                cy.url().should('include', '/registration')
        
                //cadastrar novo usuário
                cy.cadastro("test@test.com.br", "admin")
                //Verificar mensagem de cadastro
                cy.get('#toast-1', {timeout:3000}).should('be.visible').invoke('text').should('contains', 'registro completo')
            })
        })
    });
})