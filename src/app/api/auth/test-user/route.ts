import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try to find existing test user
    let user = await prisma.user.findFirst({
      where: {
        email: 'test@example.com'
      }
    });

    // If no test user exists, create one
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
        }
      });
    }

    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error('Failed to get/create test user:', error);
    return NextResponse.json({ error: 'Failed to get/create test user' }, { status: 500 });
  }
}
