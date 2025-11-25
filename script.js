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
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const guests = guestCount;

    if (!firstName || !lastName || !phone) {
        alert("אנא מלא את כל השדות");
        return;
    }

    const data = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        guests: guests,
        attending: attending
    };

    fetch("https://script.google.com/macros/s/AKfycbwwBoTRzry-IQg6nKDQiXHYmgYHO6ZnyJlP8YJII_ecFQnHjNWZmj1lr4VC6KVLBuwplw/exec", {  
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.result === "success") {
            document.getElementById("rsvpForm").style.display = "none";
            document.getElementById("successMessage").classList.add("active");
        } else {
            alert("אירעה שגיאה בשליחת הטופס, נסה שוב.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("אירעה שגיאה בשליחת הטופס, נסה שוב.");
    });
}
