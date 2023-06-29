// First sentence for pargraphs
const firstSentence = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

// Array with only words (without special caracters : and ,)
const words = caracters.slice(2);

// Select copy btn
const copyBtn = document.getElementById("copy-button");

// Select generate btn
const generateBtn = document.getElementById("generateButton");

// Select input number
const number = document.getElementById("number");
// Avoid blanck in number input
number.addEventListener("change", (e) => {
  if (e.target.value == "") {
    e.target.value = 1;
  }
});
// Select input choise
const choices = document.getElementById("choices");
// choices.addEventListener("change",(e)=>{
//   console.log(choices.value);

// })

//Select message displayed when copy
const copyMessage = document.getElementById("copy-message");

// Select the content generated
const generatedContent = document.querySelector(".generated-content");

/*********************************************************************************************/
// Function show message for n seconds
function showMessage(messageElement, numberOfSeconds) {
  setTimeout((e) => {
    messageElement.classList.add("invisible");
  }, numberOfSeconds * 1000);
}
// Function copy to clipboard
function copyToClipboard() {
  let copyText = document.querySelector(".generated-content").textContent;
  navigator.clipboard.writeText(copyText);
}

// Function get random int lower than max
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

// Function get random int betwen min and max
const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Function generate n random words
const generateWords = (numberOfWords) => {
  let wordsArray = [];
  for (let n = 0; n < numberOfWords; n++) {
    let word = words[getRandomInt(words.length)];
    wordsArray.push(word);
  }
  return wordsArray.join(" ");
};

// console.log("********This a generated words\n\n" + generateWords(5));

// Function : generate a sentence with numbers
const generateSentence = (numberOfSentenceWords) => {
  // First word of sentence has to be a word
  const firstWord = words[getRandomInt(words.length)];
  // Last word of sentende has to be a word
  const lastWord = words[getRandomInt(words.length)];
  // The end caracter (. or ? or !)
  const endCaracter = endCaracters[getRandomInt(endCaracters.length)];
  //Remove first and last word from caracters array
  const caractersWithoutFirstWord = caracters.filter(function (letter) {
    return letter !== firstWord;
  });
  const caractersWithout_F_L_Words = caractersWithoutFirstWord.filter(function (
    letter
  ) {
    return letter !== lastWord;
  });

  // Array with others words  betwen firstWord and lastWord
  let otherWordsArray = [];
  for (let i = 0; i <= numberOfSentenceWords - 3; i++) {
    let currentWord =
      caractersWithout_F_L_Words[
        getRandomInt(caractersWithout_F_L_Words.length)
      ];
    otherWordsArray.push(currentWord);
  }
  // Join others words
  const otherWords = otherWordsArray.join(" ");

  // Make the sentence with firstWord, otherWords, lastWord and enCaracter
  let sentence = `${firstWord} ${otherWords} ${lastWord}${endCaracter}`;
  // Return sentence with first letter capitalized
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

// console.log(
//   "**************This is a sentence with 20 words \n" + generateSentence(20)
// );

// Function generate paragraph
const generateParagraph = (
  sentenceMinWords,
  sentenceMaxWords,
  numberOfSentences
) => {
  let sentencesArray = [];
  for (let j = 0; j < numberOfSentences; j++) {
    let generatedSentence = generateSentence(
      getRandomArbitrary(sentenceMinWords, sentenceMaxWords + 1)
    );
    sentencesArray.push(generatedSentence);
  }
  return sentencesArray.join(" ");
};

// console.log(
//   "*************This a generated paragraph \n\n" + generateParagraph(5, 15, 4)
// );

// Function generate n paragraphs

const generateParagraphs = (numberOfParagraphs) => {
  let paragraphsArray = [];
  for (let k = 0; k < numberOfParagraphs; k++) {
    // generate paragraphs: each paragraph has 2-7 sentences and each sentence has 5-15 words
    let generatedParagraph = generateParagraph(5, 15, getRandomArbitrary(2, 7));
    paragraphsArray.push(generatedParagraph);
  }
  const mappedGeneratedPargraph = paragraphsArray.map((paragraph) => {
    return `<p>${paragraph}</p>`;
  });
  return mappedGeneratedPargraph.join("");
};

// console.log(
//   "**********************This 10 generated paragraphs \n\n" +
//     generateParagraphs(10)
// );
/*********************************************************************************************/

// Show copy message
copyBtn.addEventListener("click", (e) => {
  copyMessage.classList.remove("invisible");
  copyToClipboard();
  showMessage(copyMessage, 2);
});

// Show Generated Words, Sentences or Pragraphs
generateBtn.addEventListener("click", (e) => {
  console.log("************************************");
  let fullGeneratedContent = "";
  switch (choices.value) {
    case "paragraphs":
      fullGeneratedContent = generateParagraphs(number.value).replace(
        "<p>",
        `<p>${firstSentence} `
      );
      console.log(fullGeneratedContent);
      break;
    case "sentences":
      fullGeneratedContent = `${firstSentence} ${generateParagraph(
        5,
        15,
        number.value - 1
      )}`;
      console.log(fullGeneratedContent);
      break;
    case "words":
      fullGeneratedContent = generateWords(number.value);
      console.log(fullGeneratedContent);
      break;
  }

  generatedContent.innerHTML = fullGeneratedContent;
});
