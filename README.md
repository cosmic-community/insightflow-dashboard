# InsightFlow Dashboard

A modern data visualization dashboard that transforms your Cosmic content into interactive charts, graphs, and visual insights. Manage data records, categories, and dashboard configurations with a sleek, intuitive interface.

![Dashboard Preview](https://imgix.cosmicjs.com/668a22f0-bcca-11f0-8893-ab943f57b671-photo-1460925895917-afdab827c52f-1762623785502.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## Features

- 📊 **Interactive Data Visualizations** - Charts, bars, graphs, and more using Chart.js
- 🎨 **Category Management** - Organize data with color-coded categories
- ⚙️ **Dashboard Customization** - Configure chart types, colors, and layouts
- 📈 **Real-time Data Management** - Full CRUD operations for all content types
- 🎯 **Smart Filtering** - Filter visualizations by category and date
- 📱 **Responsive Design** - Works beautifully on all devices
- 🔄 **Live Updates** - Changes in Cosmic reflect instantly in the dashboard

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=690f7fedfb7423bbdde4e83a&clone_repository=690f8281fb7423bbdde4e8b6)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "create a complete website  frontend , backend and database , dashboard for data visualization when user enter the data in format it make its charts , bars , graphs with records use html ,css , javascript and react for frontend and for backend use python , flask , django"

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Chart.js** - Interactive data visualizations
- **React Chart.js 2** - React wrapper for Chart.js
- **Cosmic SDK** - Headless CMS integration
- **Bun** - Fast package manager and runtime

## Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account and bucket

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd insightflow-dashboard
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Data Records with Categories

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all data records with linked categories
const { objects: records } = await cosmic.objects
  .find({ type: 'data-records' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include linked category objects

// Access the data
records.forEach(record => {
  console.log(record.metadata.record_name)
  console.log(record.metadata.category.title) // Linked category
  console.log(record.metadata.data_values) // JSON data for charts
})
```

### Creating a New Data Record

```typescript
// Create a new data record with visualization data
await cosmic.objects.insertOne({
  type: 'data-records',
  title: 'Q2 Sales Report',
  metadata: {
    record_name: 'Q2 Sales Report',
    description: 'Quarterly sales performance',
    data_values: {
      labels: ['April', 'May', 'June'],
      datasets: [{
        label: 'Revenue',
        data: [55000, 62000, 58000]
      }]
    },
    category: 'category-object-id', // Link to category
    record_date: '2024-06-30'
  }
})
```

### Updating Dashboard Configuration

```typescript
// Update chart configuration
await cosmic.objects.updateOne('dashboard-id', {
  metadata: {
    configuration: {
      chartType: 'line',
      layout: 'grid',
      colors: ['#4CAF50', '#2196F3', '#FFC107'],
      displayOptions: {
        showLegend: true,
        showGrid: true,
        animate: true
      }
    }
  }
})
```

## Cosmic CMS Integration

### Content Structure

**Data Records** (`data-records`)
- Record Name (text) - Display name for the data
- Description (textarea) - Details about the data
- Data Values (json) - Chart data in format: `{labels: [], datasets: [{label, data}]}`
- Category (object) - Linked category for organization
- Record Date (date) - Timestamp for the record

**Categories** (`categories`)
- Category Name (text) - Name of the category
- Description (textarea) - Category description
- Color Code (color) - Hex color for visualization

**Dashboard Configurations** (`dashboard-configurations`)
- Dashboard Name (text) - Configuration name
- Description (textarea) - Configuration details
- Configuration (json) - Chart settings: `{chartType, layout, colors, displayOptions}`

### Data Values Format

The `data_values` field expects JSON in Chart.js format:

```json
{
  "labels": ["Jan", "Feb", "Mar"],
  "datasets": [
    {
      "label": "Sales",
      "data": [12000, 15000, 14000]
    },
    {
      "label": "Expenses",
      "data": [8000, 9000, 8500]
    }
  ]
}
```

## Deployment Options

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Push your code to GitHub
2. Import the repository in Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key

<!-- README_END -->