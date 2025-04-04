// ScrollReveal.tsx
import React from 'react';
import { Fade, Slide, Bounce, Zoom } from 'react-awesome-reveal';

type AnimationType = 'fade' | 'slide' | 'bounce' | 'zoom';
type SlideDirection = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: React.ReactNode;
  type?: AnimationType;
  direction?: SlideDirection;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  // Removed [key: string]: any
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  type = 'fade',
  direction,
  delay = 0,
  duration = 2000,
  triggerOnce = true,
}) => {
  // Define the specific props each animation component accepts
  interface BaseAnimationProps {
    triggerOnce?: boolean;
    delay?: number;
    duration?: number;
    children: React.ReactNode;
  }

  interface SlideAnimationProps extends BaseAnimationProps {
    direction?: SlideDirection;
  }

  // Map animation types to their components with proper typing
  const animationMap = {
    fade: Fade,
    slide: Slide,
    bounce: Bounce,
    zoom: Zoom,
  };

  const AnimationComponent = animationMap[type] || Fade;

  // Base props for all animations
  const animationProps: BaseAnimationProps = {
    triggerOnce,
    delay,
    duration,
    children,
  };

  // Handle Slide-specific props
  if (type === 'slide' && direction) {
    const slideProps: SlideAnimationProps = {
      ...animationProps,
      direction,
    };
    return <AnimationComponent {...slideProps} />;
  }

  return <AnimationComponent {...animationProps} damping={0.2} />;
};

export default ScrollReveal;
