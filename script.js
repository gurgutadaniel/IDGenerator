// Function to generate ID based on selected country
function generateID() {
  var country = document.getElementById("country").value;
  var generatedID = "";

  switch (country) {
    case "romania":
      generatedID = generateCNP_Romania();
      break;
    case "poland":
      generatedID = generatePESEL_Poland();
      break;
    case "serbia":
      generatedID = generateJMBG_Serbia();
      break;
    case "belgium":
      generatedID = generateNIN_Belgium();
      break;
    case "bulgaria":
      generatedID = generateEGN_Bulgaria();
      break;
    case "brazil":
      generatedID = generateCPF_Brazil();
      break;
    default:
      generatedID = "Select a country and click 'Generate ID'.";
      break;
  }

  document.getElementById("generatedID").innerHTML = `<p>Generated ID: <strong>${generatedID}</strong></p>`;
}

//////////////////////////////////////////////////////////////////////////////////// Function to generate a CNP for Romania

function generateCNP_Romania() {
  // Randomly choose gender and century
  const genderOptions = [
    { sex: 1, century: 1900 }, { sex: 2, century: 1900 },
    { sex: 5, century: 2000 }, { sex: 6, century: 2000 },
    { sex: 7, century: null }, { sex: 8, century: null }
  ];

  const genderChoice = genderOptions[Math.floor(Math.random() * genderOptions.length)];
  const gender = genderChoice.sex;
  const century = genderChoice.century;

  // Generate random birth year between 1930 and 2006
  const birthYear = Math.floor(Math.random() * (2006 - 1930 + 1)) + 1930;
  const year = birthYear % 100; // Last two digits of the year

  // Determine the century for the birth year
  const birthCentury = (birthYear < 2000) ? 1900 : 2000;

  // Generate random month and day
  const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
  const day = Math.floor(Math.random() * 31) + 1; // Random day between 1 and 31

  // Ensure valid date
  if (!isValidDate(day, month, year, birthCentury)) {
    return generateValidCNP(); // Retry if the date is invalid
  }

  // Zero pad year, month, and day
  const yearStr = year.toString().padStart(2, '0');
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');

  // Generate random county code
  const countyCode = Math.floor(Math.random() * 52) + 1;
  const countyStr = countyCode.toString().padStart(2, '0');

  // Generate random sequential code
  const sequentialCode = Math.floor(Math.random() * 999) + 1;
  const sequentialStr = sequentialCode.toString().padStart(3, '0');

  // Combine all parts
  const partialCNP = `${gender}${yearStr}${monthStr}${dayStr}${countyStr}${sequentialStr}`;

  // Calculate the checksum digit
  const checksum = calculateCNPChecksum(partialCNP);

  // Return the complete CNP
  return `${partialCNP}${checksum}`;
}

// Function to check if the given day, month, and year form a valid date
function isValidDate(day, month, year, century) {
  const date = new Date(century + year, month - 1, day);
  return date.getFullYear() === (century + year) &&
         date.getMonth() === (month - 1) &&
         date.getDate() === day;
}

// Function to calculate CNP checksum for Romania
function calculateCNPChecksum(partialCNP) {
  const weights = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
  let sum = 0;

  for (let i = 0; i < weights.length; i++) {
    sum += parseInt(partialCNP.charAt(i)) * weights[i];
  }

  const remainder = sum % 11;
  return (remainder === 10) ? 1 : remainder;
}

////////////////////////////////////////////////////////////////////////////// Function to generate PESEL for Poland
function generatePESEL_Poland() {
  // Generăm anul de naștere între 1930 și 2005
  const year = getRandomYearInRange(1930, 2005);
  const date = new Date(year, getRandomMonth() - 1, getRandomDay()); // -1 deoarece lunile în JavaScript sunt indexate de la 0
  const gender = Math.random() < 0.5 ? 'male' : 'female'; // Gen random

  // Formatăm data în formatul PESEL
  let peselDate = formatDate(date);
  
  // Ajustăm luna pentru a reflecta perioada de naștere
  peselDate = adjustMonth(peselDate, getMonthAdjustment(year));

  // Adăugăm un identificator unic și cifra de control
  const uniqueId = generateRandomDigits(3);
  const genderDigit = generateDigitForGender(gender);
  const peselWithoutChecksum = peselDate + uniqueId + genderDigit;
  const checksum = calculateControlDigit(peselWithoutChecksum);

  return peselWithoutChecksum + checksum;
}

// Funcția pentru generarea unui an în intervalul specificat
function getRandomYearInRange(minYear, maxYear) {
  return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
}

// Funcția pentru generarea unei luni aleatorii între 1 și 12
function getRandomMonth() {
  return Math.floor(Math.random() * 12) + 1;
}

// Funcția pentru generarea unei zile aleatorii între 1 și 28
function getRandomDay() {
  return Math.floor(Math.random() * 28) + 1;
}

// Funcția pentru format data în format PESEL
function formatDate(date) {
  const yy = date.getFullYear().toString().slice(-2);
  const MM = ('0' + (date.getMonth() + 1)).slice(-2);
  const dd = ('0' + date.getDate()).slice(-2);
  return yy + MM + dd;
}

// Funcția pentru ajustarea lunii pentru secolul corespunzător
function adjustMonth(dateString, adjustment) {
  let year = parseInt(dateString.slice(0, 2), 10);
  let month = parseInt(dateString.slice(2, 4), 10);
  month += adjustment;
  if (month > 12) {
    year += Math.floor(month / 12);
    month = month % 12;
  }
  return ('0' + year).slice(-2) + ('0' + month).slice(-2) + dateString.slice(4);
}

// Funcția pentru determinarea ajustării lunii în funcție de an
function getMonthAdjustment(year) {
  if (year >= 2000 && year < 2100) {
    return 20;
  } else if (year >= 2100 && year < 2200) {
    return 40;
  } else if (year >= 2200 && year < 2300) {
    return 60;
  } else if (year < 1900) {
    return 80;
  }
  return 0;
}

// Funcția pentru generarea cifrelor random
function generateRandomDigits(length) {
  let digits = '';
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
}

// Funcția pentru generarea cifrei de gen
function generateDigitForGender(gender) {
  const baseDigit = Math.floor(Math.random() * 5) * 2;
  return gender === 'male' ? baseDigit + 1 : baseDigit;
}

// Funcția pentru calculul cifrei de control
function calculateControlDigit(pesel) {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const digits = pesel.split('').map(Number);
  const sum = digits.slice(0, 10).reduce((acc, digit, i) => acc + digit * weights[i], 0);
  const modulo = sum % 10;
  const checksum = (10 - modulo) % 10;
  return checksum;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////// Function to generate JMBG for Serbia
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(startYear, endYear) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let day = getRandomInt(1, 31);
  let month = getRandomInt(1, 12);
  let year = getRandomInt(startYear, endYear);
  
  // Ensure the day is valid for the month
  while (day > daysInMonth[month - 1] || (month === 2 && day === 29 && !isLeapYear(year))) {
      day = getRandomInt(1, daysInMonth[month - 1]);
  }
  
  return { day: day.toString().padStart(2, '0'), month: month.toString().padStart(2, '0'), year: (year % 1000).toString().padStart(3, '0') };
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getRandomSerbiaRegion() {
  const regions = ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39'];
  return regions[getRandomInt(0, regions.length - 1)];
}

function calculateChecksum(baseJMBG) {
  const weights = [7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < baseJMBG.length; i++) {
      sum += parseInt(baseJMBG[i]) * weights[i % 6];
  }
  let m = 11 - (sum % 11);
  return (m === 10 || m === 11) ? '0' : m.toString();
}

function generateJMBG_Serbia() {
  const { day, month, year } = getRandomDate(1930, 2005); // Random date of birth between 1930 and 2005
  const region = getRandomSerbiaRegion();
  const BBB = getRandomInt(0, 999).toString().padStart(3, '0');
  
  const baseJMBG = `${day}${month}${year}${region}${BBB}`;
  const checksum = calculateChecksum(baseJMBG);

  return `${baseJMBG}${checksum}`;
}

///////////////////////////////////////////////////////////////////////////////// Function to generate NIN for Belgium
function generateNIN_Belgium() {
  // Helper function to generate a random integer between min and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper function to generate a random date in the format yy.mm.dd
  function getRandomDate() {
    const day = String(getRandomInt(1, 28)).padStart(2, '0'); // Ensure day is valid
    const month = String(getRandomInt(1, 12)).padStart(2, '0'); // Ensure month is valid
    const year = String(getRandomInt(1930, 2005)).slice(-2); // Year should be between 1930 and 2005
    return `${year}.${month}.${day}`;
  }

  // Generate a random date
  const dateStr = getRandomDate();

  // Generate a random sequential number (odd for males, even for females)
  const sequentialNumber = String(getRandomInt(0, 999)).padStart(3, '0');
  const isMale = getRandomInt(0, 1) === 0; // Randomly choose gender
  const finalSequentialNumber = isMale ? sequentialNumber : (parseInt(sequentialNumber) + 1).toString().padStart(3, '0'); // Ensure even number for females

  // Form the control number by concatenating date and sequential number
  const controlNumber = dateStr.replace(/\./g, '') + finalSequentialNumber;

  // Calculate the checksum using modulo 97
  const checkSum = 97 - (parseInt(controlNumber) % 97);
  const checkDigit = checkSum.toString().padStart(2, '0');

  // Form the final Belgian NIN
  const nin = `${dateStr}-${finalSequentialNumber}.${checkDigit}`;

  return nin;
}

///////////////////////////////////////////////////////////////////////////////// Function to generate CPF for Brazil
function generateCPF_Brazil() {
  // Helper function to generate a random integer between min and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper function to calculate the CPF check digit
  function calculateCheckDigit(digits, weights) {
    const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  // Generate a random base number of 9 digits
  const baseDigits = Array.from({ length: 9 }, () => getRandomInt(0, 9));

  // Calculate the first check digit
  const firstCheckDigit = calculateCheckDigit(baseDigits, [10, 9, 8, 7, 6, 5, 4, 3, 2]);

  // Add the first check digit to the base digits and calculate the second check digit
  const allDigits = [...baseDigits, firstCheckDigit];
  const secondCheckDigit = calculateCheckDigit(allDigits, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);

  // Format the base number and check digits
  const formattedBase = baseDigits.join('');
  const formattedCPF = `${formattedBase.slice(0, 3)}.${formattedBase.slice(3, 6)}.${formattedBase.slice(6, 9)}-${firstCheckDigit}${secondCheckDigit}`;

  return formattedCPF;
}

// Function to display the generated CPF on the webpage
function displayGeneratedID() {
  const generatedID = generateCPF_Brazil();
  document.getElementById("generatedID").innerHTML = `<p>Generated CPF: <strong>${generatedID}</strong></p>`;
}

// Attach event listener to the button to generate and display CPF
document.getElementById("generateButton").addEventListener("click", displayGeneratedID);

////////////////////////////////////////////////////////////////////////////////////////////////////// Function to generate EGN for Bulgaria

// Function to generate EGN for Bulgaria
function generateEGN_Bulgaria() {
    // EGN weights
    const EGN_WEIGHTS = [2, 4, 8, 5, 10, 9, 7, 3, 6];

    // Helper function to generate a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Helper function to validate date
    function isValidDate(day, month, year) {
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year &&
               date.getMonth() === (month - 1) &&
               date.getDate() === day;
    }

    // Helper function to calculate EGN checksum
    function calculateEGNChecksum(egn) {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(egn.charAt(i)) * EGN_WEIGHTS[i];
        }
        let validChecksum = sum % 11;
        if (validChecksum === 10) validChecksum = 0;
        return validChecksum.toString();
    }

    // Generate random year of birth between 1930 and 2005
    let year = getRandomInt(1930, 2005);
    // Convert to two-digit year format for EGN
    let twoDigitYear = year % 100;

    // Generate random month
    let month = getRandomInt(1, 12);
    // Generate random day, ensuring it's valid for the month and year
    let day = getRandomInt(1, new Date(year, month, 0).getDate());

    // Generate random region code
    let region = getRandomInt(0, 999);
    // Ensure the region code is formatted with three digits
    region = String(region).padStart(3, '0');

    // Randomly choose gender (1 for male, 2 for female)
    let sex = getRandomInt(1, 2);
    // Adjust region to be odd for male and even for female
    if (sex === 1 && region % 2 === 0) {
        region = String(parseInt(region) - 1).padStart(3, '0'); // Ensure odd
    } else if (sex === 2 && region % 2 !== 0) {
        region = String(parseInt(region) + 1).padStart(3, '0'); // Ensure even
    }

    // Format EGN
    const egn = `${String(twoDigitYear).padStart(2, '0')}` +
                `${String(month).padStart(2, '0')}` +
                `${String(day).padStart(2, '0')}` +
                region;

    // Calculate checksum and add to EGN
    const checksum = calculateEGNChecksum(egn);

    return `${egn}${checksum}`;
}

// Example usage
console.log(generateEGN_Bulgaria());

// Example for integrating into a web page
function displayGeneratedEGN() {
    const generatedID = generateEGN_Bulgaria();
    document.getElementById("generatedID").innerHTML = `<p>Generated EGN: <strong>${generatedID}</strong></p>`;
}

// Attach event listener to the button to generate and display EGN
document.getElementById("generateButton").addEventListener("click", displayGeneratedEGN);
