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
		noOfItems = itemsNo + 1;
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

for (let i = 0; i < taskAreas.length; i++) {
	const hoveredTask = taskAreas[i];
	const closeBtn = hoveredTask.querySelector(".close-btn-container");

	// ... (hover and click event handlers for close button)

	closeBtn.addEventListener("click", function () {
		hoveredTask.remove();
		noOfItems = noOfItems - 1;
		itemsleft.innerHTML = noOfItems; // Update items left count

		// ... (update tasks in local storage)
	});
}

// ... (option button logic)

function deleteTasks() {
	contentContainer.innerHTML = "";
	content = "";
	localStorage.setItem("tasks", "");
	noOfItems = 0;
	localStorage.setItem("itemsNo", 0); // Save itemsNo
	itemsleft.innerHTML = noOfItems;
}