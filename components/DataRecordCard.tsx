import { DataRecord } from '@/types'
import { format } from 'date-fns'

interface DataRecordCardProps {
  record: DataRecord
}

export default function DataRecordCard({ record }: DataRecordCardProps) {
  const category = record.metadata?.category
  const categoryColor = category?.metadata?.color_code || '#2563eb'
  const recordDate = record.metadata?.record_date

  return (
    <a
      href={`/records/${record.slug}`}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {record.metadata.record_name}
        </h3>
        <span 
          className="text-2xl"
          style={{ filter: 'grayscale(0%)' }}
        >
          📊
        </span>
      </div>

      {record.metadata.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {record.metadata.description}
        </p>
      )}

      <div className="flex items-center justify-between text-sm">
        {category && (
          <span 
            className="px-3 py-1 rounded-full text-white font-medium"
            style={{ backgroundColor: categoryColor }}
          >
            {category.title}
          </span>
        )}
        {recordDate && (
          <span className="text-gray-500">
            {format(new Date(recordDate), 'MMM d, yyyy')}
          </span>
        )}
      </div>

      {record.metadata.data_values && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>
              {record.metadata.data_values.datasets?.length || 0} datasets
            </span>
            <span>
              {record.metadata.data_values.labels?.length || 0} data points
            </span>
          </div>
        </div>
      )}
    </a>
  )
}