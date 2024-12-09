
const radios = document.querySelectorAll("[name=head_img]");
const top_bg = document.querySelector("#top");
let number = 1;

const change_bg = (value) => {
    if(value > 3){
        value = 1;
    }
    
    switch(Number(value)){
        case 1:
            top_bg.style.backgroundImage = "url('images/head_bg.jpg')"
            number = 1;
            break;
        case 2:
            top_bg.style.backgroundImage = "url('images/head_bg2.PNG')"
            number = 2;
            break;
        case 3:
            top_bg.style.backgroundImage = "url('images/head_bg3.PNG')"
            number = 3;
            break;
    }
}

const change_bg_time = () => {
    setInterval(() => {change_bg(++number)}, 10000);
}

change_bg_time();


radios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
        change_bg(event.currentTarget.value);
    })
})





