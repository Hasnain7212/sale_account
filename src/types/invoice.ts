import { InvoiceItem, PrismaClient } from '@prisma/client';

export interface CreateInvoiceItemInput {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateInvoiceInput {
  number: string;
  date: Date;
  dueDate: Date;
  customerId: string;
  items: CreateInvoiceItemInput[];
}
