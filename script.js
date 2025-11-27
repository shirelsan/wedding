// ספירת אורחים
let guestCount = 1;

function increaseGuests() {
    guestCount++;
    document.getElementById("guestCount").innerText = guestCount;
}

function decreaseGuests() {
    if (guestCount > 1) guestCount--;
    document.getElementById("guestCount").innerText = guestCount;
}

function submitRSVP(attending) {

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const notes = document.getElementById("notes").value.trim();
    const guests = parseInt(document.getElementById("guestCount").innerText);

    if (!firstName || !lastName) {
        alert("אנא מלא שם פרטי ומשפחה");
        return;
    }

    // כפתורים במצב טעינה
    const buttons = document.querySelectorAll('.submit-buttons .btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });

    const clickedButton = event.target;
    const originalText = clickedButton.innerHTML;
    clickedButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';

    const url = "https://script.google.com/macros/s/AKfycbxuO-E1vOaXzrX3x2y2-OhL4F-xn4Ueh5dIQ2nV_wFxdkNIZHxz_oMxTuilhwchhOjU/exec" +
        `?firstName=${encodeURIComponent(firstName)}` +
        `&lastName=${encodeURIComponent(lastName)}` +
        `&notes=${encodeURIComponent(notes)}` +
        `&guests=${guests}` +
        `&attending=${attending}`;

    fetch(url, { method: 'GET', redirect: 'follow' })
        .then(response => response.json())
        .then(result => {
            if (result.result === "success") {
                document.querySelector(".rsvp-section").style.display = "none";
                document.getElementById("successMessage").classList.add("active");
            } else {
                alert("שגיאה בשליחה: " + (result.message || ""));
                buttons.forEach(btn => { btn.disabled = false; btn.style.opacity = '1'; });
                clickedButton.innerHTML = originalText;
            }
        })
        .catch(err => {
            alert("אירעה שגיאה בעת השליחה. נסה שוב.");
            buttons.forEach(btn => { btn.disabled = false; btn.style.opacity = '1'; });
            clickedButton.innerHTML = originalText;
        });
}

