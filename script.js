// script.js - For ALL pages (index.html, contact.html, about.html, privacy.html)

// ===========================================
// SHARED FUNCTIONS (Used on all pages)
// ===========================================

// Mobile menu toggle
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.classList.toggle("active");
  }
}

// ===========================================
// INDEX.HTML SPECIFIC CODE (Wedding Predictor)
// ===========================================

// Wedding Prediction Data
const predictions = {
  dates: [
    "June 15, 2040",
    "October 8, 2035",
    "March 22, 2036",
    "September 14, 2029",
    "December 5, 2038",
    "July 30, 2031",
    "February 14, 2044",
    "August 18, 2049",
    "May 20, 2028",
    "November 11, 2027",
    "April 9, 2030",
    "January 7, 2033",
  ],

  messages: [
    "The stars align perfectly for this union! 💫",
    "A beautiful spring wedding awaits! 🌸",
    "Love will blossom on this special day! 💖",
    "Perfect timing for a lifelong commitment! ⏳",
    "Romantic vibes are strong for this date! 💕",
    "The universe approves this wedding date! 🌌",
    "Get ready for the party of a lifetime! 🎉",
    "A fairytale wedding is in the future! 🏰",
    "Your friend's love story reaches its peak! 📖",
    "This date brings eternal happiness! ✨",
    "Perfect weather for a magical wedding! ☀️",
    "A date that will be remembered forever! 📅",
  ],

  fortunes: [
    "The wedding will be filled with laughter and joy!",
    "Expect perfect weather and beautiful memories!",
    "This marriage will be blessed with happiness!",
    "A love story that will inspire everyone!",
    "The perfect beginning to forever!",
    "A wedding that will be talked about for years!",
    "Love will shine brighter than ever on this day!",
    "A magical celebration of true love!",
    "Everything will be absolutely perfect!",
    "The start of an incredible journey together!",
  ],
};

// Format date for Google Forms
function formatDateForGoogleForms(dateString) {
  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  try {
    const parts = dateString.replace(",", "").split(" ");
    const month = months[parts[0]] || "01";
    const day = parts[1].padStart(2, "0");
    const year = parts[2];

    return `${year}-${month}-${day}`; // YYYY-MM-DD format
  } catch (e) {
    return "2026-01-01";
  }
}

// Main Prediction Function
function predictWedding() {
  const friendName = document.getElementById("friendName");
  if (!friendName) return; // Not on index.html page

  const nameValue = friendName.value.trim();

  if (!nameValue) {
    alert("Please enter your friend's name!");
    return;
  }

  const btn = document.getElementById("predictBtn");
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-cog fa-spin"></i> Predicting...';

  const resultSection = document.getElementById("resultSection");
  if (resultSection) {
    resultSection.style.display = "none";
  }

  setTimeout(() => {
    const randomDate =
      predictions.dates[Math.floor(Math.random() * predictions.dates.length)];
    const randomMessage =
      predictions.messages[
        Math.floor(Math.random() * predictions.messages.length)
      ];
    const randomFortune =
      predictions.fortunes[
        Math.floor(Math.random() * predictions.fortunes.length)
      ];

    const predictionText = document.getElementById("predictionText");
    const weddingDate = document.getElementById("weddingDate");
    const fortuneMessage = document.getElementById("fortuneMessage");

    if (predictionText && weddingDate && fortuneMessage) {
      predictionText.innerHTML = `✨ <strong>${nameValue}</strong>'s wedding prediction:`;
      weddingDate.textContent = randomDate;
      fortuneMessage.textContent = randomFortune;
    }

    if (resultSection) {
      resultSection.style.display = "block";
      resultSection.style.animation = "fadeIn 0.5s ease";
    }

    btn.disabled = false;
    btn.innerHTML = originalText;

    saveToGoogleForm(nameValue, randomDate, randomMessage, randomFortune);
    updateStatistics();

    if (resultSection) {
      resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 1500);
}

// Save to Google Form for wedding predictions
function saveToGoogleForm(friendName, weddingDate, message, fortune) {
  console.log("📤 Saving prediction to Google Form...");

  const formattedDate = formatDateForGoogleForms(weddingDate);
  const predictionText = `${message} ${fortune}`;

  const form = document.getElementById("dataCollectionForm");
  const friendNameInput = document.getElementById("formFriendName");
  const predictionInput = document.getElementById("formPrediction");
  const dateInput = document.getElementById("formDate");

  if (!form || !friendNameInput || !predictionInput || !dateInput) {
    console.error("❌ Wedding form elements not found!");
    return;
  }

  friendNameInput.value = friendName;
  predictionInput.value = predictionText;
  dateInput.value = formattedDate;

  try {
    form.submit();
    console.log("✅ Wedding form submitted!");
    // showStatus("✅ Prediction saved to our database! ✨", "green");
  } catch (error) {
    console.error("❌ Wedding form submission error:", error);
    // showStatus("⚠️ Saved locally only", "orange");
  }
}

// Show status message
function showStatus(message, color) {
  const existingStatus = document.getElementById("formStatus");
  if (existingStatus) {
    existingStatus.remove();
  }

  const statusEl = document.createElement("div");
  statusEl.id = "formStatus";
  statusEl.innerHTML = `
    <i class="fas fa-${color === "green" ? "check-circle" : "exclamation-triangle"}"></i>
    ${message}
  `;

  statusEl.style.cssText = `
    margin: 15px auto;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 0.95rem;
    text-align: center;
    max-width: 80%;
    animation: slideIn 0.3s ease;
    background: ${color === "green" ? "#d4edda" : "#fff3cd"};
    color: ${color === "green" ? "#155724" : "#856404"};
    border: 1px solid ${color === "green" ? "#c3e6cb" : "#ffeaa7"};
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  `;

  const resultDetails = document.querySelector(".result-details");
  if (resultDetails) {
    resultDetails.parentNode.insertBefore(statusEl, resultDetails.nextSibling);
  }

  setTimeout(() => {
    if (statusEl.parentNode) {
      statusEl.style.opacity = "0";
      statusEl.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        if (statusEl.parentNode) {
          statusEl.remove();
        }
      }, 500);
    }
  }, 4000);
}

// Update statistics
function updateStatistics() {
  let count = parseInt(localStorage.getItem("predictionCount") || "1247");
  count++;
  localStorage.setItem("predictionCount", count.toString());

  const predictionCountEl = document.getElementById("predictionCount");
  if (predictionCountEl) {
    predictionCountEl.textContent = count.toLocaleString();
  }

  const accuracyRateEl = document.getElementById("accuracyRate");
  if (accuracyRateEl) {
    const baseAccuracy = 87;
    const randomVariation = Math.floor(Math.random() * 8) - 4;
    const accuracy = Math.min(99, Math.max(80, baseAccuracy + randomVariation));
    accuracyRateEl.textContent = `${accuracy}%`;
  }

  const happyUsersEl = document.getElementById("happyUsers");
  if (happyUsersEl) {
    const happyUsers = Math.floor(count * 0.45);
    happyUsersEl.textContent = happyUsers.toLocaleString();
  }
}

// Share prediction
function sharePrediction() {
  const friendName = document.getElementById("friendName");
  const date = document.getElementById("weddingDate");
  const message = document.getElementById("fortuneMessage");

  if (!friendName || !date || !message) return;

  const shareText = `🔮 Wedding Prediction: ${friendName.value} will get married on ${date.textContent}! ${message.textContent}\n\nTry it: ${window.location.origin}`;

  if (navigator.share) {
    navigator
      .share({
        title: "Wedding Date Prediction",
        text: shareText,
        url: window.location.href,
      })
      .catch((err) => console.log("Share cancelled:", err));
  } else if (navigator.clipboard) {
    navigator.clipboard
      .writeText(shareText)
      .then(() => alert("📋 Prediction copied to clipboard!"))
      .catch(() => alert("Please copy this text:\n\n" + shareText));
  } else {
    alert("Please copy this text:\n\n" + shareText);
  }
}

function resetPrediction() {
  const friendName = document.getElementById("friendName");
  const resultSection = document.getElementById("resultSection");

  if (friendName) friendName.value = "";
  if (resultSection) resultSection.style.display = "none";
  if (friendName) friendName.focus();

  const statusEl = document.getElementById("formStatus");
  if (statusEl) statusEl.remove();
}

// ===========================================
// CONTACT.HTML SPECIFIC CODE
// ===========================================

// Contact form submission
function handleContactFormSubmit(e) {
  e.preventDefault();

  console.log("📤 Submitting contact form...");

  const form = e.target;
  const formData = new FormData(form);

  console.log("Contact form data:", {
    name: formData.get("entry.1908041648"),
    email: formData.get("entry.1913086381"),
    subject: formData.get("entry.623909516"),
    message: formData.get("entry.578056595"),
  });

  const submitBtn = form.querySelector(".submit-btn");
  if (submitBtn) {
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 3000);
  }

  const iframe = document.createElement("iframe");
  iframe.name = "contactFormSubmission";
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  form.target = "contactFormSubmission";

  try {
    form.submit();
    console.log("✅ Contact form submitted!");

    const successMsg = document.getElementById("successMessage");
    if (successMsg) {
      successMsg.style.display = "block";
      successMsg.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    form.reset();

    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 3000);
  } catch (error) {
    console.error("❌ Contact form error:", error);

    const successMsg = document.getElementById("successMessage");
    if (successMsg) {
      successMsg.innerHTML =
        '<i class="fas fa-exclamation-triangle"></i> Failed to send. Please try again.';
      successMsg.style.background = "#f44336";
      successMsg.style.display = "block";
    }
  }
}

// ===========================================
// UNIVERSAL INITIALIZATION
// ===========================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Website initialized");

  // ========== INDEX.HTML INIT ==========
  const friendNameInput = document.getElementById("friendName");
  if (friendNameInput) {
    console.log("📊 Wedding Predictor page detected");

    friendNameInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") predictWedding();
    });

    const savedCount = localStorage.getItem("predictionCount");
    if (savedCount) {
      const predictionCountEl = document.getElementById("predictionCount");
      if (predictionCountEl) {
        predictionCountEl.textContent = parseInt(savedCount).toLocaleString();
      }
    }
  } // This closing brace was missing!

  // ========== CONTACT.HTML INIT ==========
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    console.log("📞 Contact page detected");

    contactForm.addEventListener("submit", handleContactFormSubmit);
  }

  // ========== ADD CSS ANIMATIONS ==========
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    .result-section {
      animation: fadeIn 0.5s ease;
    }
    
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .fa-spinner {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});
