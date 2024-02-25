var input = document.querySelector(".task-input");
var tableContent = "";

input.addEventListener("keydown", function (pressedKey) {
	var table = document.querySelector("tbody");

	if (pressedKey.key === "Enter") {
		tableContent = tableContent + `<tr>${input.value}</tr>`
		table.innerHTML = tableContent;
		input.value = "";
	}
});