$(document).ready(function () {
  const kod_str = $("#kod");
  const janr = $("#ganr");
  const radioList = $("#radio-list");
  const searchInput = $("#search");
  const votesBtnUp = $("#votes-btnUp");
  const votesBtnDown = $("#votes-btnDown");
  const stopVotes = $("#off");

  function krData() {
    $.get(
      `http://de1.api.radio-browser.info/json/stations/search?countrycode=${kod_str.val()}`,
       (response) => {
        if (response.status !== 200) {
          console.log(`Ошибка ${response.status}`);
          return;
        }
      })
    )
      // .done(function (response) {
      //   if (response.status !== 200) {
      //     console.log(`Ошибка ${response.status}`);
      //     return;
      //   }
      // })
      .then(function (radio) {
        function getValue(array) {
          const filterArray = array.filter(
            (station) =>
              station.tags.includes(janr.val()) &&
              station.name
                .toLowerCase()
                .includes(searchInput.val().toLowerCase())
          );
          if (filterArray.length > 0) {
            radioList.empty();
            $("<ol>").appendTo(radioList);
            filterArray.forEach((station) => {
              createLi(station).appendTo(radioList.find("ol"));
            });
          } else {
            radioList.text("Нет результатов");
          }
        }
        getValue(radio);
      })
      .fail(function (err) {
        console.log(`Ошибка ${err}`);
      });
  }

  function createLi(station) {
    const li = $("<li>").addClass(
      "list-group-item d-flex justify-content-between align-items-start"
    );
    const link = $("<a>").html(station.name).attr("href", station.url);
    const vote = $("<span>")
      .addClass("badge bg-primary rounded-pill")
      .html(` (${station.votes})`);
    li.append(link, vote);
    return li;
  }

  function sortRadioUp() {
    const list = radioList
      .find("li")
      .toArray()
      .sort((a, b) => {
        const aVotes = parseInt($(a).find("span").text().slice(2));
        const bVotes = parseInt($(b).find("span").text().slice(2));
        return bVotes - aVotes;
      });
    radioList.empty();
    const ol = $("<ol>").appendTo(radioList);
    list.forEach((li) => {
      ol.append(li);
    });
  }

  function sortRadioDown() {
    const list = radioList
      .find("li")
      .toArray()
      .sort((a, b) => {
        const aVotes = parseInt($(a).find("span").text().slice(2));
        const bVotes = parseInt($(b).find("span").text().slice(2));
        return aVotes - bVotes;
      });
    radioList.empty();
    const ol = $("<ol>").appendTo(radioList);
    list.forEach((li) => {
      ol.append(li);
    });
  }

  function createList() {
    radioList.empty();
  }

  kod_str.on("input", krData);
  janr.on("input", krData);
  searchInput.on("input", krData);
  votesBtnUp.on("click", sortRadioUp);
  votesBtnDown.on("click", sortRadioDown);
  stopVotes.on("click", createList);
});
