// Set the offer expiration time (3 hours in milliseconds)
const offerDuration = 3 * 60 * 60 * 1000;
let timer;


async function startOfferTimer() {
  try {
    // Fetch the offer start time (timestamp) from the server
    const response = await fetch('https://script.google.com/macros/s/AKfycby0bn9hw_DWWqUBkL2QFTPxFivJLunDJ-axPortxxYxbeoPrSm7P2sT1bZadFHw1IhK/exec?action=getTimestamp');
    const result = await response.json();

    if (result.success) {
      const startTime = new Date(result.startTime);
      const now = new Date();
      const timeLeft = offerDuration - (now - startTime);
      // Log the calculated times for debugging
      console.log("Start time:", startTime);
      console.log("Current time:", now);
      console.log("Time left:", timeLeft);

      // Check if the offer has expired

      if (timeLeft <= 0) {
        document.getElementById('offer-form').style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        document.getElementById('offer-expired').style.display = 'block';
      } else {
        let countdown = timeLeft / 1000;
        // Start countdown timer with interval logging
          const timerInterval = setInterval(() => {
          if (countdown <= 0) {
            clearInterval(timerInterval);
            document.getElementById('offer-form').style.display = 'none';
            document.getElementById('timer').style.display = 'none';
            document.getElementById('offer-expired').style.display = 'block';
          } else {
            const hours = Math.floor(countdown / 3600);
            const minutes = Math.floor((countdown % 3600) / 60);
            const seconds = Math.floor(countdown % 60);
            document.getElementById('time-left').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            countdown--;

            // Log remaining time in the countdown for debugging
            console.log(`Countdown - Time left: ${hours}:${minutes}:${seconds}`);
          }
        }, 1000);
      }
    } else {
      document.getElementById('timer').innerText = "Could not retrieve offer start time.";
    }
  } catch (error) {
    console.error("Error starting countdown:", error);
    document.getElementById('timer').innerText = "Error loading timer.";
  }
}


