interface HeaderProps {
  title?: string;
}

export function Header({ title = 'GALERIE DE JOSE' }: HeaderProps) {
  return (
    <header className="select-none overflow-hidden">
      <h1 
        id="hero-title"
        className="font-inter font-normal uppercase text-[clamp(2rem,7.4vw,128px)] leading-[1.04] tracking-[-0.02em] text-black m-0 p-0 whitespace-nowrap"
      >
        {title}
      </h1>
    </header>
  );
}

