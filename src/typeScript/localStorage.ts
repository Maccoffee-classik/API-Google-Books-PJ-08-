export const saveBasketState = (
  count: number,
  ids: string[],
  category: string
) => {
  localStorage.setItem("boughtBooksCount", count.toString());
  localStorage.setItem("boughtBookIds", JSON.stringify(ids));
  localStorage.setItem("currentCategory", category);
};

export const loadBasketState = (): {
  count: number;
  ids: string[];
  category: string;
} => {
  const count = parseInt(localStorage.getItem("boughtBooksCount") || "0");
  const ids = JSON.parse(localStorage.getItem("boughtBookIds") || "[]");
  const category = localStorage.getItem("currentCategory") || "Fiction";
  return { count, ids, category };
};

// 🔄 Initial basket state

export const savedState = loadBasketState();
export let boughtBooks = savedState.count;
export function getBoughtBooks() {
  return boughtBooks;
}
export function incrementBoughtBooks() {
  boughtBooks++;
}

export const basketProducts = document.querySelector(
  ".header__icons-basket-amount"
) as HTMLSpanElement;

// ✅ If basket not empty, show badge
if (boughtBooks > 0) {
  basketProducts.style.display = "flex";
  basketProducts.textContent = `${boughtBooks}`;
}
