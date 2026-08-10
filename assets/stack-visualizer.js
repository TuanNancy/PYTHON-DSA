document.querySelectorAll("[data-stack-visualizer]").forEach((visualizer) => {
  const inputTokens = visualizer.querySelector("[data-input-tokens]");
  const stackTokens = visualizer.querySelector("[data-stack-tokens]");
  const setup = visualizer.querySelector("[data-setup]");
  const current = visualizer.querySelector("[data-current]");
  const opening = visualizer.querySelector("[data-opening]");
  const push = visualizer.querySelector("[data-push]");
  const match = visualizer.querySelector("[data-match]");
  const falseResult = visualizer.querySelector("[data-false-result]");
  const finalResult = visualizer.querySelector("[data-final-result]");
  const message = visualizer.querySelector("[data-message]");
  const counter = visualizer.querySelector(".step-counter");
  const nextButton = visualizer.querySelector("[data-next]");
  const resetButton = visualizer.querySelector("[data-reset]");
  const exampleButtons = visualizer.querySelectorAll("[data-text]");
  const codeLines = visualizer.querySelectorAll("[data-code-line]");
  const pairs = {")": "(", "]": "[", "}": "{"};

  let text = "";
  let stack = [];
  let index = 0;
  let phase = "setup";
  let finished = false;

  function highlight(lineNumber) {
    codeLines.forEach((line) => {
      line.classList.toggle("active", line.dataset.codeLine === String(lineNumber));
    });
  }

  function render() {
    inputTokens.replaceChildren();
    [...text].forEach((char, charIndex) => {
      const token = document.createElement("span");
      let state = "";
      if (charIndex < index) state = "processed";
      if (!finished && charIndex === index) state = "current";
      token.className = `token ${state}`.trim();
      token.innerHTML = `<small>${charIndex}</small>${char}`;
      inputTokens.append(token);
    });

    stackTokens.replaceChildren();
    if (stack.length === 0) {
      const empty = document.createElement("span");
      empty.className = "empty-set";
      empty.textContent = "stack rỗng";
      stackTokens.append(empty);
      return;
    }

    [...stack].reverse().forEach((char, reverseIndex) => {
      const token = document.createElement("span");
      token.className = `stack-token ${reverseIndex === 0 ? "top" : ""}`.trim();
      token.textContent = char;
      stackTokens.append(token);
    });
  }

  function reset(nextText) {
    text = nextText;
    stack = [];
    index = 0;
    phase = "setup";
    finished = false;
    setup.textContent = "chưa chạy";
    current.textContent = "chưa bắt đầu";
    opening.textContent = "chưa kiểm tra";
    push.textContent = "chưa thực hiện";
    match.textContent = "chưa kiểm tra";
    falseResult.textContent = "chưa thực hiện";
    finalResult.textContent = "chưa thực hiện";
    message.textContent = "Nhấn “Dòng tiếp theo” để tạo stack rỗng.";
    counter.textContent = `Ký tự 0 / ${text.length}`;
    nextButton.disabled = false;
    nextButton.textContent = "Dòng tiếp theo →";
    highlight(0);
    render();
  }

  function runSetup() {
    highlight(1);
    setup.textContent = "stack = []";
    message.innerHTML = "Dòng 1 tạo một stack rỗng để lưu các ngoặc mở.";
    phase = "loop";
    render();
  }

  function runLoop() {
    if (index >= text.length) {
      phase = "final";
      runFinal();
      return;
    }

    highlight(2);
    current.textContent = `char = "${text[index]}"`;
    opening.textContent = "chưa kiểm tra ký tự này";
    push.textContent = "chưa thực hiện";
    match.textContent = "chưa kiểm tra ký tự này";
    counter.textContent = `Ký tự ${index + 1} / ${text.length}`;
    message.innerHTML = `Dòng 2 lấy ký tự <code>${text[index]}</code> tại index <code>${index}</code>.`;
    phase = "opening";
    render();
  }

  function runOpeningCheck() {
    const isOpening = "([{".includes(text[index]);
    highlight(3);
    opening.textContent = isOpening ? "True" : "False";
    message.innerHTML = isOpening
      ? `Dòng 3 xác định <code>${text[index]}</code> là ngoặc mở.`
      : `Dòng 3 xác định <code>${text[index]}</code> là ngoặc đóng.`;
    phase = isOpening ? "push" : "match";
  }

  function runPush() {
    const char = text[index];
    stack.push(char);
    highlight(4);
    push.textContent = `push "${char}"`;
    message.innerHTML = `Dòng 4 đặt <code>${char}</code> lên đỉnh stack.`;
    render();
    index += 1;
    phase = "loop";
  }

  function runMatch() {
    const char = text[index];
    const expected = pairs[char];
    const top = stack.length ? stack.pop() : undefined;
    const valid = top === expected;
    highlight(5);
    match.textContent = valid
      ? `pop "${top}" = "${expected}" → khớp`
      : `${top === undefined ? "stack rỗng" : `pop "${top}"`} ≠ "${expected}"`;
    message.innerHTML = valid
      ? `Dòng 5 pop <code>${top}</code>; nó khớp với ngoặc đóng <code>${char}</code>.`
      : `Dòng 5 phát hiện ngoặc đóng <code>${char}</code> không có ngoặc mở phù hợp.`;
    render();
    phase = valid ? "loop" : "return-false";
    if (valid) index += 1;
  }

  function runReturnFalse() {
    highlight(6);
    falseResult.textContent = "return False";
    message.innerHTML = "Dòng 6 kết thúc hàm ngay vì cặp ngoặc không hợp lệ.";
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Kết quả: False";
    render();
  }

  function runFinal() {
    const valid = stack.length === 0;
    highlight(7);
    finalResult.textContent = `return ${valid ? "True" : "False"}`;
    message.innerHTML = valid
      ? "Dòng 7 thấy stack rỗng: mọi ngoặc mở đều đã được đóng, trả về <strong>True</strong>."
      : "Dòng 7 thấy stack chưa rỗng: vẫn còn ngoặc mở chưa được đóng, trả về <strong>False</strong>.";
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = `Kết quả: ${valid ? "True" : "False"}`;
    render();
  }

  function advance() {
    if (finished) return;
    if (phase === "setup") runSetup();
    else if (phase === "loop") runLoop();
    else if (phase === "opening") runOpeningCheck();
    else if (phase === "push") runPush();
    else if (phase === "match") runMatch();
    else if (phase === "return-false") runReturnFalse();
    else if (phase === "final") runFinal();
  }

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      exampleButtons.forEach((candidate) => candidate.classList.remove("active"));
      button.classList.add("active");
      reset(button.dataset.text);
    });
  });

  nextButton.addEventListener("click", advance);
  resetButton.addEventListener("click", () => {
    reset(visualizer.querySelector("[data-text].active").dataset.text);
  });

  reset(visualizer.querySelector("[data-text].active").dataset.text);
});
