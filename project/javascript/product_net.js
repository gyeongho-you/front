const reciveData = (location.href.split("?")[1]).split("&");
const pr_name = document.querySelector("#pr_name");
const sell_price = document.querySelector("#sell_price");
const list = document.querySelector("#buy_list");
const choice = document.querySelector("select");
const image = document.querySelector("#pr_img");
const all_price = document.querySelector("#all_price")
let cost = 0;

image.setAttribute("src",`images/product_${reciveData[0]}.PNG`);
pr_name.textContent = decodeURI(reciveData[1]);
sell_price.textContent = Number(reciveData[2]) + "원";

const addProduct = (option) => {
    const pr_list = document.createElement("li");
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");

    if(option.value === "0"){
        return;
    }

    switch(option.value){
        case"1":
            h2.textContent =`${decodeURI(reciveData[1])} (투명병)`;
            break;
        case"2":
            h2.textContent =`${decodeURI(reciveData[1])} (파란병)`;
            break;
    }
    h2.textContent += `  ${reciveData[2]}원`;
    h2.style.width = "300px"

    button.textContent = "취소";


    div.appendChild(h2);
    div.appendChild(button);

    pr_list.style.margin = "0px";
    pr_list.appendChild(div);

    list.appendChild(pr_list);

    cost += Number(reciveData[2]);

    all_price.textContent = `총 가격 : ${cost + 3000}원`

    button.addEventListener("click",() => {
        list.removeChild(pr_list);
        cost -= Number(reciveData[2]);
        if(cost === 0){
            all_price.textContent = `총 가격 : 0원`
        }else{
            all_price.textContent = `총 가격 : ${cost + 3000}원`
        }
        
    });

    choice.value = "";
}

choice.addEventListener("change", (event) => {
    const option = event.currentTarget.options[event.currentTarget.options.selectedIndex];
    addProduct(option);
});

