const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

let transactions = [];

//user-icon functionality

function toggleDropdown() {
  document.getElementById('dropdown').classList.toggle('show');
}

window.onclick = function(event) {
  if (!event.target.matches('.user-icon')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Logout functionality
function logout() {
  // Redirect to login.html
  window.location.href = 'login.html';
}

document.getElementById('logout').addEventListener('click', logout);


// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '' || category.value === '' || category.value === 'Select') {
    alert('Please enter all the fields');
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
    category: category.value,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  transactions.push(transaction);
  addTransactionToHistory(transaction);
  updateValues();

  // Clear input fields after submission
  text.value = '';
  amount.value = '';
  category.value = 'Select'; 
  document.getElementById('text').value = ''; 
}

form.addEventListener('submit', addTransaction);

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to history DOM
function addTransactionToHistory(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}&#8377;${Math.abs(transaction.amount)}</span>
    <span>(${transaction.category})</span>
    <span>${transaction.date}, ${transaction.time}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Update balance, income, and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `₹${total}`;
  money_plus.innerText = `+₹${income}`;
  money_minus.innerText = `-₹${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init();
}

// Initialize app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionToHistory);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);

