let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]'); 

function timer(seconds){
	const now = (new Date()).getTime(); // Date.now();
	const then = now + seconds * 1000; 
	//console.log({now, then});
	displayTimeLeft(seconds);
	displayEndTime(then); 
	countdown = setInterval(()=> {
		const secondsLeft = Math.round((then - Date.now()) /1000);

		// check if we should stop it!
		if(secondsLeft < 0){
			clearInterval(countdown); 
			return; 
		}
		//console.log(secondsLeft); 
		// display it
		displayTimeLeft(secondsLeft);
	}, 1000)
	
}
function displayTimeLeft(seconds){

	// clear any existing timers
	clearInterval(countdown); 
	const minutes = Math.floor(seconds / 60); 
	const remainderSeconds = seconds % 60; 
	const display = `${minutes}:${remainderSeconds  < 10 ? '0' : ''}${remainderSeconds}`; 
	timerDisplay.textContent = display; 
	document.title = display; 
	//console.log({minutes, remainder}); 
}
function displayEndTime(timestamp){
	const end = new Date(timestamp); 
	const hour = end.getHours();
	const minutes = end.getMinutes(); 
	endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes}`; 
}

function startTimer(){
	const seconds = parseInt(this.dataset.time); 
	timer(seconds); 
	console.log(this.dataset.time); 
}

buttons.forEach(button => button.addEventListener('click', startTimer)); 

document.customForm.addEventListener('submit', function(e){
	e.preventDefault(); 
	const mins = this.minutes.value; 
	console.log(mins); 
	timer(mins*60); 
	this.reset(); 
}); 