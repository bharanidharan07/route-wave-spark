import { useMemo } from 'react';

export const AnimatedText = ({ text, className = '' }) => {
  const letters = useMemo(() => text.split(''), [text]);
  
  return (
    <h1 className={`animated-text ${className}`}>
      {letters.map((letter, index) => (
        <span 
          key={index} 
          style={{ animationDelay: `${index * 50}ms` }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
};