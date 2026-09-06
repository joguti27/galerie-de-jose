interface FooterProps {
  onOpenArchive?: () => void;
}

export function Footer({ onOpenArchive }: FooterProps) {
  const handleClick = () => {
    if (onOpenArchive) {
      onOpenArchive();
    } else {
      window.location.hash = 'biblioteca-filmoteca';
    }
  };

  const textItem = "biblioteca, filmoteca";

  return (
    <footer 
      id="brutalist-footer"
      className="w-full select-none overflow-hidden py-1 border-t-2 border-b-2 border-black bg-[#00FF01] transition-colors"
    >
      <button 
        type="button"
        onClick={handleClick}
        title="Haz clic para entrar a la Biblioteca y Filmoteca"
        className="w-full text-left bg-transparent border-0 p-0 cursor-pointer block overflow-hidden group focus:outline-none"
      >
        <div className="animate-marquee-medium flex items-center whitespace-nowrap">
          {/* Primer track continuo */}
          <div className="flex items-center space-x-12 sm:space-x-16 pr-12 sm:pr-16">
            {[...Array(6)].map((_, i) => (
              <span 
                key={`track-1-${i}`}
                className="font-times-italic italic font-normal text-[clamp(2.5rem,7vw,110px)] leading-[1.1] tracking-[0.04em] text-black group-hover:text-red-600 transition-colors"
              >
                {textItem}
                <span className="font-ibm-mono not-italic text-[0.45em] ml-12 sm:ml-16 opacity-40 text-black group-hover:text-red-600">
                  //
                </span>
              </span>
            ))}
          </div>

          {/* Segundo track gemelo para bucle infinito sin cortes */}
          <div className="flex items-center space-x-12 sm:space-x-16 pr-12 sm:pr-16" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <span 
                key={`track-2-${i}`}
                className="font-times-italic italic font-normal text-[clamp(2.5rem,7vw,110px)] leading-[1.1] tracking-[0.04em] text-black group-hover:text-red-600 transition-colors"
              >
                {textItem}
                <span className="font-ibm-mono not-italic text-[0.45em] ml-12 sm:ml-16 opacity-40 text-black group-hover:text-red-600">
                  //
                </span>
              </span>
            ))}
          </div>
        </div>
      </button>
    </footer>
  );
}
