import { cn } from '@/lib/utils';

export const AppCard = ({ 
  children, 
  className = '', 
  hover = false, 
  glass = false,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "bg-card rounded-xl shadow-md border border-border p-6 md:p-8 transition-all duration-normal",
        hover && "hover:bg-card-hover hover:shadow-lg hover:-translate-y-1",
        glass && "glass",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};