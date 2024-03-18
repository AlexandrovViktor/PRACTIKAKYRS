const kod_str = document.getElementById("kod");
const janr = document.getElementById("ganr");
const radioList = document.getElementById("radio-list");
const searchInput = document.getElementById("search");
const votesBtnUp = document.getElementById("votes-btnUp"); // новая кнопка
const votesBtnDown = document.getElementById("votes-btnDown"); // новая кнопка
const stopVotes = document.getElementById("off"); // новая кнопка
/////
function krData() {
  $.get(`http://de1.api.radio-browser.info/json/stations/search?countrycode=${kod_str.value}`)
      .done(function(response) {
          if (response.status !== 200) {
              console.log(`Ошибка ${response.status}`);
          }
          else {
            return response.json;
          }
      })
      .then(function(radio) {
          function getValue(array) {
              const filterArray = array.filter(
                  (station) =>
                      station.tags.includes(janr.value) &&
                      station.name.toLowerCase().includes(searchInput.value.toLowerCase())
              );
              if (filterArray.length > 0) {
                  radioList.empty();
                  const ol = $("<ol></ol>");
                  radioList.append(ol);
                  filterArray.forEach((station) => {
                      const li = createLi(station);
                      ol.append(li);
                  });
              } else {
                  radioList.html("Нет результатов");
              }
          }

          getValue(radio);
      })
      .fail(function(err) {
          console.log(`Ошибка ${err}`);
      });
}

function createLi(station) {
  const li = $("<li></li>").addClass("list-group-item d-flex justify-content-between align-items-start");
  const link = $("<a></a>").html(station.name).attr("href", station.url);
  const vote = $("<span></span>").addClass("badge bg-primary rounded-pill").html(`(${station.votes})`);
  li.append(link).append(vote);
  return li;
}

function sortRadioUp() {
  const list = radioList.find("li");
  const sortedList = list.toArray().sort((a, b) => {
      const aVotes = parseInt($(a).find("span").text().slice(2));
      const bVotes = parseInt($(b).find("span").text().slice(2));
      return bVotes - aVotes;
  });
  radioList.empty();
  const ol = $("<ol></ol>");
  radioList.append(ol);
  sortedList.forEach((li) => {
      ol.append(li);
  });
}

function sortRadioDown() {
  const list = radioList.find("li");
  const sortedList = list.toArray().sort((a, b) => {
      const aVotes = parseInt($(a).find("span").text().slice(2));
      const bVotes = parseInt($(b).find("span").text().slice(2));
      return aVotes - bVotes;
  });
  radioList.empty();
  const ol = $("<ol></ol>");
  radioList.append(ol);
  sortedList.forEach((li) => {
      ol.append(li);
  });
}

function createList() {
  radioList.empty();
}
kod_str.addEventListener("input", krData);
janr.addEventListener("input", krData);
searchInput.addEventListener("input", krData);
votesBtnUp.addEventListener("click", sortRadioUp);
votesBtnDown.addEventListener("click", sortRadioDown);
stopVotes.addEventListener("click", createList);
