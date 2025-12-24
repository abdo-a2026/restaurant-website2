// 1. التحكم في القائمة الجانبية للموبايل (Sidebar Toggle)
// نضع الكود داخل تأكد من وجود العناصر لتجنب خطأ الـ null
const initMobileMenu = () => {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if(icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // إغلاق القائمة عند الضغط على الروابط
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                if(menuBtn.querySelector('i')) {
                    menuBtn.querySelector('i').classList.add('fa-bars');
                    menuBtn.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }
};
// 2. Navigation Active State & Smooth Scroll
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        
        // التأكد أن الرابط يشير إلى ID داخلي وليس صفحة أخرى
        if (targetId.startsWith("#")) {
            e.preventDefault();
            
            document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
            this.classList.add("active");

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

// الوصول للمتغيرات
const products = window.products || [];
const reviews = window.reviews || [];

// 3. Render Menu Items
function renderMenuItems(filter = "all") {
    const menuContainer = document.getElementById("menuItems");
    if (!menuContainer) return; // حماية في حال عدم وجود العنصر

    const filteredProducts = filter === "all" ? products : products.filter((p) => p.category === filter);

    menuContainer.innerHTML = filteredProducts
        .map((product) => `
            <div class="menu-item" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}" class="menu-item-image">
                <div class="menu-item-info">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${product.name}</h3>
                        <span class="menu-item-price">${product.price.toLocaleString()} د.ع</span>
                    </div>
                    <p class="menu-item-desc">${product.description}</p>
                </div>
            </div>
        `).join("");
}

// 4. Menu Filter Functionality
document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const filter = this.getAttribute("data-filter");
        renderMenuItems(filter);
    });
});

// 5. Render Reviews
function renderReviews() {
    const reviewsContainer = document.getElementById("reviewsGrid");
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = reviews
        .map((review) => `
            <div class="review-card">
                <div class="review-header">
                    <h4 class="reviewer-name">${review.name}</h4>
                    <div class="review-stars">
                        ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
                    </div>
                </div>
                <p class="review-text">${review.comment}</p>
                <span class="review-date"><i class="fas fa-calendar"></i> ${review.date}</span>
            </div>
        `).join("");
}

// 6. Booking Form Submission
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value
        };
        alert(`شكراً ${formData.name}!\nتم استلام حجزك بنجاح.\nسنتصل بك قريباً على الرقم ${formData.phone}`);
        this.reset();
    });
}

// 7. Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu(); // تشغيل قائمة الموبايل
    renderMenuItems();
    renderReviews();

    const dateInput = document.getElementById("date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }
});

// 8. Scroll effect for nav active state
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});