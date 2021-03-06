## ASCII Art Encoder/Decoder

### Task

When designing client-server systems, an important question that will often
arise is -- what should the transport data format look like? Optimizing the data
format can often give us improved performance in many production systems.

In this exercise, you will design a data format for a transport problem and
write encoding / decoding functions for it.

Imagine you run a rapidly growing Imgur competitor, serving the world's finest
Bitmap ASCII art, that look like:

```
                                         ,,
                                       ,:@@:,
                                      ,#@@@@+,
                                     ,#@',,+@+,
                                    ,#@',,,,+@+,
                                   ,#@',,,,,,+@+,
                                  ,#@',,,,,,,,+@+,
                                 ,#@',,,,,,,,,,+@+,
                                ,#@',,,,,,,,,,,,+@+,
                               ,#@',,,,,,,,,,,,,,+@+,
                              ,#@',,,,,,,,,,,,,,,,+@+,
                             ,#@',,,,,,,,,,,,,,,,,,+@+,
                            ,#@',,,,,,,,,,,,,,,,,,,,+@+,
                           ,#@',,,,,,,,,,,,,,,,,,,,,,+@+,
                          ,#@',,,,,,,,,,,,,,,,,,,,,,,,+@+,
                         ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                        ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                       ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                      ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                     ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                    ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                   ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                  ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                 ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
               ,#@',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
              ,#@',,,,,,,,,,,,,,,,,,,+@##@@;,,,,,,,,,,,,,,,,,,,,,,+@+,
             ,#@',,,,,,,,,,,,,,,,,,@#@@@@@@@#;,,,,,,,,,,,,,,,,,,,,,+@+,
            ,#@',,,,,,,,,,,,,,,,,;#@@@@@@@@@@@@,,,,,,,,,,,,,,,,,,,,,+@+,
           ,#@',,,,,,,,,,,,,,,,,+@@@@@@@@@@@@@@@,,,,,,,,,,,,,,,,,,,,,+@+,
          ,#@',,,,,,,,,,,,,,,,,+@@@@@@@@@@@@@@@@@,,,,,#;,,,,,,,,,,,,,,+@+,
         ,#@',,,,,,,,,,,,,,,,,'@@@@@@@@@@@@@@@@@@;,,,,;@#;,,,,,,,,,,,,,+@+,
        ,#@',,,,,,,,,,,,,,,,,:@@@@@@@@@@@@@@@@@@@#,,,,,:@@#:,,,,,,,,,,,,+@+,
       ,#@',,,,,,,,,,,,,,,,,,#@@@@@@@@@@@@@@@@@@@@@,,,,,,'@@@,,,,,,,,,,,,+@+,
      ,#@',,,,,,,,,,,,,,,,,,#@@@@@@@@@@@@@@@@@@@@@@@:,,,@@@@@#;,,,,,,,,,,,+@+,
     ,#@',,,,,,,,,,,,,,,,,,@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@,,,,,,,,,,,+@+,
    ,#@',,,,,,,,,,,,,,,,,,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,,,,,,,,,,,+@+,
   ,#@',,,,,,,,,,,,,,,,,,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@,,,,,,,,,,,,+@+,
  ,#@',,,,,,,,,,,,,,,,,,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,,,,,,,,,,,,,,,,,,,+@+,
 ,#@',,,,,;,,,,,,,,,,,,@@@@@#',#@@@@@@@@@@@@@@@@@@@@@@@@@@,,,,,,,,,,,,,,,,,,,,,+@+,
 :@',,,,,,:,,,,,,,,,,,#@@@@@,,,,+@@@@@@@@@@@@@@@@@@@@@@@#,,,,,,,,,,,,,,,,,,,,,,,+@:
,@@,,,,,,,,@:,,,,,,,+@@@@@,,,,,,,'@@@@@@@@@@@@@@@@@@@@@@,,,,,,,,,,,,,,,,,,,,,,,,,@@,
,@@,,,,,,,,,#@,,,,+#@@#@:,,,,,,,,,;#@@@@@@@@@@@#@@@@@@#,,,,,,,,,,,,,,,,,,,,,,,,,,@@,
 :@+,,,,,,,,,@###@@@@#,,,,,,,,,,,,,,@@@@@@@@@@,,+@@@@#:,,,,,,,,,,,,,,,,,,,,,,,,,+@:
 ,+@+,,,,,,,,,,'++;,,,,,,,,,,,,,,,,,,;@@@@@@#,,,+@@@:,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
  ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,@@@@@:,,,@@#,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
   ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,;@@@@:,,,@@;,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
    ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,@@@@:,,,#@,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
     ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,;@@@;,:,#,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
      ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,#@@;,@'#,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
       ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,@@@',,;,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
        ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,@@#,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
         ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,@@@,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
          ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@@,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
           ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,@@;,,,,,,,,,,,,,,,,,,,,,,,+@+,
            ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,@@@@#,,,,,,,,,,,,,,,,,,,,+@+,
             ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,'@@@@@@#:,,,,,,,,,,,,,,,+@+,
              ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,:'@@##@#@',,,,,,,,,,,+@+,
               ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:'@@#@#',,,,,,+@+,
                ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@,,,,,,+@+,
                 ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                  ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                   ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                    ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                     ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                      ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                       ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                        ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                         ,+@+,,,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                          ,+@+,,,,,,,,,,,,,,,,,,,,,,,,+@+,
                           ,+@+,,,,,,,,,,,,,,,,,,,,,,+@+,
                            ,+@+,,,,,,,,,,,,,,,,,,,,+@+,
                             ,+@+,,,,,,,,,,,,,,,,,,+@+,
                              ,+@+,,,,,,,,,,,,,,,,+@+,
                               ,+@+,,,,,,,,,,,,,,+@+,
                                ,+@+,,,,,,,,,,,,+@+,
                                 ,+@+,,,,,,,,,,+@+,
                                  ,+@+,,,,,,,,+@+,
                                   ,+@+,,,,,,+@+,
                                    ,+@+,,,,+@+,
                                     ,+@+,,+@+,
                                      ,+@@@@+,
                                       ,:@@:,
                                         ,,
```

You will find a copy of this image in `data.txt`. Your job is to encode and
decode this image (and others of the same format) for transport. Expect images
to be:

- Bitmap size of 100x100.
- ASCII characters (i.e. character code point range of 0 to 255).

Design a transport format for transferring these ASCII images, and implement
`Encode` and `Decode` functions for the format. Please optimize for **space
efficiency**. Feel free to use `data.txt` as input. Your final output after
running `Encode` and `Decode` successively on the file should return the
original input.

Note that you should *not* simply use an off-the-shelf compression library (e.g.
gzip). There are many ways to efficiently encode the given data in a custom,
lossless way.

Include comments, unit tests for both functions and a brief README that explains the reasoning for your data format and any instructions for running your code.

### Criteria

We will be evaluating your submission on the following criteria: 

  - **Completeness**: did you fully complete the problem?
  - **Correctness**: does the functionality work as expected?
  - **Reasoning**: is the reasoning for the data format in your `README` sound?

Note that there is no "correct" answer here and we are not looking for any particular implementation.

### Timeline

We're expecting this to take between 2 and 3 hours to complete. This is a guideline and if you find you finish sooner or a bit later, don't worry. The test is also not timed so as to flexible in case you need to start and stop. 

Please submit the take home within 5 business days. If this seems unworkable with your schedule, just let me know.

### Submission

Please create a secret and anonymized** gist on https://gist.github.com/ and send us the link. [**Please do not include your name or any other personal information].

It should include your code and a `README`.
