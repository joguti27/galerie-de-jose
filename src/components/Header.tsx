interface HeaderProps {
  title?: string;
  onTitleClick?: () => void;
}

export function Header({ title = 'GALERIE DE JOSE', onTitleClick }: HeaderProps) {
  return (
    <header className="select-none overflow-visible w-full">
      <h1 
        id="hero-title"
        onClick={onTitleClick}
        className={`font-inter font-normal uppercase text-[clamp(1.75rem,6.2vw,114px)] leading-[1.04] tracking-[-0.02em] text-black m-0 p-0 whitespace-nowrap ${
          onTitleClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
        }`}
      >
        {title}
      </h1>
    </header>
  );
}

