document.addEventListener("DOMContentLoaded", function () {
  nextBtn.addEventListener("click", handleNext);
  previousBtn.addEventListener("click", handlePrevious);
  toggleButton();
});

const div = document.getElementById("contactMessage");
var page = div.dataset.pagination;
var nbPages = div.dataset.nbpages;
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

function toggleButton() {
  if (nbPages == 1 || nbPages == 0) {
    previousBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else if (nbPages > 1) {
    if (page == 1) {
      nextBtn.style.display = "block";
      previousBtn.style.display = "none";
    } else if (page == nbPages) {
      nextBtn.style.display = "none";
      previousBtn.style.display = "block";
    } else {
      previousBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
  }
}
function handlePrevious() {
  div.innerHTML = `<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
  page--;
  fetch("/admin/contact-message-paginate/" + page, {
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
        setInnerHTML(div, data)
    })
    .catch((error) => {
      console.log(error);
    });
  toggleButton();
}

function handleNext() {
  div.innerHTML = `<div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`;
  page++;
  fetch("/admin/contact-message-paginate/" + page, {
    method: "GET",
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
        setInnerHTML(div, data)
    })
    .catch((error) => {
      console.log(error);
    });
  toggleButton();
}

var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes)
        .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }