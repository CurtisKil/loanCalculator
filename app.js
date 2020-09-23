// Listen for submit
// Add event listener to the form button by targeting its id and using the addEventListener method
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // Hide Results so spinner can do it's thing first
  document.getElementById("results").style.display = "none";

  // Show loader when calculate is clicked/submitted
  document.getElementById("loading").style.display = "block";

  // Show results after spinner spins for 2 seconds
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//   Calculate Results
function calculateResults() {
  console.log("Calculating...");
  //   Target all the stuff from the UI that you need
  //   By setting those things to variables by their id's
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  //   Calculations
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  //   Check if monthly calculation equals a finite number
  if (isFinite(monthly)) {
    // Here you insert the calculated values into the DOM
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show Results
    document.getElementById("results").style.display = "block";

    // Hide Loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check yo numbers");
  }
}

// Show Error
function showError(error) {
  // Before showing error hide results and loader
  document.getElementById("results").style.display = "none";

  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add Bootstrap Class
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //   Insert error above heading
  card.insertBefore(errorDiv, heading);

  //   Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
