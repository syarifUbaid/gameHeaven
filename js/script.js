// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll("#item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
function sendMasage() {
  const name = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const pesan = document.getElementById("pesan").value;

  const url =
    "https://api.whatsapp.com/send?phone=6282331540799&text=nama%20%3A%20" +
    name +
    "%0Aemail%20%3A%20" +
    email +
    "%0Apesan%20%3A%20" +
    pesan +
    ".";
  window.open(url);
}

function submitOrder() {
  // Mengambil nilai dari form
  const game = document.getElementById('game').value;
  const idUser = document.getElementById('idUser').value;
  const diamond = document.getElementById('diamond').value;
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;

  // Memeriksa apakah semua data diisi
  if (!game || !idUser || !diamond || !name || !price) {
    alert("Harap lengkapi semua data!");
    return;
  }

  // Format pesan
  const pesanan = [
    "*Pesanan Anda*",
    `Game: ${game}`,
    `ID Pengguna: ${idUser}`,
    `Jumlah Diamond: ${diamond}`,
    `Harga: Rp ${price}`
  ];
  const totalHarga = `*Total Harga:* Rp ${price}`;
  const whatsappAPI = `https://api.whatsapp.com/send?phone=6282131980998&text=${encodeURIComponent(
    pesanan.join("\n") +
    "\n\n" +
    totalHarga +
    `\n\n*Atas Nama*\n${name}`
  )}`;
}