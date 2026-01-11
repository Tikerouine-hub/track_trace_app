async function loadLots() {
  const res = await fetch('http://localhost:3000/lots');
  const lots = await res.json();

  const list = document.getElementById('lots');
  list.innerHTML = '';

  lots.forEach(lot => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${lot.product} - ${lot.quantity} - ${lot.status}
      <button onclick="updateStatus(${lot.id})">Changer statut</button>
    `;
    list.appendChild(li);
  });
}

async function addLot() {
  const product = document.getElementById('product').value;
  const quantity = document.getElementById('quantity').value;

  await fetch('http://localhost:3000/lots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product, quantity })
  });

  loadLots();
}

async function updateStatus(id) {
  await fetch(`http://localhost:3000/lots/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'Expédié' })
  });

  loadLots();
}

loadLots();
