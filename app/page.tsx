import { getDataRecords, getCategories, getDashboardConfigs } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import DataRecordCard from '@/components/DataRecordCard'
import StatsOverview from '@/components/StatsOverview'
import { DataRecord, Category, DashboardConfig } from '@/types'

export const revalidate = 0

export default async function HomePage() {
  const [records, categories, configs] = await Promise.all([
    getDataRecords(),
    getCategories(),
    getDashboardConfigs(),
  ])

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to InsightFlow Dashboard
        </h1>
        <p className="text-gray-600">
          Transform your data into beautiful visualizations
        </p>
      </div>

      <StatsOverview 
        totalRecords={records.length}
        totalCategories={categories.length}
        totalConfigs={configs.length}
      />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Data Records
          </h2>
          <a
            href="/records"
            className="text-primary hover:text-primary/80 font-medium"
          >
            View All →
          </a>
        </div>

        {records.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">No data records found</p>
            <a
              href="/records/new"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
            >
              Create Your First Record
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.slice(0, 6).map((record) => (
              <DataRecordCard key={record.id} record={record as DataRecord} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}