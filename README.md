<p align="center">
  <a href="https://github.com/luiseduardosilva" target="blank"><img src="https://github.com/luiseduardosilva/wallet-service/blob/main/doc/wallet.png"  alt="Project" /></a>
</p>

## Wallet Service

Wallet service consiste em uma aplicação para controle de carteiras, onde é possível, Criar, Editar valor da carteira e ver os dados da carteira.

## Clonando projeto

```
git clone https://github.com/luiseduardosilva/wallet-service.git
```

## Copiar .env

```
cop .env.example .env
```

## Instalando dependencias

```
npm i
```

## Rodando migrations

```
npm run typeorm:run-migrations
```

## Iniciando aplicação em Docker

```
docker compose -f dev.docker-compose.yml up -d
```

## Swagger

<a href="http://localhost:3001/docs" target="blank">http://localhost:3001/docs</a>
