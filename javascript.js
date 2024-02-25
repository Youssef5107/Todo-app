var input = document.querySelector(".task-input");
var tableContent = localStorage.getItem("tasks") || "";
var tableBody = document.querySelector("tbody");
var buttonContainer = document.querySelector(".button-container");
var newRow = "";

if (tableBody) {
	tableBody.innerHTML = tableContent || `<tr>No tasks</tr>`;
}

input.addEventListener("keydown", function (pressedKey) {
	if (pressedKey.key === "Enter") {
		newRow = `
      <tr>
        <td>
          <input type="checkbox" class="checkbox" name="" id="">
          ${input.value}
        </td>
      </tr>
	  <hr>
    `;

		tableContent += newRow;
		tableBody.innerHTML = tableContent;
		localStorage.setItem("tasks", tableContent);

		input.value = "";
	}
});

function deleteTasks() {
	tableBody.innerHTML = ``;
	tableContent = "";
	localStorage.setItem("tasks", "");

}