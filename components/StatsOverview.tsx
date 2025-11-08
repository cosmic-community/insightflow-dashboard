interface StatsOverviewProps {
  totalRecords: number
  totalCategories: number
  totalConfigs: number
}

export default function StatsOverview({ 
  totalRecords, 
  totalCategories, 
  totalConfigs 
}: StatsOverviewProps) {
  const stats = [
    { 
      label: 'Data Records', 
      value: totalRecords, 
      icon: '📈',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      label: 'Categories', 
      value: totalCategories, 
      icon: '🏷️',
      color: 'bg-green-50 text-green-600'
    },
    { 
      label: 'Configurations', 
      value: totalConfigs, 
      icon: '⚙️',
      color: 'bg-purple-50 text-purple-600'
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div 
          key={stat.label}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}