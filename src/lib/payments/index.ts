export * from "./types";

import { CodProvider } from "./cod";
import { BankTransferProvider } from "./bank-transfer";
import { SSLCommerzProvider } from "./sslcommerz";
import { BKashProvider } from "./bkash";
import { StripeProvider } from "./stripe";
import type { PaymentMethodId, PaymentProvider } from "./types";

export const providers: PaymentProvider[] = [
  CodProvider,
  BankTransferProvider,
  SSLCommerzProvider,
  BKashProvider,
  StripeProvider,
];

export function getProvider(id: PaymentMethodId): PaymentProvider {
  const p = providers.find((p) => p.id === id);
  if (!p) throw new Error(`Unknown payment method: ${id}`);
  return p;
}
