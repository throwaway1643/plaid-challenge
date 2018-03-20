const _ = require('lodash');
const fs = require('fs');
const huffman = require('./coding/huffman');
const lz = require('./deduplication/lz78');
const {writeASCII} = require('./helpers');

//takes json and writes to file
async function decode(filePath){
  const {buf, codes} = require(filePath);
  const huffDecodedArr = huffman.decode({buf,codes});
  const lzDecodedStr = lz.decode(huffDecodedArr);

  let split = filePath.split('.');
  split[split.length-2] = 'decoded';
  split[split.length-1] = 'txt';
  const decodedFilePath = split.join('.');
  await writeASCII(lzDecodedStr,decodedFilePath);

  const codeLength = JSON.stringify(codes).length;

  console.log(`${Math.round(lzDecodedStr.length / buf.length * 100)-100}% expansion: ${buf.length} bytes to ${lzDecodedStr.length} bytes`);
  console.log(`Including Huffman codes, ${Math.round(lzDecodedStr.length / (buf.length + codeLength) * 100)-100}% expansion`)
  return lzDecodedStr;
}

module.exports = decode;