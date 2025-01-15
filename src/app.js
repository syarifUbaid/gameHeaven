document.addEventListener("alpine:init", () => {
  Alpine.data("pameranAkun", () => ({
    items: [
      { id: 1, name: "Dark Angel", img: "2.jpg", price: 120000 },
      { id: 2, name: "pluffy", img: "3.jpg", price: 80000 },
      { id: 3, name: "RRQ lemon", img: "2.jpg", price: 80000 },
      { id: 4, name: "alok", img: "5.webp", price: 120000 },
      { id: 5, name: "r7", img: "2.jpg", price: 100000 },
      { id: 6, name: "skylar", img: "2.jpg", price: 80000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    qty: 0,
    isGatewayOpen: false,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, qty: 1, total: newItem.price });
        this.qty++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.qty++;
            item.total = item.price * item.qty;
            this.qty++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.qty > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.qty--;
            item.total = item.price * item.qty;
            this.qty--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.qty === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.qty--;
        this.total -= cartItem.price;
      }
    },
    chekout() {
      const pesanan = this.items.map(
        (item) => `- ${item.name} x${item.qty}  Rp${item.price} `
      );
      const totalHarga = `Total: Rp${this.total}`;
      const url =
        "https://api.whatsapp.com/send?phone=6282131980998&text=Pesanan%20Anda%0A" +
        pesanan.join("\n") + 
        "\n\n" +
        totalHarga +
        "*%0AAtas%20Nama%0A*Nama mu*";
      window.open(url);
    },
  });
});

function showItemDetail(item) {
  // Akses properti item (img, name, price, dll)
  console.log("Detail barang:", item.name, item.price);
  this.selectedItem = item; // Set selectedItem dengan objek item
  this.isModalOpen = true; // Tampilkan modal
  itemDetailModal.style.display = "flex";
}

document.addEventListener("click", (e) => {
  // Klik di luar modal
  if (e.target === document.getElementById("item-detail-modal")) {
    this.isModalOpen = false;
  }
});

function close() {
  this.isGatewayOpen = false; // Atur visibilitas gateway ke true
  gateway.style.display = "none";
}

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
