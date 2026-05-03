"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const openModalBtns = document.querySelectorAll(".open-modal-btn");
const confirmBtn = document.querySelector(".primary-btn");

const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");

const toastMessage = document.querySelector(".toast-message");
const toastProgress = document.querySelector(".toast-progress");

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");

let currentAction = "";
let lastClickedBtn = null;

// ======================================================
// OPEN MODAL FUNCTION
// ======================================================

function openModal(element) {
  lastClickedBtn = element;

  const title = element.dataset.modalTitle;
  const text = element.dataset.modalText;
  const action = element.dataset.action;

  currentAction = action;

  modalTitle.textContent = title;
  modalText.textContent = text;

  modal.classList.add("show");
  overlay.classList.add("show");

  document.body.style.overflow = "hidden";
}

// ======================================================
// CLOSE MODAL FUNCTION
// ======================================================

function closeModal() {
  modal.classList.remove("show");
  overlay.classList.remove("show");

  document.body.style.overflow = "auto";

  if (lastClickedBtn) {
    lastClickedBtn.focus();
  }
}

// ======================================================
// TOAST
// ======================================================

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("show");

  toastProgress.style.animation = "none";
  toastProgress.offsetHeight;
  toastProgress.style.animation = "toastProgress 2s linear forwards";

  setTimeout(() => {
    toast.classList.remove("show");
    toastMessage.textContent = "";
  }, 2000);
}

confirmBtn.addEventListener("click", () => {
  if (currentAction === "delete") {
    showToast("Item deleted");
  } else if (currentAction === "save") {
    showToast("Changes saved");
  } else if (currentAction === "upgrade") {
    showToast("Upgrade successfully");
  }

  closeModal();
});

// ======================================================
// EVENT LISTENERS
// ======================================================

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(btn);
  });
});

closeModalBtn.addEventListener("click", closeModal);
cancelModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// ======================================================
// KEYBOARD SUPPORT
// ======================================================

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
