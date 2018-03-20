const _  = require('lodash');
const {toBinaryStr} = require('../helpers');

function HuffNode({char,freq,left=null,right=null}){
  this.left = left;
  this.right = right;
  this.char = char;
  this.freq = freq;
}

//this heap is inefficient. Should implement with binary tree later
function arrToMinHeap(oldArr){
  let arr = oldArr.slice();
  arr.insert = (node)=>{

    let inserted = false;
    for(let i=0; i<arr.length; i++){
      const lexSmaller = arr[i].length===arr.length && node.char > arr[i].char;
      const freqSmaller = node.freq < arr[i].freq;

      if(freqSmaller || lexSmaller){
        inserted = true;
        arr.splice(i, 0, node);
        break;
      }
    }

    if(!inserted){
      arr.push(node);
    }
  };
  return arr;
}

function buildFrequencyMap(arr){
  let map = {};
  arr.forEach(char=>{
    map[char]=map[char]?map[char]+1: 1;
  });

  return map;
}

function buildFrequencyTable(map){
  let arr = [];
  for(key in map){
    arr.push(new HuffNode({char: key, freq: map[key]}));
  }
  return _.sortBy(arr,['freq','char']);
}

function buildHuffmanTree(freqArr){
  const arr = freqArr.slice();
  const heap = arrToMinHeap(arr);

  //prevent infinite loop
  let counter = 300 * 300;
  while(counter && heap.length !== 1){
    counter--;

    let left = heap.shift();
    let right = heap.shift();

    const newNode = new HuffNode({char:300,freq:left.freq +right.freq, left,right});

    heap.insert(newNode);
  }

  return heap[0];
}

function treeToCodes({node,cur,codes}){
  const isLeaf = !node.left && !node.right;
  if(isLeaf){
    codes[node.char] = cur;
  }else{
    treeToCodes({node:node.left,cur:`${cur}0`,codes});
    treeToCodes({node:node.right,cur:`${cur}1`,codes});
  }
  return codes;
}

// encodes a buffer and pads to fit into bytes
// ^^ this is now a pseudobuffer of type "string" with ascii chars instead
function encodeBuf(arr,codes){
  let str = arr.map(char=>codes[char].toString()).join('');
  const padLength = (8-(str.length%8)) % 8;
  let padding = '0'.repeat(padLength);
  str += padding;
  let temp = [...str];

  let buf = [];
  for(let i=0; i<temp.length/8;i++){
    const tempStr = temp.slice(i*8,i*8+8).join('');
    const num = parseInt(tempStr,2);
    const asciiChar = String.fromCharCode(num);
    buf.push(asciiChar);
  }
  return buf.join('');
}

// DECODE FUNCTIONS ********************

function flipDict(codes){
  const flippedDict = {};
  for(key in codes){
    flippedDict[codes[key]] = key;
  }

  return flippedDict;
}

function bufToBitArr(buf){
  let arr = [];
  for(let i=0; i<buf.length;i++){
    let char = buf[i];
    let num = char.charCodeAt();
    let str = toBinaryStr(num);

    [...str].forEach(c=>{
      arr.push(c);
    });

  }
  return arr;
}

module.exports = {
  encode(arr){
    arr.push(281); // insert end of file character
    const map = buildFrequencyMap(arr);
    const freqArr = buildFrequencyTable(map);
    const huffmanRoot = buildHuffmanTree(freqArr);
    const codes = treeToCodes({node:huffmanRoot,cur:'',codes:{}});
    const encodedBuf = encodeBuf(arr,codes);
    console.log(`Huffman compression: ${arr.length} bytes to ${encodedBuf.length} bytes`)
    return {buf:encodedBuf,codes};
  },
  decode({buf,codes}){
    const arr = bufToBitArr(buf);

    const flippedCodes = flipDict(codes);
    const decoded = [];
    let cur = '';

    for(let i=0; i<arr.length;i++){
      let bit = arr[i];
      cur += bit;
      if(flippedCodes[cur]){
        decoded.push(flippedCodes[cur]);
        if(flippedCodes[cur]===281 || flippedCodes[cur]==='281'){
          break;
        }
        cur = '';
      }
    }
    console.log(`Huffman decompression: ${arr.length / 8} bytes to ${decoded.length} bytes`);
    return decoded;
  }
}
