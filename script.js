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
      generatedID = generateOIB_Croatia();
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

// Function to generate a CNP for Romania

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

// Function to generate PESEL for Poland
function generatePESEL_Poland() {
  var dob = getRandomDate(1800, 2200); // Random date of birth
  var unique = Math.floor(Math.random() * 10000); // Random unique identifier
  var partialPESEL = `${dob}${unique.toString().padStart(4, '0')}`;
  var checksum = calculatePESELChecksum(partialPESEL);
  return `${partialPESEL}${checksum}`;
}

// Function to calculate PESEL checksum for Poland
function calculatePESELChecksum(partialPESEL) {
  var weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  var sum = 0;
  for (var i = 0; i < weights.length; i++) {
    sum += parseInt(partialPESEL.charAt(i)) * weights[i];
  }
  var checksum = (10 - (sum % 10)) % 10;
  return checksum;
}

// Function to generate OIB for Croatia
function generateOIB_Croatia() {
  var dob = getRandomDate(1970, 2003); // Random date of birth (18 years ago or older)
  var unique = Math.floor(Math.random() * 100000000); // Random unique identifier
  var partialOIB = `${dob}${unique.toString().padStart(8, '0')}`;
  var checksum = calculateOIBChecksum(partialOIB);
  return `${partialOIB}${checksum}`;
}

// Function to calculate OIB checksum for Croatia
function calculateOIBChecksum(partialOIB) {
  var weights = [10, 5, 7, 2, 3, 4, 5, 6, 7];
  var sum = 0;
  for (var i = 0; i < weights.length; i++) {
    sum += parseInt(partialOIB.charAt(i)) * weights[i];
  }
  var remainder = sum % 11;
  return (11 - remainder) % 10;
}

// Function to generate NIN for Belgium
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

