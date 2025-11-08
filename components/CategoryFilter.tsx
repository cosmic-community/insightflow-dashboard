'use client'

import { Category } from '@/types'

interface CategoryFilterProps {
  categories: any[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium">
        All
      </button>
      {categories.map((category) => {
        const typedCategory = category as Category
        const color = typedCategory.metadata?.color_code || '#2563eb'
        
        return (
          <button
            key={typedCategory.id}
            className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: color }}
          >
            {typedCategory.title}
          </button>
        )
      })}
    </div>
  )
}