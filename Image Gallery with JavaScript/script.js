const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const loadMoreBtn = document.querySelector(".gallery .load-more");
const lightbox = document.querySelector(".lightbox");
const downloadImgBtn = lightbox.querySelector(".uil-import");
const closeImgBtn = lightbox.querySelector(".close-icon");
const greeneryBtn = document.getElementById("greeneryBtn");
const animalsBtn = document.getElementById("animalsBtn");
const sceneryBtn = document.getElementById("sceneryBtn");

// Pagination variables
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgUrl) => {
  // Converting received img to blob, creating its download link, & downloading it
  fetch(imgUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("Failed to download image!"));
};

const showLightbox = (name, img) => {
  // Showing lightbox and setting img source, name and button attribute
  lightbox.querySelector("img").src = img;
  lightbox.querySelector("span").innerText = name;
  downloadImgBtn.setAttribute("data-img", img);
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
};

const hideLightbox = () => {
  // Hiding lightbox on close icon click
  lightbox.classList.remove("show");
  document.body.style.overflow = "auto";
};

const generateHTML = (images) => {
  // Making li of all fetched images and adding them to the existing image wrapper
  imageWrapper.innerHTML = images
    .map(
      (img) =>
        `<li class="card ${img.category}">
          <img onclick="showLightbox('${img.category}', '${img.src}')" src="${img.src}" alt="${img.category}">
          <div class="details">
              <div class="photographer">
                  <i class="uil uil-camera"></i>
                  <span>${img.category}</span>
              </div>
              <button onclick="downloadImg('${img.src}');">
                  <i class="uil uil-import"></i>
              </button>
          </div>
      </li>`
    )
    .join("");
};
const loadImagesByCategory = (category) => {
  const images = [];

  // Push images based on category
  if (category === "greenery") {
    for (let i = 1; i <= 9; i++) {
      images.push({ src: `img${i}.jpg`, category: "greenery" });
    }
  } else if (category === "animals") {
    for (let i = 10; i <= 19; i++) {
      images.push({ src: `img${i}.jpg`, category: "animals" });
    }
  } else if (category === "scenery") {
    for (let i = 20; i <= 29; i++) {
      images.push({ src: `img${i}.jpg`, category: "scenery" });
    }
  }

  generateHTML(images);
};
// Initial load of images by default category
loadImagesByCategory("greenery");

// Event listeners for filter buttons
greeneryBtn.addEventListener("click", () => loadImagesByCategory("greenery"));
animalsBtn.addEventListener("click", () => loadImagesByCategory("animals"));
sceneryBtn.addEventListener("click", () => loadImagesByCategory("scenery"));

searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) =>
  downloadImg(e.target.dataset.img)
);
const loadMoreImages = () => {
  currentPage++; // Increment currentPage by 1
  // If searchTerm has some value then call API with search term else call default API
  // As we're not using an API, this part won't be needed
};

// const loadSearchImages = (e) => {
//   const searchTerm = e.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive matching
//   const images = document.querySelectorAll(".card img");

//   images.forEach((img) => {
//     const imgName = img.getAttribute("alt").toLowerCase();
//     const parentLi = img.parentElement.parentElement;

//     if (imgName.includes(searchTerm)) {
//       parentLi.style.display = "block"; // Show the image if its name matches the search term
//     } else {
//       parentLi.style.display = "none"; // Hide the image if its name doesn't match the search term
//     }
//   });

//   // If search term is empty, show all images
//   if (searchTerm === "") {
//     images.forEach((img) => {
//       const parentLi = img.parentElement.parentElement;
//       parentLi.style.display = "block";
//     });
//   }
// };

generateHTML(); // Initial load of images
loadMoreBtn.style.display = "none"; // Hide load more button, as we're not using pagination
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) =>
  downloadImg(e.target.dataset.img)
);
