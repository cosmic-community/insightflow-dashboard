import { getCategories, getDataRecords } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import { Category, DataRecord } from '@/types'

export const revalidate = 0

export default async function CategoriesPage() {
  const [categories, records] = await Promise.all([
    getCategories(),
    getDataRecords(),
  ])

  const getCategoryRecordCount = (categoryId: string) => {
    return records.filter((record) => {
      const typedRecord = record as DataRecord
      return typedRecord.metadata?.category?.id === categoryId
    }).length
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Categories
            </h1>
            <p className="text-gray-600">
              Organize your data records with categories
            </p>
          </div>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🏷️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Categories Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create categories to organize your data records
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const typedCategory = category as Category
            const recordCount = getCategoryRecordCount(typedCategory.id)
            const color = typedCategory.metadata?.color_code || '#2563eb'

            return (
              <div
                key={typedCategory.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {typedCategory.metadata.category_name}
                    </h3>
                    {typedCategory.metadata.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {typedCategory.metadata.description}
                      </p>
                    )}
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {recordCount}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {recordCount} {recordCount === 1 ? 'record' : 'records'}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full border-2"
                    style={{ borderColor: color, backgroundColor: color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}