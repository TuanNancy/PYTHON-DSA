document.querySelectorAll("[data-two-sum-visualizer]").forEach((visualizer) => {
  const inputTokens = visualizer.querySelector("[data-input-tokens]");
  const seenEntries = visualizer.querySelector("[data-seen-entries]");
  const targetValue = visualizer.querySelector("[data-target-value]");
  const current = visualizer.querySelector("[data-current]");
  const complementOutput = visualizer.querySelector("[data-complement]");
  const membership = visualizer.querySelector("[data-membership]");
  const result = visualizer.querySelector("[data-result]");
  const action = visualizer.querySelector("[data-action]");
  const emptyResult = visualizer.querySelector("[data-empty-result]");
  const message = visualizer.querySelector("[data-message]");
  const counter = visualizer.querySelector(".step-counter");
  const nextButton = visualizer.querySelector("[data-next]");
  const resetButton = visualizer.querySelector("[data-reset]");
  const exampleButtons = visualizer.querySelectorAll("[data-values]");
  const codeLines = visualizer.querySelectorAll("[data-code-line]");

  let numbers = [];
  let target = 0;
  let seen = new Map();
  let index = 0;
  let complement = 0;
  let pairIndex = -1;
  let phase = "loop";
  let finished = false;

  function token(value, tokenIndex, className = "") {
    const element = document.createElement("span");
    element.className = `token ${className}`.trim();
    element.innerHTML = `<small>${tokenIndex}</small>${value}`;
    return element;
  }

  function highlight(lineNumber) {
    codeLines.forEach((line) => {
      line.classList.toggle("active", line.dataset.codeLine === String(lineNumber));
    });
  }

  function renderMemory(foundPair = false) {
    inputTokens.replaceChildren();
    numbers.forEach((number, numberIndex) => {
      let state = "";
      if (numberIndex < index) state = "processed";
      if (!finished && numberIndex === index) state = "current";
      if (foundPair && (numberIndex === pairIndex || numberIndex === index)) state = "duplicate";
      inputTokens.append(token(number, numberIndex, state));
    });

    seenEntries.replaceChildren();
    if (seen.size === 0) {
      const empty = document.createElement("span");
      empty.className = "empty-set";
      empty.textContent = "{} rỗng";
      seenEntries.append(empty);
      return;
    }

    seen.forEach((entryIndex, number) => {
      const entry = document.createElement("span");
      entry.className = "dict-entry";
      entry.innerHTML = `<strong>${number}</strong><span>→</span><b>${entryIndex}</b>`;
      seenEntries.append(entry);
    });
  }

  function reset(values, nextTarget) {
    numbers = values;
    target = nextTarget;
    seen = new Map();
    index = 0;
    complement = 0;
    pairIndex = -1;
    phase = "loop";
    finished = false;
    targetValue.textContent = target;
    current.textContent = "chưa bắt đầu";
    complementOutput.textContent = "chưa tính";
    membership.textContent = "chưa kiểm tra";
    result.textContent = "chưa thực hiện";
    action.textContent = "chưa thực hiện";
    emptyResult.textContent = "chưa thực hiện";
    message.textContent = "Nhấn “Dòng tiếp theo” để bắt đầu vòng lặp.";
    counter.textContent = `Phần tử 0 / ${numbers.length}`;
    nextButton.disabled = false;
    nextButton.textContent = "Dòng tiếp theo →";
    highlight(0);
    renderMemory();
  }

  function runLoopLine() {
    if (index >= numbers.length) {
      highlight(6);
      emptyResult.textContent = "return []";
      message.innerHTML = "Vòng lặp đã kết thúc mà không tìm thấy cặp. Dòng 6 trả về <strong>[]</strong>.";
      finished = true;
      nextButton.disabled = true;
      nextButton.textContent = "Đã hoàn tất";
      renderMemory();
      return;
    }

    highlight(1);
    current.textContent = `index = ${index}, number = ${numbers[index]}`;
    complementOutput.textContent = "chưa tính cho phần tử này";
    membership.textContent = "chưa kiểm tra cho phần tử này";
    result.textContent = "chưa thực hiện";
    action.textContent = "chưa thực hiện";
    counter.textContent = `Phần tử ${index + 1} / ${numbers.length}`;
    message.innerHTML = `Dòng 1 lấy <code>number = ${numbers[index]}</code> tại <code>index = ${index}</code>.`;
    phase = "complement";
    renderMemory();
  }

  function runComplementLine() {
    complement = target - numbers[index];
    highlight(2);
    complementOutput.textContent = `${target} - ${numbers[index]} = ${complement}`;
    message.innerHTML = `Dòng 2 tính số còn thiếu: <code>complement = ${complement}</code>.`;
    phase = "check";
  }

  function runCheckLine() {
    const found = seen.has(complement);
    highlight(3);
    membership.textContent = found ? "True" : "False";
    message.innerHTML = found
      ? `Dòng 3 tìm thấy key <code>${complement}</code> trong <code>seen</code>.`
      : `Dòng 3 chưa tìm thấy key <code>${complement}</code> trong <code>seen</code>.`;

    if (found) {
      pairIndex = seen.get(complement);
      phase = "return-pair";
    } else {
      phase = "store";
    }
  }

  function runReturnLine() {
    highlight(4);
    result.textContent = `return [${pairIndex}, ${index}]`;
    message.innerHTML = `Dòng 4 lấy index cũ từ <code>seen[${complement}]</code> và trả về <strong>[${pairIndex}, ${index}]</strong>.`;
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Đã tìm thấy cặp";
    renderMemory(true);
  }

  function runStoreLine() {
    const number = numbers[index];
    seen.set(number, index);
    highlight(5);
    action.textContent = `seen[${number}] = ${index}`;
    message.innerHTML = `Dòng 5 lưu key <code>${number}</code> với value <code>${index}</code> vào <code>seen</code>.`;
    renderMemory();
    index += 1;
    phase = "loop";
  }

  function advance() {
    if (finished) return;

    if (phase === "loop") runLoopLine();
    else if (phase === "complement") runComplementLine();
    else if (phase === "check") runCheckLine();
    else if (phase === "return-pair") runReturnLine();
    else if (phase === "store") runStoreLine();
  }

  function valuesFrom(button) {
    return button.dataset.values.split(",").map(Number);
  }

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      exampleButtons.forEach((candidate) => candidate.classList.remove("active"));
      button.classList.add("active");
      reset(valuesFrom(button), Number(button.dataset.target));
    });
  });

  nextButton.addEventListener("click", advance);
  resetButton.addEventListener("click", () => {
    const active = visualizer.querySelector("[data-values].active");
    reset(valuesFrom(active), Number(active.dataset.target));
  });

  const active = visualizer.querySelector("[data-values].active");
  reset(valuesFrom(active), Number(active.dataset.target));
});
