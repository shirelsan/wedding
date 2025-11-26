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
    const phone = document.getElementById("phone").value.trim();
    const guests = parseInt(document.getElementById("guestCount").innerText);

    if (!firstName || !lastName || !phone) {
        alert("אנא מלא את כל השדות");
        return;
    }

    // ה-URL החדש
    const url = "https://script.google.com/macros/s/AKfycbwWXXfE_iIRLVA-25PTVL17kC0buFBubS0te6DqmUdihHukHK3fnt0Huz3SYS-VmlUL/exec" +
        `?firstName=${encodeURIComponent(firstName)}` +
        `&lastName=${encodeURIComponent(lastName)}` +
        `&phone=${encodeURIComponent(phone)}` +
        `&guests=${guests}` +
        `&attending=${attending}`;

    fetch(url, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => {
            if (result.result === "success") {
                document.querySelector(".rsvp-section").style.display = "none";
                document.getElementById("successMessage").classList.add("active");
            } else {
                alert("אירעה שגיאה בשליחת הטופס: " + (result.message || ""));
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("אירעה שגיאה בשליחת הטופס, נסה/י שוב");
        });
}
