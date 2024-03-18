  const kod_str = $("#kod");
  const janr = $("#ganr");
  const radioList = $("#sortable");
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
            $("<ul>").appendTo(radioList);
            filterArray.forEach((station) => {
              createLi(station).appendTo(radioList.find("ul"));
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
      "list-group-item d-flex justify-content-between align-items-start ui-state-default"
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
    const ul = $("<ul>").appendTo(radioList);
    list.forEach((li) => {
      ul.append(li);
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
    const ul = $("<ul>").appendTo(radioList);
    list.forEach((li) => {
      ul.append(li);
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

  // BTN

  $( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).on( "click", function( event ) {
      event.preventDefault();
    } );
  } );

  // BTN

  $( function() {
    $( "#sortable" ).sortable();
  } );

  $( function() {
    $( document ).tooltip();
  } );
  </script>

  $( function() {
    function left( element, using ) {
      element.position({
        my: "right middle",
        at: "left+25 middle",
        of: "#container",
        collision: "none",
        using: using
      });
    }
    function right( element, using ) {
      element.position({
        my: "left middle",
        at: "right-25 middle",
        of: "#container",
        collision: "none",
        using: using
      });
    }
    function center( element, using ) {
      element.position({
        my: "center middle",
        at: "center middle",
        of: "#container",
        using: using
      });
    }
 
    left( $( "img" ).eq( 0 ) );
    center( $( "img" ).eq( 1 ) );
    right( $( "img" ).eq( 2 ) );
 
    function animate( to ) {
      $( this ).stop( true, false ).animate( to );
    }
    function next( event ) {
      event.preventDefault();
      center( $( "img" ).eq( 2 ), animate );
      left( $( "img" ).eq( 1 ), animate );
      right( $( "img" ).eq( 0 ).appendTo( "#container" ) );
    }
    function previous( event ) {
      event.preventDefault();
      center( $( "img" ).eq( 0 ), animate );
      right( $( "img" ).eq( 1 ), animate );
      left( $( "img" ).eq( 2 ).prependTo( "#container" ) );
    }
    $( "#previous" ).on( "click", previous );
    $( "#next" ).on( "click", next );
 
    $( "img" ).on( "click", function( event ) {
      $( "img" ).index( this ) === 0 ? previous( event ) : next( event );
    });
 
    $( window ).on( "resize", function() {
      left( $( "img" ).eq( 0 ), animate );
      center( $( "img" ).eq( 1 ), animate );
      right( $( "img" ).eq( 2 ), animate );
    });
  } );
