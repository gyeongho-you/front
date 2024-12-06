const links = document.querySelectorAll(".pr_link");

links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        location.href = `product.html?${event.currentTarget.getAttribute("data-value")}`;
    })
})