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
    const phone = document.getElementById("phone").value.trim(); // זה עכשיו ההערות
    const guests = parseInt(document.getElementById("guestCount").innerText);
    
    // בדיקה רק של שם פרטי ושם משפחה - ההערות לא חובה
    if (!firstName || !lastName) {
        alert("אנא מלא את שם פרטי ושם משפחה");
        return;
    }
    
    // הצגת אינדיקטור טעינה
    const buttons = document.querySelectorAll('.submit-buttons .btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });
    
    // שינוי טקסט הכפתור
    const clickedButton = event.target;
    const originalText = clickedButton.innerHTML;
    clickedButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
    
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
                // החזרת הכפתורים למצב רגיל
                buttons.forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                });
                clickedButton.innerHTML = originalText;
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("אירעה שגיאה בשליחת הטופס, נסה/י שוב");
            // החזרת הכפתורים למצב רגיל
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = '1';
            });
            clickedButton.innerHTML = originalText;
        });
}
