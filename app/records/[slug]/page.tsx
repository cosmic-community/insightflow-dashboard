// app/records/[slug]/page.tsx
import { getDataRecordBySlug } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import ChartRenderer from '@/components/ChartRenderer'
import { DataRecord } from '@/types'
import { format } from 'date-fns'

export const revalidate = 0

interface RecordDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function RecordDetailPage({ params }: RecordDetailPageProps) {
  const { slug } = await params
  const record = await getDataRecordBySlug(slug)

  if (!record) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Record Not Found
          </h1>
          <a
            href="/records"
            className="text-primary hover:text-primary/80 font-medium"
          >
            ← Back to Records
          </a>
        </div>
      </DashboardLayout>
    )
  }

  const typedRecord = record as DataRecord
  const category = typedRecord.metadata?.category
  const categoryColor = category?.metadata?.color_code || '#2563eb'

  return (
    <DashboardLayout>
      <div className="mb-6">
        <a
          href="/records"
          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2 mb-4"
        >
          ← Back to Records
        </a>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {typedRecord.metadata.record_name}
            </h1>
            {typedRecord.metadata.description && (
              <p className="text-gray-600 mb-4">
                {typedRecord.metadata.description}
              </p>
            )}
            <div className="flex items-center gap-4">
              {category && (
                <span 
                  className="px-3 py-1 rounded-full text-white font-medium text-sm"
                  style={{ backgroundColor: categoryColor }}
                >
                  {category.title}
                </span>
              )}
              {typedRecord.metadata.record_date && (
                <span className="text-sm text-gray-500">
                  {format(new Date(typedRecord.metadata.record_date), 'MMMM d, yyyy')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Data Visualization
          </h2>
          <p className="text-sm text-gray-500">
            Interactive chart based on your data values
          </p>
        </div>

        {typedRecord.metadata.data_values ? (
          <div className="h-96">
            <ChartRenderer
              data={typedRecord.metadata.data_values}
              chartType="bar"
              colors={category?.metadata?.color_code ? [category.metadata.color_code] : undefined}
              showLegend={true}
              showGrid={true}
              animate={true}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No data available for visualization</p>
          </div>
        )}

        {typedRecord.metadata.data_values && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Raw Data
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-700">
                {JSON.stringify(typedRecord.metadata.data_values, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}