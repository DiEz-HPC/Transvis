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
let confirmDeleteModal = document.querySelector('#confirmDeleteModal');
// Select the node that will be observed for mutations
const targetNode = document.getElementById("contactMessage");

// Options for the observer (which mutations to observe)
const config = { childList: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
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
      openConfirmModal(e, button);
    });
  });
};

const openConfirmModal= (e, button) => {
    confirmDeleteModal.classList.toggle("hidden");
    confirmDeleteModal.querySelector('#confirmDelete').addEventListener('click', (e) => {
        button.parentNode.submit();
    })
    confirmDeleteModal.querySelector('#cancelDelete').addEventListener('click', (e) => {
        if(!confirmDeleteModal.classList.contains('hidden')) {
            confirmDeleteModal.classList.add("hidden");
        }
    })
}

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
  const email = document.querySelector("#adminReply_email");
  const subject = document.querySelector("#adminReply_subject");
  const message = document.querySelector("#adminReply_message");
  let senderEmail = e.dataset.email;
  email.value = senderEmail;
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
}