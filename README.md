# Plaid Take Home Challenge

### Problem Summary
Losslessly encode and decode 100x100 ascii art.

## Research

I referenced http://mattmahoney.net/dc/dce.html heavily. In writing the code, I did not use external compression libraries or reuse code.

## Usage

Make sure you have a recent version of Node.js

```
(nvm use 8.5.0)

npm install

// To use standalone
npm start

// To run test suite
npm test

```

### Common lossless compression strategies

#### Coding strategies

Huffman coding: Good fit for this problem. Huffman coding is very efficient here because the number of possible symbols is a power of two, so the arithmetic code assignment is optimally efficient. The Huffman length of the least used character if all possible chars are used would just be 8 (2^8 = 256).

Arithmetic coding: Arithmetic coding performs better than Huffman in many scenarios. Since the number of unique symbols in the ascii will not always equal a power of 2, there is leftover space.

#### Deduplication

Run-length encoding (RLE): Could be useful. Repetitive whitespace is common in ascii art. However, RLE is extremely inefficient in most cases because repetition is low in non-whitespace characters.

LZ77 and LZ78: Very useful for repetitive sequences, not just one character repetitions like RLE.

Burrows-Wheeler-Transform (BWT): Lexicographically sorts all rotations of the string and transforms to last letter of each rotation. Optimizes effects of other deduplication methods.

## Thought Process

I'm going to make the assumption that ascii art contains repetitive runs of characters because lines in the art are generally represented by small changes from row to row. Therefore, LZ77 and LZ78 would be the best general deduplication methods.

To track previous character sequences, LZ77 uses a sliding window, and LZ78 uses a dictionary. The space requirement for LZ77 is O(k) if k is the max size of the window, while LZ78's worst case space requirement is O(n^2); However, the runtime of LZ78 should be significantly faster due to the dictionary approach having constant retrieval time. Since the ascii is small enough so that I don't have to worry about space limitations, I will use LZ78.

I'm going to modify LZ78 to accomodate smaller numbers of characters. In this way, I can save space by not having to use extra chars to signify the extra number of escaped bits.

In the interest of time, I will use a modified LZ78 strategy and Huffman coding for this exercise. I will code 280 as the escape character.

## Roadblocks

Huffman coding sometimes gives a number of bits that does not go evenly into bytes, so I had to go back and make a end of file character (coded as 281);

Native Node Buffers + the fs module do not play well with binary. In order to save the file to disk, I have to spawn a child process with Node and use golang.

^^Edit: I realized I can just convert the binary back into ascii.

I ended up using utf-8 because it supports the extended ascii table, while ascii in JS only supports 7 bits and strips the largest bit.

## Performance

According to my ascii art sample of two futurama characters and a kangaroo, the average compression is ~56% including Huffman codes and ~72% without.

When accounting for the Huffman codes transmitted as JSON, compression is poor for files below 100x100 size.

## Future directions

In the future, I could improve this implementation in a couple ways:

1. Instead of choosing between RLBWT and LZ78, I could also compare compression between RLBWT and LZ78 and then change the first bit of the compressed data to signify which deduplication method was chosen.

2. Use arithmetic coding to compress the deduplicated product.

3. Check if deduplication methods actually lead to space savings. In small or nonrepetitive files (like bedspreads.txt), some edge cases may increase file size.

4. Canonical Huffman coding would decrease the size of the transmitted codes

5. I could stop using json to cut out the space for 'buf' and 'codes' keys

6. I could increase the efficiency of the min-heap by utilizing a binary tree

## Disclaimer

This challenge took me significantly longer to complete than 2-3 hours.

The timeline was:

Researching common lossless encoding strategies: 2 hour

Planning the encoding method: 1 hour

Writing initial tests: 0,5 hour

Coding, Troubleshooting, Polishing: 12 hours

Final test: 0.5 hour

Final editing and readme: 2 hour

In total, it took me about 18 hours to finish this project. Thank you for taking the time to review and score this challenge.