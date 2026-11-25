document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
  const hamburger =
    document.getElementById("hamburger") ||
    document.querySelector(".hamburger");
  const navMenu =
    document.getElementById("navMenu") || document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Tutup menu saat salah satu link diklik (untuk mobile)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });

    // Tutup menu jika pengguna mengklik di luar area navbar
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
      }
    });
  }

  // 2. Product Filter (Filter Kategori Produk)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      productCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 3. Modal Popup Detail Produk
  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDesc = document.getElementById("modalDesc");
  const closeBtn = document.querySelector(".close-btn");

  window.openModal = function (title, price, desc) {
    if (!modal) return;
    if (modalTitle) modalTitle.innerText = title;
    if (modalPrice) modalPrice.innerText = price;
    if (modalDesc) modalDesc.innerText = desc;
    modal.style.display = "flex";
  };

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // 4. Form Pemesanan Cepat & Kirim Pesanan via WhatsApp
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const product =
        document.getElementById("productChoice")?.value.trim() || "";
      const notes = document.getElementById("notes")?.value.trim() || "";

      // Validasi formulir
      if (!name || !product || !notes) {
        alert("Mohon lengkapi semua kolom formulir pemesanan!");
        return;
      }

      // Format Pesan WhatsApp
      const messageLines = [
        "Halo Peastry Artisan Bakery! 👋",
        "Saya ingin memesan pastry dengan rincian berikut:",
        "",
        `*Nama Lengkap:* ${name}`,
        `*Produk yang Dipesan:* ${product}`,
        `*Catatan Tambahan:* ${notes}`,
        "",
        "Mohon konfirmasi ketersediaan dan rincian total pesanannya. Terima kasih!",
      ];
      const waMessage = messageLines.join("\n");

      // Nomor WhatsApp Peastry Artisan Bakery (+62 88972049841)
      const waNumber = "6288972049841";
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

      // Buka WhatsApp
      window.open(waUrl, "_blank");
    });
  }

  // Klik tombol 'Pesan' pada katalog produk otomatis mengisi produk pilihan
  const orderButtons = document.querySelectorAll(
    '.product-card .price-action a[href="#contact"]',
  );
  orderButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const productTitle = card
        ? card.querySelector("h3")?.innerText.trim()
        : "";
      const productInput = document.getElementById("productChoice");
      if (productTitle && productInput) {
        productInput.value = productTitle;
      }
    });
  });
});
