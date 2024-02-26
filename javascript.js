var input = document.querySelector(".task-input");
var content = localStorage.getItem("tasks") || "";
var contentContainer = document.querySelector(".tasks-area");
contentContainer.innerHTML = content;
var buttonContainer = document.querySelector(".button-container");
var itemsleft = document.querySelector(".items-left");
var itemsNo = Number(localStorage.getItem("itemsNo")) || 0; // Retrieve itemsNo before updating
itemsleft.innerHTML = itemsNo; // Display noOfItems

input.addEventListener("keydown", function (pressedKey) {
	if (pressedKey.key === "Enter") {
		itemsNo = Number(localStorage.getItem("itemsNo")) || 0; // Retrieve itemsNo before updating
		var noOfItems = itemsNo + 1;
		localStorage.setItem("itemsNo", noOfItems); // Save itemsNo

		itemsleft.innerHTML = noOfItems; // Display noOfItems

		var newRow = `
        <div class="added-task">
            <input class="checkbox-input" type="checkbox" class="checkbox" name="" id="">
            <div class="entered-task">${input.value}</div>  
            <div class="close-btn-container">
                <img class="close-btn" src="images/icon-cross.svg" alt="">
            </div>    
       </div>
    `;

		content += newRow;
		contentContainer.innerHTML = content;
		localStorage.setItem("tasks", content);
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
		content = ""; // Clear the current table content
		var remainingTasks = document.querySelectorAll(".added-task"); // Get the remaining tasks
		for (let i = 0; i < remainingTasks.length; i++) {
			content += remainingTasks[i].outerHTML; // Get the HTML of each remaining task
		}
		localStorage.setItem("tasks", content); // Save the updated tasks to local storage
	});
}

var optionBtns = document.querySelectorAll(".option");
for (let i = 0; i < optionBtns.length; i++) {
	optionBtns[i].addEventListener("mouseover", () => {
		if (!optionBtns[i].classList.contains("active-option"))
			optionBtns[i].style.color = "orange";
	});
	optionBtns[i].addEventListener("mouseout", () => {
		if (!optionBtns[i].classList.contains("active-option"))
			optionBtns[i].style.color = "hsl(234, 11%, 52%)";
	});
}

function selectedOption(selectedBtn) {
	var optionBtns = document.querySelectorAll(".option");
	for (let i = 0; i < optionBtns.length; i++) {
		optionBtns[i].classList.remove("active-option")
		optionBtns[i].style.color = "hsl(234, 11%, 52%)"
	}
	selectedBtn.classList.add("active-option")
	selectedBtn.style.color = "hsl(220, 98%, 61%)";
}



function deleteTasks() {
	contentContainer.innerHTML = ``;
	content = "";
	localStorage.setItem("tasks", "");
	noOfItems = 0;
	itemsleft.innerHTML = noOfItems;
}