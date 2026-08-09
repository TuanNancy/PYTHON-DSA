document.querySelectorAll(".quiz").forEach((quiz) => {
  const feedback = quiz.querySelector(".feedback");

  quiz.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const correct = button.dataset.correct === "true";
      feedback.textContent = correct
        ? `Đúng. ${quiz.dataset.correctFeedback}`
        : `Chưa đúng. ${quiz.dataset.wrongFeedback}`;
      feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
    });
  });
});
