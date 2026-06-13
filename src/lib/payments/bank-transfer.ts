import type { PaymentProvider } from "./types";

export const BankTransferProvider: PaymentProvider = {
  id: "BankTransfer",
  name: "Manual Bank Transfer",
  available: true,
  async initiate() {
    return null; // Customer transfers manually; confirmed by staff
  },
};
