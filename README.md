![Top Language](https://img.shields.io/github/languages/top/dlenroc/node-persistent-object.svg) 
![Dependencies Status](https://img.shields.io/david/dlenroc/node-persistent-object.svg) 


#### Installation

```bash
npm install dlenroc/node-persistent-object --save
```


#### Usage

```javascript
const persist = require('persistent-object');
const mem = persist('db.json');

console.log(mem['some_value']);
//   fist run: console.log(undefined) 
// second run: console.log('remember this value')

mem['some_value'] = 'remember this value'
// or mem.some_value = 'remember this value'
```
