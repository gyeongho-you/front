
const radios = document.querySelectorAll("[name=head_img]");
const top_bg = document.querySelector("#top");

const change_bg = (value) => {
    switch(value){
        case "1":
            top_bg.style.backgroundImage = "url('images/head_bg.jpg')"
            break;
        case "2":
            top_bg.style.backgroundImage = "url('images/head_bg2.PNG')"
            break;
        case "3":
            top_bg.style.backgroundImage = "url('images/head_bg3.PNG')"
            break;
    }
}


radios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
        change_bg(event.currentTarget.value);
    })
})





