const panels = {
    question: null,
    answer: null,
    end: null
};
let countries = [];
let question = {};
let questionNumber = 1;
let questionTotal = 5;
let goodAnswers = 0;


const init = async () => {
    panels.question = document.querySelector('#question-panel');
    panels.answer = document.querySelector('#answer-panel');
    panels.end = document.querySelector('#end-panel');


    const response = await fetch('https://restcountries.eu/rest/v2/all');
    console.log(response)
    countries = await response.json();

    panels.question
        .querySelector('ul')
        .addEventListener('click', ({ target }) => {
            if (target.matches('li')) {
                const userAnswer = target.innerHTML;
                checkAnswer(userAnswer);
            }
        });
  
    panels.answer
        .querySelector('button')
        .addEventListener('click', () => {
            if (questionNumber <= questionTotal) {
                pickQuestion();
                switchPanel('question');
            } else {
                panels.end
                    .querySelector('p').innerHTML = `ton score est de: ${goodAnswers} / ${questionTotal}`;
                switchPanel('fin');
            }
        });



    pickQuestion();

};

const pickQuestion = () => {
    question = generateQuestion(countries);

    panels.question
        .querySelector('img')
        .setAttribute('src', question.flag);
    panels.question
        .querySelector('small')
        .innerHTML = `${questionNumber} / ${questionTotal}`;

    const possibilitiesHtml = question.possibilities.map((possibility) => {
        return `<li>${possibility}</li>`;
    });
    panels.question
        .querySelector('ul').innerHTML = possibilitiesHtml.join('');
};

const switchPanel = (panel) => {
    switch (panel) {
        case 'answer':
            panels.answer.style.display = 'block';
            panels.question.style.display = 'none';
            panels.end.style.display = 'none';
            break;
        case 'question':
            panels.question.style.display = 'block';
            panels.answer.style.display = 'none';
            panels.end.style.display = 'none';
            break;
        default:
            panels.end.style.display = 'block';
            panels.answer.style.display = 'none';
            panels.question.style.display = 'none';
            break;
    }
};

const checkAnswer = (userAnswer) => {
    console.log('userAnswer', userAnswer);
    if (userAnswer === question.answer) {
        
        panels.answer
            .querySelector('h2').innerHTML = 'gagner';
        panels.answer
            .querySelector('p').innerHTML = '';
        goodAnswers++;
    } else {
        panels.answer
            .querySelector('h2').innerHTML = 'faux !';
        panels.answer
            .querySelector('p').innerHTML = `la reponse est ${question.answer} `;
    }
    questionNumber++;
    switchPanel('answer');
};

window.onload = init;