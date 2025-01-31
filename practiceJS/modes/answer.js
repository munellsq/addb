(() => {
    document.body.style.cursor = "crosshair";
  
    if (!window.answers) {
        window.answers = [];
    }

    let answer = "";
  
    const handleMouseOver = (event) => {
      event.target.style.border = "1px dashed green";
      event.target.style.cursor = "pointer";
    };
  
    const handleMouseOut = (event) => {
      event.target.style.border = "";
    };
  
    const handleClick = (event) => {
      const selectedText = event.target.innerText || event.target.textContent;
      if (selectedText) {
        answer = selectedText;
        event.target.style.border = "";
        window.answers.push(answer);
      }
  
      document.body.style.cursor = "";
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
    };
  
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);
  })();
  