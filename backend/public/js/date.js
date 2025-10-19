const confirmBtn = document.getElementById("confirmBtn");
const datePicker = document.getElementById("datePicker");
const statusMsg = document.getElementById("statusMsg");
const hurrayMsg = document.getElementById("hurrayMsg");
const spamMsg = document.getElementById("spamMsg");

// Prevent selecting past dates
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
const dd = String(today.getDate()).padStart(2, "0");
datePicker.min = `${yyyy}-${mm}-${dd}`;

confirmBtn.addEventListener("click", async () => {
  const selectedDate = datePicker.value;

  if (!selectedDate) {
    statusMsg.textContent = "😜 Oops! Time travel not found. Pick a date, please!";
    statusMsg.style.color = "orange";
    hurrayMsg.style.opacity = 0;
    spamMsg.style.opacity = 0;
    return;
  }

  // Check if user somehow picked a past date
  const selected = new Date(selectedDate);
  const current = new Date();
  current.setHours(0, 0, 0, 0); // reset time to 00:00:00 for comparison
  if (selected < current) {
    statusMsg.textContent = "😂 Sorry! We can't go back in time. Pick a future date!";
    statusMsg.style.color = "orange";
    hurrayMsg.style.opacity = 0;
    spamMsg.style.opacity = 0;
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

      statusMsg.textContent = `Your date ${formattedDate} is confirmed! ✅`;
      statusMsg.style.color = "green";

      // Show Hurray message and fireworks
      hurrayMsg.style.opacity = 1;
      spamMsg.style.opacity = 1;
      startConfetti();
      setTimeout(() => { hurrayMsg.style.opacity = 0; }, 5500);
    } else {
      statusMsg.textContent = "Failed to send email ❌";
      statusMsg.style.color = "red";
      hurrayMsg.style.opacity = 0;
      spamMsg.style.opacity = 0;
    }
  } catch (err) {
    statusMsg.textContent = "Error connecting to server ❌";
    statusMsg.style.color = "red";
    console.error(err);
    hurrayMsg.style.opacity = 0;
    spamMsg.style.opacity = 0;
  }
});
