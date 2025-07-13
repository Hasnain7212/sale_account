import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { type Customer } from '@prisma/client'

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: 'asc' },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      },
      invoices: {
        select: {
          id: true
        }
      }
    }
  })

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Customers</h1>
        <Link href="/customers/new">
          <Button>Add Customer</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer: { 
              id: string; 
              name: string; 
              email: string | null; 
              phone: string | null;
              user: { name: string | null; email: string };
              invoices: Array<{ id: string }>;
            }) => (
          <Link 
            key={customer.id} 
            href={`/customers/${customer.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{customer.name}</h2>
            <div className="space-y-2">
              {customer.email && (
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {customer.email}
                </p>
              )}
              {customer.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {customer.phone}
                </p>
              )}
              <p className="text-gray-600">
                <span className="font-medium">Added by:</span> {customer.user.name || customer.user.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Invoices:</span> {customer.invoices.length}
              </p>
            </div>
          </Link>
        ))}

        {customers.length === 0 && (
          <p className="col-span-full text-center text-gray-600">
            No customers found. Click &quot;Add Customer&quot; to create one.
          </p>
        )}
      </div>
    </div>
  )
}
