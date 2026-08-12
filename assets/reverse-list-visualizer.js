document.querySelectorAll("[data-reverse-list-visualizer]").forEach((visualizer) => {
  const listNodes = visualizer.querySelector("[data-list-nodes]");
  const previousOutput = visualizer.querySelector("[data-previous]");
  const currentOutput = visualizer.querySelector("[data-current]");
  const nextOutput = visualizer.querySelector("[data-next-node]");
  const previousSetup = visualizer.querySelector("[data-previous-setup]");
  const currentSetup = visualizer.querySelector("[data-current-setup]");
  const condition = visualizer.querySelector("[data-condition]");
  const saveNext = visualizer.querySelector("[data-save-next]");
  const reverseLink = visualizer.querySelector("[data-reverse-link]");
  const movePrevious = visualizer.querySelector("[data-move-previous]");
  const moveCurrent = visualizer.querySelector("[data-move-current]");
  const result = visualizer.querySelector("[data-result]");
  const message = visualizer.querySelector("[data-message]");
  const counter = visualizer.querySelector(".step-counter");
  const nextButton = visualizer.querySelector("[data-next]");
  const resetButton = visualizer.querySelector("[data-reset]");
  const exampleButtons = visualizer.querySelectorAll("[data-values]");
  const codeLines = visualizer.querySelectorAll("[data-code-line]");

  let values = [];
  let nextIndices = [];
  let previousIndex = null;
  let currentIndex = null;
  let nextIndex = null;
  let reversedCount = 0;
  let phase = "previous-setup";
  let finished = false;

  function pointerText(index) {
    return index === null ? "None" : `node(${values[index]})`;
  }

  function highlight(lineNumber) {
    codeLines.forEach((line) => {
      line.classList.toggle("active", line.dataset.codeLine === String(lineNumber));
    });
  }

  function render() {
    listNodes.replaceChildren();
    values.forEach((value, index) => {
      const unit = document.createElement("div");
      unit.className = "reverse-node-unit";

      const labels = [];
      if (index === previousIndex) labels.push("previous");
      if (index === currentIndex) labels.push("current");
      if (index === nextIndex) labels.push("next_node");

      const pointerLabel = document.createElement("span");
      pointerLabel.className = "node-pointer-label";
      pointerLabel.textContent = labels.join(" + ") || " ";

      const node = document.createElement("span");
      node.className = `list-node ${labels.length ? "current-node" : ""}`.trim();
      node.innerHTML = `<b>${value}</b><small>next → ${pointerText(nextIndices[index])}</small>`;

      unit.append(pointerLabel, node);
      listNodes.append(unit);
    });

    previousOutput.textContent = pointerText(previousIndex);
    currentOutput.textContent = pointerText(currentIndex);
    nextOutput.textContent = pointerText(nextIndex);
    counter.textContent = `Đã đảo ${reversedCount} / ${values.length}`;
  }

  function reset(nextValues) {
    values = nextValues;
    nextIndices = values.map((_, index) => index + 1 < values.length ? index + 1 : null);
    previousIndex = null;
    currentIndex = null;
    nextIndex = null;
    reversedCount = 0;
    phase = "previous-setup";
    finished = false;
    previousSetup.textContent = "chưa chạy";
    currentSetup.textContent = "chưa chạy";
    condition.textContent = "chưa kiểm tra";
    saveNext.textContent = "chưa thực hiện";
    reverseLink.textContent = "chưa thực hiện";
    movePrevious.textContent = "chưa thực hiện";
    moveCurrent.textContent = "chưa thực hiện";
    result.textContent = "chưa thực hiện";
    message.textContent = "Nhấn “Dòng tiếp theo” để khởi tạo previous.";
    nextButton.disabled = false;
    nextButton.textContent = "Dòng tiếp theo →";
    highlight(0);
    render();
  }

  function runPreviousSetup() {
    previousIndex = null;
    highlight(1);
    previousSetup.textContent = "previous = None";
    message.innerHTML = "Dòng 1: phần đã đảo ban đầu rỗng, nên <code>previous = None</code>.";
    phase = "current-setup";
    render();
  }

  function runCurrentSetup() {
    currentIndex = values.length ? 0 : null;
    highlight(2);
    currentSetup.textContent = `current = ${pointerText(currentIndex)}`;
    message.innerHTML = "Dòng 2 đặt <code>current</code> tại head của list.";
    phase = "condition";
    render();
  }

  function runCondition() {
    const hasNode = currentIndex !== null;
    highlight(3);
    condition.textContent = hasNode ? "True" : "False";
    message.innerHTML = hasNode
      ? `Dòng 3: <code>current</code> đang ở node ${values[currentIndex]}, tiếp tục vòng lặp.`
      : "Dòng 3: <code>current = None</code>, toàn bộ list đã được đảo.";
    phase = hasNode ? "save" : "return";
  }

  function runSave() {
    nextIndex = nextIndices[currentIndex];
    highlight(4);
    saveNext.textContent = `next_node = ${pointerText(nextIndex)}`;
    message.innerHTML = `Dòng 4 lưu đường đi tới <code>${pointerText(nextIndex)}</code> trước khi đổi liên kết.`;
    phase = "reverse";
    render();
  }

  function runReverse() {
    nextIndices[currentIndex] = previousIndex;
    highlight(5);
    reverseLink.textContent = `next → ${pointerText(previousIndex)}`;
    message.innerHTML = `Dòng 5 đổi mũi tên của node ${values[currentIndex]} về <code>${pointerText(previousIndex)}</code>.`;
    phase = "move-previous";
    render();
  }

  function runMovePrevious() {
    previousIndex = currentIndex;
    reversedCount += 1;
    highlight(6);
    movePrevious.textContent = `previous = ${pointerText(previousIndex)}`;
    message.innerHTML = `Dòng 6 mở rộng phần đã đảo: <code>previous</code> tới node ${values[previousIndex]}.`;
    phase = "move-current";
    render();
  }

  function runMoveCurrent() {
    currentIndex = nextIndex;
    nextIndex = null;
    highlight(7);
    moveCurrent.textContent = `current = ${pointerText(currentIndex)}`;
    message.innerHTML = `Dòng 7 di chuyển <code>current</code> đến phần list chưa đảo.`;
    phase = "condition";
    render();
  }

  function runReturn() {
    highlight(8);
    result.textContent = `return ${pointerText(previousIndex)}`;
    message.innerHTML = `<code>previous</code> là head mới. List đã đảo bắt đầu tại <strong>${pointerText(previousIndex)}</strong>.`;
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Đã hoàn tất";
    render();
  }

  function advance() {
    if (finished) return;
    if (phase === "previous-setup") runPreviousSetup();
    else if (phase === "current-setup") runCurrentSetup();
    else if (phase === "condition") runCondition();
    else if (phase === "save") runSave();
    else if (phase === "reverse") runReverse();
    else if (phase === "move-previous") runMovePrevious();
    else if (phase === "move-current") runMoveCurrent();
    else if (phase === "return") runReturn();
  }

  function valuesFrom(button) {
    return button.dataset.values.split(",").map(Number);
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
