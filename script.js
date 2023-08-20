const accused = document.querySelector("#accused");
const parentag = document.querySelector("#parentag");
const searchBtn = document.querySelector("#searchBtn");
const resultTableBody = document.querySelector("#resultTableBody");

async function checkData() {
  let url =
    "https://script.google.com/macros/s/AKfycbxQa3obRjeXPay3UDHlEUIQ4pJ4wawTJAhbqSO47YF13tIJ5EqVSxxe9urQ67gxUWS__w/exec";

  try {
    let response = await fetch(
      `${url}?Accused=${encodeURIComponent(
        accused.value
      )}&Parentage=${encodeURIComponent(parentag.value)}`
    );

    const actualData = await response.json();

    if (actualData.data.length === 0) {
      alert("No data found.");
      resultTableBody.innerHTML = "";
    } else {
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
  });
  parentag.onkeydown = () => {
    if (event.key === "Enter") {
      checkData();
    }
  };
  accused.onkeydown = () => {
    if (event.key === "Enter") {
      checkData();
    }
  };
};
