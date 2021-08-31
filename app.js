// ex 1
function reverseStr(str) {
  var reverse = str.split('').reverse().join('');
  return reverse;
}

// ex 2
function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

// ex 3
function convertDateToStr(date) {
  dateStr = {
    day: "",
    month: "",
    year: ""
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

// ex 4
function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// ex 5
function checkPalindromeForAllDateFormats(date) {
  var allDateFormats = getAllDateFormats(date);
  var flag = false;

  for (var i = 0; i < allDateFormats.length; i++) {
    if (isPalindrome(allDateFormats[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}

function isLeapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function getNextDate(date) {
  // +1 for the next day
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // check for february
  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        // go to 1st day of next month
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  }
  // check for other months
  else {
    // check if the day exceeds the max. days of that month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  // go to 1st month of next year if month exceeds 12
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getPreviousDate(date) {
  // -1 for the previous day
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      year--;
      month = 12;
      day = 31;
    }
    // check for february
    else if (month === 2) {
      // check for leap year
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    }
    // check for other months
    else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getNextPalindromeDate(date) {
  var daysForNextPalindromeDate = 0;
  var nextDate = getNextDate(date);

  while (true) {
    daysForNextPalindromeDate++;
    var isNextDatePalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isNextDatePalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [daysForNextPalindromeDate, nextDate];
}

function getPreviousPalindromeDate(date) {
  var daysForPreviousPalindromeDate = 0;
  var previousDate = getPreviousDate(date);

  while (true) {
    daysForPreviousPalindromeDate++;
    var isPreviousDatePalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPreviousDatePalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }

  return [daysForPreviousPalindromeDate, previousDate];
}

// UI Part
var dateOfBirth = document.querySelector("#date-of-birth");
var checkButton = document.querySelector("#check-button");
var outputText = document.querySelector("#output-text");

checkButton.addEventListener("click", checkButtonHandler);

function checkButtonHandler() {
  var dateOfBirthValue = dateOfBirth.value;

  if (dateOfBirthValue !== "") {
    var dateOfBirthArray = dateOfBirthValue.split("-");
    var date = {
      day: Number(dateOfBirthArray[2]),
      month: Number(dateOfBirthArray[1]),
      year: Number(dateOfBirthArray[0])
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      outputText.style.display = "block";
      outputText.innerHTML = "<span>🎉</span> <span>🎉</span> <span>🎉</span> Yayyyyy! Your birthday is a palindrome. <span>🎉</span> <span>🎉</span> <span>🎉</span>";
    } else {
      var [daysForNextPalindromeDate, nextDate] = getNextPalindromeDate(date);
      var [daysForPreviousPalindromeDate, previousDate] = getPreviousPalindromeDate(date);
      outputText.style.display = "block";
      outputText.innerHTML = `
        <span>🙁</span> Sorry! Your birthday is not a palindrome. <span>🙁</span> <br> 
        The next palindrome date is ${daysForNextPalindromeDate} days later on 
        ${nextDate.year}-${nextDate.month}-${nextDate.day}. <br> 
        The previous palindrome date is ${daysForPreviousPalindromeDate} days ago on 
        ${previousDate.year}-${previousDate.month}-${previousDate.day}.
      `;
    }
  } else {
    outputText.style.display = "block";
    outputText.innerHTML = "<span>🙁</span> You need to enter your full and valid Date of Birth above! <span>🙁</span>";
  }
}