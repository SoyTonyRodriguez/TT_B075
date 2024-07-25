# Instrucciones para configurar el TT


## Node js
#### Instalacion en windows

En powershell o cmd ejecutar los siguientes comandos

```shell
# installs fnm (Fast Node Manager)
winget install Schniz.fnm
# download and install Node.js
fnm use --install-if-missing 20
# verifies the right Node.js version is in the environment
node -v
# verifies the right npm version is in the environment
npm -v
```

#### Instalacion en MacOS

En la terminal ejecutar los siguientes comandos
```shell
# download and install Node.js
brew install node@20
# verifies the right Node.js version is in the environment
node -v # should print `v20.16.0`
# verifies the right npm version is in the environment
npm -v # should print `10.8.1`
```

#### Instalacion en Linux

En la terminal ejecutar los siguientes comandos

```shell
# download and install Node.js
sudo apt install node
# verifies the right Node.js version is in the environment
node -v # should print `v20.16.0`
# verifies the right npm version is in the environment
npm -v # should print `10.8.1`
```


## Frontend WEB
* Entrar en la carpeta 'TT_frontend_web'

```shell
cd TT_frontend_web/
```
* Una vez dentro ejecutar el siguiente comando, el cual instalará de manera automatica todas las depencias utilizadas en el proyecto

```shell
npm install
```
* Para ejecutar el proyecto utilizar el siguiente comando

```shell
npm run dev
```
* Al ejecutar el comando, hacer clic a la URL generada en Local:
![Web_run](./images/image.png)