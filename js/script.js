/* =========================================
   TO OPEN TAWK.TO
========================================= */

const contactTawk =
    document.getElementById("contactTawk");

if (contactTawk) {

    contactTawk.addEventListener("click", function (e) {

        e.preventDefault();

        if (typeof Tawk_API !== "undefined") {

            Tawk_API.maximize();

        }

    });

}


function openTawkChat() {

    if (typeof Tawk_API !== "undefined") {

        Tawk_API.maximize();

    } else {

        alert("Chat is currently unavailable. Please try again shortly.");

    }

}



/* =========================================
   THE EXPERIENCE
   MAIN WEBSITE SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       CELEBRITY SELECTION SYSTEM
    ========================================= */

    function getSelectedCelebrityId() {

        const params =
            new URLSearchParams(window.location.search);

        const urlCelebrity =
            params.get("celebrity");


        /*
            If the URL contains a valid celebrity,
            save it as the current selection.
        */

        if (
            urlCelebrity &&
            typeof celebrities !== "undefined" &&
            celebrities[urlCelebrity]
        ) {

            localStorage.setItem(
                "selectedCelebrity",
                urlCelebrity
            );

            return urlCelebrity;
        }


        /*
            Otherwise use the celebrity saved
            in localStorage.
        */

        const savedCelebrity =
            localStorage.getItem(
                "selectedCelebrity"
            );


        if (
            savedCelebrity &&
            typeof celebrities !== "undefined" &&
            celebrities[savedCelebrity]
        ) {

            return savedCelebrity;

        }


        return null;
    }


    function getSelectedCelebrity() {

        const id =
            getSelectedCelebrityId();


        if (
            id &&
            typeof celebrities !== "undefined" &&
            celebrities[id]
        ) {

            return celebrities[id];

        }


        return null;
    }


    const currentCelebrity =
        getSelectedCelebrity();


    const currentCelebrityId =
        getSelectedCelebrityId();




    /* =========================================
   INDEX PAGE
   CELEBRITY PAGINATION
========================================= */

    const celebrityGrid =
        document.getElementById(
            "celebrityGrid"
        );


    const nextCelebrities =
        document.getElementById(
            "nextCelebrities"
        );


    const previousCelebrities =
        document.getElementById(
            "previousCelebrities"
        );


    const celebrityPageNumber =
        document.getElementById(
            "celebrityPageNumber"
        );


    if (
        celebrityGrid &&
        typeof celebrities !== "undefined"
    ) {

        const celebrityEntries =
            Object.entries(celebrities);


        const celebritiesPerPage = 9;


        let currentCelebrityPage = 1;


        const totalCelebrityPages =
            Math.ceil(
                celebrityEntries.length /
                celebritiesPerPage
            );


        function displayCelebrityPage(page) {

            celebrityGrid.innerHTML = "";


            const start =
                (page - 1) *
                celebritiesPerPage;


            const end =
                start +
                celebritiesPerPage;


            const currentCelebrities =
                celebrityEntries.slice(
                    start,
                    end
                );


            currentCelebrities.forEach(
                ([id, celebrity]) => {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "celebrity-card";


                    card.innerHTML = `

                    <div class="celebrity-card-image">

                        <img
                            src="${celebrity.image}"
                            alt="${celebrity.name}"
                        >

                        <div class="celebrity-card-overlay"></div>

                    </div>


                    <div class="celebrity-card-content">

                        <span>
                            ${celebrity.category}
                        </span>

                        <h3>
                            ${celebrity.name}
                        </h3>

                        <p>
                            ${celebrity.shortBio}
                        </p>

                        <a
                            href="profile.html?celebrity=${id}"
                            class="celebrity-profile-link"
                        >
                            View Profile
                            <span>→</span>
                        </a>

                    </div>

                `;


                    celebrityGrid.appendChild(
                        card
                    );

                }
            );


            /* Update page number */

            if (celebrityPageNumber) {

                celebrityPageNumber.textContent =
                    `${page} / ${totalCelebrityPages}`;

            }


            /* Previous button */

            if (previousCelebrities) {

                previousCelebrities.disabled =
                    page === 1;

            }


            /* Next button */

            if (nextCelebrities) {

                nextCelebrities.disabled =
                    page === totalCelebrityPages;

            }

        }


        /* =========================================
           NEXT BUTTON
        ========================================= */

        if (nextCelebrities) {

            nextCelebrities.addEventListener(
                "click",
                function () {

                    if (
                        currentCelebrityPage <
                        totalCelebrityPages
                    ) {

                        currentCelebrityPage++;


                        displayCelebrityPage(
                            currentCelebrityPage
                        );


                        celebrityGrid.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }


        /* =========================================
           PREVIOUS BUTTON
        ========================================= */

        if (previousCelebrities) {

            previousCelebrities.addEventListener(
                "click",
                function () {

                    if (
                        currentCelebrityPage >
                        1
                    ) {

                        currentCelebrityPage--;


                        displayCelebrityPage(
                            currentCelebrityPage
                        );


                        celebrityGrid.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }


        /* =========================================
           LOAD FIRST PAGE
        ========================================= */

        displayCelebrityPage(
            currentCelebrityPage
        );

    }



    /* =========================================
       DYNAMIC CELEBRITY NAVIGATION
    ========================================= */

    function setupCelebrityNavigation() {

        const celebrityId =
            getSelectedCelebrityId();


        if (!celebrityId) {
            return;
        }


        /*
            Navigation links using classes.
        */

        const links = {

            ".nav-celebrity-home":
                `profile.html?celebrity=${celebrityId}`,

            ".nav-celebrity-about":
                `profile.html?celebrity=${celebrityId}#about`,

            ".nav-celebrity-packages":
                `packages.html?celebrity=${celebrityId}`,

            ".nav-celebrity-booking":
                `booking.html?celebrity=${celebrityId}`,

            ".nav-celebrity-support":
                `donate.html?celebrity=${celebrityId}`,

            ".nav-celebrity-contact":
                `contact.html?celebrity=${celebrityId}`

        };


        Object.entries(links).forEach(
            ([selector, url]) => {

                document
                    .querySelectorAll(selector)
                    .forEach(link => {

                        link.href = url;

                    });

            }
        );


        /*
            Also support the older IDs
            you already had in your HTML.
        */

        const oldIdLinks = {

            "#navPackages":
                `packages.html?celebrity=${celebrityId}`,

            "#navSupport":
                `donate.html?celebrity=${celebrityId}`,

            "#navContact":
                `contact.html?celebrity=${celebrityId}`,

            "#packagesNavHome":
                `profile.html?celebrity=${celebrityId}`,

            "#packagesNavAbout":
                `profile.html?celebrity=${celebrityId}#about`,

            "#packagesNavSupport":
                `donate.html?celebrity=${celebrityId}`,

            "#packagesNavContact":
                `contact.html?celebrity=${celebrityId}`,

            "#packagesContactButton":
                `contact.html?celebrity=${celebrityId}`

        };


        Object.entries(oldIdLinks).forEach(
            ([selector, url]) => {

                const element =
                    document.querySelector(selector);

                if (element) {

                    element.href = url;

                }

            }
        );

    }


    setupCelebrityNavigation();



    /* =========================================
       PROFILE PAGE
    ========================================= */

    if (
        currentCelebrity &&
        document.getElementById("profileName")
    ) {

        const celebrity =
            currentCelebrity;


        const celebrityId =
            currentCelebrityId;


        /*
            Page title
        */

        document.title =
            `${celebrity.name} | The Experience`;


        /*
            Profile name
        */

        const profileName =
            document.getElementById(
                "profileName"
            );


        if (profileName) {

            profileName.textContent =
                celebrity.name;

        }


        /*
            Profile image
        */

        const profileImage =
            document.getElementById(
                "profileImage"
            );


        if (profileImage) {

            profileImage.src =
                celebrity.heroImage ||
                celebrity.image;

            profileImage.alt =
                celebrity.name;

        }


        /*
            Category
        */

        const profileCategory =
            document.getElementById(
                "profileCategory"
            );


        if (profileCategory) {

            profileCategory.textContent =
                celebrity.category;

        }


        /*
            Short bio
        */

        const profileShortBio =
            document.getElementById(
                "profileShortBio"
            );


        if (profileShortBio) {

            profileShortBio.textContent =
                celebrity.shortBio;

        }


        /*
            About heading
        */

        const aboutName =
            document.getElementById(
                "aboutName"
            );


        if (aboutName) {

            aboutName.textContent =
                `About ${celebrity.name}`;

        }


        /*
            Full biography
        */

        const profileBio =
            document.getElementById(
                "profileBio"
            );

        if (profileBio) {

            profileBio.innerHTML =
                celebrity.bio;

        }


        /*
            Footer
        */

        const footerCelebrity =
            document.getElementById(
                "footerCelebrity"
            );


        if (footerCelebrity) {

            footerCelebrity.textContent =
                `Exclusive experiences with ${celebrity.name}.`;

        }


        /*
            Profile action buttons
        */

        const profilePackages =
            document.getElementById(
                "profilePackages"
            );


        const profileBooking =
            document.getElementById(
                "profileBooking"
            );


        const profileSupport =
            document.getElementById(
                "profileSupport"
            );


        if (profilePackages) {

            profilePackages.href =
                `packages.html?celebrity=${celebrityId}`;

        }


        if (profileBooking) {

            profileBooking.href =
                `booking.html?celebrity=${celebrityId}`;

        }


        if (profileSupport) {

            profileSupport.href =
                `donate.html?celebrity=${celebrityId}`;

        }

    }



    /* =========================================
       PACKAGES PAGE
    ========================================= */

    const packagesGrid =
        document.getElementById(
            "packagesGrid"
        );


    if (
        packagesGrid &&
        currentCelebrity
    ) {

        const celebrity =
            currentCelebrity;


        const celebrityId =
            currentCelebrityId;


        document.title =
            `${celebrity.name} | Experiences`;


        /*
            Hero
        */

        const packagesCelebrityName =
            document.getElementById(
                "packagesCelebrityName"
            );


        if (packagesCelebrityName) {

            packagesCelebrityName.textContent =
                celebrity.name;

        }


        const packagesHeroDescription =
            document.getElementById(
                "packagesHeroDescription"
            );


        if (packagesHeroDescription) {

            packagesHeroDescription.textContent =
                `Explore exclusive experiences with ${celebrity.name}.`;

        }


        /*
            Section heading
        */

        const packagesHeading =
            document.getElementById(
                "packagesHeading"
            );


        if (packagesHeading) {

            packagesHeading.textContent =
                `${celebrity.name}'s Experiences`;

        }


        const packagesDescription =
            document.getElementById(
                "packagesDescription"
            );


        if (packagesDescription) {

            packagesDescription.textContent =
                `Choose an experience with ${celebrity.name} and submit a request to get started.`;

        }


        /*
            CTA
        */

        const packagesCtaText =
            document.getElementById(
                "packagesCtaText"
            );


        if (packagesCtaText) {

            packagesCtaText.textContent =
                `Have questions about meeting ${celebrity.name}? Get in touch with the team before requesting an experience.`;

        }


        /*
            Footer
        */

        const packagesFooterText =
            document.getElementById(
                "packagesFooterText"
            );


        if (packagesFooterText) {

            packagesFooterText.textContent =
                `Exclusive experiences with ${celebrity.name}.`;

        }


        /*
            Clear existing package cards
        */

        packagesGrid.innerHTML = "";


        /*
            Build package cards
        */

        if (
            celebrity.packages &&
            celebrity.packages.length
        ) {

            celebrity.packages.forEach(
                pkg => {


                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "dynamic-package-card";


                    if (
                        pkg.name.toLowerCase() ===
                        "premium"
                    ) {

                        card.classList.add(
                            "featured"
                        );

                    }


                    const badge =
                        pkg.name.toLowerCase() ===
                            "premium"

                            ? `
                                <span class="package-badge">
                                    Most Popular
                                </span>
                              `

                            : "";


                    card.innerHTML = `

                        ${badge}

                        <h3>
                            ${pkg.name}
                        </h3>

                        <div class="dynamic-package-price">
                            $${pkg.price.toLocaleString()}
                        </div>

                        <p class="dynamic-package-description">
                            ${pkg.description}
                        </p>

                        <a
                           href="booking.html?celebrity=${celebrityId}&package=${encodeURIComponent(pkg.name)}" class="package-action" onclick="openTawkChat()" >
                            Request This Experience
                        </a>
                        
                        `;


                    packagesGrid.appendChild(
                        card
                    );

                }
            );

        }

    }



    /* =========================================
       BOOKING PAGE
    ========================================= */

    const bookingForm =
        document.getElementById(
            "bookingForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    /*
        If a celebrity is selected,
        update the booking page title.
    */

    if (
        currentCelebrity &&
        bookingForm
    ) {

        document.title =
            `Request an Experience with ${currentCelebrity.name}`;


        const bookingCelebrityName =
            document.getElementById(
                "bookingCelebrityName"
            );


        if (bookingCelebrityName) {

            bookingCelebrityName.textContent =
                currentCelebrity.name;

        }


        const bookingHeroDescription =
            document.getElementById(
                "bookingHeroDescription"
            );


        if (bookingHeroDescription) {

            bookingHeroDescription.textContent =
                `Complete the form below and our experience team will review your request to meet ${currentCelebrity.name} and contact you regarding availability.`;

        }

    }

    /*
        Populate package dropdown
        from the selected celebrity.
    */

    const packageSelect =
        document.getElementById(
            "package"
        );


    if (
        packageSelect &&
        currentCelebrity &&
        currentCelebrity.packages
    ) {

        /*
            Keep the existing first option.
        */

        const firstOption =
            packageSelect.options[0];


        packageSelect.innerHTML = "";


        if (firstOption) {

            const defaultOption =
                document.createElement(
                    "option"
                );

            defaultOption.value =
                firstOption.value;

            defaultOption.textContent =
                firstOption.textContent;

            packageSelect.appendChild(
                defaultOption
            );

        }


        currentCelebrity.packages.forEach(
            pkg => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    pkg.name;

                option.textContent =
                    `${pkg.name} — $${pkg.price.toLocaleString()}`;

                packageSelect.appendChild(
                    option
                );

            }
        );

    }


    /*
        Automatically select package
        from URL.
    */

    const pageParams =
        new URLSearchParams(
            window.location.search
        );


    const selectedPackage =
        pageParams.get("package");


    if (
        selectedPackage &&
        packageSelect
    ) {

        packageSelect.value =
            selectedPackage;

    }


    /*
        Booking form submission
    */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const firstNameElement =
                    document.getElementById(
                        "firstName"
                    );


                const firstName =
                    firstNameElement
                        ? firstNameElement.value
                        : "Guest";


                const selectedExperience =
                    packageSelect
                        ? packageSelect.value
                        : "";


                if (!selectedExperience) {

                    if (formMessage) {

                        formMessage.style.display =
                            "block";

                        formMessage.textContent =
                            "Please select a meet & greet experience.";

                    }

                    return;

                }


                if (formMessage) {

                    formMessage.style.display =
                        "block";

                    formMessage.textContent =
                        `Thank you, ${firstName}. Your ${selectedExperience} experience request has been received. Please contact our Customer Support team below to complete the process and receive further assistance with the next steps.`;

                }


                bookingForm.reset();

            }
        );

    }



    /* =========================================
       DONATION PAGE
    ========================================= */

    const amountButtons =
        document.querySelectorAll(
            ".amount-button"
        );


    const customAmount =
        document.getElementById(
            "customAmount"
        );


    const selectedAmount =
        document.getElementById(
            "selectedAmount"
        );


    let donationAmount = 0;


    /*
        Preset amounts
    */

    amountButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    amountButtons.forEach(
                        btn => {

                            btn.classList.remove(
                                "selected"
                            );

                        }
                    );


                    button.classList.add(
                        "selected"
                    );


                    donationAmount =
                        Number(
                            button.dataset.amount
                        );


                    if (customAmount) {

                        customAmount.value =
                            "";

                    }


                    updateDonationAmount();

                }
            );

        }
    );


    /*
        Custom amount
    */

    if (customAmount) {

        customAmount.addEventListener(
            "input",
            () => {

                amountButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    }
                );


                donationAmount =
                    Number(
                        customAmount.value
                    );


                updateDonationAmount();

            }
        );

    }


    function updateDonationAmount() {

        if (selectedAmount) {

            selectedAmount.textContent =
                "$" +
                donationAmount.toLocaleString();

        }

    }


    /*
        Continue to payment
    */

    const continueDonation =
        document.getElementById(
            "continueDonation"
        );


    const directPaymentSection =
        document.getElementById(
            "directPaymentSection"
        );


    const paymentAmount =
        document.getElementById(
            "paymentAmount"
        );


    if (continueDonation) {

        continueDonation.addEventListener(
            "click",
            () => {

                if (
                    !donationAmount ||
                    donationAmount <= 0
                ) {

                    alert(
                        "Please select or enter a donation amount first."
                    );

                    return;

                }


                const formattedAmount =
                    "$" +
                    donationAmount.toLocaleString();


                if (paymentAmount) {

                    paymentAmount.textContent =
                        formattedAmount;

                }


                updatePaymentMethodAmounts();


                if (directPaymentSection) {

                    directPaymentSection.classList.add(
                        "show-payment"
                    );


                    setTimeout(
                        () => {

                            directPaymentSection.scrollIntoView(
                                {
                                    behavior: "smooth",
                                    block: "start"
                                }
                            );

                        },
                        100
                    );

                }

            }
        );

    }



    /* =========================================
       PAYMENT METHOD AMOUNTS
    ========================================= */

    function updatePaymentMethodAmounts() {

        const formattedAmount =
            "$" +
            donationAmount.toLocaleString();


        const cardAmount =
            document.getElementById(
                "cardPaymentAmount"
            );


        const cryptoAmount =
            document.getElementById(
                "cryptoPaymentAmount"
            );


        const bankAmount =
            document.getElementById(
                "bankPaymentAmount"
            );


        if (cardAmount) {

            cardAmount.textContent =
                formattedAmount;

        }


        if (cryptoAmount) {

            cryptoAmount.textContent =
                "Contribution: " +
                formattedAmount;

        }


        if (bankAmount) {

            bankAmount.textContent =
                "Contribution: " +
                formattedAmount;

        }

    }



    /* =========================================
       CHANGE DONATION AMOUNT
    ========================================= */

    const changeDonationAmount =
        document.getElementById(
            "changeDonationAmount"
        );


    if (changeDonationAmount) {

        changeDonationAmount.addEventListener(
            "click",
            () => {

                if (directPaymentSection) {

                    directPaymentSection.classList.remove(
                        "show-payment"
                    );

                }


                const donationSection =
                    document.querySelector(
                        ".donation-section"
                    );


                if (donationSection) {

                    window.scrollTo({

                        top:
                            donationSection.offsetTop -
                            80,

                        behavior: "smooth"

                    });

                }

            }
        );

    }



    /* =========================================
       CRYPTO TABS
    ========================================= */

    const cryptoTabs =
        document.querySelectorAll(
            ".crypto-tab"
        );


    if (cryptoTabs.length) {

        cryptoTabs.forEach(
            tab => {

                tab.addEventListener(
                    "click",
                    () => {

                        cryptoTabs.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        tab.classList.add(
                            "active"
                        );


                        const crypto =
                            tab.dataset.crypto;


                        const wallet =
                            document.getElementById(
                                "walletAddress"
                            );


                        const qr =
                            document.getElementById(
                                "cryptoQR"
                            );


                        /*
                            Replace these with
                            verified payment addresses.
                        */

                        const wallets = {

                            btc:
                                "YOUR_VERIFIED_BTC_WALLET_ADDRESS",

                            eth:
                                "YOUR_VERIFIED_ETH_WALLET_ADDRESS",

                            usdt:
                                "YOUR_VERIFIED_USDT_WALLET_ADDRESS"

                        };


                        const labels = {

                            btc:
                                "Bitcoin wallet address",

                            eth:
                                "Ethereum wallet address",

                            usdt:
                                "USDT wallet address"

                        };


                        if (wallet) {

                            wallet.textContent =
                                wallets[crypto];

                        }


                        const walletLabel =
                            document.querySelector(
                                ".wallet-label"
                            );


                        if (walletLabel) {

                            walletLabel.textContent =
                                labels[crypto];

                        }


                        if (qr) {

                            qr.src =
                                `images/${crypto}-qr.png`;

                        }

                    }
                );

            }
        );

    }



    /* =========================================
       COPY CRYPTO WALLET
    ========================================= */

    const copyWallet =
        document.getElementById(
            "copyWallet"
        );


    const walletAddress =
        document.getElementById(
            "walletAddress"
        );


    if (
        copyWallet &&
        walletAddress
    ) {

        copyWallet.addEventListener(
            "click",
            async () => {

                const address =
                    walletAddress.textContent.trim();


                try {

                    await navigator.clipboard.writeText(
                        address
                    );


                    copyWallet.textContent =
                        "Copied!";


                    setTimeout(
                        () => {

                            copyWallet.textContent =
                                "Copy";

                        },
                        2000
                    );

                } catch (error) {

                    alert(
                        "Please copy the wallet address manually."
                    );

                }

            }
        );

    }



    /* =========================================
       CARD PAYMENT
    ========================================= */

    const cardPaymentButton =
        document.getElementById(
            "cardPaymentButton"
        );


    if (cardPaymentButton) {

        cardPaymentButton.addEventListener(
            "click",
            () => {

                alert(
                    "Connect this button to your authorized payment processor."
                );

            }
        );

    }



    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (
        menuToggle &&
        navLinks
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }



    /* =========================================
       SMOOTH SCROLLING
    ========================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    function (e) {

                        const target =
                            document.querySelector(
                                this.getAttribute(
                                    "href"
                                )
                            );


                        if (target) {

                            e.preventDefault();


                            target.scrollIntoView({

                                behavior:
                                    "smooth"

                            });

                        }

                    }
                );

            }
        );



    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".experience-card, .package-card, .about-content, .about-image"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );


                observer.observe(
                    element
                );

            }
        );

    }


});