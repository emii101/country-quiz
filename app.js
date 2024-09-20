let question = document.getElementById('question');
let next = document.getElementById('next');
let option1 = document.getElementById('option1');
let option2 = document.getElementById('option2');
let option3 = document.getElementById('option3');
let option4 = document.getElementById('option4');
let numbers = document.getElementsByClassName('numbers');
let countrys = [];
let correct = '';
let correctAnswers = localStorage.getItem('correctAnswers') ? parseInt(localStorage.getItem('correctAnswers')) : 0;
let questionState = 0;

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        countrys = data;
        console.log(countrys);
        newQuestion();
    })
    .catch(error => {
        console.log(error);
    });

const randomizer = (arr) => {
    if (!arr || arr.length === 0) return {};
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

let defaultQuestions = (country) => [
    `Which country does this initials ${country.flag} belong to?`,
    `Which country is ${country.capital} the capital?`,
    `What continent is ${country.name?.common} located on?`,
    `What is the currency of ${country.name?.common}?`,
    `What are the initials of ${country.name?.common}?`,
    `What is the capital of ${country.name?.common}?`,
    `What language is spoken in ${country.name?.common}?`,
];

function options(question, questions) {
    if (question === questions[0]) {
        return randomizer(countrys).name.common;
    } else if (question === questions[1]) {
        return randomizer(countrys).name.common;
    } else if (question === questions[2]) {
        return randomizer(countrys).continents[0];
    } else if (question === questions[3]) {
        return Object.values(randomizer(countrys).currencies)[0].symbol;
    } else if (question === questions[4]) {
        return randomizer(countrys).flag;
    } else if (question === questions[5]) {
        return randomizer(countrys).capital[0];
    } else if (question === questions[6]) {
        return Object.values(randomizer(countrys).languages)[0];
    } else {
        return 'Option Not Found';
    }
}
function correctOption(country, randomQuestion) {
    if (randomQuestion.includes('What are the initials of')) {
        return country.flag;
    } else if (randomQuestion.includes('What is the capital of')) {
        return country.capital ? country.capital[0] : 'No capital';
    } else if (randomQuestion.includes('continent')) {
        return country.continents[0];
    } else if (randomQuestion.includes('currency')) {
        return Object.values(country.currencies)[0].symbol;
    } else if (randomQuestion.includes('language')) {
        return Object.values(country.languages)[0];
    } else if (randomQuestion.includes('country')) {
        return country.name.common;
    } else if (randomQuestion.includes('belong')) {
        return country.name.common;
    }
    else {
        return 'Option Not Found';
    }
}

const newQuestion = () => {
    document.getElementById('result').innerHTML = 'Country Quiz';
    next.style.display = 'none';
    questionState++;
    option1.classList.add('option-button');
    option1.classList.remove('option-button-correct');
    option1.classList.remove('option-button-wrong');
    option2.classList.add('option-button');
    option2.classList.remove('option-button-correct');
    option2.classList.remove('option-button-wrong');
    option3.classList.add('option-button');
    option3.classList.remove('option-button-correct');
    option3.classList.remove('option-button-wrong');
    option4.classList.add('option-button');
    option4.classList.remove('option-button-correct');
    option4.classList.remove('option-button-wrong');
    let country = randomizer(countrys)
    const questions = defaultQuestions(country);
    let randomQuestion = randomizer(questions);
    question.innerHTML = randomQuestion;

    let optionsArr = [
        options(randomQuestion, questions),
        options(randomQuestion, questions),
        options(randomQuestion, questions),
        options(randomQuestion, questions)
    ]
    option1.innerHTML = optionsArr[0]
    option2.innerHTML = optionsArr[1]
    option3.innerHTML = optionsArr[2]
    option4.innerHTML = optionsArr[3]

    correct = correctOption(country, randomQuestion);
    const correctIndex = Math.floor(Math.random() * optionsArr.length);
    if (correctIndex === 0) {
        option1.innerHTML = correct;
    } else if (correctIndex === 1) {
        option2.innerHTML = correct;
    } else if (correctIndex === 2) {
        option3.innerHTML = correct;
    } else if (correctIndex === 3) {
        option4.innerHTML = correct;
    }

    switch (questionState) {
        case 1:
            document.getElementById('state1').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 2:
            document.getElementById('state2').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 3:
            document.getElementById('state3').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 4:
            document.getElementById('state4').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 5:
            document.getElementById('state5').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 6:
            document.getElementById('state6').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 7:
            document.getElementById('state7').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 8:
            document.getElementById('state8').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 9:
            document.getElementById('state9').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        case 10:
            document.getElementById('state10').style.background = 'linear-gradient(#E65895, #BC6BE8)';
            break;
        default:
            break;
    }
}

function verificateOption(event) {
    if (questionState < 10) {
        next.style.display = 'block';
    } else {
        document.getElementById('seeResults').style.display = 'block';
    }
    const isCorrect = event.target.innerHTML === correct;

    if (!isCorrect) {
        if (option1.innerHTML === correct) {
            document.getElementById('result').innerHTML = 'Wrong!';
            event.target.classList.add('option-button-wrong');
            event.target.classList.remove('option-button');
            option1.classList.add('option-button-correct');
            option1.classList.remove('option-button');
        } else if (option2.innerHTML === correct) {
            document.getElementById('result').innerHTML = 'Wrong!';
            event.target.classList.add('option-button-wrong');
            event.target.classList.remove('option-button');
            option2.classList.add('option-button-correct');
            option2.classList.remove('option-button');
        } else if (option3.innerHTML === correct) {
            document.getElementById('result').innerHTML = 'Wrong!';
            event.target.classList.add('option-button-wrong');
            event.target.classList.remove('option-button');
            option3.classList.add('option-button-correct');
            option3.classList.remove('option-button');
        } else if (option4.innerHTML === correct) {
            document.getElementById('result').innerHTML = 'Wrong!';
            event.target.classList.add('option-button-wrong');
            event.target.classList.remove('option-button');
            option4.classList.add('option-button-correct');
            option4.classList.remove('option-button');
        }
    } else {
        document.getElementById('result').innerHTML = 'Correct!';
        correctAnswers++;
        localStorage.setItem('correctAnswers', correctAnswers);
        event.target.classList.add('option-button-correct');
        event.target.classList.remove('option-button');
    }
}

function getResults() {
    document.getElementById('questionsAnswered').innerHTML = `You answer ${correctAnswers}/10 correctly`;
}

document.addEventListener('DOMContentLoaded', () => {
    let refreshed = sessionStorage.getItem('refreshed');

    if (document.getElementById('questionsAnswered')) {
        getResults();
        sessionStorage.setItem('refreshed', 'false');
    } else {
        localStorage.setItem('correctAnswers', '0');
        if (!refreshed || refreshed === 'false') {
            sessionStorage.setItem('refreshed', 'true');
            location.reload();
        }
    }
});

next.addEventListener('click', newQuestion);