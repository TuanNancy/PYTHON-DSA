document.querySelectorAll("[data-set-visualizer]").forEach((visualizer) => {
  const inputTokens = visualizer.querySelector("[data-input-tokens]");
  const seenTokens = visualizer.querySelector("[data-seen-tokens]");
  const currentWord = visualizer.querySelector("[data-current-word]");
  const membership = visualizer.querySelector("[data-membership]");
  const action = visualizer.querySelector("[data-action]");
  const message = visualizer.querySelector("[data-message]");
  const counter = visualizer.querySelector(".step-counter");
  const nextButton = visualizer.querySelector("[data-next]");
  const resetButton = visualizer.querySelector("[data-reset]");
  const exampleButtons = visualizer.querySelectorAll("[data-values]");

  let words = [];
  let seen = new Set();
  let index = 0;
  let finished = false;

  function token(value, className = "") {
    const element = document.createElement("span");
    element.className = `token ${className}`.trim();
    element.textContent = value;
    return element;
  }

  function renderMemory(duplicate = false) {
    inputTokens.replaceChildren();
    words.forEach((word, wordIndex) => {
      let state = "";
      if (wordIndex < index) state = "processed";
      if (!finished && wordIndex === index) state = "current";
      if (duplicate && wordIndex === index) state = "duplicate";
      inputTokens.append(token(word, state));
    });

    seenTokens.replaceChildren();
    if (seen.size === 0) {
      const empty = document.createElement("span");
      empty.className = "empty-set";
      empty.textContent = "set() rỗng";
      seenTokens.append(empty);
      return;
    }
    seen.forEach((word) => seenTokens.append(token(word)));
  }

  function reset(values) {
    words = values;
    seen = new Set();
    index = 0;
    finished = false;
    currentWord.textContent = "chưa bắt đầu";
    membership.textContent = "chưa kiểm tra";
    action.textContent = "chưa thực hiện";
    message.innerHTML = "Nhấn “Bước tiếp” để lấy phần tử đầu tiên từ <code>words</code>.";
    counter.textContent = `Bước 0 / ${words.length}`;
    nextButton.disabled = false;
    nextButton.textContent = "Bước tiếp →";
    renderMemory();
  }

  function advance() {
    if (finished) return;

    if (index >= words.length) {
      finished = true;
      currentWord.textContent = "hết phần tử";
      membership.textContent = "không có trùng";
      action.textContent = "return False";
      message.innerHTML = "Đã duyệt hết <code>words</code> mà không gặp lại giá trị nào: hàm trả về <strong>False</strong>.";
      nextButton.disabled = true;
      nextButton.textContent = "Đã hoàn tất";
      renderMemory();
      return;
    }

    const word = words[index];
    const duplicate = seen.has(word);
    currentWord.textContent = `word = "${word}"`;
    membership.textContent = duplicate ? "True" : "False";
    counter.textContent = `Bước ${index + 1} / ${words.length}`;

    if (duplicate) {
      finished = true;
      action.textContent = "bỏ qua, return True";
      message.innerHTML = `<code>"${word}"</code> đã có trong <code>seen</code>: đây là phần tử trùng, hàm trả về <strong>True</strong>.`;
      nextButton.disabled = true;
      nextButton.textContent = "Đã tìm thấy trùng";
      renderMemory(true);
      return;
    }

    seen.add(word);
    action.textContent = `thêm "${word}" vào seen`;
    message.innerHTML = `<code>"${word}"</code> chưa có trong <code>seen</code>, nên ta ghi nhớ nó rồi tiếp tục.`;
    renderMemory();
    index += 1;
  }

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      exampleButtons.forEach((candidate) => candidate.classList.remove("active"));
      button.classList.add("active");
      reset(button.dataset.values.split(","));
    });
  });

  nextButton.addEventListener("click", advance);
  resetButton.addEventListener("click", () => {
    const active = visualizer.querySelector("[data-values].active");
    reset(active.dataset.values.split(","));
  });

  reset(visualizer.querySelector("[data-values].active").dataset.values.split(","));
});
