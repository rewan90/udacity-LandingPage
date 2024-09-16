// Get the navigation menu and content sections
const navList = document.getElementById("nav-list");
const sections = document.querySelectorAll(".section");

// Create an array to store the section data
const sectionData = [];

// Iterate over the sections and create an array of section data
sections.forEach((section, index) => {
  const sectionId = section.id;
  const sectionTitle = section.querySelector("h2").textContent;
  sectionData.push({ id: sectionId, title: sectionTitle });
});

// Create the navigation menu dynamically
navList.innerHTML = "";
sectionData.forEach((section) => {
  const navItem = document.createElement("li");
  const navLink = document.createElement("a");
  navLink.textContent = section.title;
  navLink.href = `#${section.id}`;
  navItem.appendChild(navLink);
  navList.appendChild(navItem);
});

// Add event listener to the navigation menu
navList.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const sectionId = event.target.href.split("#")[1];
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  }
});

// Add event listener to the scroll event
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const navItem = navList.querySelector(`a[href="#${section.id}"]`);
      if (scrollPosition >= sectionTop - viewportHeight / 2 && scrollPosition < sectionTop + sectionHeight - viewportHeight / 2) {
        section.classList.add('active');
        navItem.classList.add('active');
      } else {
        section.classList.remove('active');
        navItem.classList.remove('active');
      }
    });
  });
// Add event listener to the scroll to top button
const scrollToTopButton = document.getElementById("scroll-to-top");
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Show the scroll to top button when the user scrolls below the fold
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > window.innerHeight) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

// Hide fixed navigation bar while not scrolling
let lastScrollTime = 0;
window.addEventListener("scroll", () => {
  const currentTime = new Date().getTime();
  if (currentTime - lastScrollTime > 9000) {
    document.getElementById("navbar").style.display = "none";
  }
  lastScrollTime = currentTime;
});

// Show fixed navigation bar when scrolling
window.addEventListener("scroll", () => {
  document.getElementById("navbar").style.display = "block";
  setTimeout(() => {
    document.getElementById("navbar").style.display = "none";
  }, 9000);
});

// Add event listener to collapse buttons
sections.forEach((section) => {
  const collapseBtn = section.querySelector(".collapse-btn");
  collapseBtn.addEventListener("click", () => {
    const sectionContent = section.querySelector(".section-content");
    sectionContent.classList.toggle("show");
  });
});
