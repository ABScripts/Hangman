
var word = "";
var turns = 0;

function msetAttribute(element,name, value){
	if(element.length > 1){
		for(var i = 0;i<element.length;i++)
			element[i].setAttribute(name, value);
	}
	else
		element.setAttribute(name, value);
}
function mremoveAttribute(element, name){
	for(var i = 0;i<element.length;i++)
		element[i].removeAttribute(name);
}
 function search(char){
 var target = document.getElementsByTagName("button");  
 if(char != undefined){
	for(var i = 0;i<target.length;i++)
		if(target[i].innerHTML == char)return target[i];
	}
else return target;
 }
function returnChar(char){
	console.log("Turns: " + turns);

msetAttribute(search(char), "disabled", "disabled");
continueGame(char);
}
function getWord(index){
	var words = JSON.parse(data);																				//parse JSON-file
		word = (words[0].Data[index][Math.floor(Math.random() * words[0].Data[index].length) + 1]).toLowerCase(); 	//choose new word
		console.log(word);
				currentSolution = createNewMas(word.length);													//create new current solution array
				reSetParametrs(words, index);
				
}
function reSetParametrs(info, index){
	turns = 6;
	mremoveAttribute(search(), "disabled");
	updateById("inscription", currentSolution.toString());
	updateById("information-window", "");
	updateById("info", info[0].Data[index][0]);
}
function createNewMas(length){																					//function which creates
	var currentSolution = [];																					//new array fulled off by "_"
	for(var i = 0;i<length;i++){
		currentSolution[i] = "_";
	}
		return currentSolution;
}
function is(char, array){																						//function for checking char
	for(var i = 0;i<array.length;i++){																			//in word
		if(array[i] == char)return true;
	}
 return false;
}

function changeSolutionVariant(char){																			//function for changing current														
	for(var i = 0;i<word.length;i++){																			//state of SolutionVariant
		if(word[i] == char)currentSolution[i] = char;
	}
}
function updateById(id, msg){ document.getElementById(id).innerHTML = msg;}
function continueGame(char){
	if(is(char, word)){
		changeSolutionVariant(char); 
		updateById("inscription", currentSolution.toString());
		if(!is("_", currentSolution)){
			msetAttribute(search(), "disabled", "disabled");
			save();
			updateById("information-window", "You won!");}
		}
	else {
			turns--;
			if(turns == 0){
		 	msetAttribute(search(), "disabled", "disabled");
		 	updateById("information-window", "You lose!");
 		}
	}
}
