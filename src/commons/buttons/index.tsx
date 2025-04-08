// btn outlined (ensure if icon is passed it will be rendered), (for links the button will be within the link on the necesary component)
// btn filled
// regular btn

// the props they should accept are title, variant, icon, onClick
// src/components/Button.tsx
import React from 'react';

// Define the Button props type
interface ButtonProps {
  title: string; // Button title
  variant?: 'primary' | 'outlined'; // Button variants
  icon?: React.ReactNode; // Optional icon, will accept an icon component
  onClick?: () => void; // Click handler
  children?: React.ReactNode; // Button text or content
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  icon,
  onClick,
  className,
  disabled,
  //   children,
}) => {
  // Base classes
  const baseClasses =
    'flex items-center justify-center py-2 px-6 text-sm font-medium transition-all';

  // Variant-specific classes
  const variantClasses =
    variant === 'primary'
      ? 'bg-black text-white border border-black hover:text-black  hover:bg-white'
      : 'border border-black text-black hover:bg-black hover:text-white';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={title.toLowerCase()}
    >
      {title} {/* Button text or children */}
      {icon ? icon : <></>}
    </button>
  );
};

export default Button;
