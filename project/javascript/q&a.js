const reciveData = location.href.split("?");
const table = document.querySelector("#my_question");

const addTable = (title) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.textContent = 1;
    td2.textContent = title;
    td3.textContent = 0;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    table.appendChild(tr);
}

if(reciveData.length === 2){ // 길이가 2라면 (들어온 값이 있으면)
    const result = reciveData[1].split("&");

    result.forEach((text) => {
        if(text.indexOf("title") > -1){
            
            addTable(decodeURI(text.split("=")[1]));
        }
    })
}