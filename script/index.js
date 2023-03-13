const popupSubmit = document.getElementById("popup-submit-botton");
console.log(popupSubmit);


// Попап

const popup = document.getElementById('popup');
const headerOpenButton = document.getElementById('header-popup-open');
const formOpenButton = document.getElementById('popup-open');
const popupClose = document.getElementById('popup-close');

headerOpenButton.addEventListener('click', function(e){
    e.preventDefault();
    popup.classList.toggle('active');
})

formOpenButton.addEventListener('click', function(e){
    e.preventDefault();
    popup.classList.add('active');
})

popupClose.addEventListener('click', function(e){
    e.preventDefault();
    popup.classList.remove('active');
})


// Даты попапа

function getAvailability(dateInput) {
    let answer = "success";
    if (dateInput == "") {
        return "empty"
    }
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const systemDate = [day, month, year];
    let inputDate = dateInput.split(' ');
    let Months = [
        'январ',
        'феврал',
        'март',
        'апрел',
        'ма',
        'июн',
        'июл',
        'август',
        'сентябр',
        'ноябр',
        'декабр',
    ];

    try {
        const dateMonthNumber = Months.indexOf(inputDate[1].slice(0, -1));
        if (dateMonthNumber >= 0) {
            inputDate = [
                parseInt(inputDate[0]),
                dateMonthNumber + 1,
                parseInt(inputDate[2])
            ];

            const currentDate = new Date(`${systemDate[2]}-${systemDate[1]}-${systemDate[0]}`);
            const userDate = new Date(`${inputDate[2]}-${inputDate[1]}-${inputDate[0]}`);
            if (userDate == "Invalid Date") {
                return "invalid";
            }
            // ОТЛАДКА
            // console.log('текущая дата -> ' + currentDate);
            // console.log(typeof(systemDate[0]), systemDate[0], systemDate[1], systemDate[2]);
            // console.log('пользовательская дата -> ' + userDate);
            // console.log(typeof(inputDate[0]), inputDate[2], inputDate[1], inputDate[0]);
            answer = (currentDate < userDate) ? "success" : "dateMismatch";

            return answer

        } else {
            return "invalid";
        }
    } catch {
        return "invalid"
    }
}

function createMessage(answer) {
    let message;

    if (answer == "success") {
        message = ["На эти даты есть свободные номера. Пока есть.", "#333333"];
    } else if (answer == "dateMismatch") {
        message = ["Мы не можем отправить вас в прошлое.", "#FF5757"];
    } else if (answer == "empty") {
        message = ["Введите дату.", "#ffb700"];
    } else if (answer == "invalid") {
        message = ["Неправильно введена дата.", "#FF5757"]
    }

    return message;
}


const firstDate = document.getElementById("firstDate");
const secondDate = document.getElementById("secondDate");
const firstDateState = document.getElementById("firstDateState");
const secondDateState = document.getElementById("secondDateState");


startFirstDateMessage = createMessage(getAvailability(firstDate.value));
firstDateState.textContent = startFirstDateMessage[0];
firstDateState.style.color = startFirstDateMessage[1];

startSecondDateMessage = createMessage(getAvailability(secondDate.value));
secondDateState.textContent = startSecondDateMessage[0];
secondDateState.style.color = startSecondDateMessage[1];

firstDate.addEventListener("change", () => {
    const firstDateMessage = createMessage(getAvailability(firstDate.value));
    // ОТЛАДКА
    // console.log("firstDate.value --> " + firstDate.value);
    // console.log("getAvailability(firstDate.value) --> " + getAvailability(firstDate.value));
    // console.log("firstDateMessage --> " + firstDateMessage);
    firstDateState.textContent = firstDateMessage[0];
    firstDateState.style.color = firstDateMessage[1];
    checkDispatchAvailability();
});


secondDate.addEventListener("change", () => {
    const secondDateMessage = createMessage(getAvailability(secondDate.value));
    secondDateState.textContent = secondDateMessage[0];
    secondDateState.style.color = secondDateMessage[1];
    checkDispatchAvailability()
});


// Счетчик посетителей

const adultCount = document.getElementById("adult-count");
const childCount = document.getElementById("child-count");
const adultMinus = document.getElementById("adult-minus");
const adultPlus = document.getElementById("adult-plus");
const childMinus = document.getElementById("child-minus");
const childPlus = document.getElementById("child-plus");

const childPlusLimit = document.getElementById("child-count-state");
const adultPlusLimit = document.getElementById("adult-count-state");

function checkLimit(countField, mark) {
    let count = parseInt(countField.value);
    console.log(count + 1, count)
    if (mark == "minus") {
        return (-1 < count - 1);
    } else if (mark == "plus") {
        return (count + 1 < 11);
    }
}


adultMinus.addEventListener("click", () => {
    if (checkLimit(adultCount, 'minus')) {
        adultCount.value--;
        adultPlusLimit.classList.remove("active-alert");
    };
    checkDispatchAvailability()
});

adultPlus.addEventListener("click", () => {
    if (checkLimit(adultCount, 'plus')) {
        adultCount.value++;
    } else {
        adultPlusLimit.classList.add("active-alert");
    };
    checkDispatchAvailability()
});

childMinus.addEventListener("click", () => {
    if (checkLimit(childCount, 'minus')) {
        childCount.value--;
        childPlusLimit.classList.remove("active-alert");
    };
    checkDispatchAvailability()
});

childPlus.addEventListener("click", () => {
    if (checkLimit(childCount, 'plus')) {
        childCount.value++;
    } else {
        childPlusLimit.classList.add("active-alert");
    };
    checkDispatchAvailability()
});
