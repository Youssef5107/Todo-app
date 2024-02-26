function theme(clickedThemeBtn) {
	document.querySelector("body").classList.add("dark");
	var ModeBtn = document.querySelectorAll(".theme-btn");
	// for (i = 0; i < ModeBtn.length; i++) {}
	if (ModeBtn[0].classList.contains("active-theme")) {
		ModeBtn[0].classList.remove("active-theme");
		ModeBtn[1].classList.add("active-theme");
	}
	else {
		ModeBtn[1].classList.remove("active-theme");
		ModeBtn[0].classList.add("active-theme");
	}
}



var input = document.querySelector(".task-input");
var content = localStorage.getItem("tasks") || "";
var contentContainer = document.querySelector(".tasks-area");
contentContainer.innerHTML = content;
var buttonContainer = document.querySelector(".button-container");
var itemsleft = document.querySelector(".items-left");
var noOfItems;
var itemsNo = Number(localStorage.getItem("itemsNo")) || 0;
itemsleft.innerHTML = itemsNo;

input.addEventListener("keydown", function (pressedKey) {
	if (pressedKey.key === "Enter" && input.value != "") {
		itemsNo = Number(localStorage.getItem("itemsNo")) || 0;
		noOfItems = itemsNo + 1;
		localStorage.setItem("itemsNo", noOfItems);
		itemsleft.innerHTML = noOfItems;

		var newRow = `
        <div class="added-task">
            <div role="checkbox" class="checkbox"></div>
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
		whenHover()
	}
});

function whenHover() {
	var taskAreas = document.querySelectorAll(".added-task");

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
}

whenHover()
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
	localStorage.setItem("itemsNo", noOfItems);
	itemsleft.innerHTML = noOfItems;
}