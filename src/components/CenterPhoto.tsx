import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [nextStill, setNextStill] = useState<StillData | null>(null);
  const [imageLoaded, setImageLoaded] = useState(true);
  const fetchCountRef = useRef(0);

  // Fetch a new random film still from the Film-Grab server API
  const fetchRandomStill = async (setAsNextOnly = false) => {
    try {
      if (!setAsNextOnly) setIsLoading(true);
      const res = await fetch('/api/filmgrab/random');
      if (!res.ok) throw new Error('Failed to fetch still');
      const data: StillData = await res.json();

      if (setAsNextOnly) {
        setNextStill(data);
        // Preload the image in browser cache
        const img = new Image();
        img.src = data.imageUrl;
      } else {
        setStill(data);
        setImageLoaded(false);
        // Pre-fetch the following still for instant next click
        fetchRandomStill(true);
      }
    } catch (err) {
      console.error('Error fetching random still:', err);
    } finally {
      if (!setAsNextOnly) setIsLoading(false);
    }
  };

  // On initial mount, fetch a completely fresh random movie still
  useEffect(() => {
    fetchRandomStill();
  }, []);

  const handleNextClick = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    fetchCountRef.current += 1;

    if (nextStill) {
      setStill(nextStill);
      setImageLoaded(false);
      setNextStill(null);
      // Fetch another into the prefetch slot
      fetchRandomStill(true);
    } else {
      fetchRandomStill(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full z-10 pointer-events-auto group">
      <div 
        className="relative cursor-pointer overflow-hidden border border-black/20 bg-black max-w-[801px] w-full shadow-lg"
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
          alt={`${still.title} - Fotograma cinematográfico de film-grab.com`}
          className={`w-full max-w-[801px] h-[260px] xs:h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px] object-cover contrast-110 brightness-100 block select-none transition-all duration-300 ${
            !imageLoaded ? 'opacity-40 blur-[1px]' : 'opacity-100'
          } ${isInverted ? 'invert contrast-150 grayscale' : 'hover:scale-[1.01]'}`}
        />

        {/* Encabezado superior: Logo Film-Grab + Botón Generador Aleatorio */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-20 pointer-events-none">
          <div className="bg-black/90 text-[#00FF01] font-ibm-mono text-[10px] sm:text-[11px] px-2.5 py-1 tracking-wider border border-[#00FF01]/40 uppercase select-none flex items-center gap-2 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF01] animate-pulse" />
            <span>FILM-GRAB ARCHIVE // 4,129+ FILMS</span>
          </div>

          <button
            type="button"
            onClick={handleNextClick}
            disabled={isLoading}
            title="Generar otro fotograma aleatorio entre más de 4,000 películas"
            className="pointer-events-auto flex items-center gap-1.5 bg-black hover:bg-[#00FF01] text-[#00FF01] hover:text-black font-ibm-mono text-[10px] sm:text-[11px] font-bold px-3 py-1.5 tracking-wider border border-[#00FF01]/40 hover:border-black transition-all duration-150 shadow active:scale-95 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>RANDOM STILL</span>
          </button>
        </div>

        {/* Barra inferior: Título de la película, año y enlace a Film-Grab */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center z-20 pointer-events-none">
          <div className="bg-black/90 text-white font-ibm-mono text-[10px] sm:text-[11px] px-2.5 py-1 tracking-wide border border-white/20 flex items-center gap-2 max-w-[85%] truncate shadow">
            <span className="text-[#00FF01] italic font-times text-xs sm:text-sm font-semibold truncate">
              {still.title}
            </span>
            {still.year && (
              <span className="text-gray-400 font-ibm-mono text-[10px] shrink-0">
                ({still.year})
              </span>
            )}
            {still.movieUrl && (
              <a
                href={still.movieUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Ver galería completa de fotogramas en film-grab.com"
                className="pointer-events-auto text-gray-400 hover:text-[#00FF01] transition-colors ml-1"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="bg-black/90 text-[#00FF01] font-ibm-mono text-[9px] sm:text-[10px] px-2 py-1 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity select-none hidden sm:block shadow border border-[#00FF01]/30">
            {isInverted ? 'FILM_NEG: ON' : 'CLICK: INVERT'}
          </div>
        </div>
      </div>
    </div>
  );
}
