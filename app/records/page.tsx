import { getDataRecords, getCategories } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import DataRecordCard from '@/components/DataRecordCard'
import CategoryFilter from '@/components/CategoryFilter'
import { DataRecord } from '@/types'

export const revalidate = 0

export default async function RecordsPage() {
  const [records, categories] = await Promise.all([
    getDataRecords(),
    getCategories(),
  ])

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Data Records
            </h1>
            <p className="text-gray-600">
              Manage and visualize your data records
            </p>
          </div>
          <a
            href="/records/new"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-medium"
          >
            + New Record
          </a>
        </div>

        <CategoryFilter categories={categories} />
      </div>

      {records.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Data Records Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first data record to start visualizing your data
          </p>
          <a
            href="/records/new"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-medium"
          >
            Create Data Record
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <DataRecordCard key={record.id} record={record as DataRecord} />
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}