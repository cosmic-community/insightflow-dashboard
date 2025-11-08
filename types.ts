// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    category_name: string;
    description?: string;
    color_code?: string;
  };
}

// Chart data structure for data_values JSON field
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// Data Record interface
export interface DataRecord extends CosmicObject {
  type: 'data-records';
  metadata: {
    record_name: string;
    description?: string;
    data_values: ChartData;
    category?: Category;
    record_date?: string;
  };
}

// Dashboard Configuration interface
export interface DashboardConfig extends CosmicObject {
  type: 'dashboard-configurations';
  metadata: {
    dashboard_name: string;
    description?: string;
    configuration?: {
      chartType: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
      layout: 'single-column' | 'two-column' | 'grid';
      colors: string[];
      displayOptions: {
        showLegend: boolean;
        showGrid: boolean;
        animate: boolean;
      };
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Form data types for creating/updating records
export interface CreateDataRecordData {
  title: string;
  metadata: {
    record_name: string;
    description?: string;
    data_values: ChartData;
    category?: string; // Category ID
    record_date?: string;
  };
}

export interface CreateCategoryData {
  title: string;
  metadata: {
    category_name: string;
    description?: string;
    color_code?: string;
  };
}

export interface CreateDashboardConfigData {
  title: string;
  metadata: {
    dashboard_name: string;
    description?: string;
    configuration?: DashboardConfig['metadata']['configuration'];
  };
}