document.getElementById("sendBtn").addEventListener("click", function () {
  const selectedModel = document.getElementById("modelSelect").value;
  const userInput = document.getElementById("userInput").value;

  if (!userInput) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add(
      "alert",
      "alert-danger",
      "alert-dismissible",
      "fade",
      "show"
    );
    errorMessage.setAttribute("role", "alert");
    errorMessage.innerHTML = `
      <strong>Error!</strong> Message feild should not empty.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const errorContainer = document.getElementById("errorContainer");
    errorContainer.innerHTML = "";
    errorContainer.appendChild(errorMessage);
    return;
  }

  const loadingSpinner = document.getElementById("loadingSpinner");
  loadingSpinner.classList.remove("visually-hidden");
  document.getElementById("sendBtn").disabled = true;

  const requestData = {
    prompt: userInput,
  };

  const userMessage = document.createElement("div");
  userMessage.classList.add("d-flex", "justify-content-end");
  userMessage.innerHTML = `
  <div class="card mask-custom mb-3 w-50">
    <div class="card-body">
      <p class="fw-bold mb-2">${userInput}</p>
      <em class="small d-flex justify-content-end">You</em>
    </div>
  </div>
  `;

  const chatBox = document.getElementById("chatBox");
  chatBox.appendChild(userMessage);

  fetch(`/${selectedModel}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      const aiMessage = document.createElement("div");
      aiMessage.classList.add("d-flex", "justify-content-start");
      aiMessage.innerHTML = `
      <div class="card mask-custom mb-3 w-50">
        <div class="card-body">
          <p class="fw-bold mb-2">${data.answer}</p>
          <em class="small d-flex justify-content-end">${selectedModel}</em>
        </div>
      </div>
      `;

      const chatBox = document.getElementById("chatBox");
      chatBox.appendChild(aiMessage);

      loadingSpinner.classList.add("visually-hidden");
      document.getElementById("sendBtn").disabled = false;
    })
    .catch((error) => {
      console.error(`Error fetching response from ${selectedModel}:`, error);

      loadingSpinner.classList.add("visually-hidden");
      document.getElementById("sendBtn").disabled = false;
    });

  document.getElementById("userInput").value = "";
});
