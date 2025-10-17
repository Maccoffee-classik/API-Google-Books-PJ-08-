//*****************IMPORTED SASS STYLES*********************
import "../styles/style_components/main.scss";

import { fetchBooks } from "./fetchBooks";
import { MAX_RESULTS } from "./fetchBooks";
import { createBookCard } from "./renderBooks";
import {
  savedState,
  saveBasketState,
  basketProducts,
  incrementBoughtBooks,
  getBoughtBooks,
} from "./localStorage";

const categories = document.querySelectorAll(".categories__item");
const booksGrid = document.querySelector(".books__grid") as HTMLElement;
const loader = document.getElementById("loader")!;
const error = document.getElementById("error")!;
const loadBtn = document.querySelector(".books__load") as HTMLButtonElement;

let boughtBookIds: string[] = savedState.ids;
let currentCategory: string = savedState.category;
let startIndex = 0;

categories.forEach((category) => {
  category.addEventListener("click", () => {
    categories.forEach((category) => {
      category.classList.remove("categories__item--active");
    });
    category.classList.add("categories__item--active");
    const chosenCategory = category.textContent?.trim();
    if (chosenCategory) {
      currentCategory = chosenCategory;
      saveBasketState(getBoughtBooks(), boughtBookIds, currentCategory);
    }

    // Reset index and clear old books
    startIndex = 0;
    booksGrid.innerHTML = "";

    // Load new books
    loadAndRenderBooks();
  });
});

// ✅ Load & render books with basket state
export async function loadAndRenderBooks(): Promise<void> {
  loader.classList.remove("hidden");
  error.classList.add("hidden");
  booksGrid.innerHTML = "";
  try {
    const books = await fetchBooks(currentCategory, startIndex);
    if (!books) throw new Error("No books fetched");

    books.forEach((book) => {
      const card = createBookCard(book);
      booksGrid.appendChild(card);

      const btnEl = card.querySelector(
        ".books__card-buy-btn"
      ) as HTMLButtonElement;

      if (boughtBookIds.includes(book.id)) {
        btnEl.textContent = "IN THE CART";
        btnEl.style.color = "rgba(92, 106, 121, 1)";
        btnEl.style.borderColor = "rgba(92, 106, 121, 1)";
        btnEl.disabled = true;
      }

      btnEl.addEventListener("click", () => {
        if (!boughtBookIds.includes(book.id)) {
          incrementBoughtBooks();
          boughtBookIds.push(book.id);

          basketProducts.style.display = "flex";
          basketProducts.textContent = `${getBoughtBooks()}`;
          btnEl.textContent = "IN THE CART";
          btnEl.style.color = "rgba(92, 106, 121, 1)";
          btnEl.style.borderColor = "rgba(92, 106, 121, 1)";
          btnEl.disabled = true;

          saveBasketState(getBoughtBooks(), boughtBookIds, currentCategory);
        }
      });
    });

    // 🧠 Disable button if no more books to fetch
    if (books.length < MAX_RESULTS) {
      loadBtn.textContent = "No more books";
      loadBtn.disabled = true;
    }

    startIndex += MAX_RESULTS;
  } catch (err) {
    console.error("Error fetching books:", err);
    error.classList.remove("hidden");
  } finally {
    loader.classList.add("hidden");
  }
  loadBtn.addEventListener("click", () => {
    loadAndRenderBooks();
  });
}
