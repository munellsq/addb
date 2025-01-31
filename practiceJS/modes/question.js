(() => {
  const API_KEY = "AIzaSyAOh_RXNQCv2bR-nH2iEsM0bcjzBy8jdHo"; // Your Gemini API key
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  document.body.style.cursor = "crosshair";

  if (window.answers) {
    window.answers = [];
  }

  if (!window.question) {
    window.question = "";
  }

  let question = "";

  const handleMouseOver = (event) => {
    event.target.style.border = "1px dashed red";
    event.target.style.cursor = "pointer";
  };

  const handleMouseOut = (event) => {
    event.target.style.border = "";
  };

  const handleClick = (event) => {
    const selectedText = event.target.innerText || event.target.textContent;
    if (selectedText) {
      question = selectedText;
      event.target.style.border = "";
      window.question = question;

      // Send the selected question to Gemini 1.5 Flash
      fetchGemini(question);
    }

    document.body.style.cursor = "";
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
    document.removeEventListener("click", handleClick);
  };

  const fetchGemini = (prompt) => {
    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt, // The selected question
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7, // Adjust temperature for creativity
      },
    };

    fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Extract the response text from Gemini's response structure
        const responseText = data.candidates[0].content.parts[0].text;
        alert(`Gemini 1.5 Flash Response: ${responseText}`); // Display the response in an alert
      })
      .catch((error) => {
        alert("Error fetching response from Gemini 1.5 Flash :(");
        console.error(error);
      });
  };

  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);
  document.addEventListener("click", handleClick);
})();