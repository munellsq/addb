(() => {
  const API_KEY = "AIzaSyD0sn2tQujelt19MXzGGQDSSMZicGjObdg"; // Your Gemini API key
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  if (!window.answers) {
    window.answers = [];
  }

  if (!window.question) {
    window.question = "";
  }

  const prompt = `Question: ${window.question}\nAnswers: [${window.answers.join(
    ", "
  )}]\n\nChoose the correct answer and reply with only the answer. Example: If the question is "2+5?" and the answers are [1, 3, 5, 7], reply with "7".`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt, // The user's question and answers
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
      alert(responseText); // Display the response in an alert
    })
    .catch((error) => {
      alert("Error fetching response from Gemini 1.5 Flash :(");
      console.error(error);
    });
})();