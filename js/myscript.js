const numberBombs = 16;
const btnPlay = document.getElementById("my-btn-play");
btnPlay.addEventListener("click", function(){
    
    const gridContainer = document.querySelector(".my-grid-container");
    
    // ogni volta che clicco play resetto tutto
    // # reset to " " of the innerHtml under the div.my-grid-container
    gridContainer.innerHTML = "";
    
    
    let selectValue = document.getElementById("my-select").value;
    
    if (selectValue == 1){
        // % without the function
        /*for(let i = 0; i < 100; i++){
            let divElement = document.createElement("div");
            gridContainer.appendChild(divElement);
            divElement.classList.add("my-grid-square", "my-grid-square-one");
            divElement.innerHTML = i + 1;
            
            divElement.addEventListener("click", function(){
                divElement.classList.add("background-red"); 
            });  
        } */
        
        drawBox(gridContainer,"my-grid-square","my-grid-square-one","background-orange",100,false);
        
    } else if(selectValue == 2) {
        // % without the function
        /*  for(let i = 0; i <81; i++){
            let divElement = document.createElement("div");
            gridContainer.appendChild(divElement);
            divElement.classList.add("my-grid-square", "my-grid-square-two");
            divElement.innerHTML = i + 1;
            
            divElement.addEventListener("click", function(){
                divElement.classList.add("background-blue"); 
            });
        } */
        drawBox(gridContainer,"my-grid-square","my-grid-square-two","background-blue",81, false);
        
    } else if (selectValue == 3){
        // % without the function
        /*  for(let i = 0; i <49; i++){
            let divElement = document.createElement("div");
            gridContainer.appendChild(divElement);
            divElement.classList.add("my-grid-square", "my-grid-square-three");
            divElement.innerHTML = i + 1;
            
            divElement.addEventListener("click", function(){
                divElement.classList.add("background-green"); 
            });
        } */
        
        drawBox(gridContainer,"my-grid-square","my-grid-square-three","background-green",49,false);
        
    } else {
        console.log("scegli");
    }
    
});


/**
* 
* Function that given an  outsideElement,
* creates N  <div></div> elements,
* each <div> element has classNameOne and classNameTwo,
* inside each <div> is written the number through the variable i,
* inside element has an eventListener that add a classNameThree to itself
* 
* @param {*} outsideElement outside element to which you is added the <div>
* @param {*} classNameOne first calss name for the insideElement(<div>)
* @param {*} classNameTwo second class name for the insideElement(<div>)
* @param {*} classNameThree class added with the eventListener
* @param {*} N value of how many numbers you want  
*/
// % random + drowbox

// quanti sono i casi possibili quando clicchiamo? 2 : o ?? una bomba o non ?? una bomba
// nel caso in cui clicco su una bomba


function drawBox(outsideElement,classNameOne,classNameTwo,classNameThree,N,gameOver){
    const arrayNumbersFunction = randomNumber(N,1);
    console.log(arrayNumbersFunction);
    // # creates an array of 16 numbers each one between a range (1 and numberOfSquares(THAT I CALLED N))
    const arrayBombs = randomNumber(numberBombs,1);
    
    let score = 0;
    console.log(arrayBombs);
    
    const arrayOfDiv = [];
    for (let i = 0; i < N ;i++){
        let insideElement = document.createElement("div");
        arrayOfDiv.push(insideElement);
        outsideElement.appendChild(insideElement);
        insideElement.classList.add(classNameOne,classNameTwo);
        
        
        /* checkNumberBomb(arrayBombs, arrayNumbersFunction[i],"back-bomb",classNameThree,insideElement) */
        // ?? event click and the background changes
        insideElement.addEventListener("click", function() {
            if(!gameOver){
                // # check if the Number inside the square is equal to a bomb number
                insideElement.innerHTML = arrayNumbersFunction[i];
                if(!checkNumberBomb(arrayBombs, arrayNumbersFunction[i])){
                    insideElement.classList.add(classNameThree);
                    score ++;
                    document.getElementById("my-output-score").innerHTML = "Hai vinto, score " + score;
                } else {
                    checkArray (arrayBombs,arrayNumbersFunction,arrayOfDiv,"back-bomb"); 
                    insideElement.classList.add("back-bomb"); 
                    document.getElementById("my-output-score").innerHTML = "Hai perso " + score;
                    gameOver = true;
                } 
                
                
            }
        });
    }
    
    console.log(arrayOfDiv);
}

/**
* Function that creates N unique numbers from minimun(min) value to N(maximun)
* 
* @param {*} N how many numbers you would like and max value 
* @param {*} min minmun value of your numbers array
* @returns 
*/

function randomNumber(N,min){
    const arrayNumbers = [];
    while(arrayNumbers.length < N){
        let number = Math.floor(Math.random() * N + min);
        while(!arrayNumbers.includes(number)){
            arrayNumbers.push(number);
        }
    }
    return arrayNumbers;
    
}


// # check if the Number inside the square is equal to a bomb number
function checkNumberBomb (array,number){
    for(let i = 0; i < array.length; i++){
        if(array.includes(number)){
            return true;
        } 
    }
}


/* checkArray (arrayBombs,arrayNumbersFunction,arrayOfDiv,"back-bomb"); */
function checkArray (array,arrayToCheck,arrayParent,classBomb){
    for(let i = 0; i < arrayToCheck.length; i++){
        if(array.includes(arrayToCheck[i])){
            arrayParent[i].classList.add(classBomb);
            arrayParent[i].innerHTML = arrayToCheck[i];
        } 
    }

    console.log(arrayToCheck);
    console.log(array);
    console.log(arrayParent);
} 



