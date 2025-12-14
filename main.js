import './style.css'

// ================================
// 1. SELECT REQUIRED ELEMENTS
// ================================

// Parent wrapper that contains all calculator keys
const keyWrapper = document.querySelector(".key_wrapper");

// Small display (expression / typed values)
const valuesInput = document.querySelector("#values");

// Big display (final result)
const resultInput = document.querySelector("#result");

// List of operators
const operators = ["+", "-", "x", "/"];

// ================================
// 2. CORE FUNCTION TO PROCESS VALUES
// ================================

function handleInput(value) {
  const lastChar = valuesInput.value.slice(-1); // last character of current expression

  // CLEAR ALL
  if (value === "C") {
    valuesInput.value = "";
    resultInput.value = "";
    return;
  }

  // BACKSPACE / undo
  if (value === "del" || value === "Backspace") {
    valuesInput.value = valuesInput.value.slice(0, -1);
    return;
  }

  // CALCULATE
  if (value === "=" || value === "Enter") {
    try {
      const expression = valuesInput.value.replace(/x/g, "*");
      resultInput.value = eval(expression);
    } catch {
      resultInput.value = "Error";
    }
    return;
  }

  // If value is operator
  if (operators.includes(value)) {
    if (valuesInput.value === "") return; // prevent operator at start
    if (operators.includes(lastChar)) {
      // replace last operator with new one
      valuesInput.value = valuesInput.value.slice(0, -1) + value;
    } else {
      valuesInput.value += value;
    }
    return;
  }

  // Default: append numbers or dot
  valuesInput.value += value;
}

// ================================
// 3. CLICK EVENT LISTENER
// ================================

keyWrapper.addEventListener("click", function (event) {
  const key = event.target.closest(".keys");
  if (!key) return;

  const button = key.querySelector("button");
  const value = button.textContent;

  handleInput(value);
});

// ================================
// 4. KEYBOARD SUPPORT
// ================================

document.addEventListener("keydown", function (event) {
  let key = event.key;

  // Map keyboard operators to calculator display
  if (key === "*") key = "x";

  handleInput(key);
});
