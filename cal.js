let display = document.getElementById("display");
let output = document.getElementById("output");
let expression = "";

// Numbers
document.querySelectorAll(".num").forEach(btn => {
     btn.addEventListener("click", () => {
          expression += btn.innerText;
          display.value = expression;
     });
});

// Operators
document.querySelectorAll(".op").forEach(btn => {
     btn.addEventListener("click", () => {
          expression += btn.innerText;
          display.value = expression;
     });
});

// Enter
document.getElementById("enter").addEventListener("click", () => {
     try {
          let result = Function("return " + expression)();
          output.innerText = "Output: " + result;
     } catch {
          output.innerText = "Error: Invalid expression";
          expression = "";
          display.value = "";
     }
});

// Clear
document.getElementById("clear").addEventListener("click", () => {
     expression = "";
     display.value = "";
     output.innerText = "";
});