import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OutputCard from './OutputCard';
import { Platform } from './ContentInput';

interface GeneratedContent {
  platform: Platform;
  content: string;
  hashtags?: string[];
}

interface OutputSectionProps {
  generatedContent: GeneratedContent[];
}

const OutputSection: React.FC<OutputSectionProps> = ({ generatedContent }) => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Don't render anything if no content
  if (generatedContent.length === 0) {
    return null;
  }

  // Drag-to-scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const showHorizontalScroll = generatedContent.length > 3;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <span>{t.output.title}</span>
          <span className="px-2 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded-full">
            {generatedContent.length}
          </span>
        </h2>
        {showHorizontalScroll && (
          <span className="text-xs text-muted-foreground hidden md:block">
            ← Drag to scroll →
          </span>
        )}
      </div>
      
      {/* Desktop: Horizontal scroll for 4+ cards */}
      <div 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        className={`
          hidden md:flex gap-4 pb-2
          ${showHorizontalScroll ? 'overflow-x-auto cursor-grab scrollbar-hide' : ''}
          ${isDragging ? 'cursor-grabbing select-none' : ''}
        `}
      >
        {generatedContent.map((item, index) => (
          <div 
            key={`${item.platform}-${index}`}
            className={`flex-shrink-0 ${showHorizontalScroll ? 'w-[380px]' : 'flex-1 min-w-0'}`}
          >
            <OutputCard
              platform={item.platform}
              content={item.content}
              hashtags={item.hashtags}
              delay={index * 100}
            />
          </div>
        ))}
      </div>

      {/* Mobile: Horizontal swipe */}
      <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
          {generatedContent.map((item, index) => (
            <div 
              key={`${item.platform}-${index}`}
              className="w-[85vw] max-w-[340px] flex-shrink-0"
            >
              <OutputCard
                platform={item.platform}
                content={item.content}
                hashtags={item.hashtags}
                delay={index * 100}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile scroll hint */}
      {generatedContent.length > 1 && (
        <div className="md:hidden flex justify-center gap-1.5 pt-2">
          {generatedContent.map((_, index) => (
            <div 
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-border"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OutputSection;
