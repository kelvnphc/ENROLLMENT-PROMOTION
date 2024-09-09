// Loading
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('fadeOut');
    }, 2000);
});

// Js code to progressbar
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", function () {
    let progress = Math.ceil(
        (window.pageYOffset /
            (document.body.scrollHeight - window.innerHeight)) *
        100
    );
    progressBar.style = `width: ${progress}%`;
});

// Js code for back top top
const backToTopButton = document.querySelector("#back-to-top");
if (backToTopButton != null) {
    window.addEventListener("scroll", function scrollFunction() {
        if (window.pageYOffset > 300) {
            if (!backToTopButton.classList.contains("fadeInRight")) {
                backToTopButton.classList.remove("fadeOutRight");
                backToTopButton.classList.add("fadeInRight");
                backToTopButton.style.display = "flex";
            }
        } else {
            if (backToTopButton.classList.contains("fadeInRight")) {
                backToTopButton.classList.remove("fadeInRight");
                backToTopButton.classList.add("fadeOutRight");
                setTimeout(function () {
                    backToTopButton.style.display = "none";
                }, 250);
            }
        }
    });
    backToTopButton.addEventListener("click", function backToTop() {
        window.scrollTo(0, 0);
    });
}


// Code to sticky nav
const nav = document.querySelector("nav");
window.addEventListener("scroll", function () {
    nav.classList.toggle("sticky", window.scrollY > 0)
});

//Code to responsive nav
const menu = document.querySelector(".nav__menu ");
const btnOpen = document.querySelector(".btn-mobile.open");
const btnClose = document.querySelector(".btn-mobile.close");

btnOpen.addEventListener("click", () => {
    menu.classList.add('active');
})

btnClose.addEventListener("click", () => {
    menu.classList.remove('active');
})

// Scroll element
function WidthChange(mq) {
    if (mq.matches) {
    } else {
        function reveal() {
            var reveals = document.querySelectorAll(".reveal");
            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var revealTop = reveals[i].getBoundingClientRect().top;
                var revealPoint = 150;

                if (revealTop < windowHeight - revealPoint) {
                    reveals[i].classList.add("active");
                }
            }
        }
        window.addEventListener("scroll", reveal);
    }
}

if (matchMedia) {
    const mq = window.matchMedia("(max-width: 1023px)");
    WidthChange(mq);
}