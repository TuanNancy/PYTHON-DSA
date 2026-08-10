document.querySelectorAll("[data-queue-visualizer]").forEach((visualizer) => {
  const queueTokens = visualizer.querySelector("[data-queue-tokens]");
  const servedTokens = visualizer.querySelector("[data-served-tokens]");
  const setup = visualizer.querySelector("[data-setup]");
  const servedSetup = visualizer.querySelector("[data-served-setup]");
  const condition = visualizer.querySelector("[data-condition]");
  const current = visualizer.querySelector("[data-current]");
  const action = visualizer.querySelector("[data-action]");
  const result = visualizer.querySelector("[data-result]");
  const message = visualizer.querySelector("[data-message]");
  const counter = visualizer.querySelector(".step-counter");
  const nextButton = visualizer.querySelector("[data-next]");
  const resetButton = visualizer.querySelector("[data-reset]");
  const exampleButtons = visualizer.querySelectorAll("[data-customers]");
  const codeLines = visualizer.querySelectorAll("[data-code-line]");

  let initialCustomers = [];
  let queue = [];
  let served = [];
  let customer = null;
  let phase = "queue-setup";
  let finished = false;

  function highlight(lineNumber) {
    codeLines.forEach((line) => {
      line.classList.toggle("active", line.dataset.codeLine === String(lineNumber));
    });
  }

  function renderTokens(container, values, emptyText, activeFirst = false) {
    container.replaceChildren();
    if (values.length === 0) {
      const empty = document.createElement("span");
      empty.className = "empty-set";
      empty.textContent = emptyText;
      container.append(empty);
      return;
    }

    values.forEach((value, index) => {
      const token = document.createElement("span");
      token.className = `token ${activeFirst && index === 0 ? "current" : ""}`.trim();
      token.textContent = value;
      container.append(token);
    });
  }

  function render() {
    renderTokens(queueTokens, queue, "Queue rỗng", true);
    renderTokens(servedTokens, served, "[] rỗng");
    counter.textContent = `Đã phục vụ ${served.length} / ${initialCustomers.length}`;
  }

  function reset(customers) {
    initialCustomers = customers;
    queue = [];
    served = [];
    customer = null;
    phase = "queue-setup";
    finished = false;
    setup.textContent = "chưa chạy";
    servedSetup.textContent = "chưa chạy";
    condition.textContent = "chưa kiểm tra";
    current.textContent = "chưa thực hiện";
    action.textContent = "chưa thực hiện";
    result.textContent = "chưa thực hiện";
    message.textContent = "Nhấn “Dòng tiếp theo” để tạo Queue.";
    nextButton.disabled = false;
    nextButton.textContent = "Dòng tiếp theo →";
    highlight(0);
    render();
  }

  function runQueueSetup() {
    queue = [...initialCustomers];
    highlight(1);
    setup.textContent = `deque([${queue.join(", ")}])`;
    message.innerHTML = "Dòng 1 đưa các khách vào Queue theo thứ tự ban đầu.";
    phase = "served-setup";
    render();
  }

  function runServedSetup() {
    served = [];
    highlight(2);
    servedSetup.textContent = "served = []";
    message.innerHTML = "Dòng 2 tạo list rỗng để ghi thứ tự đã phục vụ.";
    phase = "condition";
    render();
  }

  function runCondition() {
    const hasCustomers = queue.length > 0;
    highlight(3);
    condition.textContent = hasCustomers ? "True" : "False";
    message.innerHTML = hasCustomers
      ? "Dòng 3 thấy Queue còn phần tử, nên đi vào vòng lặp."
      : "Dòng 3 thấy Queue rỗng, nên thoát vòng lặp.";
    phase = hasCustomers ? "dequeue" : "return";
    render();
  }

  function runDequeue() {
    customer = queue.shift();
    highlight(4);
    current.textContent = `customer = "${customer}"`;
    message.innerHTML = `Dòng 4 lấy <code>${customer}</code> ở FRONT bằng <code>popleft()</code>.`;
    phase = "serve";
    render();
  }

  function runServe() {
    served.push(customer);
    highlight(5);
    action.textContent = `served.append("${customer}")`;
    message.innerHTML = `Dòng 5 thêm <code>${customer}</code> vào danh sách đã phục vụ.`;
    customer = null;
    phase = "condition";
    render();
  }

  function runReturn() {
    highlight(6);
    result.textContent = `return [${served.join(", ")}]`;
    message.innerHTML = "Dòng 6 trả về toàn bộ khách theo đúng thứ tự FIFO.";
    finished = true;
    nextButton.disabled = true;
    nextButton.textContent = "Đã hoàn tất";
    render();
  }

  function advance() {
    if (finished) return;
    if (phase === "queue-setup") runQueueSetup();
    else if (phase === "served-setup") runServedSetup();
    else if (phase === "condition") runCondition();
    else if (phase === "dequeue") runDequeue();
    else if (phase === "serve") runServe();
    else if (phase === "return") runReturn();
  }

  function customersFrom(button) {
    return button.dataset.customers ? button.dataset.customers.split(",") : [];
  }

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      exampleButtons.forEach((candidate) => candidate.classList.remove("active"));
      button.classList.add("active");
      reset(customersFrom(button));
    });
  });

  nextButton.addEventListener("click", advance);
  resetButton.addEventListener("click", () => {
    reset(customersFrom(visualizer.querySelector("[data-customers].active")));
  });

  reset(customersFrom(visualizer.querySelector("[data-customers].active")));
});
