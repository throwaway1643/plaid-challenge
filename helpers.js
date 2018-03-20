const fs = require('fs');

function readFile(filePath){
  return new Promise((resolve,reject)=>{
    fs.readFile(filePath, 'ascii', (err,data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  })
}

/*
// manually parse JSON because Node automatically converts to utf8
function readJSON(filePath){
  return new Promise((resolve,reject)=>{
    fs.readFile(filePath, 'utf8', (err,data)=>{
      if(err){
        reject(err);
      }else{
        let codesLen = 6; //"codes.length
        for(let i=data.length-2;i>=0;i--){
          if(data[i]==='s'){
            break;
          }
          codesLen++;
        }
        let codeStr = '{' + data.substr(data.length-1-codesLen,data.length);
        const {codes} = JSON.parse(codeStr);
        let buf = [];
        for(let i=8; i<data.length-codesLen-3;i++){
          buf.push(data[i]);
        }
        buf = buf.join('');
        resolve({buf,codes});
      }
    });
  })
}
*/

function writeJSON(encodedJSON,filePath){
  encodedJSON.buf = encodedJSON.buf.toString('utf8');
  return new Promise((resolve,reject)=>{
    fs.writeFile(filePath, JSON.stringify(encodedJSON),'utf8', function(err) {
      if(err) {
        console.log('error');
          console.log(err);
          reject(err);
      } else {
          console.log(`Encoded file @ ${filePath}`);
          resolve();
      }
  });
  });
}

function writeASCII(ascii,filePath){
  return new Promise((resolve,reject)=>{
    fs.writeFile(filePath, ascii,'utf8', function(err) {
      if(err) {
        console.log('error');
          console.log(err);
          reject(err);
      } else {
          console.log(`Decoded file @ ${filePath}`);
          resolve();
      }
  });
  });
}

function toBinaryStr(n){
  const str = parseInt(n, 10).toString(2);
  let padding = 8-str.length;
   padding = '0'.repeat(padding);
  return padding + str;
}

module.exports = {readFile,writeJSON,writeASCII,toBinaryStr};