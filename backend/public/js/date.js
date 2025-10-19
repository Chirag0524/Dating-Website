const confirmBtn = document.getElementById("confirmBtn");
const datePicker = document.getElementById("datePicker");
const statusMsg = document.getElementById("statusMsg");
const hurrayMsg = document.getElementById("hurrayMsg");

confirmBtn.addEventListener("click", async () => {
  const selectedDate = datePicker.value;
  if (!selectedDate) {
    statusMsg.textContent = "Please select a date!";
    statusMsg.style.color = "red";
    return;
  }

  statusMsg.textContent = "Sending confirmation...";
  statusMsg.style.color = "#2563eb";

  try {
    const response = await fetch("https://gift-for-you-cjv4.onrender.com/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedDate })
    });

    const data = await response.json();

    if (data.success) {
      // Format date to DD-MM-YYYY
      const [year, month, day] = selectedDate.split("-");
      const formattedDate = `${day}-${month}-${year}`;

      statusMsg.textContent = `Your date ${formattedDate} is confirmed!`;
      statusMsg.style.color = "green";

      // Show Hurray message and fireworks
      hurrayMsg.style.opacity = 1;
      startConfetti();
      setTimeout(() => { hurrayMsg.style.opacity = 0; }, 5500);
    } else {
      statusMsg.textContent = "Failed to send email ❌";
      statusMsg.style.color = "red";
    }
  } catch (err) {
    statusMsg.textContent = "Error connecting to server ❌";
    statusMsg.style.color = "red";
    console.error(err);
  }
});
