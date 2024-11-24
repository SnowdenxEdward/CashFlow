const input = document.getElementById("userInput");
const form = document.getElementById("form");
const text = document.getElementById("text");
const incomeButton = document.getElementById("incomeButton");
const expenseButton = document.getElementById("expenseButton");
const balanceButton = document.getElementById("balanceButton");
const clearButton = document.getElementById("clearButton");
const darkMode = document.querySelector("#dark");

let num = 0;

document.body.style.backgroundColor = "black";
document.body.style.color = "white";

document.body.style.fontFamily = " sans-serif";

darkMode.addEventListener("click", function () {
  if (num === 0) {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    num = 1;
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    num = 0;
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

clearButton.addEventListener("click", () => {
  localStorage.clear();
});

balanceButton.addEventListener("click", () => {
  const incomeData = JSON.parse(localStorage.getItem("income")) || [];
  const expenseData = JSON.parse(localStorage.getItem("expense")) || [];
  const totalIncome = incomeData.reduce(
    (sum, value) => sum + parseFloat(value),
    0
  );
  const totalExpense = expenseData.reduce(
    (sum, value) => sum + parseFloat(value),
    0
  );

  const balance = totalIncome - totalExpense;

  text.innerHTML = `
  <h2 style="font-family: 'Bebas Neue', sans-serif;">Balance&nbsp;Summary</h2>
  <p style="font-family: 'Poppins', sans-serif;"><strong>Total Income:</strong> ₹<span style="color: green;">${totalIncome.toFixed(2)}</span></p>
  <p style="font-family: 'Poppins', sans-serif;"><strong>Total Expense:</strong> ₹<span style="color: red;">${totalExpense.toFixed(2)}</span></p>
  <p style="font-family: 'Poppins', sans-serif;"><strong>Net Balance:</strong> ₹<span style="color: ${balance >= 0 ? 'green' : 'red'};">${balance.toFixed(2)}</span></p>
`
});

incomeButton.addEventListener("click", () => {
  const value = input.value;
  const storedValues = JSON.parse(localStorage.getItem("income")) || [];
  storedValues.push(value);
  localStorage.setItem("income", JSON.stringify(storedValues));
  input.value = '';
});

expenseButton.addEventListener("click", () => {
  const value = input.value;
  const storedValues = JSON.parse(localStorage.getItem("expense")) || [];
  storedValues.push(value);
  localStorage.setItem("expense", JSON.stringify(storedValues));
  input.value = ''; 
});
