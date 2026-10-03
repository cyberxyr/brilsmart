import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
        };

        const bgColors = {
          success: 'bg-white border-brand-200 text-slate-800 shadow-lg shadow-brand-900/10',
          error: 'bg-white border-rose-200 text-slate-800 shadow-lg shadow-rose-900/10',
          warning: 'bg-white border-amber-200 text-slate-800 shadow-lg shadow-amber-900/10',
          info: 'bg-white border-sky-200 text-slate-800 shadow-lg shadow-sky-900/10',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-200 animate-slide-up ${bgColors[toast.type]}`}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type]}
              <p className="text-sm font-medium text-slate-800">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};