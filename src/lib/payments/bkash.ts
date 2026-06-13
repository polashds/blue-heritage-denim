import type { PaymentProvider, PaymentInitInput } from "./types";

export const BKashProvider: PaymentProvider = {
  id: "BKash",
  name: "bKash",
  available: false,
  async initiate(_input: PaymentInitInput) {
    throw new Error("bKash is not yet configured.");
    // Implementation: POST to bKash create payment API → return { redirect: bkashURL }
  },
};
