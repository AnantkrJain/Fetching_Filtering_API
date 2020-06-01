const fetchData = () => {
  return fetch("https://ghibliapi.herokuapp.com/people").then((response) => {
    return response.json();
  });
};
var dropDownData = [];
var option;

loadingDropDownData = () => {
  fetchData().then((people) =>
    Object.keys(people[0]).map((e) => {
      var dropDownKeys = document.getElementById("keys");
      dropDownData.push(e);
      option = document.createElement("option");
      option.innerHTML = e;
      option.value = e;
      dropDownKeys.add(option);
    })
  );
};
// it should be added to my dropdwon box
window.onload = () => {
  loadingDropDownData();
};
console.log(dropDownData);
const render = (object) => {
  let data = fetchData();
  data
    .then((people) => {
      let res = people.filter((e) => {
        if (e[object.field] === object.value) return e;
      });
      console.log(JSON.stringify(res));

      main.innerHTML = getListOfNames(res);
    })
    .catch((err) => {
      main.innerHTML = "<h1>data not found</h1>";
    });
  console.log(JSON.stringify(data));
};

function mysubmit(e) {
  const main = document.getElementById("main");
  main.innerHTML = "Loading....";

  let searchColumn = "";
  let searchValue = "";
  e.preventDefault();
  //alert("hello");
  // we are expecting a value from drop down(selected one)
  let selected = document.getElementById("keys");
  searchColumn = selected.options[selected.selectedIndex].value;
  console.log(searchColumn);

  searchValue = document.getElementById("searchValue").value;
  console.log(searchValue);
  let searchObject = {
    field: searchColumn,
    value: searchValue,
  };
  console.log(JSON.stringify(searchObject));
  render(searchObject);

  console.log("called");
  // return false;
}

const getListOfNames = (people) => {
  const names = people.map((p) => `<li>${JSON.stringify(p)}</li>`).join("\n");
  return `<ul>${names}</ul>`;
};
