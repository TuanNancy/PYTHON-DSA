document.querySelectorAll("[data-linked-list-visualizer]").forEach((visualizer) => {
  const listNodes = visualizer.querySelector("[data-list-nodes]");
  const outputValues = visualizer.querySelector("[data-output-values]");
  const pointer = visualizer.querySelector("[data-pointer]");
  const valuesSetup = visualizer.querySelector("[data-values-setup]");
  const currentSetup = visualizer.querySelector("[data-current-setup]");
  const condition = visualizer.querySelector("[data-condition]");
  const appendOutput = visualizer.querySelector("[data-append]");
  const move = visualizer.querySelector("[data-move]");
  const result = visualizer.querySelector("[data-result]");
  const message = visualizer.querySelector("[data-message]");
  const counter = visualizer.querySelector(".step-counter");
  const nextButton = visualizer.querySelector("[data-next]");
  const resetButton = visualizer.querySelector("[data-reset]");
  const exampleButtons = visualizer.querySelectorAll("[data-values]");
  const codeLines = visualizer.querySelectorAll("[data-code-line]");

  let values = [];
  let output = [];
  let currentIndex = null;
  let phase = "values-setup";
  let finished = false;

  function highlight(lineNumber) {
    codeLines.forEach((line) => {
      line.classList.toggle("active", line.dataset.codeLine === String(lineNumber));
    });
  }

  function render() {
    listNodes.replaceChildren();
    if (values.length === 0) {
      const nullNode = document.createElement("span");
      nullNode.className = "null-node";
      nullNode.textContent = "head → None";
      listNodes.append(nullNode);
    } else {
      values.forEach((value, index) => {
        const node = document.createElement("span");
        node.className = `list-node ${index === currentIndex ? "current-node" : ""}`.trim();
        node.innerHTML = `<b>${value}</b><small>next</small>`;
        listNodes.append(node);

        const arrow = document.createElement("span");
        arrow.className = "list-arrow";
        arrow.textContent = "→";
        listNodes.append(arrow);
      });

      const nullNode = document.createElement("span");
      nullNode.className = "null-node";
      nullNode.textContent = "None";
      listNodes.append(nullNode);
    }

    outputValues.replaceChildren();
    if (output.length === 0) {
      const empty = document.createElement("span");
      empty.className = "empty-set";
      empty.textContent = "[] rỗng";
      outputValues.append(empty);
    } else {
      output.forEach((value) => {
        const token = document.createElement("span");
        token.className = "token";
        token.textContent = value;
        outputValues.append(token);
      });
    }

    pointer.textContent = currentIndex === null ? "None" : `node(${values[currentIndex]})`;
    counter.textContent = `Đã đọc ${output.length} / ${values.length}`;
  }

  function reset(nextValues) {
    values = nextValues;
    output = [];
    currentIndex = null;
    phase = "values-setup";
    finished = false;
    valuesSetup.textContent = "chưa chạy";
    currentSetup.textContent = "chưa chạy";
    condition.textContent = "chưa kiểm tra";
    appendOutput.textContent = "chưa thực hiện";
    move.textContent = "chưa thực hiện";
    result.textContent = "chưa thực hiện";
    message.textContent = "Nhấn “Dòng tiếp theo” để tạo list kết quả.";
    nextButton.disabled = false;
    nextButton.textContent = "Dòng tiếp theo →";
    highlight(0);
    render();
  }

  function runValuesSetup() {
    highlight(1);
    valuesSetup.textContent = "values = []";
    message.innerHTML = "Dòng 1 tạo list rỗng để chứa các value đã đọc.";
    phase = "current-setup";
  }

  function runCurrentSetup() {
    currentIndex = values.length ? 0 : null;
    highlight(2);
    currentSetup.textContent = currentIndex === null ? "current = None" : `current = node(${values[0]})`;
    message.innerHTML = "Dòng 2 đặt <code>current</code> tại <code>head</code>.";
    phase = "condition";
    render();
  }

  function runCondition() {
    const hasNode = currentIndex !== null;
    highlight(3);
    condition.textContent = hasNode ? "True" : "False";
    message.innerHTML = hasNode
      ? "Dòng 3 thấy <code>current</code> đang trỏ đến một node."
      : "Dòng 3 thấy <code>current</code> là <code>None</code>, nên thoát vòng lặp.";
    phase = hasNode ? "append" : "return";
  }

  function runAppend() {
    const value = values[currentIndex];
    output.push(value);
    highlight(4);
    appendOutput.textContent = `append(${value})`;
    message.innerHTML = `Dòng 4 đọc <code>current.value = ${value}</code> và thêm vào kết quả.`;
    phase = "move";
    render();
  }

  function runMove() {
    const oldValue = values[currentIndex];
    currentIndex = currentIndex + 1 < values.length ? currentIndex + 1 : null;
    highlight(5);
    move.textContent = currentIndex === null ? "current = None" : `current = node(${values[currentIndex]})`;
    message.innerHTML = currentIndex === null
      ? `Dòng 5 đi qua <code>next</code> của node ${oldValue} và tới <code>None</code>.`
      : `Dòng 5 đi qua <code>next</code> từ node ${oldValue} đến node ${values[currentIndex]}.`;
    phase = "condition";
    render();
  }

  function runReturn() {
    highlight(6);
    result.textContent = `return [${output.join(", ")}]`;
    message.innerHTML = "Dòng 6 trả về tất cả value đã thu thập.";
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Đã hoàn tất";
    render();
  }

  function advance() {
    if (finished) return;
    if (phase === "values-setup") runValuesSetup();
    else if (phase === "current-setup") runCurrentSetup();
    else if (phase === "condition") runCondition();
    else if (phase === "append") runAppend();
    else if (phase === "move") runMove();
    else if (phase === "return") runReturn();
  }

  function valuesFrom(button) {
    return button.dataset.values ? button.dataset.values.split(",").map(Number) : [];
  }

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      exampleButtons.forEach((candidate) => candidate.classList.remove("active"));
      button.classList.add("active");
      reset(valuesFrom(button));
    });
  });

  nextButton.addEventListener("click", advance);
  resetButton.addEventListener("click", () => {
    reset(valuesFrom(visualizer.querySelector("[data-values].active")));
  });

  reset(valuesFrom(visualizer.querySelector("[data-values].active")));
});
