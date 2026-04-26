let cart = {};

function updateCart(name, price, change) {
    if (!cart[name]) {
        cart[name] = { price: price, qty: 0 };
    }
    
    cart[name].qty += change;

    if (cart[name].qty <= 0) {
        cart[name].qty = 0;
        delete cart[name];
    }

    // Update tampilan angka di kartu menu
    // Ganti spasi dengan tanda hubung agar ID valid
    const idName = name.replace(/\s+/g, '-');
    const display = document.getElementById(`q-${idName}`);
    if (display) display.innerText = cart[name] ? cart[name].qty : 0;

    calculateTotal();
}

function calculateTotal() {
    let total = 0;
    for (let item in cart) {
        total += cart[item].price * cart[item].qty;
    }
    document.getElementById('display-total').innerText = "Rp " + total.toLocaleString('id-ID');
}

function sendWhatsApp() {
    let message = "Halo Sobat Kamu! 🍟🥤%0ASaya ingin pesan:%0A%0A";
    let hasItems = false;

    for (let item in cart) {
        if (cart[item].qty > 0) {
            message += `- ${item} (x${cart[item].qty})%0A`;
            hasItems = true;
        }
    }

    if (!hasItems) return alert("Pilih menu terlebih dahulu!");

    message += `%0ATotal: ${document.getElementById('display-total').innerText}%0A%0AAlamat: [Tulis Alamat Di Sini]`;
    window.open(`https://wa.me/6281958406093?text=${message}`, '_blank');
}
