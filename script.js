/* =========================================================
   THARUSHA CODE ACADEMY
   FINAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. MOBILE NAVIGATION
   ========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const mainNav =
    document.querySelector(".main-nav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("active");


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );


        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );

    });


    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });


    document.addEventListener("click", (event) => {

        const clickedInsideNav =
            mainNav.contains(event.target);


        const clickedMenuButton =
            menuToggle.contains(event.target);


        if (
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            mainNav.classList.remove(
                "active"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    });

}


/* =========================================================
   02. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".path-card, .course-card, .project-card, .roadmap-step, .feature-item, .lesson-section, .cta-box"
    );


if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        element.classList.add(
            "reveal"
        );


        revealObserver.observe(
            element
        );

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });

}


/* =========================================================
   03. HERO TYPING ANIMATION
   ========================================================= */

function startTypingAnimation() {

    const typingText =
        document.querySelector(
            "#typing-text"
        );


    if (!typingText) {
        return;
    }


    const text =
        "Hello, Developer";


    let index = 0;


    typingText.textContent = "";


    function typeText() {

        if (
            index < text.length
        ) {

            typingText.textContent +=
                text.charAt(index);


            index++;


            setTimeout(
                typeText,
                100
            );

        }

    }


    typeText();

}


/* =========================================================
   04. ACTIVE NAVIGATION
   ========================================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop() || "index.html";


const navigationLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


navigationLinks.forEach((link) => {

    const linkPage =
        link.getAttribute("href");


    if (
        linkPage === currentPage
    ) {

        navigationLinks.forEach(
            (navLink) => {

                navLink.classList.remove(
                    "active"
                );

            }
        );


        link.classList.add(
            "active"
        );

    }

});


/* =========================================================
   05. INTRO ANIMATION CONTROL
   ========================================================= */

const introScreen =
    document.querySelector(
        ".intro-screen"
    );


if (introScreen) {

    /*
    --------------------------------------------------
    CHECK HOW HOME PAGE WAS OPENED
    --------------------------------------------------
    */

    const navigationEntry =
        performance.getEntriesByType(
            "navigation"
        )[0];


    const navigationType =
        navigationEntry
            ? navigationEntry.type
            : "navigate";


    const referrer =
        document.referrer;


    const isRefresh =
        navigationType === "reload";


    const isDirectVisit =
        referrer === "";


    const cameFromAnotherTcaPage =
        referrer !== "" &&
        referrer.startsWith(
            window.location.origin
        );


    /*
    --------------------------------------------------
    SHOW INTRO
    --------------------------------------------------
    */

    const shouldShowIntro =
        isRefresh ||
        isDirectVisit ||
        !cameFromAnotherTcaPage;


    if (shouldShowIntro) {

        /*
        Intro remains visible.
        Typing starts after intro finishes.
        */

        setTimeout(() => {

            introScreen.style.opacity =
                "0";


            introScreen.style.visibility =
                "hidden";


            introScreen.style.pointerEvents =
                "none";


            setTimeout(() => {

                introScreen.remove();


                startTypingAnimation();

            }, 800);


        }, 3800);


    } else {

        /*
        --------------------------------------------------
        INTERNAL PAGE → HOME
        NO INTRO
        --------------------------------------------------
        */

        introScreen.remove();


        startTypingAnimation();

    }

} else {

    /*
    --------------------------------------------------
    NO INTRO SCREEN
    START TYPING IMMEDIATELY
    --------------------------------------------------
    */

    startTypingAnimation();

}