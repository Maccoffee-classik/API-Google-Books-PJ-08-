import { generateRandomPrice, convertToUSD, truncateText } from "./helpers";
import { Book } from "./interfaces";

export const MAX_RESULTS = 6;
const MyAPIkey = "AIzaSyCsUvPYYPpQcsRcqfiVE4LGTQDripG-VAc";

export async function fetchBooks(category: string, startIndx: number) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${startIndx}&maxResults=${MAX_RESULTS}&key=${MyAPIkey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (!data.items) return [];

    const books: Book[] = await Promise.all(
      data.items.map(async (item: any): Promise<Book> => {
        const volume = item.volumeInfo;
        const sale = item.saleInfo;

        const industryIdentifiers = volume.industryIdentifiers || [];
        const isbn13Obj = industryIdentifiers.find(
          (id: any) => id.type === "ISBN_13"
        );
        const isbn = isbn13Obj?.identifier;

        const openLibraryImage = isbn
          ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`
          : undefined;

        const rawPrice = sale?.listPrice?.amount;
        const currency = sale?.listPrice?.currencyCode;

        let convertedPrice: string | undefined;

        if (rawPrice && currency) {
          convertedPrice = await convertToUSD(currency, rawPrice);
        }

        return {
          id: item.id,
          title: volume.title,
          authors: volume.authors || ["Unknown author"],
          description: volume.description || "No description",
          image:
            openLibraryImage ||
            volume.imageLinks?.thumbnail ||
            volume.imageLinks?.smallThumbnail ||
            "./img/cover.png",
          fallBackImg:
            volume.imageLinks?.thumbnail ||
            volume.imageLinks?.smallThumbnail ||
            "./img/cover.png",
          rating: volume.averageRating || "No rating",
          ratingsCount: volume.ratingsCount || "No rating",
          price: convertedPrice || generateRandomPrice(),
        };
      })
    );

    return books;
  } catch (err) {
    console.error(err);
  }
}
