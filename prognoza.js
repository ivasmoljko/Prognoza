document.body.style.backgroundImage = "url('milky_way.jpg')";
document.body.style.backgroundSize = "cover";

const button = document.getElementById("myButton");
const table = document.getElementById("myTable");

function addPic(icon) {
  document
    .getElementById("icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
}

function addToTable(data, input) {
  let niz = [
    input,
    data.current.temp.toString() + "°C",
    data.current.feels_like.toString() + "°C",
    data.daily[0].pop * 100 + "%",
    data.current.wind_speed.toString() + "m/s",
    data.daily[1].weather[0].main,
    data.daily[1].weather[0].icon,
  ];

  var tbdy = document.createElement("tbody");
  var tr = document.createElement("tr");
  for (var j = 0; j < niz.length; j++) {
    var td = document.createElement("td");
    td.appendChild(document.createTextNode("\u0020"));

    tr.appendChild(td);
    if (j < niz.length - 1) {
      td.innerText = niz[j];
    } else {
      const image = document.createElement("img");
      image.classList.toggle("smallicon");
      image.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${niz[j]}@2x.png`
      );

      td.appendChild(image);
    }
  }

  tbdy.appendChild(tr);
  table.appendChild(tbdy);

  addPic(data.current.weather[0].icon);
}

function handleError(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  } else {
    return response.json();
  }
}

button.onclick = function () {
  const input = document.getElementById("InputText").value;

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&appid=80a3a547109e41e0a00c8509d21f6766"
  )
    .then((response) => handleError(response))
    .then((data) => {
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&exclude=minutely,hourly,alerts&units=metric" +
          "&appid=80a3a547109e41e0a00c8509d21f6766"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          addToTable(data, input);
        });
    })
    .catch((err) => {
      console.error(err);
      alert("The city does not exist!");
    });

  document.getElementById("InputText").value = "";
};
