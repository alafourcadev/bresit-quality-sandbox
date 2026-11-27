/** Price of a cart line in cents, with an optional percentage discount. */
export function lineTotal(unitCents, quantity, discountPercent = 0) {
  if (!Number.isInteger(unitCents) || unitCents < 0) throw new RangeError("unitCents must be a non-negative integer");
  if (!Number.isInteger(quantity) || quantity < 1) throw new RangeError("quantity must be a positive integer");
  if (discountPercent < 0 || discountPercent > 100) throw new RangeError("discountPercent must be between 0 and 100");
  const gross = unitCents * quantity;
  return Math.round(gross * (1 - discountPercent / 100));
}

/** Total of a cart in cents. */
export function cartTotal(lines) {
  return lines.reduce((sum, line) => sum + lineTotal(line.unitCents, line.quantity, line.discountPercent), 0);
}

/** Shipping cost in cents: free from 50 000 cents. */
export function shipping(totalCents) {
  if (totalCents >= 50_000) return 0;
  return 1_500;
}
