const accused = document.querySelector("#accused");
const parentag = document.querySelector("#parentag");
const searchBtn = document.querySelector("#searchBtn");
const resultTableBody = document.querySelector("#resultTableBody");
const preloader = document.querySelector("#preloader");

function preLoaderDisplayBlock() {
  preloader.style.display = "block";
}

function preLoaderDisplayNone() {
  preloader.style.display = "none";
}
async function checkData() {
  let url =
    "https://script.google.com/macros/s/AKfycbyzubZ-W-B42ojG7JEsUzzgr76geaCEiKFE7nmdj4szMiqYlB5ydN_0N0JDziqpOsVOMQ/exec";

  try {
    let response = await fetch(
      `${url}?Accused=${encodeURIComponent(
        accused.value
      )}&Parentage=${encodeURIComponent(parentag.value)}`
    );
    const actualData = await response.json();

    if (actualData.data.length === 0) {
      preLoaderDisplayNone();
      alert("No data found.");
      resultTableBody.innerHTML = "";
    } else if (accused.value === "" && parentag.value === "") {
      preLoaderDisplayNone();
      alert("Please Enter Name!");
      resultTableBody.innerHTML = "";
    } else {
      preLoaderDisplayNone();
      displayDataInTable(actualData.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayDataInTable(data) {
  resultTableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    preLoaderDisplayNone();
    row.innerHTML = `
      <td>${item.arrestID}</td>
      <td>${item.reportDate}</td>
      <td>${item.arrestDate}</td>
      <td>${item.nameOfAccused}</td>
      <td>${item.parentage}</td>
      <td>${item.arrestedByPS}</td>
      <td>${item.FIRNo}</td>
      <td>${item.underSection}</td>
      <td>${item.PoliceStation}</td>
    `;

    resultTableBody.appendChild(row);
  });
}

window.onload = () => {
  accused.value = "";
  parentag.value = "";

  searchBtn.addEventListener("click", () => {
    checkData();
    preLoaderDisplayBlock();
    resultTableBody.innerHTML = "";
  });
  parentag.onkeydown = () => {
    if (event.key === "Enter") {
      checkData();
      preLoaderDisplayBlock();
      resultTableBody.innerHTML = "";
    }
  };
  accused.onkeydown = () => {
    if (event.key === "Enter") {
      checkData();
      preLoaderDisplayBlock();
      resultTableBody.innerHTML = "";
    }
  };
  let resetBtn = document.getElementById("reset_btn");

  resetBtn.onclick = function () {
    resultTableBody.innerHTML = "";
    accused.value = "";
    parentag.value = "";
  };
};
