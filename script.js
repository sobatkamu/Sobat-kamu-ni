let cart = [];
let total = 0;
const phoneNumber = "6281958406093";

function addToCart(name, price) {
    cart.push({ name, price });
    updateTotal();
}

function updateTotal() {
    total = cart.reduce((sum, item) => sum + item.price, 0);
    // Update tampilan harga di layar
    document.querySelector('.total-price').innerText = "Rp " + total.toLocaleString('id-ID');
    updateWhatsAppLink();
}

function updateWhatsAppLink() {
    if (cart.length === 0) return;

    let message = "Halo Sobat Kamu! 🍟🥤%0ASaya ingin memesan:%0A";
    
    // Kelompokkan item yang sama
    const summary = cart.reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + 1;
        return acc;
    }, {});

    for (const [name, qty] of Object.entries(summary)) {
        message += `- ${name} (${qty}x)%0A`;
    }

    message += `%0ATotal: Rp ${total.toLocaleString('id-ID')}%0A%0AAlamat Delivery: [Isi Alamat Di Sini]`;
    
    const waLink = `https://wa.me/${phoneNumber}?text=${message}`;
    document.getElementById('btn-wa').href = waLink;
}

// Reset Keranjang (Opsional)
function resetCart() {
    cart = [];
    total = 0;
    updateTotal();
    document.getElementById('btn-wa').href = "#";
}
