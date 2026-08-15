document.querySelectorAll("[data-two-pointers-visualizer]").forEach((visualizer) => {
  const numbers = [1, 2, 4, 6, 10];
  const array = visualizer.querySelector("[data-pointer-array]");
  const leftOutput = visualizer.querySelector("[data-left]");
  const rightOutput = visualizer.querySelector("[data-right]");
  const totalOutput = visualizer.querySelector("[data-total]");
  const targetOutput = visualizer.querySelector("[data-target-value]");
  const leftSetup = visualizer.querySelector("[data-left-setup]");
  const rightSetup = visualizer.querySelector("[data-right-setup]");
  const condition = visualizer.querySelector("[data-condition]");
  const totalCalc = visualizer.querySelector("[data-total-calc]");
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

  let target = 8;
  let left = null;
  let right = null;
  let total = null;
  let calculations = 0;
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
      const pointerClass = index === left || index === right ? "pointer-token" : "";
      token.className = `search-token ${outside ? "excluded" : ""} ${pointerClass}`.trim();
      const labels = [index === left ? "L" : "", index === right ? "R" : ""].filter(Boolean).join("+");
      token.innerHTML = `<small>${labels || index}</small><b>${number}</b>`;
      array.append(token);
    });
    leftOutput.textContent = left === null ? "chưa gán" : `${left} → ${numbers[left]}`;
    rightOutput.textContent = right === null ? "chưa gán" : `${right} → ${numbers[right]}`;
    totalOutput.textContent = total === null ? "chưa tính" : total;
    targetOutput.textContent = target;
    counter.textContent = `Lần tính tổng ${calculations}`;
  }

  function reset(nextTarget) {
    target = nextTarget;
    left = null;
    right = null;
    total = null;
    calculations = 0;
    phase = "left-setup";
    finished = false;
    leftSetup.textContent = "chưa chạy";
    rightSetup.textContent = "chưa chạy";
    condition.textContent = "chưa kiểm tra";
    totalCalc.textContent = "chưa tính";
    equalCheck.textContent = "chưa kiểm tra";
    foundResult.textContent = "chưa thực hiện";
    moveLeft.textContent = "chưa thực hiện";
    moveRight.textContent = "chưa thực hiện";
    missingResult.textContent = "chưa thực hiện";
    message.textContent = "Nhấn “Dòng tiếp theo” để đặt left.";
    nextButton.disabled = false;
    nextButton.textContent = "Dòng tiếp theo →";
    highlight(0);
    render();
  }

  function runLeftSetup() {
    left = 0;
    highlight(1);
    leftSetup.textContent = "left = 0";
    message.innerHTML = "Dòng 1 đặt left tại số nhỏ nhất.";
    phase = "right-setup";
    render();
  }

  function runRightSetup() {
    right = numbers.length - 1;
    highlight(2);
    rightSetup.textContent = `right = ${right}`;
    message.innerHTML = "Dòng 2 đặt right tại số lớn nhất.";
    phase = "condition";
    render();
  }

  function runCondition() {
    const hasPair = left < right;
    highlight(3);
    condition.textContent = `${left} < ${right} → ${hasPair}`;
    message.innerHTML = hasPair
      ? "Dòng 3 xác nhận còn hai index khác nhau để xét."
      : "Dòng 3: hai con trỏ đã gặp nhau, không còn cặp nào.";
    phase = hasPair ? "total" : "missing";
  }

  function runTotal() {
    total = numbers[left] + numbers[right];
    calculations += 1;
    highlight(4);
    totalCalc.textContent = `${numbers[left]} + ${numbers[right]} = ${total}`;
    message.innerHTML = `Dòng 4 tính tổng tại hai con trỏ: <code>${total}</code>.`;
    phase = "equal";
    render();
  }

  function runEqual() {
    const found = total === target;
    highlight(5);
    equalCheck.textContent = `${total} == ${target} → ${found}`;
    message.innerHTML = found
      ? "Dòng 5 tìm thấy tổng bằng target."
      : "Dòng 5 chưa tìm thấy; cần điều chỉnh một con trỏ.";
    phase = found ? "found" : (total < target ? "move-left" : "move-right");
  }

  function runFound() {
    highlight(6);
    foundResult.textContent = `return [${left}, ${right}]`;
    message.innerHTML = `Dòng 6 trả về hai index <strong>[${left}, ${right}]</strong>.`;
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Đã tìm thấy cặp";
  }

  function runMoveLeft() {
    const removed = left;
    left += 1;
    total = null;
    highlight(7);
    moveLeft.textContent = `left = ${left}`;
    message.innerHTML = `Dòng 7 loại số ${numbers[removed]} vì tổng quá nhỏ; chọn số lớn hơn.`;
    phase = "condition";
    render();
  }

  function runMoveRight() {
    const removed = right;
    right -= 1;
    total = null;
    highlight(8);
    moveRight.textContent = `right = ${right}`;
    message.innerHTML = `Dòng 8 loại số ${numbers[removed]} vì tổng quá lớn; chọn số nhỏ hơn.`;
    phase = "condition";
    render();
  }

  function runMissing() {
    highlight(9);
    missingResult.textContent = "return []";
    message.innerHTML = "Dòng 9 trả về list rỗng vì không có cặp phù hợp.";
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Kết quả: []";
  }

  function advance() {
    if (finished) return;
    if (phase === "left-setup") runLeftSetup();
    else if (phase === "right-setup") runRightSetup();
    else if (phase === "condition") runCondition();
    else if (phase === "total") runTotal();
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
