#! /usr/bin/env node

/**
*  spellchecker.js
*  @author dpg5000
*  @version May 26, 2016
*/

require('./wordUtils.js');

function spellChecker() {
  var word, line;
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var defaultDict = "/usr/share/dict/words";
  var dict = [];
  var readline = require('readline');


  //ingest word list into program memory
  var dictReader = readline.createInterface({
    input: require('fs').createReadStream(defaultDict)
  });

  dictReader.on('line', function (line) {
    while (line != null) {
      dict.push(line);
    }
  });
  //close and reset
  dictReader.close();
  dictReader = null;


  //read misspellings from stdin
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', function(line){
      while (word = line.trim() !=null) {
        var found = false;
        var correction = "NO CORRECTION";
        console.log("> " + word);
        word = word.toLowerCase();
        word = tripleCharCleanup(word);
        if(anyDoublesCheck(word)){
          recursiveDoubles(word, 0, 0)
        } else {
          wrongVowelCheck(word, 0);
        }
        console.log(correction);
      };
  });
  rl.close();
  rl = null;
  rl.prompt([preserveCursor]

};
