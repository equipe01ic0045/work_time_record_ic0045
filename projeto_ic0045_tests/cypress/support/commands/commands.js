import loginElements from '../elements/login/login_elements'
import cadastroElements from '../elements/cadastro/cadastro_elements'

Cypress.Commands.add('login', (email, senha) => {
    //logar como um usuário válido
    cy.get(loginElements.EMAIL).type(email)
    cy.get(loginElements.SENHA).type(senha)
    cy.get('button').click()
})

Cypress.Commands.add('cadastro', (email, senha) => {
    //logar como um usuário válido
    cy.get(cadastroElements.EMAIL).type(email)
    cy.get(cadastroElements.CONFIRMAR_EMAIL).type(email)
    cy.get(cadastroElements.SENHA).type(senha)
    cy.get(cadastroElements.CONFIRMAR_SENHA).type(senha)
    cy.get('button').click()
})