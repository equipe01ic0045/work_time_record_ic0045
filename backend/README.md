# como rodar

* root em: work_time_record_ic0045/backend
  
- npm install

## inicialize o banco

- renomeie o .env.example para .env com as variaveis de ambiente locais da sua máquina
- docker-compose up -d

## carregue as tabelas usando o prisma 

- npx prisma generate --schema=./src/prisma/schema.prisma
- npx prisma migrate deploy --schema=./src/prisma/schema.prisma

*caso tenha problemas, para atualizar a conexão do prisma com o banco de dados repita o comando:*

1. npx prisma generate --schema=./src/prisma/schema.prisma

*caso tenha problemas, tente resetar o banco de dados utilizando os comandos:*
1. npx prisma migrate reset --schema=./src/prisma/schema.prisma
2. npx prisma migrate dev --schema=./src/prisma/schema.prisma

## rode

- npm run dev

## rota do swagger:

[http://localhost:5000/swagger/docs/](http://localhost:5000/swagger/docs/)
