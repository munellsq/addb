(() => {
  const question = prompt("Твой вопрос для Gemini 1.5 Flash?");

  if (!question) {
      alert("Вопрос не задан!");
      return;
  }

  const API_KEY = "AIzaSyAOh_RXNQCv2bR-nH2iEsM0bcjzBy8jdHo"; // Ваш API ключ для Gemini
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const body = {
      contents: [
          {
              parts: [
                  {
                      text: question // Вопрос пользователя
                  }
              ]
          }
      ],
      generationConfig: {
          temperature: 0.7 // Настройка температуры для креативности
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
          throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      // Извлечение текста ответа из структуры ответа Gemini
      const responseText = data.candidates[0].content.parts[0].text;
      alert(responseText); // Показ ответа в alert
  })
  .catch(error => {
      alert("Ошибка при запросе к Gemini 1.5 Flash :(");
      console.error(error);
  });
})();