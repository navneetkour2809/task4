
let cartItems = [];

function addToCart(productName) {
    cartItems.push(productName);
    displayCart();
}

function displayCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartList.appendChild(li);
    });
}

// Contact Form Validation Script
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Stop default submit

  // Collect form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate fields
  if (!name || !email || !subject || !message) {
      showError('All fields are required.');
      return;
  }

  // Validate email
  if (!validateEmail(email)) {
      showError('Please enter a valid email address.');
      return;
  }

  // If everything is OK
  showSuccess('Thank you! Your message has been sent.');
  this.reset(); // Reset form
});

// Helper function to validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.innerText = message;
  const form = document.getElementById('contactForm');
  clearMessages();
  form.prepend(errorDiv);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'form-success';
  successDiv.innerText = message;
  const form = document.getElementById('contactForm');
  clearMessages();
  form.prepend(successDiv);
}

// Clear previous messages
function clearMessages() {
  const errors = document.querySelectorAll('.form-error, .form-success');
  errors.forEach(error => error.remove());
}

// Select the elements
const todoInput = document.getElementById('todoInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');

// Function to create a new task
function createTask(taskText) {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const completeBtn = document.createElement('button');

    // Set text content and class for buttons
    li.textContent = taskText;
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');

    // Append the buttons to the list item
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // Add functionality for completing a task
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Add functionality for deleting a task
    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(li);
    });

    // Append the task to the list
    todoList.appendChild(li);
}

// Add task on button click
addTaskBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTask(taskText);
    todoInput.value = ''; // Clear the input field
});

// Optional: Allow pressing "Enter" to add task
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
      correct: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"],
      correct: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const submitBtn = document.getElementById("submit");
  const resultEl = document.getElementById("result");
  
  function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";
    current.options.forEach((option, index) => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.textContent = option;
      btn.onclick = () => selectOption(index);
      optionsEl.appendChild(btn);
    });
  }
  
  let selectedOption = null;
  
  function selectOption(index) {
    selectedOption = index;
    document.querySelectorAll('.option').forEach((el, i) => {
      el.style.backgroundColor = i === index ? '#cce5ff' : '#eee';
    });
  }
  
  submitBtn.addEventListener("click", () => {
    if (selectedOption === null) {
      alert("Please select an answer.");
      return;
    }
  
    if (selectedOption === quizData[currentQuestion].correct) {
      score++;
    }
  
    currentQuestion++;
    selectedOption = null;
  
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      quizOver();
    }
  });
  
  function quizOver() {
    document.getElementById("quiz").innerHTML = `<h2>You scored ${score} out of ${quizData.length}</h2>`;
  }
  
  loadQuestion();
  document.getElementById('get-joke').addEventListener('click', getJoke);

function getJoke() {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json())
    .then(data => {
      document.getElementById('setup').textContent = data.setup;
      const punchlineEl = document.getElementById('punchline');
      punchlineEl.textContent = data.punchline;
      punchlineEl.classList.remove('hidden');
    })
    .catch(error => {
      document.getElementById('setup').textContent = 'Oops! Something went wrong.';
      document.getElementById('punchline').classList.add('hidden');
      console.error('Error fetching joke:', error);
    });
}
function sortProductsByPrice() {
  const grid = document.getElementById("products-grid");
  const cards = Array.from(grid.getElementsByClassName("product-card"));

  cards.sort((a, b) => {
      return parseFloat(a.getAttribute("data-price")) - parseFloat(b.getAttribute("data-price"));
  });

  // Clear and re-add sorted cards
  grid.innerHTML = '';
  cards.forEach(card => grid.appendChild(card));
}
