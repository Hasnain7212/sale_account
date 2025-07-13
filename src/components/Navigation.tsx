import Link from 'next/link';
import { HomeIcon, UserGroupIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export function Navigation() {
  return (
    <nav className="w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Sales Account</h1>
      </div>
      <div className="space-y-2">
        <Link 
          href="/" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
        >
          <HomeIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link 
          href="/customers" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
        >
          <UserGroupIcon className="h-5 w-5" />
          <span>Customers</span>
        </Link>
        <Link 
          href="/invoices" 
          className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
        >
          <DocumentTextIcon className="h-5 w-5" />
          <span>Invoices</span>
        </Link>
      </div>
    </nav>
  );
}
