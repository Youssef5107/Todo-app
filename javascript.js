var input = document.querySelector(".task-input");
var tableContent = localStorage.getItem("tasks") || "";
var table = document.querySelector("tbody");

if (table) {
	table.innerHTML = tableContent || `<tr>No tasks</tr>`;
}

input.addEventListener("keydown", function (pressedKey) {
	if (pressedKey.key === "Enter") {
		var newRow = `
      <tr>
        <td>
          <input type="checkbox" class="checkbox" name="" id="">
          ${input.value}
        </td>
      </tr>
    `;

		tableContent += newRow;
		table.innerHTML = tableContent;
		localStorage.setItem("tasks", tableContent);
		input.value = "";
	}
});