class Question {
    constructor(type, question, answers, trueAnswerIndex) {
        this.question = question;
        this.type = type;
        this.answers = answers;
        this.trueAnswerIndex = trueAnswerIndex;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let startTestBtn = document.getElementById("startTest");
    let test = document.getElementsByClassName("test")[0];
    let next = document.getElementById("nextQuestion");
    let questionText = document.getElementById("questionText");
    let questionNumber = document.getElementById("questionNumber");
    let blockAnswers = document.getElementsByClassName("test__task")[0];
    let resBlock = document.querySelectorAll(".result")[0];
    let submitButton = document.querySelector(".sendForm");

    let question1 = new Question('radio',
        'Виберіть правильне твердження',
        ['Прототипи – це механізм, за допомогою якого об\'єкти JavaScript наслідують властивості один від одного.',
        'Прототипи – це механізм, за допомогою якого методи JavaScript успадковують властивості один від одного.'], 0);
    let question2 = new Question('radio',
        'Які значення можливо зберігати в змінних?',
        ['Тільки числа та строки',
            'Строки, числа з точкою та прості слова',
            'Строки, числа з точкою, прості числа та булеві функції' ], 2);
    let question3 = new Question('radio',
        'Де правильно вказано запуск спливаючого вікна?',
        ['new alert ("Hi")',
            'info ("Hi")',
            'alert ("Hi")',
            'Правильні варіанти відсутні'], 2);
    let question4 = new Question('checkbox',
        'Які із вказаних тверджень правильні?',
        ['Конструктор створює об\'єкт, прототипом цього об\'єкта буде прототип конструктора',
        'об\'єкт не має спеціальної властивості, яка вказує на прототип об\'єкта',
            'в якості властивостей об\'єкт може містити дані тільки одного типу',
            'об\'єкт може перевизначити будь-яку властивість прототипу'], [0, 3]);
    let question5 = new Question('checkbox',
        'Виберіть правильні твердження',
        ['Усі об\'єкти JavaScript успадковують властивості та методи від свого прототипу',
        'Object.prototype знаходиться на вершині ланцюга прототипів.',
            'Усі об\'єкти JavaScript (Date, Array, RegExp, Function, ....) наслідуються від Object.prototype'], [0, 1, 2]);
    let question6 = new Question('select',
        'Іменована область у пам\'яті, яка зберігає в собі дані (значення)',
        ['Константа',
            'Коментарій',
            'Змінна',
            'Сценарій JavaScript'], 2)
    let question7 = new Question('select',
        'Що виведе даний код? alert( 20e-1[\'toString\'](2) ); ',
        ['2',
            '10',
            '20',
            'NaN',
            'В коді помилка'], 1)
    let question8 = new Question('radio',
        'Правда, що null == undefined ?',
        ['Так',
            'Ні',], 0)
    let question9 = new Question('dragDrop', 'Встановіть відповідність',
        [], [])
    let question10 = new Question('CSS', 'Змініть колір фону екрану на світло-синій (lightblue) за допомогою CSS',
        ['color:lightblue'], [])

    let questions = [question1, question2, question3, question4,
        question5, question6, question7, question8,question9, question10];
    let questionCount = -1;
    let rating = 0;
     let name = "";
    let group = "";

    // start test
    startTestBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let formRegister = document.getElementsByClassName("form-register")[0];
        name = document.getElementById("name").value;
        group = document.getElementById("groupData").value;
        formRegister.style.display = "none";
        test.style.display = "flex";

        console.log(`${name} ${group}`);
        showQuestion(++questionCount);
    });

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        sendEmail();
        sendToTelegram();
    })

    next.addEventListener("click", (event) => {
        event.preventDefault();
        if (questionCount >= 0 && questionCount < questions.length) {
            if (questionCount === questions.length - 2) {
                saveAnswer(questions[questionCount]);
                questionCount++;
                showQuestion(questionCount);
                next.innerText = "Завершити";
            } else if (questionCount === questions.length - 1) {
                submitButton.className = "enableSendButton";
                saveAnswer(questions[questionCount]);
                resBlock.style.display = "block";
                test.style.display = "none";
                next.addEventListener("click", () => {
                    test.style.display = "none";
                })
            } else {
                saveAnswer(questions[questionCount]);
                questionCount++;
                showQuestion(questionCount);
            }
        }
        console.log("question count:" + questionCount);
    });

    function showQuestion(questionCount) {
        questionText.innerText = questions[questionCount].question;
        questionNumber.innerText = `Завдання ${questionCount + 1}`;
        getHtmlAnswers(questions[questionCount].type, questions[questionCount].answers);
    }

    function getHtmlAnswers(type, answers) {
        let html = "";

        switch (type) {
            case "radio":
                answers.forEach((answer, index) => {
                    html += `
                    <div>
                        <input type = "radio" id="answear__item${index}" name = "answer" class = "test-input-answer">
                        <label for = "answear__item${index}"  class = "label-answer">${answer}</label>
                    </div>
                 `;
                });
                break;
            case "checkbox":
                answers.forEach((answer, index) => {
                    html += `
                <div>
                    <input type="checkbox" name="answer" id="answear__item${index}" class = "test-input-answer">
                    <label for="answear__item${index}" class = "label-answer">${answer}</label>
                </div>`
                });
                break;
            case "select":
                html += `
                <select name="selectquestion" id="" class="select">`;
                answers.forEach((answer, index)=>{
                    html += `
                    <option class="test-input-answer" value="${index}" >${answer}</option>`;
                });
                html += `</select>`;

                break;
            case "dragDrop":
                    document.getElementById("test__zv6").style.display = "block";
                break;
            case "CSS":
                html += `
                    <div>
                        <input type = "text" id = "field-css" placeholder="css">
                    </div>
                `;
                break;
            default:
                console.log("Error! No question type found!")
                break;
        }
        blockAnswers.innerHTML = html;
    }

    function saveAnswer(question) {
        let inputCheck = document.querySelectorAll(".test-input-answer");
        switch (question.type) {
            case "radio":
                inputCheck.forEach((input, index) => {
                    if (input.checked) {
                        if (index === question.trueAnswerIndex) {
                            rating++;
                        }
                    }
                });
                break;

            case "checkbox":
                let arrayIndex = [];
                let mark = 0;

                inputCheck.forEach((input, index) => {
                    if (input.checked) {
                        arrayIndex.push(index);
                    }

                });
                for (let i = 0; i < arrayIndex.length; i++) {
                    for (let j = 0; j < question.trueAnswerIndex.length; j++) {
                        if (arrayIndex[i] === question.trueAnswerIndex[j]) {
                            mark++;
                        }
                        if (mark === question.trueAnswerIndex.length) {
                            rating++;
                        }
                    }

                }
                break;
            case "select":
                let select = document.querySelector('.select');
                let index = select.value;
                if(index == question.trueAnswerIndex){
                    rating++;
                }
                break;
            case "dragDrop":
                    let img1Block = document.querySelector(".zv6__boxs1 img");
                    let img2Block = document.querySelector(".zv6__boxs2 img");
                    let img3Block = document.querySelector(".zv6__boxs3 img");

                    if(img1Block.id === "drag2" && img2Block.id === "drag1" && img3Block.id === "drag3"){
                        rating++;
                    }
                    document.getElementById("test__zv6").style.display = "none";
                    break;
            case "CSS":
                    let cssField = document.getElementById("field-css");
                    let value = cssField.value;
                    console.log("entered: " + value);
                    let screen =  document.querySelector(".wrapper");
                    screen.setAttribute("style", value)
                    console.log("Web_CSS " + value);

                    if(value === question.answers[0]){ //if value(user input) corresponds to required color (as marked as answer in this question)
                        rating++;
                    }
                    console.log("color " + screen.style.background);
                break;
            default:
                console.log("Error!");
                break;
        }
        resBlock.innerHTML = `Оцінка: ${rating} / ${questions.length}`;
        console.log("rating:" + rating);
    }

    function sendEmail(){

        Email.send({
            SecureToken : "564a43a1-f324-44c7-b2aa-c4f5a7da86b0",
            To : 'webkpi21@gmail.com',
            From : "vilon84624@webonoid.com",
            Subject : "Test grade",
            Body : document.getElementById('groupData').value + " " + document.getElementById('name').value + ", Your test mark is: " + rating + " / 10 points "
        }).then(
            message => alert(message)
        );
    }

    function sendToTelegram () {
        const TOKEN = "1858844290:AAG4xVcUFcD6nNnKqz1biKvcGrhwNCsOHMk";
        const CHAT_ID = "-519873227";
        const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;

        let message = `Test grade: \n`;
        message += document.getElementById('groupData').value + " " + document.getElementById('name').value + ", Your test mark is: " + rating + " / 10 points ";

        axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        } )

    }

});
