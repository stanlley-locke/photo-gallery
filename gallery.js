document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".gallery-item img");
    const overlay = document.querySelector(".fullscreen-overlay");
    const expandedImg = document.getElementById("expanded-img");
    const imageTitle = document.getElementById("image-title");
    const imageDesc = document.getElementById("image-desc");
    const downloadBtn = document.getElementById("download-btn");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;
    let imageArray = [];

    // Update this object with your actual filenames
    const imageDetails = {
        "img.jpg": { title: "Sunset View", desc: "A beautiful sunset over the mountains." },
        "celine.jpg": { title: "City Lights", desc: "A stunning night cityscape view." },
        "emma.jpg": { title: "Ocean Waves", desc: "Waves crashing on a rocky beach." }
    };

    images.forEach((image, index) => {
        imageArray.push(image.src);
        image.addEventListener("click", () => {
            showImage(index);
        });
    });

    function showImage(index) {
        currentIndex = index;
        const imgSrc = images[currentIndex].getAttribute("src");

        expandedImg.src = imgSrc;
        overlay.style.display = "flex";

        // Extract filename from the full image path
        const imgFileName = imgSrc.split('/').pop();

        // Set image details dynamically
        if (imageDetails[imgFileName]) {
            imageTitle.textContent = imageDetails[imgFileName].title;
            imageDesc.textContent = imageDetails[imgFileName].desc;
        } else {
            imageTitle.textContent = "Unknown Image";
            imageDesc.textContent = "No description available.";
        }

        // Update Download Button
        downloadBtn.setAttribute("href", imgSrc);
        downloadBtn.setAttribute("download", imgFileName); // Enables direct download
    }

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % imageArray.length;
        showImage(currentIndex);
    });

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });
});
                          
