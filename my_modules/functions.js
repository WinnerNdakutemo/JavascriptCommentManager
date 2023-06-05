import { cloneTemplate } from "./win-librarie.js";
const paginationDiv = document.querySelector(".js-infinite-pagination");

export function addCommentTo(comment, target, templateId, method = "append") {
  const commentTemplate = cloneTemplate(templateId);
  const elements = JSON.parse(paginationDiv.dataset.elements);

  const articleNode = commentTemplate.querySelector(".data-container");

  for (let element in elements) {
    const tag = commentTemplate.querySelector(elements[element]);
    tag.innerText = comment[element];
    articleNode.appendChild(tag);
  }
  if (method === "append") {
    target.append(articleNode);
  } else {
    target.prepend(articleNode);
  }
}
/**
 *
 * @param {HTMLElement} paginationDiv
 * @param {HTMLElement} targetElement the container element to witch comment will be added
 * @param {string} endPoint the URL to comments
 */
export async function requestCommentsAndAdd(targetElement, endPoint) {
  const comments = await (
    await fetch(endPoint, {
      Accept: "application/json",
    })
  ).json();

  comments.forEach((comment) => {
    addCommentTo(comment, targetElement, paginationDiv.dataset.template);
  });
}

/**
 * @typedef Comment
 * @property {string} name
 * @property {string} email
 * @property {string} body
 */
export class Comment {
  constructor(name, email, body) {
    this.name = name;
    this.email = email;
    this.body = body;
  }
}
