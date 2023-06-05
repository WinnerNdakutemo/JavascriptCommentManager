import {
  requestCommentsAndAdd,
  Comment,
  addCommentTo,
} from "../my_modules/functions.js";

const paginationDiv = document.querySelector(".js-infinite-pagination");
const endPoint = paginationDiv.dataset.endpoint;
const target = document.querySelector(paginationDiv.dataset.target);
const spinnerBorder = paginationDiv.querySelector(".spinner-border");
let loading = false;
//observe pagination
const paginationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (loading === true) {
      return;
    } else if (entry.isIntersecting) {
      loading = true;
      requestCommentsAndAdd(target, endPoint).then(() => (loading = false));
    }
  });
});

paginationObserver.observe(spinnerBorder);

//form managment
const form = document.querySelector(".js-form-fetch");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formDta = new FormData(form);
  const name = formDta.get("name");
  const email = formDta.get("email");
  const body = formDta.get("body");
  const comment = new Comment(name, email, body);
  addCommentTo(comment, target, paginationDiv.dataset.template, "prepend");
  e.currentTarget.reset();
});
