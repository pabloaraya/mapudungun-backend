# mapudungun-backend

Mapudungun backend es un servidor REST escrito en javascript y ejecutado en Nodejs. Este proyecto está compuesto de tres repositorios:
- Mapudungun Backend https://github.com/pabloaraya/mapudungun-backend
- Mapudungun Web https://github.com/pabloaraya/mapudungun-web
- Android Client https://github.com/pabloaraya/mapudungun-backend
- iOS Client https://github.com/pabloaraya/mapudungun-ios

## Installation
Para poder ejecutar el proyecto es necesario tener instalado previamente [Nodejs](https://nodejs.org/) y ejectuar el siguiente comando dentro del directorio raíz del proyecto, para así poder instalar las dependencias correspondientes.
```
git clone git@github.com:pabloaraya/mapudungun-backend.git
cd mapudungun-backed
npm install
```

## Usage
Para iniciar el servidor ejecutamos el siguiente comando.
```
node app.js
```

Vale destacar que el comando puede variar entre *node* y *nodejs* dependiendo del sistema operativo y si se cambia el puerto a 80 se debe anteponer el comando *sudo* a la sentencia.

El servicio recibe tres parámetros:
- from: Idioma de entrada
- to: Idioma de salida
- word: Palabra a traducir

Y retorna cuatro parámetros:
- statusCode: Int
- status: String
- message: String
- words: Array (optional)

Para probar el servidor podemos ejecutar el siguiente comando.
```
curl 'http://0.0.0.0:3000/api?from=spanish&to=mapudungun&word=niño'
```

## License
Mapudungun-backend is published under the MIT License.

## Contact
· Pablo Araya
· pablo.araya.romero@gmail.com
. @pabloaraya_cl
