import type { PaymentProvider, PaymentInitInput } from "./types";

export const StripeProvider: PaymentProvider = {
  id: "Stripe",
  name: "Stripe",
  available: false,
  async initiate(_input: PaymentInitInput) {
    throw new Error("Stripe is not yet configured.");
    // Implementation: create Stripe Checkout Session → return { redirect: session.url }
  },
};
