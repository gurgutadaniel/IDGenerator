// Function to generate random date within a given range
function getRandomDate(minYear, maxYear) {
  var year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  var month = Math.floor(Math.random() * 12) + 1;
  var day = Math.floor(Math.random() * 28) + 1; // Assuming all months have max of 28 days for simplicity
  return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
}

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
    case "croatia":
      generatedID = generateJMBG_Croatia();
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

/////////////////////////////////////////////////////////////////////////////////////////////////////// Function to generate JMBG for Croatia
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

function getRandomCroatianRegion() {
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

function generateJMBG_Croatia() {
  const { day, month, year } = getRandomDate(1930, 2005); // Random date of birth between 1930 and 2005
  const region = getRandomCroatianRegion();
  const BBB = getRandomInt(0, 999).toString().padStart(3, '0');
  
  const baseJMBG = `${day}${month}${year}${region}${BBB}`;
  const checksum = calculateChecksum(baseJMBG);

  return `${baseJMBG}${checksum}`;
}

///////////////////////////////////////////////////////////////////////////////// Function to generate NIN for Belgium
function generateNIN_Belgium() {
  var dob = getRandomDate(1970, 2003); // Random date of birth (18 years ago or older)
  var unique = Math.floor(Math.random() * 1000); // Random unique identifier
  var partialNIN = `${dob}${unique.toString().padStart(3, '0')}`;
  var checksum = calculateNINChecksum(partialNIN);
  return `${partialNIN}${checksum}`;
}

// Function to calculate NIN checksum for Belgium
function calculateNINChecksum(partialNIN) {
  // Placeholder for actual NIN checksum calculation
  // Implement the proper algorithm for production use
  return Math.floor(Math.random() * 10); // Placeholder, actual algorithm needed
}

// Function to generate EGN for Bulgaria
function generateEGN_Bulgaria() {
  var dob = getRandomDate(1800, 2200); // Random date of birth
  var unique = Math.floor(Math.random() * 1000); // Random unique identifier
  // Implement EGN generation logic here
  var partialEGN = `${dob}${unique.toString().padStart(3, '0')}`;
  // Placeholder for EGN checksum calculation
  return `${partialEGN}0`; // Placeholder, actual checksum needed
}

// Function to generate CPF for Brazil
function generateCPF_Brazil() {
  var dob = getRandomDate(1800, 2200); // Random date of birth
  var unique = Math.floor(Math.random() * 100000000); // Random unique identifier
  var partialCPF = `${dob}${unique.toString().padStart(8, '0')}`;
  var checksum = calculateCPFChecksum(partialCPF);
  return `${partialCPF}${checksum}`;
}

// Function to calculate CPF checksum for Brazil
function calculateCPFChecksum(partialCPF) {
  // Placeholder for actual CPF checksum calculation
  // Implement the proper algorithm for production use
  return Math.floor(Math.random() * 10); // Placeholder, actual algorithm needed
}

// Implement other necessary functions for different countries...

