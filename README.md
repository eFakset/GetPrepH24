### Laste ned kode til lokal maskin

1. Installere NodeJS hvis det mangler
2. /users/[user]/source/repos: git clone https://github.com/eFakset/GetPrepH24.git

### Server m/MySQL

1. /source/repos/GetPrepH24/server: npm install
2. GetPrepH24/server: Kopier (ikke slett eller rename) mal.env til .env.  Oppdater innhold med korrekt skjema etc.

Hvis databasen skal ligge lokalt - se lengre ned

**Start server: GetPrepH24/server: npm start**

Serveren lytter default på localhost:3001

Portnummer kan overstyres:  

**SET PORT=3002**
**npm start**

- eller endre det permanent i .env

### React

1. /source/repos/GetPrepH24/react: npm install

**Start React client: GetPrepH24/react: npm start**

### Opprette MySQL-database:

Opprett et nytt skjema: CREATE SCHEMA `gp24` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_danish_ci;;

Kjør scripts under GetPrepH24\DB_scripts\create og insert.sql

Oppdater info i .env
