import { prisma } from '@/lib/prisma';
import { CreateInvoiceInput, CreateInvoiceItemInput } from '@/types/invoice';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        customer: true,
        items: true,
      },
    });
    return NextResponse.json(invoices);
  } catch (error: unknown) {
    console.error('Failed to fetch invoices:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;

export async function POST(req: NextRequest) {
  try {
    const data: CreateInvoiceInput = await req.json();
    const { items, ...invoiceData } = data;

    const invoice = await prisma.$transaction(async (tx: TransactionClient) => {
      const createdInvoice = await tx.invoice.create({
        data: {
          ...invoiceData,
          userId: 'temp-user-id', // Replace with actual user ID from auth
          items: {
            create: items.map((item: CreateInvoiceItemInput) => ({
              ...item,
              amount: item.quantity * item.unitPrice,
            })),
          },
        },
        include: {
          items: true,
          customer: true,
        },
      });

      const totalAmount = createdInvoice.items.reduce(
        (sum: number, item) => sum + item.amount,
        0
      );

      return tx.invoice.update({
        where: { id: createdInvoice.id },
        data: { totalAmount },
        include: {
          items: true,
          customer: true,
        },
      });
    });

    return NextResponse.json(invoice);
  } catch (error: unknown) {
    console.error('Failed to create invoice:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
