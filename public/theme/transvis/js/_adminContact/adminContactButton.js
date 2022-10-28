document.addEventListener("DOMContentLoaded", function () {
  validateDelete();
  replyToMessage();
  closeModal();
  formAlreadySend();
  observer.observe(targetNode, config);
});

let deleteButton = document.querySelectorAll(".deleteButton");
let feedbackMessage = document.querySelector(".boltforms-feedback");
let replyButton = document.querySelectorAll(".replyButton");
let modal = document.querySelector(".replyModal");
let form = document.querySelector("#replyForm");

// Select the node that will be observed for mutations
const targetNode = document.getElementById("contactMessage");

// Options for the observer (which mutations to observe)
const config = { childList: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      console.log(
        "The " + mutation.target.id + " element has been added or removed."
      );
      validateDelete();
      replyToMessage();
      closeModal();
      formAlreadySend();
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

const validateDelete = () => {
  deleteButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Voulez-vous vraiment supprimer ce contact ?")) {
        button.parentNode.submit();
      }
    });
  });
};

const replyToMessage = () => {
  replyButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.toggle("hidden");
      fillModal(e.target);
      clearFeedback();
    });
  });
};

const fillModal = (e) => {
  const email = document.querySelector("#reply_email");
  const subject = document.querySelector("#reply_subject");
  const message = document.querySelector("#reply_message");
  email.value = e.dataset.email;
  subject.value = "";
  message.value = "";
};

const closeModal = () => {
  const closeButton = document.querySelector("#close_modal");
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.toggle("hidden");
  });
};

const formAlreadySend = () => {
  if (feedbackMessage) {
    modal.classList.toggle("hidden");
  }
};

const clearFeedback = () => {
  if (feedbackMessage) {
    feedbackMessage.remove();
  }
};


const refreshContactButton = () => {
    deleteButton = document.querySelectorAll(".deleteButton");
    feedbackMessage = document.querySelector(".boltforms-feedback");
    replyButton = document.querySelectorAll(".replyButton");
    modal = document.querySelector(".replyModal");
    form = document.querySelector("#replyForm");
    console.log('refreshContactButton', deleteButton)
}