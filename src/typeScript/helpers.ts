export const generateRandomPrice = (): string => {
  const options = [0.0, 0.5, 0.99];
  const base = Math.floor(Math.random() * 49) + 1; // 1 to 49
  const cents = options[Math.floor(Math.random() * options.length)];
  const finalPrice = base + cents;
  return `$${finalPrice.toFixed(2)}`;
};

// ⬇️ Convert any currency to USD
const convertAPI = "aded4e0a6893e09131f02b8661117469";

export async function convertToUSD(
  currency: string,
  amount: number
): Promise<string | undefined> {
  if (currency === "USD") return `$${amount.toFixed(2)}`;

  try {
    const res = await fetch(
      `https://api.exchangerate.host/convert?from=${currency}&to=USD&amount=${amount}&api_key=${convertAPI}`
    );
    const data = await res.json();
    if (!data.result) return;
    return `$${data.result.toFixed(2)}`;
  } catch (err) {
    console.error("Currency conversion failed:", err);
    return;
  }
}

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
