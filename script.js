document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    // Toggle Sidebar on Click
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });
});
