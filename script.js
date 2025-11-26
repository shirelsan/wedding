// =====================
// ספירת אורחים
// =====================
let guestCount = 1;

function increaseGuests() {
    guestCount++;
    document.getElementById("guestCount").innerText = guestCount;
}

function decreaseGuests() {
    if (guestCount > 1) guestCount--;
    document.getElementById("guestCount").innerText = guestCount;
}

// =====================
// שליחת טופס RSVP
// =====================
function submitRSVP(attending) {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const guests = parseInt(document.getElementById("guestCount").innerText);

    // בדיקה שכל השדות מלאים
    if (!firstName || !lastName || !phone) {
        alert("אנא מלא את כל השדות");
        return;
    }

    // בניית URL עם פרמטרים
    const url =
        "https://script.google.com/macros/s/AKfycbwwBoTRzry-IQg6nKDQiXHYmgYHO6ZnyJlP8YJII_ecFQnHjNWZmj1lr4VC6KVLBuwplw/exec" +
        `?firstName=${encodeURIComponent(firstName)}` +
        `&lastName=${encodeURIComponent(lastName)}` +
        `&phone=${encodeURIComponent(phone)}` +
        `&guests=${guests}` +
        `&attending=${attending}`;

    // שליחת הנתונים ב-Fetch
    fetch(url)
        .then(() => {
            // הסתרת הטופס והצגת הודעת הצלחה
            document.getElementById("rsvpForm").style.display = "none";
            document.getElementById("successMessage").classList.add("active");
        })
        .catch((err) => {
            console.error("Fetch error:", err);
            alert("אירעה שגיאה בשליחת הטופס, נסה/י שוב");
        });
}
