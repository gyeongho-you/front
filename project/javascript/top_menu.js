const company = document.querySelector("#com_ex");
const buy = document.querySelector("#buy_pr");
const question_view = document.querySelector("#q_a");

const change_menu_in_bg = (num)=>{
    switch(num){
        case 1:
            company.style.textDecoration = "underline"
            company.style.fontWeight = "bold"
            break;
        case 2:
            buy.style.textDecoration = "underline"  
            buy.style.fontWeight = "bold"
            break;
        case 3:
            question_view.style.textDecoration = "underline"
            question_view.style.fontWeight = "bold"
            break;
    }
}

const change_menu_out_bg = (num)=>{
    switch(num){
        case 1:
            company.style.textDecoration = "none"
            company.style.fontWeight = "normal"
            break;
        case 2:
            buy.style.textDecoration = "none"
            buy.style.fontWeight = "normal"
            break;  
        case 3:
            question_view.style.textDecoration = "none"
            question_view.style.fontWeight = "normal"
            break;
    }
}

company.addEventListener("mouseenter", () => change_menu_in_bg(1));
company.addEventListener("mouseleave", () => change_menu_out_bg(1));

buy.addEventListener("mouseenter", () => change_menu_in_bg(2));
buy.addEventListener("mouseleave", () => change_menu_out_bg(2));

question_view.addEventListener("mouseenter", () => change_menu_in_bg(3));
question_view.addEventListener("mouseleave", () => change_menu_out_bg(3));


