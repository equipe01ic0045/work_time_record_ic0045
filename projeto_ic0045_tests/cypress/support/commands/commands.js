import loginElements from '../elements/login/login_elements'
import cadastroElements from '../elements/cadastro/cadastro_elements'

Cypress.Commands.add('login', (email, senha) => {
    //logar como um usuário válido
    cy.get(loginElements.EMAIL).type(email)
    cy.get(loginElements.SENHA).type(senha)
    cy.get('button').click()
})

Cypress.Commands.add('cadastro', (nome, email, senha) => {
    //Criar um usuário válido
    cy.get(cadastroElements.NOME, {timeout:3000}).type(nome)
    cy.get(cadastroElements.EMAIL, {timeout:3000}).type(email)
    cy.get(cadastroElements.CONFIRMAR_EMAIL, {timeout:3000}).type(email)
    cy.get(cadastroElements.SENHA, {timeout:3000}).type(senha)
    cy.get(cadastroElements.CONFIRMAR_SENHA, {timeout:3000}).type(senha)
    cy.get('button').click()
})

Cypress.Commands.add('criarProjeto', (nome, Localizacao, Localizacao_requerida, time_zone, horario_comercial, hr_inicio, hr_fim, descricao) => {
    //Clicar em criar projeto
    cy.get('button:contains("NOVO PROJETO")', {timeout:3000}).click()
    
    //Validar redirecionamento para tela de cadastro de projeto
    cy.url().should('include', 'main/projects/create')

    //Espera o formulário ficar visivel
    cy.get('.chakra-heading', {timeout:31000}).should("be.visible")

    //Preewncehr formulário
    cy.get(input[value="Nome do Projeto"], {timeout:3000}).clear().type(nome)
    cy.get(input[value="Localização"], {timeout:3000}).clear().type(Localizacao)
    cy.get(':nth-child(3) > .css-0 > .chakra-checkbox > .chakra-checkbox__control', {timeout:3000}).clear().type(Localizacao_requerida)
    cy.get(input[value="America/Bahia"], {timeout:3000}).clear().type(time_zone)
    cy.get(':nth-child(5) > .css-0 > .chakra-checkbox > .chakra-checkbox__control', {timeout:3000}).clear().type(horario_comercial)
    //cy.get().clear().type(hr_inicio)
    //cy.get().clear().type(hr_fim)
    cy.get(textarea, {timeout:3000}).clear().type(descricao)
})