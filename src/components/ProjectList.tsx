import { useState } from 'react';
import { ProjectItem } from '../types';

interface ProjectListProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectList({ projects, onSelectProject }: ProjectListProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col items-start z-20 select-none">
      {/* Titulo Proyectos: > PROYECTOS. con subrayado en rojo y funcion esconder/liberar al hacer clic */}
      <button 
        id="badge-proyectos"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex flex-row items-center gap-[7px] mb-4 sm:mb-5 cursor-pointer bg-transparent border-0 p-0 text-left focus:outline-none select-none"
        title={isOpen ? "Clic para esconder proyectos" : "Clic para liberar proyectos"}
      >
        <span className="font-ibm-mono font-bold text-[18px] sm:text-[21px] lg:text-[24px] leading-[31px] tracking-[0.12em] text-black">
          &gt;
        </span>
        <span className="font-ibm-mono font-bold text-[18px] sm:text-[21px] lg:text-[24px] leading-[31px] tracking-[0.12em] text-black uppercase border-b-2 border-red-600 pb-0.5 group-hover:opacity-80 transition-opacity">
          PROYECTOS.
        </span>
      </button>

      {/* Project Rows (Frames 2, 3, 4, 5) */}
      {isOpen && (
        <div className="flex flex-col space-y-[13px] w-full transition-all duration-200">
          {projects.map((proj, idx) => (
            <button
              key={`${proj.id}-${idx}`}
              id={`project-item-${idx}`}
              onClick={() => onSelectProject(proj)}
              className="group flex flex-row items-end gap-[12px] sm:gap-[18px] text-left p-0 bg-transparent border-0 cursor-pointer transition-transform duration-100 hover:translate-x-1 focus:outline-none"
              title={`Ver detalles de ${proj.title} [${idx + 1}]`}
            >
              {/* 12/05/2023 - Inter 24px letter-spacing 0.12em */}
              <span className="font-inter font-normal text-[16px] sm:text-[20px] lg:text-[24px] leading-[29px] tracking-[0.12em] text-black tabular-nums whitespace-nowrap group-hover:bg-black group-hover:text-[#00FF01] px-0.5 transition-colors">
                {proj.date}
              </span>

              {/* PERSONAL WEBSITE - Times New Roman Italic 24px letter-spacing 0.12em */}
              <span className="font-times-italic font-normal text-[16px] sm:text-[20px] lg:text-[24px] leading-[28px] tracking-[0.12em] text-black whitespace-nowrap group-hover:underline underline-offset-4 decoration-1 decoration-black">
                {proj.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
