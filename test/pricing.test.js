import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bulkDiscountPercent, cartTotal, lineTotal, shipping } from "../src/pricing.js";

describe("lineTotal", () => {
  it("multiplies unit price by quantity", () => assert.equal(lineTotal(1_000, 3), 3_000));
  it("applies a percentage discount", () => assert.equal(lineTotal(1_000, 2, 10), 1_800));
  it("rejects a zero quantity", () => assert.throws(() => lineTotal(1_000, 0), RangeError));
});

describe("cartTotal", () => {
  it("sums every line", () =>
    assert.equal(cartTotal([{ unitCents: 500, quantity: 2 }, { unitCents: 1_000, quantity: 1, discountPercent: 50 }]), 1_500));
});

describe("shipping", () => {
  it("is free from 50 000 cents", () => assert.equal(shipping(50_000), 0));
  it("costs 1 500 cents below the threshold", () => assert.equal(shipping(49_999), 1_500));
});

describe("bulkDiscountPercent", () => {
  it("gives no discount below 10 units", () => assert.equal(bulkDiscountPercent(9), 0));
  it("gives 5 % from 10 units", () => assert.equal(bulkDiscountPercent(10), 5));
  it("gives 10 % from 50 units", () => assert.equal(bulkDiscountPercent(50), 10));
  it("rejects a zero quantity", () => assert.throws(() => bulkDiscountPercent(0), RangeError));
});
