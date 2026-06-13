import type { PaymentProvider } from "./types";

export const CodProvider: PaymentProvider = {
  id: "COD",
  name: "Cash on Delivery",
  available: true,
  async initiate() {
    return null; // No redirect — paid on delivery
  },
};
