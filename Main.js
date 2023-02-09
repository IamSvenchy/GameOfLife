window.addEventListener("load", () => {gof()})
/*document.getElementById("run").addEventListener("click", () => {
    if(this.getAttribute("value") == "Start"){
        this.setAttribute("value", "Stop")
        
    }else if(this.getAttribute("value") == "Stop"){
        this.setAttribute("value", "Start")
    }
})
*/

let array = new Array(25);

for(var j = 0; j < array.length; j++){
    array[j] = new Array(25)
}

for(i = 0; i < array.length; i++){
    for(j = 0; j < array[i].length; j++){
        array[i][j] = false
    }
}


function gof(){
    let button = document.getElementById("run")
    button.addEventListener("click", (e) => {if(button.getAttribute("value") == "Start"){
        button.setAttribute("value", "Stop")
    }else{
        button.setAttribute("value", "Start")
    }})

    
    grid(array)
    array = updateGrid(array)
    drawArray(array)

    setInterval("run()", 500)
   
}


function grid(array){
    let container = document.querySelector(".mainContainer")
    for(i = 0; i < array.length;i++){
        for(j = 0; j < array[i].length;j++){
            container.innerHTML += "<div value = 'false' onclick='toggleStatus(this)' id="+ i+ "," + j +" background-color ='black' style = 'height:" + (container.clientHeight/array.length-1.5)  + "px; width: "+ (container.clientWidth/array.length-1.6)+  "px;'></div>"
        }
    }
}


//posodablja polje, ko je run aktiven
function updateGrid(array){
    let nov = new Array(25)

    for(i = 0; i < nov.length; i++){
        nov[i] = new Array(25)
    }

    for(i = 0; i < nov.length; i++){
        for(j = 0; j < nov[i].length; j++){
            nov[i][j] = false
        }
    }

    for(x = 1; x < array.length - 1; x++){
        for(y = 1; y < array[x].length - 1; y++){
            let st = 0;
            

            if(array[x][y+1] == true){
                st++
            }
            if(array[x][y-1] == true){
                st++
            }
            if(array[x+1][y] == true){
                st++
            }
            if(array[x-1][y] == true){
                st++
            }
            if(array[x+1][y+1] == true){
                st++
            }
            if(array[x+1][y-1] == true){
                st++
            }
            if(array[x-1][y+1] == true){
                st++
            }
            if(array[x-1][y-1] == true){
                st++
            }

        
            if(array[x][y] == false && st == 3){
                nov[x][y] = true
            }
            else if(array[x][y] == true && (st == 3 || st == 2)){
                nov[x][y] = true
            } 
            else if(array[x][y] == true && st < 2 || st > 3){
                nov[x][y] = false
            }

        }
    }

    for(i = 0; i < array.length; i++){
        for(j= 0; j < array[i].length; j++){
            array[i][j] = nov[i][j];
        }
    }
    
    drawArray(array)

    return array;
}

//prebudi ali ubij polje
function toggleStatus(item){
    let div = document.getElementById(item.id)
    id = div.id.split(",")
    if(div.getAttribute("value") == "false"){
        array[id[0]][id[1]] = true
        div.style.backgroundColor = "black"
        div.setAttribute("value", "true")
    }else{
        div.style.backgroundColor = "white"
        div.setAttribute("value", "false")
        array[id[0]][id[1]] = false
    }
    
}


//začni ali končaj simulacijo
function run(){
    let button = document.getElementById("run")
    let run;
    if(button.getAttribute("value") == "Start"){
        run = false;
        //updateGrid(array)
        
    }else if(button.getAttribute("value") == "Stop"){
        run = true;
        updateGrid(array)
        
    }

    return run
}

function drawArray(array){
    for(i = 0; i < array.length; i++){
        for(j = 0; j < array[i].length; j++){
            let item = document.getElementById("" + i + "," + j +"")
            if(array[i][j] == true){
                item.style.backgroundColor = "black"
                item.setAttribute("value", "true")

            }else{
                item.style.backgroundColor = "white"
                item.setAttribute("value", "false")
                
            }
        }
    }
}
