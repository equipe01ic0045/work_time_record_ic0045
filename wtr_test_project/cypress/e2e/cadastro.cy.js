describe('Cadastro', () => {
    beforeEach(() => {
        //ir para a tela de login
        cy.visit('http://localhost:4400/')
    })

    context('Cadastro', () => {
        it.only('Cadastrar novo usuário', () => {
            cy.fixture('cadastro/cadastroFixtures.json').then(dados => {
                //ir para a tela de cadastro
                cy.get('a[href="/auth/register"]').click()
                cy.url().should('include', '/auth/register')
        
                //cadastrar novo usuário
                cy.cadastro(dados.nome, dados.email, dados.senha)

                //Validar cadastro
                //Verificar mensagem de cadastro
                cy.get('#toast-1', {timeout:3000}).should('be.visible').invoke('text').should('contains', 'registro completo')
                //Validar redirecionamento para tela inicial
                cy.url().should('include', '/main')
                //logar como um usuário válido
                cy.login(dados.email, dados.senha)
                //Validar redirecionamento para tela inicial
                cy.url().should('include', '/main/projects')
            })
        })
    });
})