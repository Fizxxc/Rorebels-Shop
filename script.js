let cart = [];
let total = 0;

function addToCart(id, name, price) {
    const product = { id, name, price };
    cart.push(product);
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - Rp. ${item.price}`;
        cartItems.appendChild(li);
    });

    updateTotal();
}

function updateTotal() {
    total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalDisplay = document.getElementById("total");
    totalDisplay.textContent = `Total: Rp. ${total}`;
}

function toggleCart() {
    const cartSection = document.getElementById("cart");
    cartSection.classList.toggle("hidden");
}

function showPaymentForm() {
    if (cart.length === 0) {
        alert("Keranjang kosong!");
    } else {
        const cartSection = document.getElementById("cart");
        const paymentSection = document.getElementById("payment");
        cartSection.classList.add("hidden");
        paymentSection.classList.remove("hidden");
    }
}

function processPayment(event) {
    event.preventDefault();  // Prevent form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (name && email && address && paymentMethod) {
        const confirmationMessage = `
            Terima kasih, ${name}. Pembayaran sebesar Rp. ${total} telah diterima menggunakan ${paymentMethod}.
            Pesanan Anda akan dikirim ke alamat berikut: ${address}.
            Detail lebih lanjut akan dikirim ke ${email}.
        `;

        showConfirmation(confirmationMessage);
    } else {
        alert("Harap isi semua data pembayaran.");
    }
}

function showConfirmation(message) {
    const paymentSection = document.getElementById("payment");
    const confirmationSection = document.getElementById("confirmation");
    const confirmationMessage = document.getElementById("confirmation-message");

    paymentSection.classList.add("hidden");
    confirmationSection.classList.remove("hidden");
    confirmationMessage.textContent = message;
}

function resetPage() {
    cart = [];
    updateCartCount();
    updateCartDisplay();

    const confirmationSection = document.getElementById("confirmation");
    const cartSection = document.getElementById("cart");
    
    confirmationSection.classList.add("hidden");
    cartSection.classList.remove("hidden");
}

function sendWhatsApp() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const orderDetails = cart.map(item => `${item.name} - Rp. ${item.price}`).join(', ');
    const totalAmount = total;

    const message = `Halo, saya ${name} ingin mengonfirmasi pembayaran.\n\nDetail Pesanan:\n${orderDetails}\nTotal: Rp. ${totalAmount}\nAlamat: ${address}\nMetode Pembayaran: ${paymentMethod}`;
    
    // Nomor WhatsApp Anda (gunakan format internasional, tanpa "+" atau "0", contoh: 628123456789)
    const phoneNumber = "6288296172396";
    
    // URL WhatsApp API
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Redirect ke WhatsApp
    window.open(whatsappURL, '_blank');
}
