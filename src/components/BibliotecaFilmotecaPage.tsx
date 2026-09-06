import { useState, useMemo } from 'react';
import { ArrowLeft, Film, BookOpen, Search, ExternalLink, RefreshCw, X, Eye, FolderTree, ChevronDown } from 'lucide-react';

interface FilmItem {
  id: string;
  title: string;
  director: string;
  year: number;
  country: string;
  format: string;
  synopsis: string;
  imageUrl: string;
  filmGrabUrl?: string;
  tags: string[];
}

interface BookItem {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  pages: number;
  synopsis: string;
  famousQuote: string;
  tags: string[];
}

const FILM_ARCHIVE: FilmItem[] = [
  {
    id: 'f1',
    title: 'Un Chien Andalou',
    director: 'Luis Buñuel & Salvador Dalí',
    year: 1929,
    country: 'Francia',
    format: '35mm B&N / Silente',
    synopsis: 'Obra cumbre del surrealismo. Una sucesión de secuencias oníricas desafiantes sin continuidad narrativa convencional que revolucionó para siempre el lenguaje cinematográfico.',
    imageUrl: '/assets/portrait.jpg',
    tags: ['Surrealismo', 'Vanguardia', '35mm', 'B&N']
  },
  {
    id: 'f2',
    title: 'The Lighthouse',
    director: 'Robert Eggers',
    year: 2019,
    country: 'Estados Unidos',
    format: '35mm 1.19:1 B&N',
    synopsis: 'Dos fareros intentan mantener la cordura mientras viven en una remota y misteriosa isla de Nueva Inglaterra en la década de 1890.',
    imageUrl: '/assets/filmgrab/the_lighthouse_1.jpg',
    filmGrabUrl: 'https://film-grab.com/2020/04/10/the-lighthouse/',
    tags: ['Psicológico', 'B&N', 'Contemporáneo']
  },
  {
    id: 'f3',
    title: '1917',
    director: 'Sam Mendes',
    year: 2019,
    country: 'Reino Unido / EE. UU.',
    format: 'Arri Alexa Mini LF / Roger Deakins',
    synopsis: 'Dos soldados británicos en la Primera Guerra Mundial emprenden una misión urgente a través de territorio enemigo filmada como un monumental plano secuencia continuo.',
    imageUrl: '/assets/filmgrab/1917_1.jpg',
    filmGrabUrl: 'https://film-grab.com/',
    tags: ['Plano Secuencia', 'Bélico', 'Deakins']
  },
  {
    id: 'f4',
    title: 'Colour Out of Space',
    director: 'Richard Stanley',
    year: 2019,
    country: 'Estados Unidos',
    format: 'Digital / Color Alucinatorio',
    synopsis: 'Adaptación cósmica del relato de H.P. Lovecraft donde un meteorito alienígena infecta una granja familiar transformando la realidad en una pesadilla fosforescente.',
    imageUrl: '/assets/filmgrab/colour_out_of_space_1.jpg',
    tags: ['Lovecraft', 'Terror Cósmico', 'Cromático']
  },
  {
    id: 'f5',
    title: 'Midsommar',
    director: 'Ari Aster',
    year: 2019,
    country: 'Suecia / EE. UU.',
    format: 'Panavision / Pawel Pogorzelski',
    synopsis: 'Un grupo de estudiantes viaja a un festival rural sueco que se celebra una vez cada 90 años. Terror a plena luz del día con una composición geométrica hipnótica.',
    imageUrl: '/assets/filmgrab/midsommar_1.jpg',
    tags: ['Folk Horror', 'Luz Natural', 'Composición']
  },
  {
    id: 'f6',
    title: 'Tenet',
    director: 'Christopher Nolan',
    year: 2020,
    country: 'Reino Unido / EE. UU.',
    format: '70mm IMAX / Hoyte van Hoytema',
    synopsis: 'Armado con una sola palabra, el protagonista viaja a través del oscuro mundo del espionaje internacional en una misión para evitar la Tercera Guerra Mundial manipulando la entropía temporal.',
    imageUrl: '/assets/filmgrab/tenet_1.jpg',
    tags: ['Entropía', '70mm', 'Acción Temporal']
  }
];

const BOOK_ARCHIVE: BookItem[] = [
  {
    id: 'b1',
    title: 'Esculpir en el tiempo',
    author: 'Andréi Tarkovski',
    year: 1986,
    category: 'Teoría Cinematográfica',
    pages: 288,
    synopsis: 'La consagración teórica y poética del gran maestro ruso sobre el tiempo como sustancia primordial del cine: una imagen no es un símbolo de la vida, sino la vida misma retenida en el tiempo.',
    famousQuote: '«El cine es esculpir en el tiempo: una masa viva de hechos y sensaciones que el realizador desbasta para fijar la verdad.»',
    tags: ['Teoría', 'Filosofía', 'Poesía']
  },
  {
    id: 'b2',
    title: 'Notas sobre el cinematógrafo',
    author: 'Robert Bresson',
    year: 1975,
    category: 'Aforismos & Estética',
    pages: 144,
    synopsis: 'Un conjunto conciso e incisivo de pensamientos sobre la distinción crucial entre el «teatro fotografiado» y el verdadero «cinematógrafo», defendiendo a los modelos no profesionales y la precisión acústica.',
    famousQuote: '«No busques la poesía. Ella penetra por sí sola por los resquicios (grietas).»',
    tags: ['Aforismos', 'Cinematógrafo', 'Minimalismo']
  },
  {
    id: 'b3',
    title: 'Sobre la fotografía',
    author: 'Susan Sontag',
    year: 1977,
    category: 'Ensayo Crítico',
    pages: 208,
    synopsis: 'Reflexión fundamental sobre el poder ético y político de la imagen congelada, la voracidad documental de la sociedad contemporánea y el acto de fotografiar como apropiación de lo real.',
    famousQuote: '«Fotografiar es conferir importancia. Probablemente no haya ningún tema que no pueda ser embellecido.»',
    tags: ['Fotografía', 'Crítica Cultural', 'Ética']
  },
  {
    id: 'b4',
    title: 'La cámara lúcida',
    author: 'Roland Barthes',
    year: 1980,
    category: 'Semiología & Afecto',
    pages: 192,
    synopsis: 'El último libro de Barthes donde formula los conceptos inolvidables de Studium (el interés cultural) y Punctum (la herida punzante e íntima que una foto imprime en el observador).',
    famousQuote: '«El punctum de una foto es ese azar que en ella me despunta (pero que también me lastima, me punza).»',
    tags: ['Semiología', 'Punctum', 'Memoria']
  },
  {
    id: 'b5',
    title: 'Cahiers du Cinéma (Textos Fundacionales)',
    author: 'André Bazin & Redacción',
    year: 1951,
    category: 'Crítica de Autor',
    pages: 360,
    synopsis: 'La revista que inventó la política de los autores, desmontando la tiranía del guion literario para proclamar la soberanía del plano-secuencia y la profundidad de campo.',
    famousQuote: '«El cine sustituye nuestra mirada por un mundo acorde con nuestros deseos.»',
    tags: ['Cahiers', 'Política de Autores', 'Crítica']
  },
  {
    id: 'b6',
    title: 'Cinema 1: La imagen-movimiento',
    author: 'Gilles Deleuze',
    year: 1983,
    category: 'Filosofía del Cine',
    pages: 352,
    synopsis: 'Una taxonomía filosófica monumental que clasifica la imagen cinematográfica clásica (percepción, afección, acción) antes de la fractura provocada por la Segunda Guerra Mundial.',
    famousQuote: '«El cine no es un arte que represente el movimiento; es el movimiento hecho arte.»',
    tags: ['Filosofía', 'Deleuze', 'Ontología']
  }
];

interface BibliotecaFilmotecaPageProps {
  onBack: () => void;
}

export function BibliotecaFilmotecaPage({ onBack }: BibliotecaFilmotecaPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'filmoteca' | 'biblioteca'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilm, setSelectedFilm] = useState<FilmItem | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [isTreeExpanded, setIsTreeExpanded] = useState(false);

  // Live random still generator inside the filmoteca view
  const [randomStill, setRandomStill] = useState<{ title: string; year: string; imageUrl: string } | null>(null);
  const [loadingStill, setLoadingStill] = useState(false);

  const fetchExtraStill = async () => {
    setLoadingStill(true);
    try {
      const resp = await fetch('/api/filmgrab/random');
      if (resp.ok) {
        const data = await resp.json();
        setRandomStill(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStill(false);
    }
  };

  const filteredFilms = useMemo(() => {
    if (activeTab === 'biblioteca') return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FILM_ARCHIVE;
    return FILM_ARCHIVE.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.director.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [activeTab, searchQuery]);

  const filteredBooks = useMemo(() => {
    if (activeTab === 'filmoteca') return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return BOOK_ARCHIVE;
    return BOOK_ARCHIVE.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [activeTab, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#00FF01] text-black selection:bg-black selection:text-[#00FF01] pb-24">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-[#00FF01] border-b-2 border-black px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 font-ibm-mono font-bold text-sm sm:text-base text-black bg-black text-[#00FF01] hover:bg-red-600 hover:text-white px-3.5 py-1.5 transition-colors border-2 border-black cursor-pointer shadow-[2px_2px_0px_0px_#000000]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>&lt; VOLVER AL INICIO</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-inter font-bold uppercase text-lg sm:text-2xl tracking-[0.05em] text-black">
            GALERIE DE JOSE
          </span>
          <span className="font-ibm-mono text-xs bg-black text-[#00FF01] px-2 py-0.5 font-bold">
            ARCHIVO VIVO
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 border border-black p-0.5 bg-black/5">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`font-ibm-mono text-xs px-3 py-1 cursor-pointer font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-black text-[#00FF01]'
                : 'text-black hover:bg-black/10'
            }`}
          >
            [TODO ({FILM_ARCHIVE.length + BOOK_ARCHIVE.length})]
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('filmoteca')}
            className={`font-ibm-mono text-xs px-3 py-1 cursor-pointer font-bold transition-all ${
              activeTab === 'filmoteca'
                ? 'bg-black text-[#00FF01]'
                : 'text-black hover:bg-black/10'
            }`}
          >
            FILMOTECA ({FILM_ARCHIVE.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('biblioteca')}
            className={`font-ibm-mono text-xs px-3 py-1 cursor-pointer font-bold transition-all ${
              activeTab === 'biblioteca'
                ? 'bg-black text-[#00FF01]'
                : 'text-black hover:bg-black/10'
            }`}
          >
            BIBLIOTECA ({BOOK_ARCHIVE.length})
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1728px] mx-auto px-4 sm:px-8 pt-8">
        {/* Hero Header & Search Banner */}
        <div className="border-3 border-black bg-black text-white p-6 sm:p-8 mb-10 shadow-[8px_8px_0px_0px_#000000]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              {/* Árbol de navegación funcional */}
              <div className="relative inline-block">
                <nav aria-label="Ruta de directorios" className="flex items-center flex-wrap gap-1 font-ibm-mono text-xs tracking-wider uppercase">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab !== 'all') {
                        setActiveTab('all');
                      } else {
                        setIsTreeExpanded(!isTreeExpanded);
                      }
                    }}
                    className="flex items-center gap-1.5 text-[#00FF01] hover:text-white transition-colors cursor-pointer group"
                    title={activeTab === 'all' ? "Haga clic para desplegar el árbol de directorios" : "Volver a la raíz principal"}
                  >
                    <FolderTree className="w-3.5 h-3.5 text-[#00FF01]" />
                    <span className="font-bold underline-offset-4 group-hover:underline">
                      biblioteca, filmoteca/
                    </span>
                    <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isTreeExpanded ? 'rotate-180 text-[#00FF01]' : ''}`} />
                  </button>

                  {activeTab !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setIsTreeExpanded(!isTreeExpanded)}
                      className="text-white font-bold hover:text-[#00FF01] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>{activeTab}/</span>
                    </button>
                  )}
                </nav>

                {/* Subárbol desplegable interactivo */}
                {isTreeExpanded && (
                  <>
                    <div 
                      className="fixed inset-0 z-20 cursor-default" 
                      onClick={() => setIsTreeExpanded(false)} 
                    />
                    <div className="absolute left-0 top-full mt-2 z-30 bg-black border-2 border-[#00FF01] p-3 shadow-[4px_4px_0px_0px_#00FF01] min-w-[260px] font-ibm-mono text-xs space-y-2">
                      <div className="text-neutral-500 text-[10px] pb-1 border-b border-neutral-800 flex justify-between items-center">
                        <span>ESTRUCTURA DEL ÁRBOL</span>
                        <span className="text-[#00FF01]">[ESC / CLIC FUERA]</span>
                      </div>
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('all');
                            setIsTreeExpanded(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition-colors ${
                            activeTab === 'all' ? 'text-[#00FF01] font-bold bg-neutral-900 border-l-2 border-[#00FF01]' : 'text-neutral-300'
                          }`}
                        >
                          <span>biblioteca, filmoteca/ (raíz)</span>
                          <span className="text-neutral-500 text-[10px]">[{FILM_ARCHIVE.length + BOOK_ARCHIVE.length}]</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('filmoteca');
                            setIsTreeExpanded(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition-colors pl-4 ${
                            activeTab === 'filmoteca' ? 'text-[#00FF01] font-bold bg-neutral-900 border-l-2 border-[#00FF01]' : 'text-neutral-300'
                          }`}
                        >
                          <span>├── filmoteca/</span>
                          <span className="text-neutral-500 text-[10px]">[{FILM_ARCHIVE.length} films]</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('biblioteca');
                            setIsTreeExpanded(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition-colors pl-4 ${
                            activeTab === 'biblioteca' ? 'text-[#00FF01] font-bold bg-neutral-900 border-l-2 border-[#00FF01]' : 'text-neutral-300'
                          }`}
                        >
                          <span>└── biblioteca/</span>
                          <span className="text-neutral-500 text-[10px]">[{BOOK_ARCHIVE.length} libros]</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <h1 className="font-times-italic italic text-4xl sm:text-6xl text-white font-normal leading-[1.1]">
                biblioteca, filmoteca
              </h1>
            </div>

            {/* Live Search & Quick Filter */}
            <div className="w-full md:w-80 space-y-2">
              <label htmlFor="search-archive" className="font-ibm-mono text-xs text-[#00FF01] uppercase tracking-wider block">
                Filtrar catálogo:
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="search-archive"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar autor, título o etiqueta..."
                  className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-700 text-white font-ibm-mono text-xs focus:outline-none focus:border-[#00FF01]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-mono"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section: FILMOTECA */}
        {(activeTab === 'all' || activeTab === 'filmoteca') && (
          <section className="mb-16">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
              <div className="flex items-center gap-3">
                <Film className="w-6 h-6 text-black" />
                <h2 className="font-ibm-mono font-bold text-2xl uppercase tracking-wider text-black">
                  &gt; FILMOTECA
                </h2>
                <span className="font-times-italic italic text-lg text-black/70">
                  (archivo de celuloide &amp; fotogramas)
                </span>
              </div>
              <span className="font-ibm-mono text-xs text-black/60 tracking-widest">
                {filteredFilms.length} PELÍCULAS REGISTRADAS
              </span>
            </div>

            {/* Random Film-Grab Interactor */}
            <div className="border-2 border-black bg-black p-4 mb-8 text-[#00FF01] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-red-600 animate-pulse rounded-full" />
                <span className="font-ibm-mono text-xs uppercase tracking-wider">
                  FILM-GRAB LIVE FEED // +4,140 FOTOGRAMAS DISPONIBLES
                </span>
              </div>
              <button
                type="button"
                onClick={fetchExtraStill}
                disabled={loadingStill}
                className="flex items-center gap-2 bg-[#00FF01] text-black font-ibm-mono text-xs px-3 py-1.5 font-bold hover:bg-white transition-colors cursor-pointer border border-black"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingStill ? 'animate-spin' : ''}`} />
                <span>EXPLORAR FOTOGRAMA ALEATORIO</span>
              </button>
            </div>

            {/* Random Still Viewer if requested */}
            {randomStill && (
              <div className="border-3 border-black bg-black text-white p-4 mb-8 shadow-[6px_6px_0px_0px_#000000]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                  <span className="font-ibm-mono text-xs text-[#00FF01]">
                    FOTOGRAMA CARGADO: {randomStill.title} ({randomStill.year})
                  </span>
                  <button
                    type="button"
                    onClick={() => setRandomStill(null)}
                    className="text-neutral-400 hover:text-white text-xs font-ibm-mono"
                  >
                    [CERRAR ×]
                  </button>
                </div>
                <div className="relative aspect-[16/9] max-h-[500px] w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
                  <img
                    src={randomStill.imageUrl}
                    alt={randomStill.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Film Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFilms.map((film) => (
                <div
                  key={film.id}
                  onClick={() => setSelectedFilm(film)}
                  className="group border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between overflow-hidden"
                >
                  {/* Still preview */}
                  <div className="relative aspect-[16/9] bg-black overflow-hidden border-b-2 border-black">
                    <img
                      src={film.imageUrl}
                      alt={film.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-black text-[#00FF01] font-ibm-mono text-[10px] px-1.5 py-0.5 tracking-widest">
                      {film.year} // {film.format}
                    </div>
                  </div>

                  {/* Info card */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-times-italic italic text-2xl leading-tight group-hover:text-[#00FF01] transition-colors">
                        {film.title}
                      </h3>
                      <p className="font-ibm-mono text-xs text-neutral-600 group-hover:text-neutral-300 mt-1">
                        Dir. {film.director} • {film.country}
                      </p>
                    </div>

                    <p className="font-inter text-xs line-clamp-2 text-neutral-700 group-hover:text-neutral-400">
                      {film.synopsis}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/10 group-hover:border-neutral-800">
                      {film.tags.map((t) => (
                        <span
                          key={t}
                          className="font-ibm-mono text-[10px] px-1.5 py-0.5 bg-black/5 group-hover:bg-neutral-800 text-black group-hover:text-[#00FF01]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: BIBLIOTECA */}
        {(activeTab === 'all' || activeTab === 'biblioteca') && (
          <section className="mb-16">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-black" />
                <h2 className="font-ibm-mono font-bold text-2xl uppercase tracking-wider text-black">
                  &gt; BIBLIOTECA
                </h2>
                <span className="font-times-italic italic text-lg text-black/70">
                  (ensayos, teoría &amp; manifiestos)
                </span>
              </div>
              <span className="font-ibm-mono text-xs text-black/60 tracking-widest">
                {filteredBooks.length} VOLÚMENES REGISTRADOS
              </span>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="group border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_0px_#000000] p-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-ibm-mono border-b border-black/10 group-hover:border-neutral-800 pb-2 text-neutral-500 group-hover:text-neutral-400">
                      <span>{book.category}</span>
                      <span>{book.year} // {book.pages} PP.</span>
                    </div>

                    <h3 className="font-times-italic italic text-2xl leading-tight group-hover:text-[#00FF01] transition-colors">
                      {book.title}
                    </h3>
                    <p className="font-ibm-mono text-xs font-bold text-neutral-800 group-hover:text-neutral-200">
                      {book.author}
                    </p>

                    <blockquote className="font-times-italic italic text-sm text-neutral-700 group-hover:text-neutral-300 border-l-2 border-red-600 pl-3 py-1 bg-neutral-50 group-hover:bg-neutral-900/50">
                      {book.famousQuote}
                    </blockquote>

                    <p className="font-inter text-xs text-neutral-600 group-hover:text-neutral-400 line-clamp-3">
                      {book.synopsis}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-black/10 group-hover:border-neutral-800">
                    {book.tags.map((t) => (
                      <span
                        key={t}
                        className="font-ibm-mono text-[10px] px-1.5 py-0.5 bg-black/5 group-hover:bg-neutral-800 text-black group-hover:text-[#00FF01]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Film Detail Modal */}
      {selectedFilm && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedFilm(null)}
        >
          <div 
            className="bg-[#00FF01] border-3 border-black max-w-3xl w-full p-6 shadow-[10px_10px_0px_0px_#000000] space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b-2 border-black pb-3">
              <div>
                <span className="font-ibm-mono text-xs font-bold uppercase text-black/60">
                  FILMOTECA // {selectedFilm.year}
                </span>
                <h3 className="font-times-italic italic text-3xl sm:text-4xl text-black">
                  {selectedFilm.title}
                </h3>
                <p className="font-ibm-mono text-xs text-black mt-1">
                  Dirigido por {selectedFilm.director} ({selectedFilm.country}) • Formato: {selectedFilm.format}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFilm(null)}
                className="bg-black text-[#00FF01] hover:bg-red-600 hover:text-white p-2 font-mono font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/9] w-full bg-black border-2 border-black overflow-hidden">
              <img
                src={selectedFilm.imageUrl}
                alt={selectedFilm.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-ibm-mono font-bold text-xs uppercase tracking-wider text-black">
                Sinopsis &amp; Relevancia Estética:
              </h4>
              <p className="font-inter text-sm sm:text-base leading-relaxed text-black">
                {selectedFilm.synopsis}
              </p>
            </div>

            {selectedFilm.filmGrabUrl && (
              <div className="pt-2">
                <a
                  href={selectedFilm.filmGrabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-[#00FF01] hover:bg-white hover:text-black px-4 py-2 font-ibm-mono text-xs font-bold border border-black transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>VER ARCHIVO COMPLETO EN FILM-GRAB</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedBook(null)}
        >
          <div 
            className="bg-[#00FF01] border-3 border-black max-w-2xl w-full p-6 shadow-[10px_10px_0px_0px_#000000] space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b-2 border-black pb-3">
              <div>
                <span className="font-ibm-mono text-xs font-bold uppercase text-black/60">
                  BIBLIOTECA // {selectedBook.category} ({selectedBook.year})
                </span>
                <h3 className="font-times-italic italic text-3xl sm:text-4xl text-black">
                  {selectedBook.title}
                </h3>
                <p className="font-ibm-mono text-sm font-bold text-black mt-1">
                  Autor: {selectedBook.author} • {selectedBook.pages} páginas
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBook(null)}
                className="bg-black text-[#00FF01] hover:bg-red-600 hover:text-white p-2 font-mono font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <blockquote className="font-times-italic italic text-base sm:text-lg border-l-4 border-red-600 pl-4 py-2 bg-black/5 text-black">
              {selectedBook.famousQuote}
            </blockquote>

            <div className="space-y-2">
              <h4 className="font-ibm-mono font-bold text-xs uppercase tracking-wider text-black">
                Reseña Crítica:
              </h4>
              <p className="font-inter text-sm sm:text-base leading-relaxed text-black">
                {selectedBook.synopsis}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedBook.tags.map((t) => (
                <span key={t} className="font-ibm-mono text-xs bg-black text-[#00FF01] px-2.5 py-1">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
