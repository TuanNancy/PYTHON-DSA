document.querySelectorAll("[data-binary-search-visualizer]").forEach((visualizer) => {
  const numbers = [2, 4, 7, 10, 13, 18, 21];
  const array = visualizer.querySelector("[data-search-array]");
  const leftOutput = visualizer.querySelector("[data-left]");
  const midOutput = visualizer.querySelector("[data-mid]");
  const rightOutput = visualizer.querySelector("[data-right]");
  const targetOutput = visualizer.querySelector("[data-target-value]");
  const leftSetup = visualizer.querySelector("[data-left-setup]");
  const rightSetup = visualizer.querySelector("[data-right-setup]");
  const condition = visualizer.querySelector("[data-condition]");
  const midCalc = visualizer.querySelector("[data-mid-calc]");
  const equalCheck = visualizer.querySelector("[data-equal-check]");
  const foundResult = visualizer.querySelector("[data-found-result]");
  const moveLeft = visualizer.querySelector("[data-move-left]");
  const moveRight = visualizer.querySelector("[data-move-right]");
  const missingResult = visualizer.querySelector("[data-missing-result]");
  const message = visualizer.querySelector("[data-message]");
  const counter = visualizer.querySelector(".step-counter");
  const nextButton = visualizer.querySelector("[data-next]");
  const resetButton = visualizer.querySelector("[data-reset]");
  const exampleButtons = visualizer.querySelectorAll("[data-target]");
  const codeLines = visualizer.querySelectorAll("[data-code-line]");

  let target = 13;
  let left = null;
  let right = null;
  let mid = null;
  let comparisons = 0;
  let phase = "left-setup";
  let finished = false;

  function highlight(lineNumber) {
    codeLines.forEach((line) => {
      line.classList.toggle("active", line.dataset.codeLine === String(lineNumber));
    });
  }

  function render() {
    array.replaceChildren();
    numbers.forEach((number, index) => {
      const token = document.createElement("span");
      const outside = left !== null && right !== null && (index < left || index > right);
      token.className = `search-token ${outside ? "excluded" : ""} ${index === mid ? "mid-token" : ""}`.trim();
      token.innerHTML = `<small>${index}</small><b>${number}</b>`;
      array.append(token);
    });
    leftOutput.textContent = left === null ? "chưa gán" : left;
    rightOutput.textContent = right === null ? "chưa gán" : right;
    midOutput.textContent = mid === null ? "chưa tính" : `${mid} → ${numbers[mid]}`;
    targetOutput.textContent = target;
    counter.textContent = `Lần so sánh ${comparisons}`;
  }

  function reset(nextTarget) {
    target = nextTarget;
    left = null;
    right = null;
    mid = null;
    comparisons = 0;
    phase = "left-setup";
    finished = false;
    leftSetup.textContent = "chưa chạy";
    rightSetup.textContent = "chưa chạy";
    condition.textContent = "chưa kiểm tra";
    midCalc.textContent = "chưa tính";
    equalCheck.textContent = "chưa kiểm tra";
    foundResult.textContent = "chưa thực hiện";
    moveLeft.textContent = "chưa thực hiện";
    moveRight.textContent = "chưa thực hiện";
    missingResult.textContent = "chưa thực hiện";
    message.textContent = "Nhấn “Dòng tiếp theo” để đặt biên trái.";
    nextButton.disabled = false;
    nextButton.textContent = "Dòng tiếp theo →";
    highlight(0);
    render();
  }

  function runLeftSetup() {
    left = 0;
    highlight(1);
    leftSetup.textContent = "left = 0";
    message.innerHTML = "Dòng 1 đặt biên trái tại index đầu tiên.";
    phase = "right-setup";
    render();
  }

  function runRightSetup() {
    right = numbers.length - 1;
    highlight(2);
    rightSetup.textContent = `right = ${right}`;
    message.innerHTML = "Dòng 2 đặt biên phải tại index cuối cùng.";
    phase = "condition";
    render();
  }

  function runCondition() {
    const hasRange = left <= right;
    highlight(3);
    condition.textContent = `${left} <= ${right} → ${hasRange}`;
    message.innerHTML = hasRange
      ? "Dòng 3 xác nhận vùng tìm kiếm vẫn còn phần tử."
      : "Dòng 3 thấy vùng tìm kiếm đã rỗng.";
    phase = hasRange ? "mid" : "missing";
  }

  function runMid() {
    mid = Math.floor((left + right) / 2);
    highlight(4);
    midCalc.textContent = `mid = ${mid}`;
    message.innerHTML = `Dòng 4 chọn index giữa <code>${mid}</code>, có value <code>${numbers[mid]}</code>.`;
    phase = "equal";
    render();
  }

  function runEqual() {
    const found = numbers[mid] === target;
    comparisons += 1;
    highlight(5);
    equalCheck.textContent = `${numbers[mid]} == ${target} → ${found}`;
    message.innerHTML = found
      ? "Dòng 5 tìm thấy target tại mid."
      : "Dòng 5 chưa tìm thấy; cần chọn nửa tiếp theo.";
    phase = found ? "found" : (numbers[mid] < target ? "move-left" : "move-right");
    render();
  }

  function runFound() {
    highlight(6);
    foundResult.textContent = `return ${mid}`;
    message.innerHTML = `Dòng 6 trả về index <strong>${mid}</strong>.`;
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = `Tìm thấy tại index ${mid}`;
  }

  function runMoveLeft() {
    const oldLeft = left;
    const oldMid = mid;
    left = mid + 1;
    highlight(7);
    moveLeft.textContent = `left = ${left}`;
    message.innerHTML = `Dòng 7 loại index ${oldLeft} đến ${oldMid}; target chỉ có thể nằm bên phải.`;
    mid = null;
    phase = "condition";
    render();
  }

  function runMoveRight() {
    const oldMid = mid;
    const oldRight = right;
    right = mid - 1;
    highlight(8);
    moveRight.textContent = `right = ${right}`;
    message.innerHTML = `Dòng 8 loại index ${oldMid} đến ${oldRight}; target chỉ có thể nằm bên trái.`;
    mid = null;
    phase = "condition";
    render();
  }

  function runMissing() {
    highlight(9);
    missingResult.textContent = "return -1";
    message.innerHTML = "Dòng 9 trả về -1 vì target không tồn tại.";
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Kết quả: -1";
  }

  function advance() {
    if (finished) return;
    if (phase === "left-setup") runLeftSetup();
    else if (phase === "right-setup") runRightSetup();
    else if (phase === "condition") runCondition();
    else if (phase === "mid") runMid();
    else if (phase === "equal") runEqual();
    else if (phase === "found") runFound();
    else if (phase === "move-left") runMoveLeft();
    else if (phase === "move-right") runMoveRight();
    else if (phase === "missing") runMissing();
  }

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      exampleButtons.forEach((candidate) => candidate.classList.remove("active"));
      button.classList.add("active");
      reset(Number(button.dataset.target));
    });
  });

  nextButton.addEventListener("click", advance);
  resetButton.addEventListener("click", () => {
    reset(Number(visualizer.querySelector("[data-target].active").dataset.target));
  });

  reset(Number(visualizer.querySelector("[data-target].active").dataset.target));
});
