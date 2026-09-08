import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CenterPhoto } from './components/CenterPhoto';
import { ProjectList } from './components/ProjectList';
import { BlogList } from './components/BlogList';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { BibliotecaFilmotecaPage } from './components/BibliotecaFilmotecaPage';
import { PROJECTS_DATA, BLOGS_DATA } from './data';
import { BlogItem, ProjectItem } from './types';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<BlogItem | ProjectItem | null>(null);
  const [modalType, setModalType] = useState<'blog' | 'project'>('blog');
  const [currentView, setCurrentView] = useState<'home' | 'biblioteca-filmoteca'>('home');

  // Sync hash routing if user opens with #blog-id or #biblioteca-filmoteca
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#biblioteca-filmoteca' || hash === '#archivo') {
        setCurrentView('biblioteca-filmoteca');
      } else if (hash.startsWith('#blog-')) {
        const blogId = hash.replace('#blog-', '');
        const found = BLOGS_DATA.find((b) => b.id === blogId);
        if (found) {
          setSelectedItem(found);
          setModalType('blog');
        }
      } else if (!hash || hash === '#' || hash === '#inicio') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenBlog = (blog: BlogItem) => {
    setSelectedItem(blog);
    setModalType('blog');
    window.location.hash = `blog-${blog.id}`;
  };

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedItem(project);
    setModalType('project');
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    if (window.location.hash.startsWith('#blog-')) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleNextModal = () => {
    if (modalType === 'blog' && selectedItem && BLOGS_DATA.length > 0) {
      const idx = BLOGS_DATA.findIndex((b) => b.id === selectedItem.id);
      const nextIdx = (idx + 1) % BLOGS_DATA.length;
      handleOpenBlog(BLOGS_DATA[nextIdx]);
    }
  };

  const handlePrevModal = () => {
    if (modalType === 'blog' && selectedItem && BLOGS_DATA.length > 0) {
      const idx = BLOGS_DATA.findIndex((b) => b.id === selectedItem.id);
      const prevIdx = (idx - 1 + BLOGS_DATA.length) % BLOGS_DATA.length;
      handleOpenBlog(BLOGS_DATA[prevIdx]);
    }
  };

  const handleOpenArchive = () => {
    setCurrentView('biblioteca-filmoteca');
    window.location.hash = 'biblioteca-filmoteca';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArchive = () => {
    setCurrentView('home');
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Biblioteca/Filmoteca page view, render the dedicated archive page
  if (currentView === 'biblioteca-filmoteca') {
    return <BibliotecaFilmotecaPage onBack={handleCloseArchive} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#00FF01] text-black overflow-x-hidden selection:bg-black selection:text-[#00FF01]">
      {/* 
        MacBook Pro 16" - 1
        width: 1728px; height: 1125px; background: #00FF01;
      */}
      <main 
        id="macbook-pro-frame"
        className="w-full max-w-[1728px] mx-auto min-h-[1125px] relative px-4 sm:px-8 xl:px-0"
      >
        {/* DESKTOP EXACT 1:1 FIGMA CANVAS (hidden on mobile/tablet, active on xl screens) */}
        <div className="hidden xl:block relative w-full h-[1125px]">
          {/* 1. Header: left: 33px; top: 44px; */}
          <div className="absolute left-[33px] top-[44px] z-30 max-w-[calc(100%-66px)]">
            <Header onTitleClick={handleCloseArchive} />
          </div>

          {/* 2. Titulo Proyectos: left: 63px; top: 233px; & Frame 2-5: left: 105px; top: 279px */}
          <div className="absolute left-[63px] top-[233px] z-20">
            <ProjectList 
              projects={PROJECTS_DATA} 
              onSelectProject={handleOpenProject} 
            />
          </div>

          {/* 3. Photo (FilmGrab Generator): left: 463px; top: 319px; width: 801px; height: 480px; */}
          <div className="absolute left-[463px] top-[319px] w-[801px] h-[480px] z-10">
            <CenterPhoto />
          </div>

          {/* 4. Titulo Blog: left: 1227px; top: 243px; & Frame 8-11: left: 1269px; top: 289px */}
          <div className="absolute left-[1227px] top-[243px] z-20">
            <BlogList 
              blogs={BLOGS_DATA} 
              onSelectBlog={handleOpenBlog} 
            />
          </div>

          {/* 5. Footer (biblioteca, filmoteca marquee): left: 36px; top: 879px; width: 2092px; height: 166px */}
          <div className="absolute left-[36px] top-[879px] w-full max-w-[1660px] z-30">
            <Footer onOpenArchive={handleOpenArchive} />
          </div>
        </div>

        {/* RESPONSIVE LAYOUT FOR MOBILE & TABLET (< 1280px) */}
        <div className="xl:hidden flex flex-col justify-between min-h-screen py-6 space-y-8">
          {/* Header */}
          <div className="w-full pt-2">
            <Header onTitleClick={handleCloseArchive} />
          </div>

          {/* Center Content: FilmGrab Photo Generator and Lists */}
          <div className="flex flex-col items-center space-y-8 my-auto w-full">
            {/* FilmGrab Photo Generator */}
            <div className="w-full flex justify-center">
              <CenterPhoto />
            </div>

            {/* Lists grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
              <ProjectList 
                projects={PROJECTS_DATA} 
                onSelectProject={handleOpenProject} 
              />
              <BlogList 
                blogs={BLOGS_DATA} 
                onSelectBlog={handleOpenBlog} 
              />
            </div>
          </div>

          {/* Footer */}
          <div className="w-full pt-4">
            <Footer onOpenArchive={handleOpenArchive} />
          </div>
        </div>

        {/* End of main layout */}
      </main>

      {/* Reader Modal */}
      <ArticleModal
        item={selectedItem}
        type={modalType}
        onClose={handleCloseModal}
        onNext={handleNextModal}
        onPrev={handlePrevModal}
      />
    </div>
  );
}
