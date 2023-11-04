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

Cypress.Commands.add('criarProjeto', (nome, localizacao, localizacao_requerida, time_zone, horario_comercial, hr_inicio, hr_fim, descricao) => {
    //Clicar em criar projeto
    cy.get('button.criar', {timeout:10000}).should("be.visible") //verificar se o campo está visivel
    cy.get('button.criar').click()
    
    //Validar redirecionamento para tela de cadastro de projeto
    cy.url().should('include', 'main/projects/create')

    //Espera o formulário ficar visivel
    cy.get('.chakra-heading', {timeout:10000}).should("be.visible")

    //Preewncehr formulário
    cy.get('input[value="Nome do Projeto"]', {timeout:10000}).should("be.visible") //verificar se o campo está visivel
    cy.get('input[value="Nome do Projeto"]').clear().type(nome)
    cy.get('input[value="Localização"]').clear().type(localizacao) //BUG
    if(localizacao_requerida == true) {
        cy.get('[name="location_required"]').parent().as('checkboxes').click()
    }
    cy.get('input[value="America/Bahia"]').clear().type(time_zone)
    if(horario_comercial == true) {
        cy.get('[name="commercial_time_required"]').parent().as('checkboxes').click()
    }
    cy.get('input[name="commercial_time_start"]').clear().type(hr_inicio)
    cy.get('input[name="commercial_time_end"]').clear().type(hr_fim)
    cy.get('textarea').clear().type(descricao)

    cy.get('button:contains("Create")').click()
})