document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // 1. Service card UI toggle
    // -------------------------
    const blocks = document.querySelectorAll(".service-block");

    blocks.forEach(block => {
        block.setAttribute("tabindex", "0");

        const toggle = () => {
            const isActive = block.classList.contains("active");

            blocks.forEach(b => b.classList.remove("active"));

            if (!isActive) {
                block.classList.add("active");
            }
        };

        block.addEventListener("click", toggle);

        block.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        });
    });

    // -------------------------
    // 2. URL params
    // -------------------------
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const packageParam = params.get("package");

    // -------------------------
    // 3. Package prefill
    // -------------------------
    const packageSelect = document.getElementById("packageSelect");
    if (packageParam && packageSelect) {
        packageSelect.value = packageParam;
    }

    // -------------------------
    // 4. Service prefill
    // -------------------------
    if (service) {
        document.querySelectorAll('input[name="services"]').forEach(cb => {
            if (cb.value === service) {
                cb.checked = true;

                const details = cb.closest("details");
                if (details) details.open = true;
            }
        });
    }

    // -------------------------
    // 5. Button navigation
    // -------------------------
    document.querySelectorAll(".service-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const service = btn.dataset.service;
            window.location.href = `get-started.html?service=${encodeURIComponent(service)}`;
        });
    });

});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}



function sendToWhatsApp() {

    const packageSelected = document.querySelector('select[name="selected"]')?.value || "Not specified";
    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked'))
        .map(checkbox => checkbox.value)
        .join(", ") || "Not specified";
    
    const selected = `Package: ${packageSelected} | Services: ${selectedServices}`;
    const name = document.querySelector('input[name="name"]').value || "No name";
    const email = document.querySelector('input[name="email"]').value || "No email";
    const business = document.querySelector('input[name="business"]').value || "No business";
    const message = document.querySelector('textarea[name="message"]').value || "No message";

    const timestamp = new Date().toLocaleString();

    const text =
`🚀 *NEW SITEPILOT LEAD*

📦 Request: ${selected}

👤 Name: ${name}
🏢 Business: ${business}
📧 Email: ${email}

📝 Message:
${message}

⏱ Submitted: ${timestamp}

---
Reply with:
1. Budget range
2. Timeline
3. Next steps`;

    const phone = "27760110441";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
}

function validateForm() {
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;

    if (!name || !email) {
        alert("Please fill in your name and email first.");
        return false;
    }

    return true;
}

function redirectAfterSubmit() {
    setTimeout(() => {
        window.location.href = "success.html";
    }, 500);
}


