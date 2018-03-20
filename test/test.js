const expect = require('chai').expect;
const encode = require('../encode');
const decode = require('../decode');
const {readFile} = require('../helpers');

let bedspreads;
let plaidExample;
let kangarooBefore;
let kangarooAfter;

before(()=> encode('./testArt/bedspreads.txt')
    .then(data=>{
      bedspreads = data;
    })
    .then(()=> encode('./testArt/data.txt'))
    .then(data2=>{
      plaidExample = data2;
      return readFile('./testArt/data.txt');
    })
    .then(file=>{
      kangarooBefore = file;
    })
)


describe('Encode', function() {
  it('should encode bedspreads.txt correctly', function() {
    const bedspreadStr = bedspreads.buf.toString('binary');
    expect(bedspreads.buf.length).to.equal(26);
    expect(bedspreads.codes).to.be.an('object');
    expect(bedspreads.codes).to.deep.equal({ '32': '110001',
    '48': '110010',
    '49': '11110',
    '50': '10011',
    '51': '11111',
    '53': '110011',
    '54': '10100',
    '55': '10000',
    '97': '10101',
    '98': '10110',
    '100': '11100',
    '101': '11101',
    '110': '101110',
    '111': '101111',
    '112': '10001',
    '114': '10010',
    '115': '1101',
    '280': '0',
    '281': '110000' }
  );
  });
  it('should encode data.txt', function(){
    expect(plaidExample.buf).to.exist;
    expect(plaidExample.codes).to.exist;
    expect(plaidExample.codes[32]).to.exist;
    expect(plaidExample.codes[280]).to.exist;
    expect(plaidExample.codes[281]).to.exist;
    expect(plaidExample.codes[256]).to.not.exist;
  });
});

describe('Decode', function() {
  let bedDecoded;
  let plaidDecoded;
  before(()=> decode('./testArt/bedspreads.txt.encoded.json')
    .then(data=>{
      bedDecoded = data;
      return decode('./testArt/data.txt.encoded.json');
    })
    .then(data2=>{
      plaidDecoded = data2;
      return readFile('./testArt/data.txt.decoded.txt');
    })
    .then(decodedFile=>{
      kangarooAfter = decodedFile;
    })
  )
  it('should decode bedspreads.txt correctly', function() {
    expect(bedDecoded).to.equal('bed spreaders spread spreads on beds');
  });
  it('should decode data.txt', function(){
    expect(plaidDecoded).to.exist;
    expect(plaidDecoded).to.have.length(5496);
  });
  it('should return exactly the same kangaroo image', function(){
    expect(kangarooBefore).to.equal(kangarooAfter);
  });
});
