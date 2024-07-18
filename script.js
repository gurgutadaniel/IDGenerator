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

// Function to generate CNP for Romania
function generateCNP_Romania() {
  var gender = Math.random() < 0.5 ? 1 : 2; // Randomly choose gender: 1 for male, 2 for female
  var dob = getRandomDate(1800, 2200); // Random date of birth
  var county = Math.floor(Math.random() * 52) + 1; // Random county code
  var unique = Math.floor(Math.random() * 1000); // Random unique identifier
  var partialCNP = `${gender}${dob}${county.toString().padStart(2, '0')}${unique.toString().padStart(3, '0')}`;
  var checksum = calculateCNPChecksum(partialCNP);
  return `${partialCNP}${checksum}`;
}

// Function to calculate CNP checksum for Romania
function calculateCNPChecksum(partialCNP) {
  var weights = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
  var sum = 0;
  for (var i = 0; i < weights.length; i++) {
    sum += parseInt(partialCNP.charAt(i)) * weights[i];
  }
  var remainder = sum % 11;
  if (remainder === 10) {
    return 1;
  } else {
    return remainder;
  }
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

