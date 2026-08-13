document.querySelectorAll("[data-cycle-visualizer]").forEach((visualizer) => {
  const stage = visualizer.querySelector("[data-cycle-stage]");
  const slowOutput = visualizer.querySelector("[data-slow]");
  const fastOutput = visualizer.querySelector("[data-fast]");
  const slowSetup = visualizer.querySelector("[data-slow-setup]");
  const fastSetup = visualizer.querySelector("[data-fast-setup]");
  const condition = visualizer.querySelector("[data-condition]");
  const moveSlow = visualizer.querySelector("[data-move-slow]");
  const moveFast = visualizer.querySelector("[data-move-fast]");
  const meeting = visualizer.querySelector("[data-meeting]");
  const trueResult = visualizer.querySelector("[data-true-result]");
  const falseResult = visualizer.querySelector("[data-false-result]");
  const message = visualizer.querySelector("[data-message]");
  const counter = visualizer.querySelector(".step-counter");
  const nextButton = visualizer.querySelector("[data-next]");
  const resetButton = visualizer.querySelector("[data-reset]");
  const exampleButtons = visualizer.querySelectorAll("[data-cycle]");
  const codeLines = visualizer.querySelectorAll("[data-code-line]");

  const values = [1, 2, 3, 4];
  let nextIndices = [];
  let slowIndex = null;
  let fastIndex = null;
  let iteration = 0;
  let hasCycle = true;
  let phase = "slow-setup";
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
    stage.replaceChildren();
    values.forEach((value, index) => {
      const unit = document.createElement("div");
      unit.className = "cycle-node-unit";
      const labels = [];
      if (index === slowIndex) labels.push("slow");
      if (index === fastIndex) labels.push("fast");

      const label = document.createElement("span");
      label.className = "node-pointer-label";
      label.textContent = labels.join(" + ") || " ";

      const node = document.createElement("span");
      node.className = `list-node ${labels.length ? "current-node" : ""}`.trim();
      node.innerHTML = `<b>${value}</b><small>next → ${pointerText(nextIndices[index])}</small>`;
      unit.append(label, node);
      stage.append(unit);
    });

    const route = document.createElement("div");
    route.className = `cycle-route ${hasCycle ? "has-cycle" : ""}`;
    route.textContent = hasCycle ? "node(4) quay về node(2) ↺" : "node(4) → None";
    stage.append(route);

    slowOutput.textContent = pointerText(slowIndex);
    fastOutput.textContent = pointerText(fastIndex);
    counter.textContent = `Vòng lặp ${iteration}`;
  }

  function reset(nextHasCycle) {
    hasCycle = nextHasCycle;
    nextIndices = hasCycle ? [1, 2, 3, 1] : [1, 2, 3, null];
    slowIndex = null;
    fastIndex = null;
    iteration = 0;
    phase = "slow-setup";
    finished = false;
    slowSetup.textContent = "chưa chạy";
    fastSetup.textContent = "chưa chạy";
    condition.textContent = "chưa kiểm tra";
    moveSlow.textContent = "chưa thực hiện";
    moveFast.textContent = "chưa thực hiện";
    meeting.textContent = "chưa kiểm tra";
    trueResult.textContent = "chưa thực hiện";
    falseResult.textContent = "chưa thực hiện";
    message.textContent = "Nhấn “Dòng tiếp theo” để đặt slow tại head.";
    nextButton.disabled = false;
    nextButton.textContent = "Dòng tiếp theo →";
    highlight(0);
    render();
  }

  function runSlowSetup() {
    slowIndex = 0;
    highlight(1);
    slowSetup.textContent = "slow = node(1)";
    message.innerHTML = "Dòng 1 đặt con trỏ chậm tại head.";
    phase = "fast-setup";
    render();
  }

  function runFastSetup() {
    fastIndex = 0;
    highlight(2);
    fastSetup.textContent = "fast = node(1)";
    message.innerHTML = "Dòng 2 đặt con trỏ nhanh tại cùng head.";
    phase = "condition";
    render();
  }

  function runCondition() {
    const canMoveTwice = fastIndex !== null && nextIndices[fastIndex] !== null;
    highlight(3);
    condition.textContent = canMoveTwice ? "True" : "False";
    message.innerHTML = canMoveTwice
      ? "Dòng 3 xác nhận fast có thể đi hai bước an toàn."
      : "Dòng 3 thấy fast đã tới cuối; list không có cycle.";
    phase = canMoveTwice ? "move-slow" : "return-false";
  }

  function runMoveSlow() {
    slowIndex = nextIndices[slowIndex];
    iteration += 1;
    highlight(4);
    moveSlow.textContent = `slow = ${pointerText(slowIndex)}`;
    message.innerHTML = "Dòng 4 di chuyển slow một node.";
    phase = "move-fast";
    render();
  }

  function runMoveFast() {
    const firstStep = nextIndices[fastIndex];
    fastIndex = firstStep === null ? null : nextIndices[firstStep];
    highlight(5);
    moveFast.textContent = `fast = ${pointerText(fastIndex)}`;
    message.innerHTML = "Dòng 5 di chuyển fast hai node.";
    phase = "meeting";
    render();
  }

  function runMeeting() {
    const met = slowIndex !== null && slowIndex === fastIndex;
    highlight(6);
    meeting.textContent = met ? "True" : "False";
    message.innerHTML = met
      ? `Dòng 6: slow và fast cùng trỏ đến <code>${pointerText(slowIndex)}</code>.`
      : "Dòng 6: hai con trỏ chưa gặp nhau.";
    phase = met ? "return-true" : "condition";
  }

  function runReturnTrue() {
    highlight(7);
    trueResult.textContent = "return True";
    message.innerHTML = "Dòng 7 xác nhận list có cycle.";
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Kết quả: True";
  }

  function runReturnFalse() {
    highlight(8);
    falseResult.textContent = "return False";
    message.innerHTML = "Dòng 8 xác nhận list kết thúc tại None và không có cycle.";
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Kết quả: False";
  }

  function advance() {
    if (finished) return;
    if (phase === "slow-setup") runSlowSetup();
    else if (phase === "fast-setup") runFastSetup();
    else if (phase === "condition") runCondition();
    else if (phase === "move-slow") runMoveSlow();
    else if (phase === "move-fast") runMoveFast();
    else if (phase === "meeting") runMeeting();
    else if (phase === "return-true") runReturnTrue();
    else if (phase === "return-false") runReturnFalse();
  }

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      exampleButtons.forEach((candidate) => candidate.classList.remove("active"));
      button.classList.add("active");
      reset(button.dataset.cycle === "true");
    });
  });

  nextButton.addEventListener("click", advance);
  resetButton.addEventListener("click", () => {
    reset(visualizer.querySelector("[data-cycle].active").dataset.cycle === "true");
  });

  reset(visualizer.querySelector("[data-cycle].active").dataset.cycle === "true");
});
