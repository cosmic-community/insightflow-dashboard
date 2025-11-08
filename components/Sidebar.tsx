export default function Sidebar() {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Data Records', href: '/records', icon: '📈' },
    { name: 'Categories', href: '/categories', icon: '🏷️' },
    { name: 'Configurations', href: '/configs', icon: '⚙️' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">InsightFlow</h1>
        <p className="text-sm text-gray-500">Data Visualization</p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Powered by</p>
          <img 
            src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
            alt="Cosmic"
            className="w-20"
          />
        </div>
      </div>
    </aside>
  )
}