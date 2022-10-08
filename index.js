const letters = 'abcdefghijklmnopqrstuvwxyz';
let lettersArray = letters.split("");
//can use : let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");
lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span)
})

//object of words + category
const words = {
    programming: ["php", "javaScript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Iception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
}

//Get random properties
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info span").innerHTML = randomPropName;


//Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);
lettersAndSpace.forEach(letter => {
    let span = document.createElement("span");
    if (letter === ' ') {
        span.className = "with-space";
    }
    lettersGuessContainer.appendChild(span);
})

//Select Guess Spans 
let guessSpans = document.querySelectorAll(".letters-guess span");

//set wrong attempts
let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");


//Handle clicking on letters
document.addEventListener("click", (e) => {
    let theStatus = false;
    if (e.target.className == "letter-box") {
        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, e) => {
            if (theClickedLetter == wordLetter) {
                theStatus = true;
                guessSpans.forEach((span, spanIndex) => {
                    if (e == spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }
                })

            }
        });
        if (theStatus !== true) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts == 8) {
                endGame();
                lettersContainer.classList.add("finished");
            }

        }
    }
})



function endGame() {
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over , The Word Is ${randomValueValue}`);
    div.appendChild(divText);
    div.className = 'popup';
    let span = document.createElement("span");
    let spanText = document.createTextNode('Reset');
    span.appendChild(spanText);
    span.className = 'reset';
    div.appendChild(span);
    document.body.appendChild(div);
    span.onclick = function () {
        location.reload();
    }
}


