const encode = require('./encode');
const decode = require('./decode');
const {writeJSON} = require('./helpers');

const readline = require('readline');
const _ = require('lodash');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(query){
  return new Promise((resolve)=>{
    rl.question(query,ans=>{
      resolve(ans);
    })
  })
}

async function userInterface(){
  try{
    let first = await ask('type "e" to encode. "d" to decode. "q" to quit.\n');
    console.log('if nothing entered, plaid example will be used\n');
    let filePath = await ask('enter file path(e.g. ./testArt/data.txt)\n');

    if(first === 'q'){
      process.exit(0);
    }
    if(!filePath){
      if(first === 'e'){
        filePath = './testArt/data.txt';
      }else{
        filePath = './testArt/data.txt.encoded.json'
      }
    }

    switch(first[0]){
      case 'e':
      await encode(filePath);
      break;
      case 'd':
      await decode(filePath);
      break;
      default:
      throw new Error('Incorrect input. Please try again.')
    }
    process.exit(0);
  }catch(e){
    console.log(e);
    return userInterface();
  }
  
}

userInterface();