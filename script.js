document.addEventListener("DOMContentLoaded", () => {

    const blocks = document.querySelectorAll(".service-block");

    blocks.forEach(block => {
        block.addEventListener("click", () => {

            blocks.forEach(b => {
                if (b !== block) b.classList.remove("active");
            });

            block.classList.toggle("active");
        });
    });

});