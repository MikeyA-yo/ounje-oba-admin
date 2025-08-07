export interface Transaction {
  id: number;
  transactionId: string;
  customer: string;
  date: string;
  time: string;
  amount: string;
  paymentType: string;
  status: string;
}
