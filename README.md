# WORK TIME RECORD APP

### Para iniciar a aplicação é preciso estar dentro dos diretórios

### Uma aplicação desenvolvida para fazer o registro de horas trabalhadas por colaboradores. Projeto desenvolvido por estudantes da disciplina Tópicos em Sistemas de Informação e Web I ( IC0045 ) da UFBA - Universidade Federal da Bahia. O repositório se encontra em desenvolvimento contendo o frontend e o backend da aplicação juntos. Para testar a aplicação inicialize o comando ``` npm run dev ``` dentro das pastas que se encontram o arquivo *package.json*. O frontend está rodando na port:3000 e o backend na port:8800

## Directory Tree :

```
  work_time_record_ic0045/
  ├── wtr_backend_project/
  │   └── package.json
  └── wtr_frontend_project/
      └── package.json
```

## Artefatos :

   *  [Analise de Requisitos](https://docs.google.com/document/d/1mXYC3zBO63o6MekNcnyizNgUP-bpV0ZYQeMNVkhROD0/edit)
   *  [Modelagem Banco de Dados](https://dbdiagram.io/d/64dc27ec02bd1c4a5ed570ac)
   *  [Design / Prototipo](https://www.figma.com/file/aXFWoeRPZ78SR0bgWpYo1E/work-tracker?type=design&node-id=0-1&mode=design&t=sL47pic2KwJpMmyp-0)

## Tecnologias e Ferramentas de Desenvolvimento :

    * Next.Js
    * PostgreSQL
    * Node/Express
    * Github
    * Figma

## Requisitos Funcionais do Projeto :

  * Sistema deve permitir controle de ponto de usuários de um projeto.
  * Sistema deve cadastrar projetos, e para cada projeto, um controle de ponto. Usuários podem estar em mais de um projeto, sem problemas.
  * Cadastro de usuários com perfis distintos. Adm, gerente, usuário
  * Usuário deve “bater” o ponto de maneira intuitiva. Pode ser alertado.
  * O gerente deve visualizar as presenças de um usuário ou de todos, e relatórios de presenças devem poder ser gerados.
  * O ponto pode ter restrição de horários, área física.
  * Faltas podem ser justificadas com texto e documentos anexados


## Contribuições para o projeto :

### A aplicação vai seguir os padrões de versionamento Conventional Commit Patterns, toda e qualquer alteração, implementação e correção devera ser feita de acordo com as tarefas e roadmap do projeto previsto. Seguem abaixo exemplos de como deixar as branches e commits.

### BRANCH :
  * WTR-[numero-da-tarefa]/[objetivo-da-tarefa]
  * WTR-0099/api-register-implementation
  
### COMMIT :
  * feature:[nome-da-alteracao]
  * feature:added-component-button




