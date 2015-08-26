# mapudungun-backend

Mapudungun backend es un servidor REST escrito en javascript y ejecutado en Nodejs

## Installation
Para poder ejecutar el proyecto es necesario tener instalado previamente [Nodejs](https://nodejs.org/) y ejectuar el siguiente comando dentro del directorio raíz del proyecto, para así poder instalar las dependencias correspondientes.
```
npm install
```

## Usage
Para iniciar el servidor ejecutamos el siguiente comando
```
node app.js
```

Vale destacar que el comando puede variar entre *node* y *nodejs* dependiendo del sistema operativo y si se cambia el puerto a 80 se debe anteponer el comando sudo a la sentencia.

El servicio recibe tres parámetros:
- from: Idioma de entrada
- to: Idioma de salida
- word: Palabra a traducir

Y retorna cuatro parámetros:
- statusCode: Int
- status: String
- message: String
- words: Array (optional)

To test the server we can use the above command
```
curl 'http://0.0.0.0:3000/api?from=spanish&to=mapudungun&word=niño'
```
