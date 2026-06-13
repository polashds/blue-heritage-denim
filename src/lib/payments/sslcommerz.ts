import type { PaymentProvider, PaymentInitInput } from "./types";

export const SSLCommerzProvider: PaymentProvider = {
  id: "SSLCommerz",
  name: "SSLCommerz",
  available: false,
  async initiate(_input: PaymentInitInput) {
    throw new Error("SSLCommerz is not yet configured.");
    // Implementation: POST to SSLCommerz session API → return { redirect: session.GatewayPageURL }
  },
};
