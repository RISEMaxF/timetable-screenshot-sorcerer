
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Train } from "@/types/train"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Exports train data to CSV and triggers a download
 */
export function exportTrainsToCSV(trains: Train[], filename = 'trains-export.csv'): void {
  // Define CSV headers based on train properties we want to include
  const headers = [
    'ID', 
    'Operator', 
    'From', 
    'To', 
    'Arrival Time', 
    'Track',
    'Status',
    'Notes'
  ];

  // Convert each train to a CSV row
  const rows = trains.map(train => [
    train.id,
    train.operator,
    train.from || '',
    train.to || '',
    train.arrivalTime || '',
    train.track || '',
    train.completed ? 'Completed' : 'Pending',
    train.notes || ''
  ]);

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link and trigger click
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
