import { Period } from "./period.js";

// DOM Elemeents
let DOMPeriods = document.getElementById("periods");
let submitButton = document.getElementById("submitButton");

let startYear = document.getElementById("startYear");
let endYear = document.getElementById("endYear");
let startMonth = document.getElementById("startMonth");
let endMonth = document.getElementById("endMonth");
let startDay = document.getElementById("startDay");
let endDay = document.getElementById("endDay");
let startHour = document.getElementById("startHour");
let endHour = document.getElementById("endHour");
let startMinute = document.getElementById("startMinute");
let endMinute = document.getElementById("endMinute");
let startSecond = document.getElementById("startSecond");
let endSecond = document.getElementById("endSecond");

// Other variables
let periods = [];

// Hardcoded period
let period = new Period("Fortnite battle pass",  new Date(2022, 10, 6),  new Date(2022, 11, 10));
periods.push(period);

let createPeriods = () => {
    for (let i = 0; i < periods.length; i++) {
        createPeriod(i);
    }
}

let createPeriod = (periodIndex) => {

    // Create title
    let titleText = document.createElement("h3");
    titleText.innerText = periods[periodIndex].title;

    let title = document.createElement("div");
    title.setAttribute("class", "toCenter");
    title.appendChild(titleText);

    // Create text
    let toLeftText = document.createElement("p");
    toLeftText.innerText = niceFormat(periods[periodIndex].startDate);
    let toLeft = document.createElement("div");
    toLeft.setAttribute("class",  "toLeft")
    toLeft.appendChild(toLeftText);

    let toCenterText = document.createElement("p");
    toCenterText.innerText = calculatePercentage(periodIndex, true);
    let toCenter = document.createElement("div");
    toCenter.setAttribute("class",  "toCenter")
    toCenter.appendChild(toCenterText);

    let toRightText = document.createElement("p");
    toRightText.innerText = niceFormat(periods[periodIndex].endDate);
    let toRight = document.createElement("div");
    toRight.setAttribute("class",  "toRight")
    toRight.appendChild(toRightText);

    let text = document.createElement("div");
    text.setAttribute("class", "flex-container-horizontal");
    text.appendChild(toLeft);
    text.appendChild(toCenter);
    text.appendChild(toRight);

    // Create progress bar
    let progressBar = document.createElement("div");
    progressBar.setAttribute("class", "progress-bar");
    progressBar.setAttribute("style", "width: " + calculatePercentage(periodIndex, true));
    let progress = document.createElement("div");
    progress.setAttribute("class", "progress");
    progress.appendChild(progressBar);

    // Create button
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary")
    button.innerText = "Update Start Time";
    button.onclick = () => updateStartTime(periodIndex);
    let buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "toCenter");
    buttonContainer.appendChild(button);

    // Create new startTime bonus
    let bonusText = document.createElement("p");
    bonusText.innerText = calculateBonus(periodIndex, true);
    let bonusContainer = document.createElement("div");
    bonusContainer.setAttribute("class", "toCenter");
    bonusContainer.appendChild(bonusText);

    // Create card and append children
    let periodCard = document.createElement("div");
    periodCard.setAttribute("class", "card");
    periodCard.appendChild(title);
    periodCard.appendChild(text);
    periodCard.appendChild(progress);
    periodCard.appendChild(buttonContainer);
    periodCard.appendChild(bonusContainer);
    DOMPeriods.appendChild(periodCard);

    update();
}

let update = () => {  
    for (let periodIndex = 0; periodIndex < periods.length; periodIndex++) {
        DOMPeriods.childNodes[periodIndex + 3].childNodes[1].childNodes[1].firstChild.innerText = calculatePercentage(periodIndex, true);
        DOMPeriods.childNodes[periodIndex + 3].childNodes[2].firstChild.setAttribute("style", "width: " + calculatePercentage(periodIndex, true));
        DOMPeriods.childNodes[periodIndex + 3].childNodes[4].firstChild.innerText = calculateBonus(periodIndex, true);
    }

    setTimeout(update, 1000);
}

let updateStartTime = (periodIndex) => {
    periods[periodIndex].startDate = new Date();
    DOMPeriods.childNodes[periodIndex + 3].childNodes[1].firstChild.firstChild.innerText = niceFormat(periods[periodIndex].startDate);
}

let calculatePercentage = (periodIndex, toString) => {
    let totalTime = periods[periodIndex].endDate - periods[periodIndex].startDate;
    let timeSinceStart = new Date() - periods[periodIndex].startDate;
    let percentage = timeSinceStart / totalTime;

    if (toString) return (percentage * 100).toFixed(4).toString() + "%";
    else return percentage;
}

let calculateBonus = (periodIndex, toString) => {
    let percentage = calculatePercentage(periodIndex, false);
    let bonus = 1/(1-percentage);

    if (toString) return (bonus * 100 - 100).toFixed(4).toString() + "%";
    else return bonus;
}

let niceFormat = (date) => {
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");
    return date.toDateString() + " " + hours + ":" + minutes + ":" + seconds;
}

submitButton.onclick = () => {



    createPeriod(periods.length-1);
}

createPeriods();