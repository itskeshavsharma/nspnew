let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedSubject = null;

// Sample questions for DSA
const dsaQuestions = [
    { question: "What is a linked list?", options: ["A collection of elements", "A sequence of nodes", "A type of array", "A tree structure"], answer: "A sequence of nodes" },
    { question: "Which of the following is a greedy algorithm?", options: ["Dijkstra's Algorithm", "Merge Sort", "Quick Sort", "Heap Sort"], answer: "Dijkstra's Algorithm" },
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], answer: "O(log n)" },
    { question: "Which data structure uses the FIFO principle?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
    { question: "What is the best case time complexity of Merge Sort?", options: ["O(n)", "O(n log n)", "O(log n)", "O(n^2)"], answer: "O(n log n)" },
    { question: "In a graph, a vertex with no incoming edges is called?", options: ["Leaf", "Root", "Isolated Vertex", "Sink"], answer: "Root" },
    { question: "Which of the following is a self-balancing binary search tree?", options: ["Binary Search Tree", "AVL Tree", "B-Tree", "Red-Black Tree"], answer: "AVL Tree" },
    { question: "What is a spanning tree?", options: ["A tree with maximum edges", "A subgraph that includes all vertices", "A graph with cycles", "A tree with height 0"], answer: "A subgraph that includes all vertices" },
    { question: "Which sorting algorithm has the best average-case performance?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"], answer: "Merge Sort" },
    { question: "In dynamic programming, overlapping subproblems refer to?", options: ["Subproblems being reused", "Subproblems that are recursive", "Independent subproblems", "Greedy selection of subproblems"], answer: "Subproblems being reused" }
];

// Sample questions for OOPs
const oopsQuestions = [
    { question: "What is polymorphism in OOP?", options: ["Ability to take many forms", "Encapsulation", "Inheritance", "Method Overloading"], answer: "Ability to take many forms" },
    { question: "Which concept refers to the bundling of data and methods?", options: ["Polymorphism", "Abstraction", "Encapsulation", "Inheritance"], answer: "Encapsulation" },
    { question: "Which keyword is used to inherit a class in Java?", options: ["extend", "implements", "inherit", "class"], answer: "extend" },
    { question: "What is an abstract class?", options: ["A class without methods", "A class without an object", "A class with only method declarations", "A class with private fields"], answer: "A class with only method declarations" },
    { question: "Which of the following supports multiple inheritance?", options: ["Java", "Python", "C#", "JavaScript"], answer: "Python" },
    { question: "Which principle allows a child class to inherit from a parent class?", options: ["Polymorphism", "Encapsulation", "Abstraction", "Inheritance"], answer: "Inheritance" },
    { question: "What does 'this' keyword refer to?", options: ["Global object", "Current object", "Parent class", "Constructor"], answer: "Current object" },
    { question: "What is method overriding?", options: ["Same method name with different parameters", "Same method in parent and child class", "Same method in different classes", "Static method of the class"], answer: "Same method in parent and child class" },
    { question: "Which OOP principle focuses on hiding complexity?", options: ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"], answer: "Abstraction" },
    { question: "What is the result of accessing a private member outside a class?", options: ["Syntax Error", "Runtime Error", "Compilation Error", "No Error"], answer: "Compilation Error" }
];

function goToLogin() {
    document.getElementById('welcome').classList.remove('active');
    document.getElementById('login').classList.add('active');
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        document.getElementById("login").classList.remove("active");
        document.getElementById("subject-selection").classList.add("active");
        document.getElementById("login-error").classList.add("hidden");
    } else {
        document.getElementById("login-error").classList.remove("hidden");
        document.getElementById("login-error").textContent = "Please enter both email and password.";
    }
}

function startQuiz() {
    selectedSubject = document.getElementById("subject").value;

    if (selectedSubject) {
        fetchQuestions(selectedSubject);
        document.getElementById("subject-selection").classList.remove("active");
        document.getElementById("quiz").classList.add("active");
        displayQuestion();
    }
}

function fetchQuestions(subject) {
    if (subject === "dsa") {
        questions = dsaQuestions;
    } else if (subject === "oops") {
        questions = oopsQuestions;
    }
    currentQuestionIndex = 0;  // Reset question index at the start of the quiz
    score = 0;  // Reset score
}

function displayQuestion() {
    const questionObj = questions[currentQuestionIndex];
    const questionContainer = document.getElementById("question-container");

    questionContainer.innerHTML = `
        <h3>${questionObj.question}</h3>
        <div class="options">
            ${questionObj.options.map((option, index) => `
                <button class="option" onclick="selectAnswer('${option}')">${index + 1}. ${option}</button>
            `).join('')}
        </div>
    `;

    // Show or hide Previous button based on question index
    document.getElementById("prev-btn").style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
}

function selectAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    nextQuestion();  // Automatically move to next question
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function showResults() {
    document.getElementById("quiz").classList.remove("active");
    document.getElementById("result").classList.add("active");
    document.getElementById("score").innerHTML = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    document.getElementById("result").classList.remove("active");
    document.getElementById("subject-selection").classList.add("active");
    currentQuestionIndex = 0;
    score = 0;
}



function toggleTheme() {
    document.body.classList.toggle('dark'); // Change to "dark" class

    const themeSwitcher = document.querySelector('.theme-switcher i');
    if (document.body.classList.contains('dark')) {
        themeSwitcher.classList.remove('fa-moon');
        themeSwitcher.classList.add('fa-sun');
    } else {
        themeSwitcher.classList.remove('fa-sun');
        themeSwitcher.classList.add('fa-moon');
    }
}
