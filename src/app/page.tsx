import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from '@/lib/prisma';
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

export default async function Home() {
  const [customerCount, invoiceCount, totalRevenue] = await Promise.all([
    prisma.customer.count(),
    prisma.invoice.count(),
    prisma.invoice.aggregate({
      _sum: {
        totalAmount: true
      },
      where: {
        status: 'PAID'
      }
    })
  ]);

  const stats = [
    {
      name: 'Total Customers',
      value: customerCount,
      icon: UserGroupIcon,
    },
    {
      name: 'Total Invoices',
      value: invoiceCount,
      icon: DocumentTextIcon,
    },
    {
      name: 'Total Revenue',
      value: totalRevenue._sum.totalAmount 
        ? `$${totalRevenue._sum.totalAmount.toFixed(2)}` 
        : '$0.00',
      icon: CurrencyDollarIcon,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Sales Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Customers</h2>
          <p className="text-gray-600 mb-4">Manage your customer database</p>
          <Link href="/customers">
            <Button>View Customers</Button>
          </Link>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Invoices</h2>
          <p className="text-gray-600 mb-4">Create and manage invoices</p>
          <Link href="/invoices">
            <Button>View Invoices</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
