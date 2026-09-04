import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { StatusType } from '../../types';

export interface ToastMessage {
  id: string;
  type: StatusType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-[#006666] shrink-0" />,
        };

        const bgStyles = {
          success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          error: 'bg-red-50 border-red-200 text-red-900',
          warning: 'bg-amber-50 border-amber-200 text-amber-900',
          info: 'bg-[#004848]/10 border-[#004848]/20 text-[#004848]',
        };

        return (
          <div
            key={toast.id}
            className={`flex items-center justify-between p-4 rounded-xl border shadow-lg transition-all duration-300 pointer-events-auto ${bgStyles[toast.type]}`}
          >
            <div className="flex items-center gap-3 pr-2">
              {icons[toast.type]}
              <p className="text-xs font-semibold">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-md hover:bg-black/5 text-slate-500 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
