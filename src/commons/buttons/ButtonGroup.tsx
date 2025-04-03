import React from 'react';
import Button from './index'; // Import the Button component

// Define the ButtonGroup props type
interface ButtonGroupProps {
  button1Title: string;
  button2Title: string;
  button1Variant?: 'primary' | 'outlined';
  button2Variant?: 'primary' | 'outlined';
  button1Icon?: React.ReactNode;
  button2Icon?: React.ReactNode;
  button1OnClick?: () => void;
  button2OnClick?: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  button1Title,
  button2Title,
  button1Variant = 'primary',
  button2Variant = 'outlined',
  button1Icon,
  button2Icon,
  button1OnClick,
  button2OnClick,
}) => {
  return (
    <div className="flex space-x-4">
      {/* Button 1 */}
      <Button
        title={button1Title}
        variant={button1Variant}
        icon={button1Icon}
        onClick={button1OnClick}
      />
      {/* Button 2 */}
      <Button
        title={button2Title}
        variant={button2Variant}
        icon={button2Icon}
        onClick={button2OnClick}
      />
    </div>
  );
};

export default ButtonGroup;
