# mapudungun-backend

Mapudungun backend is a dictionary that is created as rest service, written in javascript and executed in Nodejs. This project is compound by three repositories.
- Mapudungun Backend https://github.com/pabloaraya/mapudungun-backend
- Mapudungun Web https://github.com/pabloaraya/mapudungun-web
- Android Client https://github.com/pabloaraya/mapudungun-android
- iOS Client https://github.com/pabloaraya/mapudungun-ios

## Installation
Prior to run the proyect it is necessary to have [Nodejs](https://nodejs.org/) installed and execute the following command in the root directory of the proyect, to install the correspondent dependencies.

```
git clone git@github.com:pabloaraya/mapudungun-backend.git
cd mapudungun-backend
npm install
```
To start the server we execute the following command.
```
node app.js
```
It worths mentioning that the command can vary between *node* and *nodejs* depending of the operative system and if the port is changed to 80, you must prepend the "sudo" command at the sentence.

# Usage
The service receives three params:
- from: input lenguage
- to: output lenguage
- word: word to translate

And the service returns four params:
- statusCode: Int
- status: String
- message: String
- words: Array (optional)

To test the server we can to execute the following command.
```
curl 'http://0.0.0.0:3000/api?from=spanish&to=mapudungun&word=niño'
```

## License
Mapudungun-backend is published under the MIT License.

## Contact
- Pablo Araya
- pablo.araya.romero@gmail.com
- [@pabloaraya_cl](https://twitter.com/pabloaraya_cl)
- http://pabloaraya.org
