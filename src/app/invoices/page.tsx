import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'

export default async function InvoicesPage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      customer: true,
      items: true,
    },
    orderBy: {
      date: 'desc',
    },
  })

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Invoices</h1>
        <Link href="/invoices/new">
          <Button>Create Invoice</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {invoices.map((invoice) => (
          <Link
            key={invoice.id}
            href={`/invoices/${invoice.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">Invoice #{invoice.number}</h2>
                <p className="text-gray-600">Customer: {invoice.customer.name}</p>
                <p className="text-gray-600">
                  Date: {new Date(invoice.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Items: {invoice.items.length}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  ${invoice.totalAmount.toFixed(2)}
                </p>
                <p className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${
                  invoice.status === 'PAID'
                    ? 'bg-green-100 text-green-800'
                    : invoice.status === 'DRAFT'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {invoice.status}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {invoices.length === 0 && (
          <p className="text-center text-gray-600">
            No invoices found. Click &quot;Create Invoice&quot; to create one.
          </p>
        )}
      </div>
    </div>
  )
