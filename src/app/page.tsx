import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
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
    </div>
  );
}
