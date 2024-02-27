function theme() {
	var body = document.querySelector("body")
	body.classList.toggle("dark");
	if (!body.classList.contains("dark"))
		body.style.backgroundImage = "url(images/bg-desktop-light.jpg)"
	else
		body.style.backgroundImage = "url(images/bg-desktop-dark.jpg)"
	var ModeBtn = document.querySelectorAll(".theme-btn");
	if (ModeBtn[0].classList.contains("active-theme")) {
		ModeBtn[0].classList.remove("active-theme");
		ModeBtn[1].classList.add("active-theme");
	}
	else {
		ModeBtn[1].classList.remove("active-theme");
		ModeBtn[0].classList.add("active-theme");
	}
}

var body = document.querySelector("body");
var input = document.querySelector(".task-input");
var content = localStorage.getItem("tasks") || "";
var contentContainer = document.querySelector(".tasks-area");
contentContainer.innerHTML = content;
var buttonContainer = document.querySelector(".button-container");
var itemsleft = document.querySelector(".items-left"); xr
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
			<input onclick="chekcboxFun()" type="checkbox" class="input-checkbox">
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
			localStorage.setItem("itemsNo", noOfItems);

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

var checkbox = document.querySelectorAll(".input-checkbox");
var task = document.querySelectorAll(".entered-task");

function chekcboxFun() {
	if (body.classList.contains("dark")) {
		for (i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				task[i].style.color = "hsl(236, 9%, 61%)";
				task[i].style.textDecoration = "line-through";
				task[i].style.transition = "1s";
			}
			else {
				task[i].style.color = "white";
				task[i].style.textDecoration = "none";
				task[i].style.transition = "1s";
			}
		}
	}
	else {
		for (i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				task[i].style.color = "hsl(235, 19%, 35%)";
				task[i].style.textDecoration = "line-through";
			}
			else {
				task[i].style.color = "hsl(236, 9%, 61%)";
				task[i].style.textDecoration = "none";
			}

		}
	}
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

function selectAll() {
	contentContainer.innerHTML = content;
}

function selectActive() {
	var addedTask = document.querySelectorAll(".added-task");
	for (i = 0; i < addedTask.length; i++) {
		if (addedTask[i].querySelector(".input-checkbox").checked) {
			addedTask[i].style.display = "none";
		}
	}
}

function selectCompleted() {
	var addedTask = document.querySelectorAll(".added-task");
	for (i = 0; i < addedTask.length; i++) {
		if (!addedTask[i].querySelector(".input-checkbox").checked) {
			addedTask[i].style.display = "none";
		}
	}
}

function deleteTasks() {
	contentContainer.innerHTML = ``;
	content = "";
	localStorage.setItem("tasks", "");
	noOfItems = 0;
	localStorage.setItem("itemsNo", noOfItems);
	itemsleft.innerHTML = noOfItems;
}