const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const score = document.querySelector("#score");
const combo = document.querySelector("#combo");
const life = document.querySelector("#life");
const startBtn = document.querySelector("button");
const ranking = document.querySelector("#rank_list");
const playtime = document.querySelector("#time");
const verdict = document.querySelector("#verdict")
let score_num = 0;
let combo_num = 0;
let life_num = 10;
let playing = false;
let start_id;
let many = 100;
let time = 0;
let savetime = 0;

const rankingArr = [];
const nodefirst = [];
const nodesecond = [];
const nodethird = [];
const nodefourth = [];



// 리듬게임 노드
class Node{
    constructor (number){
        this.number = number+37;
        this.x = 300 + number*100;
        this.y = 10;
        this.w = 100;
        this.h = 100;
    }
    drow (){
        ctx.clearRect(this.x,this.y-10,this.w,this.h);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    move (){
        this.y += 10;
        this.drow();
    }
    removeNode(){
        ctx.clearRect(this.x,this.y,this.w,this.h);
    }
}

// 랭킹
class Rank{
    constructor (name, score){
        this.name = name;
        this.score = score;
    }
}

//랜덤 노드 위치 생성
function randomNode(){
    return Math.floor(Math.random()*4);
}

//랜덤 노드 생성
function createNode() {

    switch(randomNode()){
        case 0:
            let node1 = new Node(0);
            node1.drow();
            nodefirst.push(node1);
            break;
        case 1:
            let node2 = new Node(1);
            node2.drow();
            nodesecond.push(node2);
            break;
        case 2:
            let node3 = new Node(2);
            node3.drow();
            nodethird.push(node3);
            break;
        case 3:
            let node4 = new Node(3);
            node4.drow();
            nodefourth.push(node4);
            break;
    }
    
}

// 노드 움직임
function moveNode() {
    let removeFirst = false;
    let removeSecond = false;
    let removeThird = false;
    let removeFourth = false;
// 
    nodefirst.forEach((node) => {
        node.move();
        if(node.y >= 670){
            node.removeNode();
            removeFirst = true;
        }
    })
    nodesecond.forEach((node) => {
        node.move();
        if(node.y >= 670){
            node.removeNode();
            removeSecond = true;
        }
    })
    nodethird.forEach((node) => {
        node.move();
        if(node.y >= 670){
            node.removeNode();
            removeThird = true;
        }
    })
    nodefourth.forEach((node) => {
        node.move();
        if(node.y >= 670){
            node.removeNode();
            removeFourth = true;
        }
    })

    //범위를 넘어가면 노드 삭제 및 콤보 초기화
    if(removeFirst){
        nodefirst.shift();
        combo_num = 0;
        life_num--;

        combo.textContent = 0;
        life.textContent = life_num;
        verdict_write(1);
    }
    if(removeSecond){
        nodesecond.shift();
        combo_num = 0;
        life_num--;

        combo.textContent = 0;
        life.textContent = life_num;
        verdict_write(1);
    }
    if(removeThird){
        nodethird.shift();
        combo_num = 0;
        life_num--;

        combo.textContent = 0;
        life.textContent = life_num;
        verdict_write(1);
    }
    if(removeFourth){
        nodefourth.shift();
        combo_num = 0;
        life_num--;

        combo.textContent = 0;
        life.textContent = life_num;
        verdict_write(1);
    }
}

//게임 시작
function start() {
    if(time%1000 == 0 && many != 10){
        many -= 10;
        time = 0;
    }
    canvas.focus();

    time ++;
    savetime ++;

    if(time%many == 0){
        createNode();
    }

    if(life_num <= 0){
        life.textContent = 0;
        end();
        return;
    }

    playtime.textContent = savetime;
    moveNode();

    start_id = requestAnimationFrame(start);
}

//게임 종료
function end() {
    cancelAnimationFrame(start_id);

    playing = !playing;
    let join = false;
    nodefirst.length = 0;
    nodesecond.length = 0;
    nodethird.length = 0;
    nodefourth.length = 0;
    ctx.clearRect(0,0,912,860);

    for(let i = 0; i<rankingArr.length; i++){
        if(rankingArr[i].score < score_num){
            rankingArr.splice(i,0,new Rank(prompt("랭킹에 올라갈 이름을 입력해 주세요."), score_num));
            join = !join;
            break;
        }
    }

    if(!join && rankingArr.length < 5){
        rankingArr.push(new Rank(prompt("랭킹에 올라갈 이름을 입력해 주세요."), score_num));
    }

    if(rankingArr.length > 5){
        rankingArr.pop();
    }

    ranking.replaceChildren();

    // 새롭게 생성
    rankingArr.forEach((rank) => {
        const li = document.createElement("li");
        li.textContent = `${rank.name} : ${rank.score}`
        ranking.appendChild(li);
    })

}



function checkNode(node){
    node.removeNode();
    const standers = node.y;
    if(standers <=560){
        // 미스
        life_num--;
        combo_num = 0;
        verdict_write(1);
    }else if(standers <= 600){
        // good
        score_num += combo_num*20 + 100;
        combo_num++;
        verdict_write(2);
    }else if(standers <= 620 || standers >= 640){
        // greate
        score_num += combo_num*40 + 400;
        combo_num++;
        verdict_write(3);
    }else{
        //excellent
        score_num += combo_num*100 + 800;
        combo_num++;
        verdict_write(4);
    }
    combo.textContent = combo_num;
    score.textContent = score_num;
    life.textContent = life_num;
}

function verdict_write(num){
    switch(num){
        case 1:
            verdict.style.color = "gray";
            verdict.textContent = "MISS"
            break;
        case 2:
            verdict.style.color = "yellow";
            verdict.textContent = "GOOD"
            break;
        case 3:
            verdict.style.color = "green";
            verdict.textContent = "GREATE"
            break;
        case 4:
            verdict.style.color = "BLUE";
            verdict.textContent = "EXCELLENT"
            break;
        
    }
}

canvas.addEventListener("keydown",(event) => {
    switch(event.keyCode){
        case 37: // 왼쪽 화살표 키
            if(nodefirst.length > 0){
                checkNode(nodefirst.shift());
            }
            break;
        case 38: // 위쪽 화살표 키
            if(nodesecond.length > 0){
                checkNode(nodesecond.shift());
            }
            break;
        case 39: // 오른쪽 화살표 키
            if(nodethird.length > 0){
                checkNode(nodethird.shift());
            }
            break;
        case 40: // 아래쪽 화살표 키
            if(nodefourth.length > 0){
                checkNode(nodefourth.shift());
            }
            break;
    }
})

startBtn.addEventListener("click", () => {
    if(!playing){
        canvas.focus();
        //실행중이 아니면 시작
        playtime.textContent = 0;
        combo_num = 0;
        score_num = 0;
        life_num = 10;
        many = 100;
        time = 0;
        savetime = 0;

        combo.textContent = 0;
        score.textContent = 0;
        life.textContent = 10;

        start();
        playing = !playing;
    }
})
