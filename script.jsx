const previousPurchases = ['Laptop', 'Headphones'];
const products = ['Mouse', 'Keyboard', 'Headphones', 'Phone', 'Charger'];
let selectedProduct = '';

window.onload = () => {
  showSuggestions();
  showAvailableProducts();
};

// Display suggestions
function showSuggestions() {
  const container = document.getElementById('productSuggestions');
  container.innerHTML = '';
  const suggestions = products.filter(p => previousPurchases.includes(p));
  suggestions.forEach(prod => {
    const el = document.createElement('div');
    el.className = 'product';
    el.innerHTML = `<h3>${prod}</h3><button onclick="startPurchase('${prod}')">Buy</button>`;
    container.appendChild(el);
  });
}

// Display product list
function showAvailableProducts() {
  const container = document.getElementById('productList');
  container.innerHTML = '';
  products.forEach(prod => {
    const el = document.createElement('div');
    el.className = 'product';
    el.innerHTML = `<h3>${prod}</h3><button onclick="startPurchase('${prod}')">Buy</button>`;
    container.appendChild(el);
  });
}

// Purchase flow
function startPurchase(product) {
  selectedProduct = product;
  document.getElementById('intentPopup').style.display = 'block';
}

function confirmPurchase() {
  const intent = document.getElementById('intentInput').value;
  if (!intent) {
    alert("Please provide your intent.");
    return;
  }
  alert(`Purchase Confirmed for ${selectedProduct}.\nReason: ${intent}`);
  document.getElementById('intentPopup').style.display = 'none';
  document.getElementById('intentInput').value = '';
}

// QR Scanner (uses QR Scanner library)
let scanner;

function openQRScanner() {
  document.getElementById('qrScannerModal').style.display = 'block';
  const videoElem = document.getElementById('qrVideo');

  scanner = new QrScanner(videoElem, result => {
    alert(`Scanned QR: ${result}`);
    scanner.stop();
    document.getElementById('qrScannerModal').style.display = 'none';
  });

  scanner.start();
}

function closeQRScanner() {
  if (scanner) {
    scanner.stop();
  }
  document.getElementById('qrScannerModal').style.display = 'none';
}
