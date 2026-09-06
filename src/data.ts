import { ProjectItem, BlogItem } from './types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    date: '12/05/2023',
    title: 'PERSONAL WEBSITE',
    role: 'Art Direction & Code',
    year: '2023',
    description: 'Sistema web minimalista monocromático explorando la ausencia de ornamentos superfluos y la tensión tipográfica pura.',
    link: '#',
  },
  {
    id: 'proj-2',
    date: '12/05/2023',
    title: 'PERSONAL WEBSITE',
    role: 'Editorial & Brutalism',
    year: '2023',
    description: 'Archivo interactivo con maquetación asimétrica y renderizado de alto contraste para diseñadores independientes.',
    link: '#',
  },
  {
    id: 'proj-3',
    date: '12/05/2023',
    title: 'PERSONAL WEBSITE',
    role: 'Creative Development',
    year: '2023',
    description: 'Investigación sobre la interfaz como manifiesto visual. Contrastes violentos entre verde neón, negro carbón y serif clásica.',
    link: '#',
  },
  {
    id: 'proj-4',
    date: '12/05/2023',
    title: 'PERSONAL WEBSITE',
    role: 'UX / Prototype',
    year: '2023',
    description: 'Plataforma experimental de portafolio sin cuadrícula fija. El espacio negativo como elemento estructural.',
    link: '#',
  },
];

export const BLOGS_DATA: BlogItem[] = [
  {
    id: 'blog-1',
    date: '12/05/2023',
    title: '¿Qué es el diseño?',
    readTime: '3 min lectura',
    category: 'Manifiesto',
    excerpt: 'El diseño no es decoración complaciente ni una plantilla limpia de Silicon Valley; es la toma de postura visual ante el caos.',
    paragraphs: [
      'El diseño contemporáneo ha caído en la trampa de la homogeneización algorítmica. Todo parece provenir de la misma plantilla aséptica: botones redondeados, sombras difusas y colores pastel que no ofenden a nadie pero tampoco provocan nada.',
      'El brutalismo web no es desidia ni feísmo premeditado. Es una reacción política y estética frente a la falsedad de la interfaz corporativa. Es revelar los huesos del código, los márgenes sin pulir y la tipografía sin concesiones.',
      'Diseñar es tomar una posición clara. Cuando eliges un verde neón (#00FF00) que desafía la retina y contrastas un titular sans-serif brutal con una cursiva serif de imprenta clásica, estás obligando al espectador a experimentar la pantalla como materia viva.',
    ],
    quote: '«El diseño empieza cuando la plantilla termina.»',
  },
  {
    id: 'blog-2',
    date: '12/05/2023',
    title: 'La Forma Del Agua',
    readTime: '4 min lectura',
    category: 'Cine & Estética',
    excerpt: 'Análisis de la poética de los márgenes en el cine de Guillermo del Toro y la belleza de lo monstruoso.',
    paragraphs: [
      'En "La Forma del Agua", Guillermo del Toro subvierte la iconografía clásica del monstruo del pantano de la Universal. Lo abyecto no es lo desconocido, sino el aparato burocrático y militar de la Guerra Fría que intenta diseccionarlo.',
      'La paleta verde esmeralda y turquesa oxidado del film crea una atmósfera acuática donde la soledad encuentra empatía silenciosa. No hay palabras entre Elisa y la criatura; la comunicación se reduce a música, huevos duros y tacto.',
      'Trasladado al diseño digital: la verdadera emoción no radica en la perfección geométrica, sino en la vulnerabilidad de las marcas humanas sobre el soporte. El arte es el encuentro entre dos soledades que se reconocen.',
    ],
    quote: '«Incapaz de percibir tu forma, te encuentro a mi alrededor.»',
  },
  {
    id: 'blog-3',
    date: '12/05/2023',
    title: 'Aphex Twin',
    readTime: '5 min lectura',
    category: 'Música & Textura',
    excerpt: 'De Selected Ambient Works a Drukqs: cómo Richard D. James deconstruyó el ritmo para inventar un nuevo lenguaje sonoro.',
    paragraphs: [
      'Pocos artistas han alterado la arquitectura del sonido moderno como Richard D. James. Desde los sintetizadores analógicos modificados a mano en Cornualles hasta los micro-ritmos demenciales de 250 BPM procesados en PlayerPro.',
      'Aphex Twin encarna la esencia del brutalismo digital: tomar la tecnología industrial, forzarla más allá de sus límites operativos y extraer una belleza rota que desafía la comodidad del oyente.',
      'El icónico logo diseñado por Paul Nicholson y las portadas deformadas con la sonrisa maníaca de James no eran marketing: eran sabotajes visuales a la industria musical de los noventa. Una lección imborrable sobre identidad radical.',
    ],
    quote: '«Hago música para mí mismo. Si a alguien más le gusta, es una agradable casualidad.»',
  },
  {
    id: 'blog-4',
    date: '12/05/2023',
    title: 'Kanye West',
    readTime: '4 min lectura',
    category: 'Cultura & Arquitectura',
    excerpt: 'El minimalismo radical de Yeezus: cuando el diseño industrial de Le Corbusier invadió el hip hop.',
    paragraphs: [
      'Cuando Yeezus se lanzó en junio de 2013, la portada era la nada absoluta: una caja de CD transparente vacía con un pedazo de cinta adhesiva roja en el lateral. Sin folleto, sin créditos en portada, sin tipografía visible.',
      'Inspirado por una lámpara de Le Corbusier que Kanye estudió en el Louvre durante meses, el álbum despojó al género de toda producción opulenta, sustituyéndola por sintetizadores distorsionados inspirados en el acid house y percusiones industriales.',
      'Ese gesto redefinió la dirección del diseño y la moda de la siguiente década: la renuncia radical al adorno en favor del volumen arquitectónico, el hormigón visto y la crudeza del material.',
    ],
    quote: '«La simplificación no es la falta de pistas; es la presencia de la esencia.»',
  },
];
