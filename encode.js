const _ = require('lodash');
const fs = require('fs');
const huffman = require('./coding/huffman');
const lz = require('./deduplication/lz78');
const {readFile,writeJSON} = require('./helpers');



// reads from file and returns a JSON obj
async function encode(filePath){
  console.log('Start encode: ', filePath);
  const file = await readFile(filePath);

  if(!file.length){
    throw new Error('Nothing in the file');
  }

  const lzArr = lz.encode([...file]);
  const encoded = huffman.encode(lzArr);

  await writeJSON(encoded,`${filePath}.encoded.json`);

  const finalBytes = encoded.buf.length;
  const codeLength = JSON.stringify(encoded.codes).length; //still in ascii format

  console.log(`${100-Math.round(finalBytes / file.length * 100)}% size reduction: ${file.length} bytes to ${finalBytes} bytes`);
  console.log(`Including Huffman codes, ${100-Math.round((finalBytes + codeLength) / file.length* 100)} % size reduction`)
  return encoded;
}

module.exports = encode;