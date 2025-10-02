import Link from "next/link";

export default function ContractsPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Contracts</h1>
        <Link href="/app/contracts/create" className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">Create contract</Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-600">No contracts yet.</p>
      </div>
    </div>
  )
}
