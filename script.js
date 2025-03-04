// text to speech 
function Convert_Speech() {
    let text = document.getElementById("textarea_part").value.trim();
    let languageSelect = document.getElementById("language_select");
    let language = languageSelect ? languageSelect.value : "english"; // Default to English if not found
    let voiceGenderElement = document.querySelector('input[name="voice_gender"]:checked');
    let voiceGender = voiceGenderElement ? voiceGenderElement.value : "male"; // Default to male

    if (text.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    let speech = new SpeechSynthesisUtterance();

    if (language == "hindi" || (language == "english" && voiceGender == "female")) {
        selectedVoice = "hi-IN";
    } else {
        selectedVoice = "en-US";
    }

    speech.text = text;
    speech.rate = 1; // Adjust the speed
    speech.pitch = 1; // Adjust the pitch
    speech.volume = 1; // Adjust the volume
    speech.lang = selectedVoice; // Language setting

    window.speechSynthesis.speak(speech);

}



// speech to text
function Convert_text() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Get final results only
    recognition.maxAlternatives = 1;

    recognition.start(); // Start voice recognition

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript; // Get the transcribed text
        document.getElementById("textarea_part").value = transcript; // Set text in textarea
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
        alert("Error occurred: " + event.error);
    };
}


// reset 
document.getElementById("restart").addEventListener("click", function () {
    document.getElementById("textarea_part").value = "";
    window.speechSynthesis.cancel(); // Stop any ongoing speech
});
