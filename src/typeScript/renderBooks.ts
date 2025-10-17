import { Book } from "./interfaces";
import { truncateText } from "./helpers";
export const createBookCard = (book: Book) => {
  const card = document.createElement("div");
  card.className = "books__card";

  card.innerHTML = `  <img class="books__card-image" src="${book.image}" alt="${
    book.title
  }" />
    <div class="books__card-details">
      <p class="books__card-author">${book.authors.join(", ")}</p>
      <h2 class="books__card-title">${book.title}</h2>
      ${
        book.rating
          ? `<div class="books__card-rating"><span>
              ${"★".repeat(Math.round(book.rating))}${"☆".repeat(
              5 - Math.round(book.rating)
            )}</span>
              <p class="books__card-rating-reviews">${
                book.ratingsCount
              } reviews</p>
            </div>`
          : ""
      }
      <p class="books__card-description">${truncateText(
        book.description,
        85
      )}</p>
      ${
        book.price
          ? `<span class="books__card-price">${book.price}</span>`
          : `<span class="books__card-price">$4.99</span>`
      }
      <button class="books__card-buy-btn" data-id="${book.id}">Buy Now</button>
    </div>`;

  // ✅ Add image fallback after setting innerHTML
  const img = card.querySelector("img") as HTMLImageElement;
  img.onerror = () => {
    img.onerror = null; // avoid infinite fallback loop
    if (book.fallBackImg && img.src !== book.fallBackImg) {
      img.src = `${book.fallBackImg}`;
    }
  };

  return card;
};
