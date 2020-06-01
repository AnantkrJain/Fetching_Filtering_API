const render = object => {
  fetch("https://ghibliapi.herokuapp.com/people")
    .then(response => {
      return response.json();
    })
    .then(people => {
      let res = people.filter(e => {
        if (e[object.field] === object.value) return e;
      });
      console.log(JSON.stringify(res));
      console.log(JSON.stringify(people));

      console.log(Object.keys(people[0]));
      main.innerHTML = getListOfNames(res);
    })
    .catch(err => {
      main.innerHTML = "<h1>data not found</h1>";
    });
};

function mysubmit(e) {
  const main = document.getElementById("main");
  main.innerHTML = "Loading....";

  let searchColumn = "";
  let searchValue = "";
  e.preventDefault();
  //alert("hello");
  searchColumn = document.getElementById("searchColumn").value;
  console.log(searchColumn);
  searchValue = document.getElementById("searchValue").value;
  console.log(searchValue);
  let searchObject = {
    field: searchColumn,
    value: searchValue
  };
  console.log(JSON.stringify(searchObject));
  render(searchObject);

  console.log("called");
  // return false;
}

const getListOfNames = people => {
  const names = people.map(p => `<li>${p.name}</li>`).join("\n");
  return `<ul>${names}</ul>`;
};
