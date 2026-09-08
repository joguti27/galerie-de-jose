import { useState, useMemo } from 'react';
import { ExternalLink, X, Search } from 'lucide-react';

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

const FILM_ARCHIVE: FilmItem[] = [];

const BOOK_ARCHIVE: BookItem[] = [];

interface BibliotecaFilmotecaPageProps {
  onBack: () => void;
}

export function BibliotecaFilmotecaPage({ onBack }: BibliotecaFilmotecaPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilm, setSelectedFilm] = useState<FilmItem | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  const filteredFilms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FILM_ARCHIVE;
    return FILM_ARCHIVE.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.director.toLowerCase().includes(q) ||
        f.country.toLowerCase().includes(q) ||
        f.year.toString().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return BOOK_ARCHIVE;
    return BOOK_ARCHIVE.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.year.toString().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#00FF01] text-black selection:bg-black selection:text-[#00FF01] pb-24">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-[#00FF01] border-b-2 border-black px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="font-inter font-bold uppercase text-lg sm:text-2xl tracking-[0.05em] text-black hover:opacity-75 transition-opacity cursor-pointer text-left bg-transparent border-none p-0"
          title="Volver al menú"
        >
          GALERIE DE JOSE
        </button>

        {/* Buscador: Fondo transparente y contorno delgado */}
        <div className="relative flex items-center w-full sm:w-80">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/60 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="BUSCAR EN EL ARCHIVO..."
            className="w-full bg-transparent border border-black pl-8 pr-7 py-1.5 font-ibm-mono text-xs text-black placeholder:text-black/50 focus:outline-none focus:border-black transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-black/60 hover:text-black cursor-pointer p-0.5"
              title="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1728px] mx-auto px-4 sm:px-8 pt-8">
        {/* Empty state when searching with no results */}
        {searchQuery.trim() && filteredFilms.length === 0 && filteredBooks.length === 0 && (
          <div className="border border-black p-8 text-center my-12 bg-transparent">
            <p className="font-ibm-mono text-sm uppercase text-black font-bold">
              NO SE ENCONTRARON RESULTADOS PARA: "{searchQuery}"
            </p>
            <p className="font-times-italic italic text-black/70 text-sm mt-1">
              Prueba buscando por título, autor, director, año o etiqueta.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 font-ibm-mono text-xs border border-black px-3 py-1 bg-transparent hover:bg-black hover:text-[#00FF01] transition-colors cursor-pointer"
            >
              LIMPIAR BÚSQUEDA
            </button>
          </div>
        )}

        {/* Section: FILMOTECA */}
        <section className="mb-16">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
            <h2 className="font-ibm-mono font-bold text-2xl uppercase tracking-wider text-black">
              &gt; FILMOTECA
            </h2>
            <span className="font-ibm-mono text-xs text-black/60 tracking-widest">
              {filteredFilms.length} PELÍCULAS REGISTRADAS
            </span>
          </div>

          {filteredFilms.length === 0 ? (
            <div className="border border-black p-6 text-center bg-transparent">
              <p className="font-ibm-mono text-xs uppercase text-black/70 tracking-widest">
                [ ARCHIVO VACÍO // 0 REGISTROS ]
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFilms.map((film) => (
                <div
                  key={film.id}
                  onClick={() => setSelectedFilm(film)}
                  className="group border border-black bg-transparent hover:bg-black hover:text-[#00FF01] transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden h-full"
                >
                  {/* Still preview */}
                  <div className="relative aspect-[16/9] bg-black overflow-hidden border-b border-black">
                    <img
                      src={film.imageUrl}
                      alt={film.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info card */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-times-italic italic text-2xl leading-tight text-black group-hover:text-[#00FF01] transition-colors">
                        {film.title}
                      </h3>
                      <p className="font-ibm-mono text-xs text-black/70 group-hover:text-[#00FF01]/80 mt-1">
                        Dir. {film.director} ({film.year}) • {film.country}
                      </p>
                    </div>

                    <p className="font-inter text-xs line-clamp-2 text-black/85 group-hover:text-white">
                      {film.synopsis}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/20 group-hover:border-[#00FF01]/30">
                      {film.tags.map((t) => (
                        <span
                          key={t}
                          className="font-ibm-mono text-[10px] px-2 py-0.5 border border-black group-hover:border-[#00FF01] text-black group-hover:text-[#00FF01] uppercase tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section: BIBLIOTECA */}
        <section className="mb-16">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
            <h2 className="font-ibm-mono font-bold text-2xl uppercase tracking-wider text-black">
              &gt; BIBLIOTECA
            </h2>
            <span className="font-ibm-mono text-xs text-black/60 tracking-widest">
              {filteredBooks.length} VOLÚMENES REGISTRADOS
            </span>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="border border-black p-6 text-center bg-transparent">
              <p className="font-ibm-mono text-xs uppercase text-black/70 tracking-widest">
                [ ARCHIVO VACÍO // 0 REGISTROS ]
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="group border border-black bg-transparent hover:bg-black hover:text-[#00FF01] transition-all duration-200 cursor-pointer p-6 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-ibm-mono border-b border-black/20 group-hover:border-[#00FF01]/30 pb-2 text-black/70 group-hover:text-[#00FF01]/80">
                      <span>{book.category}</span>
                      <span>{book.year} // {book.pages} PP.</span>
                    </div>

                    <h3 className="font-times-italic italic text-2xl leading-tight text-black group-hover:text-[#00FF01] transition-colors">
                      {book.title}
                    </h3>
                    <p className="font-ibm-mono text-xs font-bold text-black group-hover:text-[#00FF01]">
                      {book.author}
                    </p>

                    <blockquote className="font-times-italic italic text-sm text-black/85 group-hover:text-[#00FF01]/90 border-l-2 border-black group-hover:border-[#00FF01] pl-3 py-1 bg-transparent">
                      {book.famousQuote}
                    </blockquote>

                    <p className="font-inter text-xs text-black/80 group-hover:text-white line-clamp-3">
                      {book.synopsis}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-black/20 group-hover:border-[#00FF01]/30">
                    {book.tags.map((t) => (
                      <span
                        key={t}
                        className="font-ibm-mono text-[10px] px-2 py-0.5 border border-black group-hover:border-[#00FF01] text-black group-hover:text-[#00FF01] uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Film Detail Modal */}
      {selectedFilm && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedFilm(null)}
        >
          <div 
            className="bg-[#00FF01] border-3 border-black max-w-3xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto"
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
                className="border border-black bg-transparent hover:bg-black hover:text-[#00FF01] text-black w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
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
            className="bg-[#00FF01] border-3 border-black max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto"
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
                className="border border-black bg-transparent hover:bg-black hover:text-[#00FF01] text-black w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <blockquote className="font-times-italic italic text-base sm:text-lg border-l-2 border-black pl-4 py-2 bg-black/5 text-black">
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
                <span key={t} className="font-ibm-mono text-xs border border-black bg-transparent text-black px-2.5 py-1 uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
