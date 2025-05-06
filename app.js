//working
//////////KUCH CHEZA FETCH KARNE HAI DOM SE ////////////
let h2 = document.querySelector("h2");
////////////////////////////////////////////////////////

// we have 4 buttons
// 1>. keypress per game start hoga 
// 2>. --> level1 ho jai + button flash ho jai
// 3>. btn press then we will check (user value <--> game ke andar jo chal rha hai) kya vo align ho rha hai
// 4>. check in preview agar same hai toh levelup kardo vrna GameOver krdo

// yah game aur user ka seq ka track rakhega 
let gameSeq = [];
let userSeq = [];
let btns = ["yellow","purple","green","red"];

//yah start hua abhi yah nhi aur level konsa hai vo check rahega
let started = false;
let level = 0;

//Ab yah hua ki humne jaise hi screen per koi key press karenga 
//vaise hii game start ho jaiga aur started wla falg ko false kardo 
// becoz game ek baar hii start ho skta hai 
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;
        levelup();
    }
})

// Ab hum flash button aur level up button banaenga
// 1>.jo level ki value hai vo update ho jaige screen pe
// 2>.aur koi bhi random button flash hoga yahan per 
// 3>. button flash karne ke liya ek function bana leta hai 
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash")
    },250);
}
function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`

    //random btn choose
    let ranInx = Math.floor(Math.random()*3); 
    let randColor = btns[ranInx];
    let randbtn =  document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

//ab hum dakhenga ki eventListeners ko lagaenga yahan per 
function checkAns (index){
    // console.log("curr level ->",level);
    
    if(userSeq[index] === gameSeq[index]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup,1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</br></br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}
function btnPress(){ 
    let btn = this;
    userFlash(btn);

    userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
