"use strict";
//DOM
const img = document.querySelector("img");
const SearchInput = document.getElementById("searchBar");
const submitButton = document.querySelector(".submitBtn");

// Big problem: Add event listener tp submit btn which will take in search bar input to replace 'deku' in api key

submitButton.addEventListener("click", () => {
  const SearchInputValue = SearchInput.value;

  searchingGIPHY(SearchInputValue);
});

searchingGIPHY();

// async/await

async function searchingGIPHY(searchInput) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=jTqTuwCeo5smFY9bZw2BuQCw1O6Sy89g&s=${searchInput}`,
      { mode: "cors" }
    );

    if (!response.ok) {
      throw new Error("FAILED");
    }

    const GIPHY_Data = await response.json();

    if (GIPHY_Data.data.length === 0) {
      throw new Error("EMPTY ARRAY");
    }

    img.src = GIPHY_Data.data.images.original.url;
  } catch (error) {
    console.log("CATCH:");
    console.error(error);
    img.src = "https://media.giphy.com/media/1Bgr0VaRnx3pCZbaJa/giphy.gif";
  }
}

// promises

function searchGIPHY(SearchInputValue) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=jTqTuwCeo5smFY9bZw2BuQCw1O6Sy89g&s=${SearchInputValue}`,
    { mode: "cors" }
  )
    .then((res) => {
      console.log("first then");
      return res.json();
    })
    .then((res) => {
      console.log(res);
      console.log("second then");
      if (res.data.length === 0) {
        throw new Error("ARRAY IS EMPTY");
      }
      img.src = res.data.images.original.url;
    })
    .catch((res) => {
      console.log("catch");
      console.error(res);
      img.src = "https://media.giphy.com/media/1Bgr0VaRnx3pCZbaJa/giphy.gif";
    });
}

SearchInput.addEventListener("keyup", (eve) => {
  if (eve.key === "Enter") {
    let inputValue = SearchInput.value;
    searchingGIPHY(inputValue);
  }
});

async function loadJson(url) {
  try {
    let response = await fetch(url);
    if (response.status == 200) {
      let json = await response.json();
      return json;
    }
  } catch (err) {
    alert(err.status);
  }
}
