const display = document.getElementById("display");
const buttons = document.querySelectorAll("#keys button");
const operators = ["+", "-", "*", "/"];

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (button.id === "clear") {
      clearDisplay();
      return;
    }

    if (button.id === "equals") {
      calculate();
      return;
    }

    appendValue(value);
  });
});

function appendValue(value) {
  const lastChar = display.value.slice(-1);

  if (operators.includes(value) && operators.includes(lastChar)) return;

  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = Function(`"use strict"; return (${display.value})`)();
  } catch {
    display.value = "Error";
  }
}
