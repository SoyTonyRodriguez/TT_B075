# Instrucciones para configurar el TT

## **Tabla de contenido**
[TOC]

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

#### Dependencias extras

Si por algun motivo no se instalaron, estos son los paquetes instalados externamente

```shell
npm i react-router-dom react-hot-toast axios react-hook-form
npm install -D tailwindcss postcss autoprefixer
```

## Frontend Movil Android/iOS

* Entrar en la carpeta 'TT_frontend_movil'

```shell
cd TT_frontend_movil/
```
* Una vez dentro ejecutar el siguiente comando, el cual instalará de manera automatica todas las depencias utilizadas en el proyecto

```shell
npm install
```

* Para ejecutar el proyecto utilizar el siguiente comando

```shell
npx expo start
```

* Al ejecutar el comando, se mostrará lo siguiente
![Web_run](./images/ReactNative_Execution.png)

### Ejecutar en Android/iOS

#### Android 
Para poder ejecutar el proyecto en un dispositivo android se necesitara de la App de **[Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=docs)**, la cual se puede encontrar en la Play Store

Tambien se puede conectando el cable usb de la pc al celular, activando las opciones de desarrollador y la opción de *USB Debugging*, y seleccionando la opcion **a** en la terminal

##### NOTA
En linux se debe habilitar el puerto mediante el firewall (Me pase 4 horas para saber esto :( )
```shell
sudo firewall-cmd --zone=public --add-port=PUERTO_DE_APP/tcp --permanent
```
```shell
sudo firewall-cmd --reload
```

En caso de algun error, probablemente en los demás S.O se deba hacer lo mismo

#### iOS
Para poder ejecutar el proyecto en un dispositivo iOS se necesitara de la App de **[Expo](https://itunes.apple.com/app/apple-store/id982107779)**, la cual se puede encontrar en la App Store

Ahora solo queda escanear el codigo QR para poder visualizar la aplicación en el dispositivo movil


### Ejecución Web

Para poder ejecutar el proyecto en una version web podemos acceder al link del localhost generada en la terminal

### Ejecucion en [emulador android/iOS](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated)