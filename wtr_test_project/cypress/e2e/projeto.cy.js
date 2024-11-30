describe('Login', () => {
    beforeEach(() => {
        //ir para a tela de login
        cy.visit('http://localhost:4400/')
    })

    context('Projeto', () => {
        it.only('Cadastrar um novo projeto', () => {
            cy.fixture('login/loginFixtures.json').then(dados => {
                //logar como um usuário válido
                cy.login(dados.email, dados.senha)
            })

            cy.fixture('projeto/criarFixtures.json').then(dados => {
                cy.criarProjeto(
                    dados.nome,
                    dados.localizacao,
                    dados.localizacao_requerida,
                    dados.time_zone,
                    dados.horario_comercial,
                    dados.hr_inicio,
                    dados.hr_fim,
                    dados.descricao
                )
                //validação
                //Validar mensagem de sucesso
                cy.get('#toast-1', {timeout:3000}).should('be.visible').invoke('text').should('contains', 'Projeto criado com sucesso!')
            })
        })
    
        it('Editar projeto cadastrado', () => {
            cy.fixture('projeto/editarFixtures.json').then(dados => {
                //logar como um usuário válido
                cy.login(dados.email, dados.senha)

                //Selecionar projeto
                
            })
        })
    })
})