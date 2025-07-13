import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        invoices: true,
      },
    });
    return NextResponse.json(customers);
  } catch (error: unknown) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get or create test user
    const userResponse = await fetch('http://localhost:3000/api/auth/test-user');
    const user = await userResponse.json();
    
    if (!user.id) {
      return NextResponse.json({ error: 'Failed to get test user' }, { status: 500 });
    }

    const data = await req.json();
    const customer = await prisma.customer.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
    return NextResponse.json(customer);
  } catch (error: unknown) {
    console.error('Failed to create customer:', error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
