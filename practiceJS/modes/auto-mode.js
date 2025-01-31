(() => {
  const API_KEY = "AIzaSyAOh_RXNQCv2bR-nH2iEsM0bcjzBy8jdHo"; // Your Gemini API key
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const load = () => {
    document.body.style.cursor = "crosshair";
    registerListeners();
  };

  const unload = () => {
    document.body.style.cursor = "";
    unregisterListeners();
  };

  /* Listeners */
  const registerListeners = () => {
    document.addEventListener("mouseover", mouseOver);
    document.addEventListener("mouseout", mouseOut);
    document.addEventListener("click", mouseClick);
  };

  const unregisterListeners = () => {
    document.removeEventListener("mouseover", mouseOver);
    document.removeEventListener("mouseout", mouseOut);
    document.removeEventListener("click", mouseClick);
  };

  /* Events */
  const mouseOver = (event) => {
    event.target.style.border = "1px dashed gray";
    event.target.style.cursor = "pointer";
  };

  const mouseOut = (event) => {
    event.target.style.border = "";
  };

  const mouseClick = (event) => {
    handleClick(event);
  };

  /* Notification */
  const showNotification = (text) => {
    document.body.style.position = "relative";

    // Notification
    const notification = document.createElement("div");
    notification.innerText = text;
    notification.style.position = "fixed";
    notification.style.bottom = "12px";
    notification.style.right = "12px";
    notification.style.backgroundColor = "rgb(0, 0, 0, 0.05)";
    notification.style.padding = "12px";
    notification.style.color = "rgb(0, 0, 0, 0.5)";
    notification.style.borderRadius = "12px";
    notification.style.maxWidth = "250px";
    notification.style.maxHeight = "150px";
    notification.style.overflowY = "scroll";

    notification.onclick = () => {
      document.body.removeChild(notification);
    };

    document.body.appendChild(notification);

    // Progress bar
    const progress = document.createElement("div");
    progress.style.position = "absolute";
    progress.style.bottom = "0";
    progress.style.left = "0";
    progress.style.width = "0%";
    progress.style.height = "5px";
    progress.style.backgroundColor = "black";
    progress.style.opacity = "0.1";
    progress.style.transition = "width 3s linear";

    notification.appendChild(progress);

    setTimeout(() => {
      progress.style.width = "100%";
    }, 10);

    setTimeout(() => {
      document.body.removeChild(notification);
      document.body.removeChild(progress);
    }, 3000);
  };

  /* Other Functions */
  const handleClick = (event) => {
    const questionType = getType(event);
    unload();

    if (questionType === "ABC") {
      abcType(event);
    } else {
      chooseType(event);
    }
  };

  const getType = (event) => {
    const selectedElement = event.target;
    event.target.style.border = "";

    if (selectedElement) {
      const question = selectedElement.innerText.trim();
      window.question = question;

      const parentFormulation = selectedElement.closest(".formulation");
      const answer = parentFormulation.querySelector(".answer");

      if (answer.tagName === "DIV") {
        return "ABC";
      } else if (answer.tagName === "TABLE") {
        return "CHOOSE";
      }
    }

    return "ABC";
  };

  const abcType = (event) => {
    const parseQuestion = (event) => {
      const selectedElement = event.target;
      event.target.style.border = "";

      let question = "";
      let answers = [];

      if (selectedElement) {
        question = selectedElement.innerText.trim();
        const parentFormulation = selectedElement.closest(".formulation");

        if (parentFormulation) {
          answers = Array.from(parentFormulation.querySelectorAll(".answer")).map((answer) =>
            answer.innerText.trim()
          );
        }
      }

      return {
        question: question,
        answers: answers,
      };
    };

    const data = parseQuestion(event);

    const prompt = `Question: ${data.question}\nAnswers: [${data.answers.join(", ")}]\n\nChoose the correct answer and reply with only the answer. Example: If the question is "2+5?" and the answers are [1, 3, 5, 7], reply with "7".`;

    fetchGemini(prompt);
  };

  const chooseType = (event) => {
    const parseQuestion = (event) => {
      const selectedElement = event.target;
      event.target.style.border = "";

      let questions = [];

      if (selectedElement) {
        const formulation = selectedElement.closest(".formulation");

        Array.from(formulation.querySelectorAll(".r0, .r1")).map((r) => {
          const question = r.querySelectorAll(".text")[0].innerText;
          const answers = Array.from(formulation.querySelector(".select").children).map((answer) =>
            answer.innerText.trim()
          );

          questions.push({
            question: question,
            answers: answers,
          });
        });
      }

      return questions;
    };

    const data = parseQuestion(event);
    let prompt = "";

    data.forEach((d, index) => {
      prompt += `Question ${index + 1}: ${d.question}\nAnswers: [${d.answers.join(", ")}]\n\n`;
    });

    prompt +=
      "Choose the correct answer for each question and reply in the format:\n1. Answer\n2. Answer\n3. Answer";

    fetchGemini(prompt);
  };

  const fetchGemini = (prompt) => {
    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
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
        const responseText = data.candidates[0].content.parts[0].text;
        showNotification(responseText);
      })
      .catch((error) => {
        alert("Error fetching response from Gemini 1.5 Flash :(");
        console.error(error);
      });
  };

  load();
})();