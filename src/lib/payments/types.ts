export type PaymentMethodId =
  | "COD"
  | "BankTransfer"
  | "SSLCommerz"
  | "BKash"
  | "Stripe";

export interface PaymentInitInput {
  orderNumber: string;
  totalPaisa: number;
  customerName: string;
  email: string;
  phone: string;
}

export interface PaymentInitResult {
  redirect?: string;
  data?: Record<string, unknown>;
}

export interface PaymentProvider {
  id: PaymentMethodId;
  name: string;
  available: boolean;
  initiate(input: PaymentInitInput): Promise<PaymentInitResult | null>;
}
