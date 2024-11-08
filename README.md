# BemolOmnichanel

## Requerimentos

- nodeJS LTS

## Executar projeto

`npm i`

`npm run start`

Vai executar o app em `http://localhost:4200/` e o server local `http://localhost:3000/`

## Server

No root do projeto tem os arquivos db.json e db_copy.json. Após os testes caso queira retornar o dados oirignais copie os dados do db_copy.json em db.json

## Observação

A lib `NGX MASk` esta com bug interno onde não esta reconhecendo o estado de touched dos control.

Issues relacionada ao bug:

https://github.com/JsDaddy/ngx-mask/issues/1375
https://github.com/JsDaddy/ngx-mask/issues/1305
