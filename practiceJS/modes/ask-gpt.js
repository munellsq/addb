(() => {
  const question = prompt("Your question for Gemini 1.5 Flash?");

  if (!question) {
      alert("No question provided!");
      return;
  }

  const API_KEY = "AIzaSyAOh_RXNQCv2bR-nH2iEsM0bcjzBy8jdHo"; // Your Gemini API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const body = {
      contents: [
          {
              parts: [
                  {
                      text: question // The user's question
                  }
              ]
          }
      ],
      generationConfig: {
          temperature: 0.7 // Adjust temperature for creativity
      }
  };

  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      // Extract the response text from Gemini's response structure
      const responseText = data.candidates[0].content.parts[0].text;
      alert(responseText); // Display the response in an alert
  })
  .catch(error => {
      alert("Error fetching response from Gemini 1.5 Flash :(");
      console.error(error);
  });
})();
  