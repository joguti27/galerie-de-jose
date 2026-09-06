import { useEffect } from 'react';
import { BlogItem, ProjectItem } from '../types';

interface ArticleModalProps {
  item: BlogItem | ProjectItem | null;
  type: 'blog' | 'project';
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function ArticleModal({ item, type, onClose, onNext, onPrev }: ArticleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  const isBlog = type === 'blog';
  const blog = isBlog ? (item as BlogItem) : null;
  const project = !isBlog ? (item as ProjectItem) : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-150"
      onClick={onClose}
    >
      <div
        id="brutalist-reader-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#00FF01] border-3 border-black p-4 sm:p-8 shadow-[8px_8px_0px_0px_#000000] text-black relative flex flex-col selection:bg-black selection:text-[#00FF01]"
      >
        {/* Top bar controls */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-ibm-mono font-bold text-xs uppercase tracking-wider text-black">
              {isBlog ? `> BLOG // ${blog?.category}` : `> PROYECTO // ${project?.year}`}
            </span>
            <span className="font-inter text-xs text-black/80 font-normal">
              {item.date}
            </span>
          </div>

          <button
            id="close-modal-btn"
            onClick={onClose}
            className="font-ibm-mono text-xs sm:text-sm font-bold bg-black text-[#00FF01] hover:bg-black/80 px-3 py-1 cursor-pointer transition-colors uppercase"
          >
            [ CERRAR / ✕ ]
          </button>
        </div>

        {/* Title */}
        <h2 className="font-times-italic italic font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.05] mb-4 text-black">
          {item.title}
        </h2>

        {/* Read time / Subtitle */}
        {isBlog && blog && (
          <div className="font-ibm-mono text-xs uppercase tracking-widest text-black/70 mb-6 flex items-center gap-3">
            <span>● {blog.readTime}</span>
            <span>● ARCHIVO DE IDEAS</span>
          </div>
        )}

        {/* Excerpt */}
        {isBlog && blog && (
          <div className="border-l-3 border-black pl-4 py-1 mb-6 bg-black/5">
            <p className="font-ibm-mono text-sm sm:text-base font-bold text-black leading-relaxed">
              {blog.excerpt}
            </p>
          </div>
        )}

        {/* Project Description */}
        {!isBlog && project && (
          <div className="mb-6 space-y-4">
            <div className="font-ibm-mono text-xs uppercase tracking-wider text-black/70">
              ROL: {project.role}
            </div>
            <p className="text-base sm:text-lg leading-relaxed font-inter">
              {project.description}
            </p>
            <div className="p-3 border border-black bg-black/5 font-ibm-mono text-xs">
              ESTADO: ARCHIVADO // CÓDIGO FUENTE ACTIVO EN PRODUCCIÓN
            </div>
          </div>
        )}

        {/* Blog Paragraphs */}
        {isBlog && blog && (
          <div className="space-y-4 text-black font-inter text-base sm:text-lg leading-relaxed">
            {blog.paragraphs.map((p, idx) => (
              <p key={idx} className="tracking-normal">
                {p}
              </p>
            ))}

            {blog.quote && (
              <blockquote className="mt-6 p-4 border-2 border-black bg-black/5 font-times-italic italic text-xl sm:text-2xl text-black">
                {blog.quote}
              </blockquote>
            )}
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-between font-ibm-mono text-xs">
          <div className="flex gap-2">
            {onPrev && (
              <button
                onClick={onPrev}
                className="border border-black px-2 py-1 bg-black text-[#00FF01] hover:bg-black/80 transition-colors cursor-pointer"
              >
                &larr; ANTERIOR
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="border border-black px-2 py-1 bg-black text-[#00FF01] hover:bg-black/80 transition-colors cursor-pointer"
              >
                SIGUIENTE &rarr;
              </button>
            )}
          </div>

          <span className="text-black/60 hidden sm:inline">
            PRESIONA [ESC] PARA SALIR
          </span>
        </div>
      </div>
    </div>
  );
}
