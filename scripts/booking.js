// SELECT HTML ELEMENTS
const bookingForm = document.getElementById("booking-form");

const departureDate = document.getElementById("departure-date");
const returnDate = document.getElementById("return-date");

const oneWay = document.getElementById("one-way");
const roundTrip = document.getElementById("round-trip");

const confirmationMessage = document.getElementById("confirmation-message");
const newBookingButton = document.getElementById("new-booking");

const currentYear = document.getElementById("current-year");

// DISPLAY CURRENT YEAR
currentYear.textContent = new Date().getFullYear();

// GET TODAY'S DATE IN YYYY-MM-DD FORMAT
function getTodayDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// PREVENT USERS FROM SELECTING A PAST DEPARTURE DATE
departureDate.min = getTodayDate();

// UPDATE RETURN DATE
function updateReturnDate() {
  returnDate.min = departureDate.value || getTodayDate();

  if (returnDate.value && returnDate.value < returnDate.min) {
    returnDate.value = "";
  }

  returnDate.setCustomValidity("");
}

departureDate.addEventListener("change", updateReturnDate);

// UPDATE TRAVEL TYPE
function updateTravelType() {
  if (roundTrip.checked) {
    returnDate.required = true;
  } else {
    returnDate.required = false;
    returnDate.setCustomValidity("");
  }
}

oneWay.addEventListener("change", updateTravelType);
roundTrip.addEventListener("change", updateTravelType);

// CHECK RETURN DATE
returnDate.addEventListener("change", function () {
  if (
    returnDate.value &&
    departureDate.value &&
    returnDate.value < departureDate.value
  ) {
    returnDate.setCustomValidity(
      "Return date cannot be before departure date.",
    );
  } else {
    returnDate.setCustomValidity("");
  }
});

// HANDLE FORM SUBMISSION
bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  updateTravelType();

  if (!bookingForm.reportValidity()) {
    return;
  }

  confirmationMessage.hidden = false;

  confirmationMessage.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  bookingForm.reset();

  departureDate.min = getTodayDate();
  returnDate.min = getTodayDate();

  updateTravelType();
});

// START A NEW BOOKING
newBookingButton.addEventListener("click", function () {
  confirmationMessage.hidden = true;

  bookingForm.reset();

  departureDate.min = getTodayDate();
  returnDate.min = getTodayDate();

  updateTravelType();

  bookingForm.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
