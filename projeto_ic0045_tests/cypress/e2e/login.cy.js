describe('Login', () => {
    beforeEach(() => {
        //ir para a tela de login
        cy.visit('http://localhost:4400/')
    })

    context('Login', () => {
        it.only('Logar com usuário válido', () => {
            cy.fixture('login/loginFixtures.json').then(dados => {
                //logar como um usuário válido
                cy.login(dados.email, dados.senha)
                //Verificar mensagem de login
                //cy.get('#toast-1', {timeout:3000}).should('be.visible').invoke('text').should('contains', 'login falhou')
                //Validar redirecionamento para tela inicial
                cy.url().should('include', '/main/projects')
            })
        })
    
        it.only('Tentar logar com usuário inválido', () => {
            cy.fixture('login/loginFixtures.json').then(dados => {
                //logar como um usuário inválido
                cy.login(dados.email, "inválido") //dados.senha)
                //Verificar mensagem de erro
                cy.get('#toast-1', {timeout:3000}).should('be.visible').invoke('text').should('contains', 'login invalido')
            })
        })
    })
})