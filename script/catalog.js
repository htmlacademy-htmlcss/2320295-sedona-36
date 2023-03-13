// Слайдер

function GetParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max-to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
    ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
    ${rangeColor} ${(toPosition)/(rangeDistance)*100}%,
    ${sliderColor} ${(toPosition)/(rangeDistance)*100}%,
    ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#range-scale__to');
  if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
  } else {
      toSlider.style.zIndex = 0;
  }
}

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = GetParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "#5E676C", "#ffffff", controlSlider);
  if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
  } else {
      fromSlider.value = from;
  }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = GetParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "#5E676C", "#ffffff", controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
  } else {
      toInput.value = from;
  }
}

function controlfFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = GetParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#5E676C", "#ffffff", toSlider);
  if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
  } else {
      fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = GetParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#5E676C", "#ffffff", toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
  } else {
      toInput.value = from;
      toSlider.value = from;
  }
}


const fromSlider = document.getElementById('range-scale__from');
const toSlider = document.getElementById('range-scale__to');
const fromInput = document.getElementById('from-price');
const toInput = document.getElementById('to-price');
fillSlider(fromSlider, toSlider, "#5E676C", "#ffffff", toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlfFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);



// Adding to favorites

const buttons = document.querySelectorAll(".cardButton");
localStorage.setItem("currentCount", currentCount);
let currItem;


buttons.forEach(elem => {
  // Сheck the current state of the element
  currItem = localStorage.getItem(elem.id);
  if (currItem && (elem.classList[1] != currItem)) {
      if (currItem == "button-blue") {
          elem.textContent = "В избранное";
      } else {
          elem.textContent = "В избранном";
      }
      elem.className = elem.classList[0] + ' ' + currItem;
  }

  // EventListener of class changing
  elem.addEventListener("click", () => {
      // Get the counter
      currentCount = localStorage.getItem("currentCount");
      if (elem.textContent == "В избранное") {
          elem.textContent = "В избранном";
          currentCount++;
          favoritesCount.textContent = currentCount;
          localStorage.setItem( "currentCount" , currentCount.toString());
      } else {
          elem.textContent = "В избранное";
          currentCount--;
          favoritesCount.textContent = currentCount;
          localStorage.setItem( "currentCount" , currentCount.toString());
      }
      // class change and memorization
      elem.classList.toggle("button-blue");
      elem.classList.toggle("card-favorites-selected-button");
      localStorage.setItem(elem, elem.textContent);
      localStorage.setItem(elem.id, elem.classList[1])
  });

  // localStorage data update
  localStorage.setItem(elem.id, elem.classList[1]);
});
