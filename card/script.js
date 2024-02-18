const measurements = [
  { customer: 'John Doe', shirtLength: '30 inches', chest: '40 inches', waist: '36 inches', sleeveLength: '25 inches', additionalInfo: 'Some additional info' },
  { customer: 'Jane Smith', shirtLength: '32 inches', chest: '38 inches', waist: '34 inches', sleeveLength: '24 inches', additionalInfo: 'More details' },
  { customer: 'Hassam Ovais', shirtLength: '28 inches', chest: '42 inches', waist: '38 inches', sleeveLength: '26 inches', additionalInfo: 'Extra notes' },
  { customer: 'Michael Johnson', shirtLength: '28 inches', chest: '42 inches', waist: '38 inches', sleeveLength: '26 inches', additionalInfo: 'Additional details' }
];

// Function to create measurement cards
function createCard(measurement, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  const html = `
    <span class="delete" data-index="${index}">&times;</span>
    <h2>Customer: ${measurement.customer}</h2>
    <p>Shirt Length: ${measurement.shirtLength}</p>
    <p>Chest: ${measurement.chest}</p>
    <p>Waist: ${measurement.waist}</p>
    <p>Sleeve Length: ${measurement.sleeveLength}</p>
    <p>Additional Information: ${measurement.additionalInfo}</p>
  `;

  card.innerHTML = html;
  return card;
}

// Function to render measurement cards
function renderCards() {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';

  measurements.forEach((measurement, index) => {
    const card = createCard(measurement, index);
    cardContainer.appendChild(card);
  });

  // Add event listeners to delete icons
  const deleteIcons = document.querySelectorAll('.delete');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      measurements.splice(index, 1);
      renderCards();
    });
  });
}

// Function to filter measurement cards based on search input
function filterCards() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredMeasurements = measurements.filter((measurement) => {
    return (
      measurement.customer.toLowerCase().includes(searchInput) ||
      measurement.shirtLength.toLowerCase().includes(searchInput) ||
      measurement.chest.toLowerCase().includes(searchInput) ||
      measurement.waist.toLowerCase().includes(searchInput) ||
      measurement.sleeveLength.toLowerCase().includes(searchInput) ||
      measurement.additionalInfo.toLowerCase().includes(searchInput)
    );
  });

  renderFilteredCards(filteredMeasurements);
}

// Function to render filtered measurement cards
function renderFilteredCards(filteredMeasurements) {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';

  filteredMeasurements.forEach((measurement, index) => {
    const card = createCard(measurement, index);
    cardContainer.appendChild(card);
  });

  // Add event listeners to delete icons
  const deleteIcons = document.querySelectorAll('.delete');
  deleteIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      measurements.splice(index, 1);
      renderFilteredCards(filteredMeasurements.filter((_, i) => i !== index));
    });
  });
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('keyup', filterCards);

// Initial rendering of measurement cards
renderCards();

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById('addCardBtn');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Handle form submission for adding new measurements
document.getElementById('addMeasurementForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const customerName = document.getElementById('customer-name').value;
  const shirtLength = document.getElementById('shirt-length').value;
  const chest = document.getElementById('chest').value;
  const waist = document.getElementById('waist').value;
  const sleeveLength = document.getElementById('sleeve-length').value;
  const additionalInfo = document.getElementById('additional-info').value;

  // Add the new measurement to the array
  measurements.push({
    customer: customerName,
    shirtLength: shirtLength + ' inches',
    chest: chest + ' inches',
    waist: waist + ' inches',
    sleeveLength: sleeveLength + ' inches',
    additionalInfo: additionalInfo
  });

  renderCards(); // Render the updated cards
  modal.style.display = 'none'; // Close the modal
});
