const random = [];
let count=0;
let winCount =71;
let bombCount = 10;
const N= 81;
generateBomb();

function generateBomb(){
  for(var i=0;i < bombCount; i++){
    let temp = Math.floor(Math.random() * 81) + 1;
    while(random.includes(temp)){
        temp = Math.floor(Math.random() *  81) + 1;
    }
    random.push(temp);
  }
}
for(var i = 1; i<= N;i++){
      var cell = document.createElement("div");
      cell.setAttribute("class","cell");
      cell.setAttribute("id","cell_"+i);
      cell.addEventListener("click",cellClick);
      document.getElementById("grid").appendChild(cell);
  }

function cellClick(cell) {
  let c=Number(cell.target.getAttribute("id").slice(5));
  var bc=bomb_clicked(c);
  if(bc){
    loose();
  }
  else{
    count++;
    document.getElementById("gameScore").innerHTML = count;
    cellColorChange(c);
  }
  
  if(count == winCount){
    win();
  }
}
function bomb_clicked(num){
  if(random.includes(num)){
    return true;
  }
  else{
    return false;
  }
}
function loose(){
  showBomb();
  removeListener();
  document.getElementById("resultDisplay").innerHTML="game over";
}
function cellColorChange(num) {
  document.getElementById("cell_"+num).style.backgroundColor="green";
  document.getElementById("cell_"+num).removeEventListener("click",cellClick);
}
function win(){
  document.getElementById("resultDisplay").innerHTML="win";
  removeListener();
}
function showBomb(){
    for(let i=0;i<bombCount;i++){
      document.getElementById("cell_"+random[i]).style.backgroundImage=
        "url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)";
       document.getElementById("cell_"+random[i]).style.backgroundSize="cover";
      document.getElementById("cell_"+random[i]).style.backgroundColor="red";
      
    }
}
function removeListener() {
  for(let i=1;i<=N;i++){
    document.getElementById("cell_"+i).removeEventListener("click",cellClick);
  }
}

function reset(){
  resetCell();
  resetScore()
  addListener();
  
}

function resetCell(){
  for(let i=1;i<= N;i++){
    document.getElementById("cell_"+i).style.backgroundImage="";
    document.getElementById("cell_"+i).removeAttribute("style");
  }
  count=0;
  while(random.length > 0){
    random.pop();
  }
  generateBomb();
}
function resetScore(){
  document.getElementById("resultDisplay").innerHTML="";
  document.getElementById("gameScore").innerHTML="";
}
function addListener(){
  for(let i=1;i<=N;i++){
    var cell=document.getElementById("cell_" + i);
    cell.addEventListener("click",cellClick);
  }
}