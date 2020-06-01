const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// export default isEmpty;

var firstDiv = document.getElementById("first-div");
var heading = document.getElementById("heading");
var btn_extract = document.querySelector("#extract");
var txt_fetch = document.getElementById("fetchSource");
var body = document.querySelector("body");

btn_extract.addEventListener("click", fetchData);

var tableDivCreation = function () {
  let divTable = document.createElement("div");
  divTable.setAttribute("id", "tableDiv");
  console.log("Created a new element");
  divTable.classList.add("table-responsive-sm", "rounded");
  console.log("Class list has been updated to the div tag");
  return divTable;
};

var prepareData = function (data) {
  // delete the div nodes if they already exists in the document
  let divTable = document.querySelector("#tableDiv");
  try {
    divTable.remove();
    console.log("element Already exists so deleting");
    divTable = tableDivCreation();
  } catch (error) {
    divTable = tableDivCreation();
  }

  body.insertBefore(divTable, firstDiv.nextSibling);

  let n_table = document.createElement("table");
  n_table.classList.add("table", "table-hover", "table-bordered");
  let content = `<thead class = "thead-dark text-center">
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Gender</th>
							<th>Age</th>
							<th>Eye Color</th>
							<th>Hair Color</th>
							<th>Films</th>
							<th>Species</th>
							<th>URL</th>
						</tr>
					</thead> 
					<tbody>`;

  for (let i = 0; i < data.length; i++) {
    content += `	<tr>
					<td>${data[i].id}</td>
					<td>${data[i].name}</td>
					<td>${data[i].gender}</td>
					<td>${data[i].age}</td>
					<td>${data[i].eye_color}</td>
					<td>${data[i].hair_color}</td>
					<td>${data[i].films}</td>
					<td>${data[i].species}</td>
					<td>${data[i].url}</td>
				</tr>`;
  }

  content += "</tbody>";
  n_table.innerHTML = content;
  divTable.appendChild(n_table);
};

function fetchData() {
  let request = txt_fetch.value;
  fetch(request)
    .then(function (res) {
      console.log("Reading started");
      console.log(JSON.stringify(res));
      // to check and remove the text-danger class
      if (heading.classList.contains("text-danger") === true) {
        heading.classList.remove("text-danger");
      }
      // to check and add the text-info class
      if (heading.classList.contains("text-info") === false) {
        heading.classList.add("text-info");
      }
      heading.textContent = "Data is being read...";
      return res.json();
    })
    .then(function (data) {
      console.log(JSON.stringify(data));
      if (data.length > 0) {
        heading.textContent = "Preparing Data...";
        prepareData(data);
        heading.textContent = "Completed !!!";
      } else {
        prepareData(null);
        heading.textContent = "Data Not Found";
      }
    })
    .catch(function (err) {
      console.log(err);
      //update the header once the fetch API fails
      heading.textContent = "Data Not Found";
      let divTable = document.querySelector("#tableDiv");
      try {
        divTable.remove();
      } catch (error) {
        console.log(error);
      }
      // to check and delete the text-info class
      if (heading.classList.contains("text-info") === true) {
        heading.classList.remove("text-info");
      }
      // to check and add the text-danger class
      if (heading.classList.contains("text-danger") === false) {
        heading.classList.add("text-danger");
      }
    });
}
