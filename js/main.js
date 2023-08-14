setTimeout(() => {
  document.querySelector("body").style.opacity = "1";
  document.querySelector(".front-card ").style.transition = "1s";
  document.querySelector(".back-card ").style.transition = "1s";
}, 500);

//local storage
let sessionName = sessionStorage.getItem("sessionName");
let sessionNumber = sessionStorage.getItem("sessionNumber");
let sessionDate = sessionStorage.getItem("sessionDate");
let sessionCVC = sessionStorage.getItem("sessionCVC");

// select each input :input - label - error - info of cradit card
let names = document.querySelector("input#name");
let invalidName = document.querySelector("span#invalid-name");
let frontName = document.querySelector(".front-name");

let number = document.querySelector("input#number");
let invalidNumber = document.querySelector("span#invalid-number");
let frontNumber = document.querySelector(".front-number");

let MM = document.querySelector("input.month");
let YY = document.querySelector("input.year");
let invalidMonth = document.querySelector("span#invalid-month");
let invalidYear = document.querySelector("span#invalid-year");
let frontDate = document.querySelector(".front-date");

let cvc = document.querySelector("input#cvc");
let invalidcvc = document.querySelector("span#invalid-cvc");
let backcvc = document.querySelector(".back-cvc");

//set valid true
let validName,
  validNumber,
  validYear,
  validMonth,
  validCVC = true;

//check the sessionStorage
if (
  sessionName !== null &&
  sessionNumber !== null &&
  sessionDate !== null &&
  sessionCVC !== null
) {
  document.querySelector(".confirm").style.display = "none";
  document.querySelector(".completed").style.display = "block";
  frontName.innerHTML = `${sessionName}`;
  frontNumber.innerHTML = `${sessionNumber}`;
  frontDate.innerHTML = `${sessionDate}`;
  backcvc.innerHTML = `${sessionCVC}`;
}

//start put data in cradit card
//name
names.addEventListener("input", (u) => {
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (u.target.value === "") {
    invalidStyle(invalidName, names);
    invalidName.innerHTML = `can't be blank`;
  } else {
    validStyle(invalidName, names);
    frontName.innerHTML = `${u.target.value.toUpperCase()}`;
    validName = true;
    if (!u.target.value.match(regName)) {
      invalidStyle(invalidName, names);
      invalidName.innerHTML = `Wrong format`;
      validName = false;
    }
  }
});
//cvc
cvc.addEventListener("input", (u) => {
  var regCvc = /^[0-9]{3}$/;
  if (u.target.value === "") {
    invalidStyle(invalidcvc, cvc);
    invalidcvc.innerHTML = "can't be blank";
  } else {
    validStyle(invalidcvc, cvc);
    backcvc.innerHTML = `${u.target.value.padEnd(3, "0")}`;
    validNumber = true;
    if (!u.target.value.match(regCvc)) {
      invalidStyle(invalidcvc, cvc);
      invalidcvc.innerHTML = "must have 3 digits";
      validNumber = false;
    }
  }
});
//month
MM.addEventListener("input", (u) => {
  var validMonthRegex = /\b([1-9]|[1][0-2])\b/g;
  if (u.target.value === "") {
    invalidStyle(invalidMonth, MM);
    invalidMonth.innerHTML = "can't be blank";
  } else {
    validStyle(invalidMonth, MM);
    const e = frontDate.innerHTML.slice(3, 5);
    frontDate.innerHTML = `${u.target.value.padStart(2, "0")}/${e}`;
    validMonth = true;
    if (!u.target.value.match(validMonthRegex)) {
      invalidStyle(invalidMonth, MM);
      invalidMonth.innerHTML = "Invalid Month";
      validMonth = false;
    }
  }
});
//year
YY.addEventListener("input", (u) => {
  var validYearRegex = /^([0-9]{2})$/g;
  if (u.target.value === "") {
    invalidStyle(invalidYear, YY);
    invalidYear.innerHTML = "can't be blank";
  } else {
    validStyle(invalidYear, YY);
    const t = frontDate.innerText.slice(0, 2);
    frontDate.innerHTML = `${t}/${u.target.value.padStart(2, "0")}`;
    validYear = true;
    if (!u.target.value.match(validYearRegex)) {
      invalidStyle(invalidYear, YY);
      invalidYear.innerHTML = "Invalid Year";
      validYear = false;
    }
  }
});

//numbers
number.addEventListener("input", (u) => {
  var numberRegex = /4[0-9]{12}(?:[0-9]{3,4})?$/;
  if (u.target.value === "") {
    invalidStyle(invalidNumber, number);
    invalidNumber.innerHTML = "can't be blank";
  } else {
    validStyle(invalidNumber, number);
    frontNumber.innerHTML = u.target.value
      .padEnd(16, "0")
      .match(/.{1,4}/g)
      .join(" ");
    validCVC = true;
    if (!u.target.value.match(numberRegex)) {
      invalidStyle(invalidNumber, number);
      if (u.target.value.length < 16) {
        invalidNumber.innerHTML = "must have 16 digit";
      } else {
        if (/[a-zA-Z]/g.test(u.target.value)) {
          invalidNumber.innerHTML = "Wrong format,numbers only";
        } else {
          invalidNumber.innerHTML = "invalid format";
        }
      }
      validCVC = false;
    }
  }
});

// // style invalid
function invalidStyle(invalid, input) {
  invalid.style.opacity = "1";
  invalid.style.bottom = "18px";
  invalid.style.trnasition = "0.5s";
  input.style.borderColor = "var(--input-errors)";
}
// return everything as it was
function validStyle(invalid, input) {
  invalid.innerHTML = " ";
  invalid.style.bottom = "0";
  invalid.style.opacity = "0";
  input.style.background =
    "linear-gradient(white, white) padding-box, linear-gradient(90deg, hsl(249, 99%, 64%), hsl(278, 94%, 30%)) border-box";
  input.style.borderColor = "transparent";
}
//aniamtion
const Spinning = [
  { transform: "rotate(0) " },
  { transform: "rotate(360deg) " },
];

const Timing = {
  duration: 300,
  iterations: 1,
};

//confirm

document.querySelector(".form button ").addEventListener("click", (ele) => {
  if (validName && validNumber && validMonth && validYear && validCVC) {
    sessionStorage.setItem("sessionName", frontName.textContent);
    sessionStorage.setItem("sessionNumber", frontNumber.textContent);
    sessionStorage.setItem("sessionDate", frontDate.textContent);
    sessionStorage.setItem("sessionCVC", backcvc.textContent);

    document.querySelector(".confirm").style.display = "none";
    document.querySelector(".completed").style.display = "block";

    document.querySelector(".icon img").animate(Spinning, Timing);
  } else {
    ele.preventDefault();
  }
});
