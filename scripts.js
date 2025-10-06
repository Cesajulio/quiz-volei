// Array de objetos para as perguntas do quiz
const questions = [
    {
        question: "Quantas temporadas tem a superliga contando com a temporada 25/26?",
        answers: [
            { text: "50", correct: false },
            { text: "32", correct: true },
            { text: "25", correct: false },
            { text: "30", correct: false },
        ]
    },
    {
        question: "Qual o maior campeão da superliga Feminina?",
        answers: [
            { text: "Osasco", correct: false },
            { text: "Minas", correct: false },
            { text: "Sesc-RJ-Flamengo", correct: true },
            { text: "Praia", correct: false },
        ]
    },
    {
        question: "Quais são os maiores campeões da Copa Brasil Feminina?",
        answers: [
            { text: "Osasco e Minas", correct: false },
            { text: "Minas e Praia", correct: false },
            { text: "Sesi e Praia", correct: false },
            { text: "Osasco e Sesc-RJ", correct: true },
        ]
    },
    {
        question: "Quem foi o primeiro campeão da superliga feminina em 1994/1995?",
        answers: [
            { text: "Minas", correct: false },
            { text: "Osasco", correct: false },
            { text: "Sorocaba", correct: true },
            { text: "Sesc-Rj-Flamengo", correct: false },
        ]
    },
    {
        question: "Que time participou de todas as edições da superliga A feminina?",
        answers: [
            { text: "Minas", correct: true },
            { text: "Osasco", correct: false },
            { text: "Sesc-Rj-Flamengo", correct: false },
            { text: "Praia", correct: false },
        ]
    },
    {
        question: "qual temporada da superliga feminina foi paralisada e não teve um campeão?",
        answers: [
            { text: "2019/2020", correct: true },
            { text: "2020/2021", correct: false },
            { text: "2021/2022", correct: false },
            { text: "2018/2019", correct: false },
        ]
    },
    {
        question: "Qual time com o maior jejum de superliga feminina?",
        answers: [
            { text: "Minas", correct: true },
            { text: "São Caetano", correct: false },
            { text: "Praia", correct: false },
            { text: "Sesc-RJ-Flamengo", correct: false },
        ]
    },
    {
        question: "qual era o nome da competição nacional de clubes de vôlei feminino antes da superliga?",
        answers: [
            { text: "Campeonato Brasileiro", correct: false },
            { text: "Copa Brasil", correct: false },
            { text: "Taça Brasil", correct: false },
            { text: "Liga Nacional", correct: true },
        ]
    },
    {
        question: "Qual a jogadora que ganhou mais vezes o prêmio de melhor jogadora da superliga feminina?",
        answers: [
            { text: "Sheilla Castro", correct: false },
            { text: "Hélia Souza-Fofão", correct: false },
            { text: "Fernanda Venturini", correct: true },
            { text: "Kisy Nascimento", correct: false },
        ]
    },
    {
        question: "Quem é o atual Campeão da superliga feminina (2023/2024)?",
        answers: [
            { text: "Minas", correct: false },
            { text: "Praia Clube", correct: false },
            { text: "Sesi Bauru", correct: false },
            { text: "Osasco", correct: true },
        ]
    },
];

const teamSelectionContainer = document.getElementById("team-selection-container");
const quizAreaContainer = document.getElementById("quiz-area-container");
const teamButtons = document.getElementById("team-buttons");
const teamButtonsArray = Array.from(teamButtons.children);

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const resultArea = document.getElementById("Result-area");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-button");

let currentQuestionIndex = 0;
let score = 0;
let selectedTeam = "";

let teamScores = {};

// Função para iniciar o quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    
    const savedScores = localStorage.getItem('teamScores');
    if (savedScores) {
        teamScores = JSON.parse(savedScores);
    }
    
    nextButton.innerHTML = "Próxima";
    resultArea.classList.add("hide");
    quizAreaContainer.classList.remove("hide");
    nextButton.classList.remove("hide");
    showQuestion();
}

// Função para exibir a próxima pergunta
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });
}

// Função para resetar o estado dos botões e da tela
function resetState() {
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Função para verificar a resposta do usuário
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.classList.remove("hide");
}

// Função para avançar para a próxima pergunta ou encerrar o quiz
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        handleQuizEnd();
    }
}

// Função para lidar com o fim do quiz e salvar os dados
function handleQuizEnd() {
    if (!teamScores[selectedTeam]) {
        teamScores[selectedTeam] = [];
    }
    teamScores[selectedTeam].push(score);
    
    localStorage.setItem('teamScores', JSON.stringify(teamScores));
    
    window.location.href = "ranking.html";
}

// Função para lidar com a seleção de time
function selectTeam(e) {
    selectedTeam = e.target.dataset.team;
    console.log(`Torcedor do(a) ${selectedTeam} iniciou o quiz.`);
    
    teamSelectionContainer.classList.add("hide");
    startQuiz();
}

// Adiciona os event listeners aos botões
teamButtonsArray.forEach(button => {
    button.addEventListener("click", selectTeam);
});

nextButton.addEventListener("click", handleNextButton);

// O botão de reiniciar não está mais aqui, ele está na página de ranking