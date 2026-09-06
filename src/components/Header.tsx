import { useState } from 'react';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'GALERIE DE JOSE.' }: HeaderProps) {
  const [currentTitle, setCurrentTitle] = useState(title);

  const toggleTitle = () => {
    setCurrentTitle((prev) => (prev.includes('GALERIE') ? 'MANO CUSCO.' : 'GALERIE DE JOSE.'));
  };

  return (
    <header className="select-none overflow-hidden">
      <h1 
        id="hero-title"
        onClick={toggleTitle}
        title="Haz clic para alternar título (GALERIE DE JOSE. / MANO CUSCO.)"
        className="font-inter font-normal uppercase text-[clamp(2rem,7.4vw,128px)] leading-[1.04] tracking-[-0.02em] text-black m-0 p-0 whitespace-nowrap cursor-pointer transition-opacity hover:opacity-85"
      >
        {currentTitle}
      </h1>
    </header>
  );
}

