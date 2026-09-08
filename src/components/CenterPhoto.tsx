import { useState, useEffect } from 'react';

interface StillData {
  title: string;
  year?: string;
  movieUrl: string;
  imageUrl: string;
  originalUrl: string;
}

// Initial default to render instantly before network response
const INITIAL_STILL: StillData = {
  title: 'The Lighthouse',
  year: '2019',
  movieUrl: 'https://film-grab.com/2020/04/10/the-lighthouse/',
  imageUrl: '/assets/filmgrab/the_lighthouse_1.jpg',
  originalUrl: '/assets/filmgrab/the_lighthouse_1.jpg'
};

interface CenterPhotoProps {
  onPhotoClick?: () => void;
}

export function CenterPhoto({ onPhotoClick }: CenterPhotoProps) {
  const [still, setStill] = useState<StillData>(INITIAL_STILL);
  const [isInverted, setIsInverted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);

  // Fetch a random film still on mount
  useEffect(() => {
    const fetchRandomStill = async () => {
      try {
        const res = await fetch('/api/filmgrab/random');
        if (!res.ok) throw new Error('Failed to fetch still');
        const data: StillData = await res.json();
        setStill(data);
        setImageLoaded(false);
      } catch (err) {
        console.error('Error fetching random still:', err);
      }
    };
    fetchRandomStill();
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center w-full z-10 pointer-events-auto group">
      <div 
        className="relative cursor-pointer overflow-hidden border border-black/20 bg-black max-w-[801px] w-full"
        onClick={() => {
          setIsInverted(!isInverted);
          onPhotoClick?.();
        }}
        title="Haz clic para alternar efecto negativo / revelado analógico"
      >
        <img
          id="central-portrait-img"
          key={still.imageUrl}
          src={still.imageUrl}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            // If anything fails, load local fallback
            if (still.imageUrl !== '/assets/portrait.jpg') {
              setStill(prev => ({ ...prev, imageUrl: '/assets/portrait.jpg' }));
            }
          }}
          alt={`${still.title} - Fotograma cinematográfico`}
          className={`w-full max-w-[801px] h-[260px] xs:h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px] object-cover contrast-110 brightness-100 block select-none transition-all duration-300 ${
            !imageLoaded ? 'opacity-40 blur-[1px]' : 'opacity-100'
          } ${isInverted ? 'invert contrast-150 grayscale' : 'hover:scale-[1.01]'}`}
        />

        {/* Solo título y año de la película */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
          <div className="bg-black/85 text-white font-ibm-mono text-[11px] sm:text-xs px-2.5 py-1 tracking-wide border border-white/15 flex items-center gap-2 max-w-[90%] truncate">
            <span className="text-white italic font-times text-xs sm:text-sm font-normal truncate">
              {still.title}
            </span>
            {still.year && (
              <span className="text-neutral-400 font-ibm-mono text-[10px] sm:text-[11px] shrink-0">
                ({still.year})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
