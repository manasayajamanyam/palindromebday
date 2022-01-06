var user_date = document.getElementById("myDate")

var btn = document.getElementById("mybtn")

btn.addEventListener("click", palindrome)

var output = document.querySelector(".output")

function palindrome(){
  var x=user_date.value

  if (x===""){
    alert("enter date")
    return
  }

  var date={
  year : Number(x.substring(0, 4)),
  month : Number(x.substring(5, 7)),
  day : Number(x.substring(8, 10))
  }

  var isPalindrome = checkPalindromeForAllDateFormats(date);

  if(isPalindrome){
    output.innerText=`The date is a Palindrome !!!`
  }
  else {
    var [count, nextDate] = getNextPalindromeDate(date);
    output.innerText=`The nearest palidrome date is ${nextDate.day+"-"+nextDate.month+"-"+nextDate.year}. You missed by ${count} days`
    output.classList.remove("hide");

  }

}

function reverseStr(str){
  return str.split('').reverse().join('');
}

function isPalindrome(str) {
  return str === reverseStr(str);
}

function convertDateToStr(date) {

  var dateStr = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  }
  else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  }
  else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

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

function checkPalindromeForAllDateFormats(date){
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for(var i=0; i < listOfPalindromes.length; i++){
    if(isPalindrome(listOfPalindromes[i])){
      flag = true;
      break;
    }
  }

  return flag;
}


function isLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}


function getNextDate(date){
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // if not end of month add 1

  // if end of month and not feb then increase month by 1 ad date is 1

  // if feb month then check leap isLeapYear

  // if leap year add 28+1 =29 else increase month

  // if month increases by 12 then add 1+year and make month = 1

  if(month == 2){
    if(isLeapYear(year)){
       if(day > 29){
         day = 1;
         month++;
       }
    }
    else {
       if(day > 28){
         day = 1;
         month++;
       }
    }
  }
  else{
    if(day> daysInMonth[month-1]){
      day=1;
      month++;
    }
  }

  if(month > 12){
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date){

  // find next date which is palindrome and count the difference in days

  // while loop to check if date is plaindrome in all formats and counter to append each iteration
  var count=0

  var nextDate = getNextDate(date)

  while(true){
    count++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPalindrome){
      return [count, nextDate];
    }
    nextDate = getNextDate(nextDate);
  }

}

function getpreviousDate(date){
  // if day isless than 1 then check previous month max day value and decrement daysInMonth

  //if month is 2 and leap year make it 29 else 28

  // if month is less than 1 then decrement year and update day as 31 and month 12

  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(day<1){
    if(month==1){
      year--
      month=12
      day=31
    }
    else{
      month--;
      day = daysInMonth[month]
    }
  }

  if(month==2){
    if(isLeapYear(year)){
      day=29
    }
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getpreviousPalindromeDate(date){

  // findprevious date which is palindrome and count the difference in days

  // while loop to check if date is plaindrome in all formats and counter to append each iteration
  var count=0

  var nextDate = getpreviousDate(date)

  while(true){
    count++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPalindrome){
      return [count, nextDate];
    }
    nextDate = getpreviousDate(nextDate);
  }

}
