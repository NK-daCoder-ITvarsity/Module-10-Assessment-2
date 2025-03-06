const menuBtns = document.querySelectorAll(".menu-btn");
const menuDropdowns = document.querySelectorAll(".menu-dropdown");

menuBtns.forEach(button => {
    button.addEventListener("click", () => {
        const getTargetAttribute = button.getAttribute("data-section");

        menuDropdowns.forEach(section => {
            if (section.id === getTargetAttribute) {
                section.classList.toggle("hidden")
            }
        })
    })
})