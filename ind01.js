
document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("nav-menu").classList.toggle("show");
});



    // إخفاء القائمة إذا تم النقر خارجها
    document.addEventListener("click", function (event) {
        if (!loginIcon.contains(event.target) && !loginMenu.contains(event.target)) {
            loginMenu.style.display = "none";
        }
    });
   
 
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 50) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // لتشغيل التأثير عند التحميل
});

