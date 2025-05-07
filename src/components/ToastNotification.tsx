
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  type = 'default',
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const toastClasses = cn(
    'mb-2 flex w-full max-w-md rounded-lg border p-4 shadow-lg',
    {
      'bg-white border-gray-200': type === 'default',
      'bg-green-50 border-green-200': type === 'success',
      'bg-red-50 border-red-200': type === 'error',
      'bg-yellow-50 border-yellow-200': type === 'warning',
      'bg-blue-50 border-blue-200': type === 'info',
    }
  );

  const iconClasses = cn('w-5 h-5 mr-2', {
    'text-green-500': type === 'success',
    'text-red-500': type === 'error',
    'text-yellow-500': type === 'warning',
    'text-blue-500': type === 'info',
  });

  return (
    <div className={toastClasses} role="alert">
      <div className="flex-1">
        <div className="flex items-center">
          {type !== 'default' && (
            <svg className={iconClasses} viewBox="0 0 20 20" fill="currentColor">
              {type === 'success' && (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              )}
              {type === 'error' && (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              )}
              {type === 'warning' && (
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              )}
              {type === 'info' && (
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          )}
          <p className="font-medium">{title}</p>
        </div>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 items-center justify-center"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
