
/**
 * boolean function checks input word against dictionary set to program memory ('dict')
 * @param user input word to check
 */
function dictCheck(word) {
  if(!found) {
    if(dict.indexOf(word) !== -1) {
      correction = word;
      found = true;
      return true;
    } else {
      return false;
    }
  } else (
    return false;
  )
};

/**
 * boolean function checks for any existence of double letters in sequence
 * @param user input word to check
 */
function anyDoublesCheck(word) {
  (/([a-z])\1/i).test(str);
};

/**
 * cleans up any triple-repeated letters in sequence, reduces to double-letters
 * no existence of triple-repeat words in sequential order in english language
 * @param user input word to check
 */
function tripleCharCleanup(string) {
  for (var i = 0; i < string.length - 2; i++) {
    if (string.charAt(i) == string.charAt(i + 1) && string.charAt(i) == string.charAt(i + 2)) {
      string = string.substring(0,i) + string.substring(i + 1, string.length);
      i--;
    }
  }
  return string;
};

/**
 * examines each double-repeated letters in word, matches against dict to ensure validity
 * no words in the english language have more than three pairs of sequentially repeating letters.
 * our recursiveIndex can never be greater than 2 for a valid word - function would end on third call
 * see http://ask.metafilter.com/75110/3-sequential-sets-of-double-letters
 * @param word user input word to check
 * @param wordIndex counter for each double-repeat series in word
 * @param recursiveIndex counter to ensure recursion stop
 */
function recursiveDoubles(word, wordIndex, recursiveIndex) {
  if (recursiveIndex > 2) {
    return;
  }
  for (var i = wordIndex; i < word.length - 1; i++){
      if (word.charAt(i) == word.charAt(i + 1) && vowels.indexOf(word.charAt(i + 1)) == -1) {
        if (wrongVowelCheck(word,0)) {
          return;
        }
        recursiveDoubles(word, i+1, recursiveCount+1);
        if(!found) {
          var truncated = word.substring(0,i) + word.substring(i+1, word.length);
          if (wrongVowelCheck(truncated,0)) {
            return;
          }
          recursiveDoubles(truncated, i+1, recursiveCount+1);
        }
      }
   }
   return;
};

/**
 * boolean function runs every possible vowel permutation for word, then matches validity against dict
 * @param word user input word to check
 * @param vowelIndex counter to mark vowels checked
 */
function wrongVowelCheck(word, vowelIndex) {
  for (var i = vowelIndex; i < word.length; i++) {
    if (vowels.indexOf(word.charAt(i)) !== -1) {
      for (var j = 0; j < 5; j++){
        if (word.charAt(i) == vowels[j]) {
          vowelIndex = j;
          for (var k=0; k<5; k++) {
            word = word.substring(0,i) + vowels[k] + word.substring(i+1, word.length);
            if (dictCheck(word)) {
              return true;
            }

            wrongVowelCheck(word, i+1); vowelIndex++;
          }
        }
      }
    }
  }
  return false;
}
