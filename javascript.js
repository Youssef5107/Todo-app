var input = document.querySelector(".task-input");
// 
var tableContent = localStorage.getItem("tasks");
var tableBody = document.querySelector(".tasks-area");
tableBody.innerHTML = tableContent;
// 
var buttonContainer = document.querySelector(".button-container");
// 
var itemsleft = document.querySelector(".items-left");
// 
var newRow = "";
// 
var noOfItems = 0;

input.addEventListener("keydown", function (pressedKey) {
	if (pressedKey.key === "Enter") {
		newRow = `
		<div class="added-task">
          	<input class="checkbox-input" type="checkbox" class="checkbox" name="" id="">
			<span class="entered-task">${input.value}<span>  
			<div class="close-btn-container">
				<img class="close-btn" src="images/icon-cross.svg" alt="">
			</div>    
       </div>
    `;

		noOfItems = noOfItems + 1;
		itemsleft.innerHTML = noOfItems;
		tableContent += newRow;
		tableBody.innerHTML = tableContent;
		localStorage.setItem("tasks", tableContent);
		input.value = "";
	}
});


var taskAreas = document.querySelectorAll(".added-task");
var closeBtns = document.querySelectorAll(".close-btn-container");


for (let i = 0; i < taskAreas.length; i++) {
	const hoveredTask = taskAreas[i];
	const closeBtn = hoveredTask.querySelector(".close-btn-container");
	hoveredTask.addEventListener("mouseover", () => {
		closeBtn.style.opacity = "1";
		closeBtn.style.transition = ".5s"
	});
	hoveredTask.addEventListener("mouseout", () => {
		closeBtn.style.opacity = "0";
		closeBtn.style.transition = ".2s"
	});
	closeBtn.addEventListener("click", function () {
		hoveredTask.remove(); // Remove the task area from the DOM
		noOfItems = noOfItems - 1;
		itemsleft.innerHTML = noOfItems;

		// Update the table content in local storage
		tableContent = ""; // Clear the current table content
		var remainingTasks = document.querySelectorAll(".added-task"); // Get the remaining tasks
		for (let i = 0; i < remainingTasks.length; i++) {
			tableContent += remainingTasks[i].outerHTML; // Get the HTML of each remaining task
		}
		localStorage.setItem("tasks", tableContent); // Save the updated tasks to local storage
	});
}



function deleteTasks() {
	tableBody.innerHTML = ``;
	tableContent = "";
	localStorage.setItem("tasks", "");
	noOfItems = 0;
	itemsleft.innerHTML = noOfItems;
}