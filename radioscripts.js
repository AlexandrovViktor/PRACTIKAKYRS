const kod_str = document.getElementById("kod");
const janr = document.getElementById("ganr");
const radioList = document.getElementById("radio-list");
const searchInput = document.getElementById("search");
const votesBtnUp = document.getElementById("votes-btnUp"); // новая кнопка
const votesBtnDown = document.getElementById("votes-btnDown"); // новая кнопка
const stopVotes = document.getElementById("off"); // новая кнопка
/////
function krData() {
  $.get(
    `http://de1.api.radio-browser.info/json/stations/search?countrycode=${kod_str.value}`, (function (data, status) {
      (function (radio) {
        function getValue(array) {
          // фильтруем радиостанции по жанру и по названию (если есть)
          const filterArray = array.filter(
            (station) =>
              station.tags.includes(janr.value) &&
              station.name
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
          );
          if (filterArray.length > 0) {
            radioList.innerHTML = ""; // очищаем список от предыдущих элементов
            const ol = document.createElement("ol"); // создаем список ol
            radioList.appendChild(ol); // добавляем список на страницу
            // filterArray.sort((a, b) => b.votes - a.votes); // сортируем по votes
            filterArray.forEach((station) => {
              const li = createLi(station); // создаем элемент списка li с количеством голосов
              ol.appendChild(li); // добавляем элемент списка на страницу
            });
          } else {
            // если не найдено ни одной радиостанции, выводим сообщение
            radioList.innerHTML = "Нет результатов";
          }
        }

        getValue(radio);
      }
      (function () {
          console.log(`Ошибка ${status}`);
          return;
        })
    )})
    ) 
    .catch(function (err) {
      console.log(`Ошибка ${err}`);
    });
  }
      //  .then(function (data, status) {
      //   (function (radio) {
      //     function getValue(array) {
      //       // фильтруем радиостанции по жанру и по названию (если есть)
      //       const filterArray = array.filter(
      //         (station) =>
      //           station.tags.includes(janr.value) &&
      //           station.name
      //             .toLowerCase()
      //             .includes(searchInput.value.toLowerCase())
      //       );
      //       if (filterArray.length > 0) {
      //         radioList.innerHTML = ""; // очищаем список от предыдущих элементов
      //         const ol = document.createElement("ol"); // создаем список ol
      //         radioList.appendChild(ol); // добавляем список на страницу
      //         // filterArray.sort((a, b) => b.votes - a.votes); // сортируем по votes
      //         filterArray.forEach((station) => {
      //           const li = createLi(station); // создаем элемент списка li с количеством голосов
      //           ol.appendChild(li); // добавляем элемент списка на страницу
      //         });
      //       } else {
      //         // если не найдено ни одной радиостанции, выводим сообщение
      //         radioList.innerHTML = "Нет результатов";
      //       }
      //     }
  
      //     getValue(radio);
      //   }
      //   (function () {
      //       console.log(`Ошибка ${status}`);
      //       return;
      //     })
      // )})


function createLi(station) {
  const li = document.createElement("li"); // создаем элемент списка li
  li.className =
    "list-group-item d-flex justify-content-between align-items-start";
  const link = document.createElement("a"); // создаем ссылку на радиостанцию
  const vote = document.createElement("span"); // создаем элемент для отображения количества голосов
  vote.className = "badge bg-primary rounded-pill";
  link.innerHTML = station.name; // название радиостанции
  link.href = station.url; // адрес радиостанции
  vote.innerHTML = ` (${station.votes})`; // количество голосов
  li.appendChild(link); // добавляем ссылку на элемент списка
  li.appendChild(vote); // добавляем элемент для отображения количества голосов на страницу
  return li;
}

function sortRadioUp() {
  const list = radioList.querySelectorAll("li"); // получаем все элементы списка
  const sortedList = Array.from(list).sort((a, b) => {
    const aVotes = parseInt(a.querySelector("span").textContent.slice(2)); // получаем количество голосов у элемента a
    const bVotes = parseInt(b.querySelector("span").textContent.slice(2)); // получаем количество голосов у элемента b
    return bVotes - aVotes; // сортируем по votes
  });
  radioList.innerHTML = ""; // очищаем список от предыдущих элементов
  const ol = document.createElement("ol"); // создаем список ol
  radioList.appendChild(ol); // добавляем список на страницу
  sortedList.forEach((li) => {
    ol.appendChild(li); // добавляем элемент списка на страницу
  });
}

function sortRadioDown() {
  const list = radioList.querySelectorAll("li"); // получаем все элементы списка
  const sortedList = Array.from(list).sort((a, b) => {
    const aVotes = parseInt(a.querySelector("span").textContent.slice(2)); // получаем количество голосов у элемента a
    const bVotes = parseInt(b.querySelector("span").textContent.slice(2)); // получаем количество голосов у элемента b
    return aVotes - bVotes; // сортируем по votes
  });
  radioList.innerHTML = ""; // очищаем список от предыдущих элементов
  const ol = document.createElement("ol"); // создаем список ol
  radioList.appendChild(ol); // добавляем список на страницу
  sortedList.forEach((li) => {
    ol.appendChild(li); // добавляем элемент списка на страницу
  });
}

function createList() {
  radioList.innerHTML = "";
}

kod_str.addEventListener("input", krData);
janr.addEventListener("input", krData);
searchInput.addEventListener("input", krData);
votesBtnUp.addEventListener("click", sortRadioUp);
votesBtnDown.addEventListener("click", sortRadioDown);
stopVotes.addEventListener("click", createList);