function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;

    }
    this.questionIndex++;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

let question = [
    new Question("Who owns Android", ["Google", "Kotlin", "Meta", "Android inc"], "Google"),
    new Question("Preferred language for android app development is ", ["Java", "Dart", "Kotlin", " React"], "Kotlin"),
    new Question("Android S stands for", ["Snowcone", "Stawberry", "Slime", "Sweet"], "Snowcone"),
];

var quiz = new Quiz(question);
function loadQuestions() {

    if (quiz.isEnded()) {
        var quizElement = document.getElementById("quiz")
        quizElement.style.display = "none"
        var quizEndElement = document.getElementById("quiz-end")
        quizEndElement.style.display = "block"

        var result = document.getElementById("result")
        result.innerHTML = "Your Scores:  " + quiz.score + " And Percentage is: " + (quiz.score / question.length * 100) + "%";
    } else {
        var element = document.getElementById("question")
        element.innerHTML = quiz.getQuestionByIndex().text;
        var choices = quiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var ele = document.getElementById("choice" + i);
            ele.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i])
        }
        showProgress();
        var quizElement = document.getElementById("quiz")
        quizElement.style.display = "block"
        var quizEndElement = document.getElementById("quiz-end")
        quizEndElement.style.display = "none"
    }



}

document.getElementById("playAgain").onclick = function () {
    quiz.questionIndex = 0;
    loadQuestions();
}

function handleOptionButton(id, choices) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choices);
        console.log("is quiz eneded " + quiz.isEnded);


        loadQuestions();
    }

}

loadQuestions();

function showProgress() {
    var currentQuestionIndex = quiz.questionIndex + 1;
    var elem = document.getElementById("progress");
    elem.innerText = "Question " + currentQuestionIndex + " of " + quiz.questions.length;
}