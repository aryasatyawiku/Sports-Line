function showAlert(message, isSuccess) {
    const alertBox = document.getElementById('alertBox');
    if (!alertBox) return;

    alertBox.textContent = message;
    alertBox.className = `mb-4 p-4 rounded-lg text-sm font-bold ${
        isSuccess
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300'
    }`;
    alertBox.classList.remove('hidden');
}


const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('sportsline_users_db')) || [];
        const userFound = users.find(u => u.email === email && u.password === password);

        if (userFound) {
            localStorage.setItem('sportsline_active_user', JSON.stringify(userFound));

            if (userFound.email === 'admintoko@gmail.com') {
                showAlert('Login Admin Berhasil! Mengalihkan ke Dashboard Admin...', true);
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1200);
            } else {
                showAlert('Login Berhasil! Mengalihkan ke halaman utama...', true);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1200);
            }
        } else {
            showAlert('Email atau kata sandi yang Anda masukkan salah!', false);
        }
    });
}


const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim().toLowerCase();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        if (password !== confirmPassword) {
            showAlert('Kata sandi dan konfirmasi kata sandi tidak cocok!', false);
            return;
        }

        let users = JSON.parse(localStorage.getItem('sportsline_users_db')) || [];
        if (users.some(user => user.email === email)) {
            showAlert('Email sudah terdaftar! Gunakan email lain atau login.', false);
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('sportsline_users_db', JSON.stringify(users));

        showAlert('Pendaftaran berhasil! Mengalihkan ke halaman Login...', true);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}


const resetForm = document.getElementById('resetForm');
if (resetForm) {
    resetForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('resetEmail').value.trim().toLowerCase();
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (newPassword !== confirmNewPassword) {
            showAlert('Konfirmasi kata sandi baru tidak cocok!', false);
            return;
        }

        let users = JSON.parse(localStorage.getItem('sportsline_users_db')) || [];
        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex === -1) {
            showAlert('Email tidak ditemukan! Pastikan Anda memasukkan email yang benar.', false);
            return;
        }

        users[userIndex].password = newPassword;
        localStorage.setItem('sportsline_users_db', JSON.stringify(users));

        showAlert('Kata sandi berhasil diperbarui! Mengalihkan ke Login...', true);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}


const PRODUCT_STORAGE_KEY = "sportsline_products_db";
const defaultProducts = [
    {
        id: 1,
        name: "Topi Nike",
        category: "Topi",
        description: "Topi nyaman untuk dipakai aktivitas sehari-hari",
        price: 440000,
        image: "https://i.pinimg.com/1200x/9e/5a/b7/9e5ab701a5df9fc53bd2af05894bc344.jpg"
    },
    {
        id: 2,
        name: "Tracktop Nike Hitam",
        category: "Jaket",
        description: "Jaket tracktop berkualitas, nyaman, dan stylish.",
        price: 865000,
        image: "https://i.pinimg.com/736x/a9/cb/9b/a9cb9b5782f354f153e5885a3dc55506.jpg"
    },
    {
        id: 3,
        name: "Tracktop Nike Sage",
        category: "Jaket",
        description: "Jaket tracktop berkualitas, nyaman, dan stylish.",
        price: 785000,
        image: "https://i.pinimg.com/736x/20/7b/27/207b2797aeed68a8faacab6ece6db659.jpg"
    },
    {
        id: 4,
        name: "Kaos Nike Putih",
        category: "Kaos",
        description: "Kaos putih nyaman digunakan ke-mana saja.",
        price: 380000,
        image: "https://i.pinimg.com/1200x/88/d8/96/88d8965361798f633ad5880a5c6d3443.jpg"
    },
    {
        id: 5,
        name: "Kaos Nike Hitam",
        category: "Kaos",
        description: "Kaos hitam nyaman digunakan ke-mana saja.",
        price: 375000,
        image: "https://i.pinimg.com/1200x/fc/09/38/fc0938790982b0f23c74c2da8a96f1b5.jpg"
    },
    {
        id: 6,
        name: "Sweat Pants Nike Abu-Abu",
        category: "Celana",
        description: "Sweat pants nyaman untuk aktivitas sehari-hari.",
        price: 650000,
        image: "https://i.pinimg.com/736x/8c/ab/05/8cab05a98fc33819a3661ea71399405c.jpg"
    },
    {
        id: 7,
        name: "Sweat Pants Nike Hitam",
        category: "Celana",
        description: "Sweat pants nyaman untuk aktivitas sehari-hari.",
        price: 615000,
        image: "https://i.pinimg.com/736x/f9/71/47/f971479bcd737ad0eb90355d4a97447c.jpg"
    },
    {
        id: 8,
        name: "Celana Pendek Nike Putih",
        category: "Celana",
        description: "Celana pendek putih nyaman untuk aktivitas sehari-hari.",
        price: 275000,
        image: "https://i.pinimg.com/1200x/84/2b/7f/842b7feee05066c37c4cd49a91e9702e.jpg"
    },
    {
        id: 9,
        name: "Celana Pendek Nike Hitam",
        category: "Celana",
        description: "Celana pendek hitam nyaman untuk aktivitas sehari-hari.",
        price: 270000,
        image: "https://i.pinimg.com/736x/d3/26/f3/d326f327f1cf19861d96ac55ad3bf0d3.jpg"
    },
    {
        id: 10,
        name: "Nike Air Max 90 CL GS Black White",
        category: "Sepatu",
        description: "Sepatu nyaman untuk aktivitas sehari-hari.",
        price: 4899000,
        image: "https://i.pinimg.com/736x/d0/96/14/d096149da4340c211c0a20f244fd5e12.jpg"
    },
    {
        id: 11,
        name: "Nike Air Monarch IV White Black Red",
        category: "Sepatu",
        description: "Sepatu nyaman untuk aktivitas sehari-hari.",
        price: 4995000,
        image: "https://i.pinimg.com/1200x/8f/67/dc/8f67dc893101390bef4fcd021c6a3a5a.jpg"
    },
    {
        id: 12,
        name: "Nike Court Vision Low HV0927-097 White Gray Black",
        category: "Sepatu",
        description: "Sepatu nyaman untuk aktivitas sehari-hari.",
        price: 4250000,
        image: "https://i.pinimg.com/736x/4d/a7/49/4da74967dda73d57fbed0cb06ccf4615.jpg"
    },
    {
        id: 13,
        name: "Jam Tangan Pria Model Analog klasik",
        category: "Aksesoris",
        description: "Jam tangan berkualitas, klasik, simpel, dan elegan.",
        price: 880000,
        image: "https://images.unsplash.com/photo-1695345272166-4efd76dd7a21"
    },
    {
        id: 14,
        name: "Jam Tangan Pria Model Layar Amoled",
        category: "Aksesoris",
        description: "Jam tangan berkualitas, modern, dan elegan.",
        price: 1115000,
        image: "https://i.pinimg.com/736x/f9/0d/63/f90d63f78daf219d6302c751f0afe880.jpg"
    },
    {
        id: 15,
        name: "Kaos Kaki Nike Black White Gray",
        category: "Kaos Kaki",
        description: "Kaos kaki berkualitas dan nyaman untuk dipakai sehari-hari.",
        price: 220000,
        image: "https://i.pinimg.com/1200x/06/52/2e/06522e16e2d64dadfb1d3dca7e04b4b9.jpg"
    }
];


function getProducts() {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (saved === null) {
        localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(saved);
}


function saveProducts(productsArray) {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(productsArray));
}


function formatRupiah(angka) {
    return "Rp. " + Number(angka).toLocaleString("id-ID");
}


function renderProducts() {
    const productGrid = document.getElementById("productGrid");
    if (!productGrid) return;

    const products = getProducts();
    if (products.length === 0) {
        productGrid.innerHTML = `
            <p class="col-span-3 text-center text-gray-500 py-10">Belum ada produk yang tersedia saat ini.</p>
        `;
        return;
    }

productGrid.innerHTML = products.map(item => `
    <article class="bg-white rounded-lg shadow p-4 sm:p-5 flex flex-col justify-between">
        <div>
            <img src="${item.image}" alt="${item.name}" class="w-full h-100 sm:h-64 lg:h-95 object-cover rounded">
            <span class="inline-block text-xs sm:text-sm text-gray-500 mt-3">Kategori: ${item.category}</span>
            <h3 class="text-lg sm:text-xl font-bold mt-1">${item.name}</h3>
            <p class="text-gray-600 text-sm mt-1">${item.description}</p>
        </div>
        <div class="mt-4">
            <span class="block font-bold text-base sm:text-lg">${formatRupiah(item.price)}</span>
            <button onclick="beliProduk(${item.id})"
                class="bg-black text-white hover:bg-gray-700 text-base sm:text-lg font-semibold px-4 py-2.5 rounded mt-3 w-full cursor-pointer transition">
                Beli
            </button>
        </div>
    </article>
`).join("");
}


function beliProduk(id) {
    const products = getProducts();
    const dipilih = products.find(p => p.id === id);
    if (dipilih) {
        alert(`Anda memilih: ${dipilih.name} (${formatRupiah(dipilih.price)})`);
    }
}


function renderAdminProducts() {
    const tbody = document.getElementById("adminProductList");
    const countLabel = document.getElementById("adminProductCount");
    if (!tbody) return;

    const products = getProducts();
    if (countLabel) {
        countLabel.textContent = `${products.length} Produk`;
    }

    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="py-6 text-center text-gray-400">Belum ada produk tersedia.</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = products.map(item => `
        <tr>
            <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" class="w-11 h-11 rounded object-cover border border-gray-200">
                    <div>
                        <p class="font-bold text-gray-900">${item.name}</p>
                        <p class="text-xs text-gray-400 line-clamp-1">${item.description}</p>
                    </div>
                </div>
            </td>
            <td class="py-3 px-4">${item.category}</td>
            <td class="py-3 px-4 font-bold text-gray-900">${formatRupiah(item.price)}</td>
            <td class="py-3 px-4 text-right">
                <button onclick="deleteProduct(${item.id})"
                    class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded transition cursor-pointer">
                    Hapus
                </button>
            </td>
        </tr>
    `).join("");
}


function deleteProduct(id) {
    const products = getProducts();
    const target = products.find(item => item.id === id);
    if (!target) return;

    const yakin = confirm(`Yakin ingin menghapus produk "${target.name}"?`);
    if (!yakin) return;

    const updatedProducts = products.filter(item => item.id !== id);
    saveProducts(updatedProducts);

    renderAdminProducts();
    renderProducts();
}


document.addEventListener("DOMContentLoaded", function () {
    const activeUser = JSON.parse(localStorage.getItem('sportsline_active_user'));
    const adminEmail = 'admintoko@gmail.com';
    const adminNameDisplay = document.getElementById('adminNameDisplay');
    if (adminNameDisplay) {
        if (!activeUser || activeUser.email !== adminEmail) {
            alert('Akses Ditolak! Halaman ini khusus untuk Administrator (admintoko@gmail.com).');
            window.location.href = 'login.html';
            return;
        }

        adminNameDisplay.textContent = activeUser.name || 'Admin Toko';
        const adminEmailDisplay = document.getElementById('adminEmailDisplay');
        if (adminEmailDisplay) {
            adminEmailDisplay.textContent = activeUser.email;
        }

        renderAdminProducts();

        const addProductForm = document.getElementById("addProductForm");
        if (addProductForm) {
            addProductForm.addEventListener("submit", function (e) {
                e.preventDefault();

                const name = document.getElementById("prodName").value.trim();
                const category = document.getElementById("prodCategory").value.trim();
                const price = Number(document.getElementById("prodPrice").value);
                const image = document.getElementById("prodImage").value.trim();
                const description = document.getElementById("prodDesc").value.trim();

                const products = getProducts();
                const newProduct = {
                    id: Date.now(),
                    name,
                    category,
                    description,
                    price,
                    image
                };

                products.push(newProduct);
                saveProducts(products);

                addProductForm.reset();
                renderAdminProducts(); 
                alert("Produk berhasil ditambahkan ke daftar toko!");
            });
        }
    }

    const loginBtnNav = document.getElementById('loginBtnNav');
    const adminDashboardBtn = document.getElementById('adminDashboardBtn');
    const userProfileArea = document.getElementById('userProfileArea');
    const userNameDisplay = document.getElementById('userNameDisplay');

    if (loginBtnNav && userProfileArea && userNameDisplay) {
        if (activeUser) {
            loginBtnNav.classList.add('hidden');
            userProfileArea.classList.remove('hidden');
            userProfileArea.classList.add('flex');
            userNameDisplay.textContent = ' 🧑‍💼 ' + (activeUser.name || activeUser.email);

            if (adminDashboardBtn) {
                if (activeUser.email === adminEmail) {
                    adminDashboardBtn.classList.remove('hidden');
                    adminDashboardBtn.classList.add('flex');
                } else {
                    adminDashboardBtn.classList.add('hidden');
                }
            }
        } else {
            loginBtnNav.classList.remove('hidden');
            if (adminDashboardBtn) adminDashboardBtn.classList.add('hidden');
            userProfileArea.classList.add('hidden');
        }
    }

    renderProducts();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (confirm('Apakah Anda yakin ingin keluar?')) {
                localStorage.removeItem('sportsline_active_user');
                window.location.href = 'login.html';
            }
        });
    }
});