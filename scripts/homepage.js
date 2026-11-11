const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all other questions
    faqItems.forEach((faq) => {
      faq.classList.remove("active");

      faq.querySelector(".faq-answer").style.maxHeight = null;

      faq.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });

    // Open the clicked question if it was closed
    if (!isActive) {
      item.classList.add("active");

      answer.style.maxHeight = answer.scrollHeight + "px";

      question.setAttribute("aria-expanded", "true");
    }
  });
});
