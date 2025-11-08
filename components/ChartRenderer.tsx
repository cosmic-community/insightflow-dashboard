'use client'

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2'
import { ChartData } from '@/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ChartRendererProps {
  data: ChartData
  chartType?: 'line' | 'bar' | 'pie' | 'doughnut' | 'area'
  colors?: string[]
  showLegend?: boolean
  showGrid?: boolean
  animate?: boolean
}

export default function ChartRenderer({
  data,
  chartType = 'bar',
  colors = ['#4CAF50', '#2196F3', '#FFC107', '#F44336', '#9C27B0'],
  showLegend = true,
  showGrid = true,
  animate = true,
}: ChartRendererProps) {
  if (!data || !data.labels || !data.datasets) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No chart data available</p>
      </div>
    )
  }

  // Enhance datasets with colors
  const enhancedData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 2,
      fill: chartType === 'area',
    })),
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      duration: animate ? 1000 : 0,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: chartType !== 'pie' && chartType !== 'doughnut' ? {
      y: {
        beginAtZero: true,
        grid: {
          display: showGrid,
        },
      },
      x: {
        grid: {
          display: showGrid,
        },
      },
    } : undefined,
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
      case 'area':
        return <Line data={enhancedData} options={options} />
      case 'bar':
        return <Bar data={enhancedData} options={options} />
      case 'pie':
        return <Pie data={enhancedData} options={options} />
      case 'doughnut':
        return <Doughnut data={enhancedData} options={options} />
      default:
        return <Bar data={enhancedData} options={options} />
    }
  }

  return (
    <div className="w-full h-full">
      {renderChart()}
    </div>
  )
}