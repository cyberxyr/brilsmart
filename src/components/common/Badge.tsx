import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'yellow' | 'orange' | 'red' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  size = 'sm',
  className = '',
}) => {
  const styles = {
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    yellow: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
    orange: 'bg-orange-500 text-white border-orange-600 font-bold shadow-sm',
    red: 'bg-rose-100 text-rose-800 border-rose-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5 rounded-full',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-lg',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border uppercase tracking-wider ${styles[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};