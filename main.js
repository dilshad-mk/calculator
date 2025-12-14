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


// ================================
// 2. EVENT LISTENER (EVENT DELEGATION)
// ================================

keyWrapper.addEventListener("click", function (event) {

  // Find the closest .keys div (works for div or button click)
  const key = event.target.closest(".keys");

  // If clicked outside any key, stop
  if (!key) return;

  // Get the button inside the key
  const button = key.querySelector("button");

  // Read the button text (7, +, C, =, etc.)
  const value = button.textContent;


  // ================================
  // 3. HANDLE CLEAR (C)
  // ================================

  if (value === "C") {
    valuesInput.value = "";   // clear expression
    resultInput.value = "";   // clear result
    return;                   // stop further execution
  }


  // ================================
  // 4. HANDLE BACKSPACE (+/-)
  // ================================

  if (value === "del") {
    // Remove the last character from values
    valuesInput.value = valuesInput.value.slice(0, -1);
    return;
  }


  // ================================
  // 5. HANDLE EQUAL (=)
  // ================================

  if (value === "=") {
    try {
      // Replace 'x' with '*' for JS calculation
      const expression = valuesInput.value.replace(/x/g, "*");

      // Evaluate expression and show result
      resultInput.value = eval(expression);
    } catch (error) {
      resultInput.value = "Error";
    }
    return;
  }


  // ================================
  // 6. DEFAULT ACTION (APPEND VALUE)
  // ================================

  valuesInput.value = valuesInput.value + value;
});
