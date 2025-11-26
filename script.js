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

// שליחת טופס RSVP
function submitRSVP(attending) {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const guests = guestCount;

    if (!firstName || !lastName || !phone) {
        alert("אנא מלא את כל השדות");
        return;
    }

    // אנחנו נשלח כ-form-urlencoded כדי להימנע מ-preflight CORS
    const params = new URLSearchParams();
    params.append('firstName', firstName);
    params.append('lastName', lastName);
    params.append('phone', phone);
    params.append('guests', guests);
    params.append('attending', attending ? 'true' : 'false');

    fetch("https://script.google.com/macros/s/AKfycbwwBoTRzry-IQg6nKDQiXHYmgYHO6ZnyJlP8YJII_ecFQnHjNWZmj1lr4VC6KVLBuwplw/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: params.toString()
    })
    .then(response => response.json())
    .then(result => {
        if (result.result === "success") {
            document.getElementById("rsvpForm").style.display = "none";
            document.getElementById("successMessage").classList.add("active");
        } else {
            console.error("Server error:", result);
            alert("אירעה שגיאה בשליחת הטופס, נסי שוב.");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("אירעה שגיאה בשליחת הטופס, נסי שוב.");
    });
}
