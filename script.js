function submitRSVP(attending) {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const guests = guestCount;

    if (!firstName || !lastName || !phone) {
        alert("אנא מלא את כל השדות");
        return;
    }

    const url =
        "https://script.google.com/macros/s/AKfycbwwBoTRzry-IQg6nKDQiXHYmgYHO6ZnyJlP8YJII_ecFQnHjNWZmj1lr4VC6KVLBuwplw/exec" +
        `?firstName=${encodeURIComponent(firstName)}` +
        `&lastName=${encodeURIComponent(lastName)}` +
        `&phone=${encodeURIComponent(phone)}` +
        `&guests=${guests}` +
        `&attending=${attending}`;

    fetch(url)
        .then(() => {
            document.getElementById("rsvpForm").style.display = "none";
            document.getElementById("successMessage").classList.add("active");
        })
        .catch((err) => {
            console.error("Fetch error:", err);
            alert("אירעה שגיאה בשליחת הטופס");
        });
}
