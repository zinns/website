export type Locale = 'en' | 'es';

type Project = {
  status: string;
  title: string;
  summary: string;
  tags: string[];
};

type EducationPlan = {
  title: string;
  format: string;
  outcome: string;
  focus: string[];
};

type Review = {
  quote: string;
  author: string;
  context: string;
};

type TeamMember = {
  initials: string;
  name: string;
  role: string;
  note: string;
};

type Capability = {
  title: string;
  description: string;
};

type StackGroup = {
  title: string;
  items: string[];
};

type SiteCopy = {
  nav: {
    work: string;
    education: string;
    company: string;
    contact: string;
    language: string;
  };
  common: {
    placeholder: string;
    email: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
    metrics: Array<{ value: string; label: string }>;
  };
  intro: {
    title: string;
    description: string;
    items: Capability[];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    items: Project[];
  };
  education: {
    eyebrow: string;
    title: string;
    description: string;
    items: EducationPlan[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    description: string;
    items: Review[];
  };
  company: {
    eyebrow: string;
    title: string;
    description: string;
    timeline: Array<{ year: string; title: string; description: string }>;
  };
  team: {
    eyebrow: string;
    title: string;
    description: string;
    items: TeamMember[];
  };
  stack: {
    eyebrow: string;
    title: string;
    description: string;
    groups: StackGroup[];
  };
  next: {
    eyebrow: string;
    title: string;
    description: string;
    items: Capability[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    direct: string;
  };
  footer: {
    tagline: string;
  };
};

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    nav: {
      work: 'Work',
      education: 'Education',
      company: 'Company',
      contact: 'Contact',
      language: 'Language',
    },
    common: {
      placeholder: 'Placeholder content',
      email: 'help@zinns.io',
    },
    hero: {
      eyebrow: 'Founder-led creative technology lab',
      title: 'We build customized digital tools and help people increase their abilities.',
      description:
        'Zinns combines consulting, product thinking, education, and experimentation to turn practical ideas into useful software.',
      primaryCta: 'Start a conversation',
      secondaryCta: 'Explore the map',
      note: 'This first version includes active project summaries, with reviews and team information still labeled as placeholders until approved.',
      metrics: [
        { value: '01', label: 'Public website first' },
        { value: '02', label: 'Projects and education next' },
        { value: '03', label: 'Automations after the base is stable' },
      ],
    },
    intro: {
      title: 'A small studio shape for a broad technical practice.',
      description:
        'The company direction is intentionally flexible: build software, teach useful skills, connect systems, and create content that helps people move faster.',
      items: [
        {
          title: 'Digital tools',
          description: 'Custom web and mobile products shaped around real business workflows.',
        },
        {
          title: 'Education',
          description:
            'Focused mentoring for people who want stronger web and mobile development skills.',
        },
        {
          title: 'Integrations',
          description:
            'Automation, APIs, data work, and technical systems that reduce manual effort.',
        },
      ],
    },
    projects: {
      eyebrow: 'Active project map',
      title: 'Current work grounded in real builds.',
      description:
        'A look at active products and redesigns across fitness, interiors, creator tools, science education, and household tracking.',
      items: [
        {
          status: 'In progress',
          title: 'Fitness progress tracker',
          summary:
            'Mobile app for planning gym routines, tracking training progress, and giving users a clearer view of consistency over time.',
          tags: ['Mobile app', 'Fitness', 'Progress tracking'],
        },
        {
          status: 'In progress',
          title: 'Interior materials website redesign',
          summary:
            'Website redesign for a home-interior materials business focused on wood flooring, sheets, carpets, and clearer product and service presentation.',
          tags: ['Website redesign', 'Home interiors', 'Product catalog'],
        },
        {
          status: 'In progress',
          title: 'Beginner creator analytics tool',
          summary:
            'App concept for beginner content creators to track publishing activity, audience growth, and channel performance without heavyweight analytics tooling.',
          tags: ['Analytics', 'Creator tools', 'Dashboard'],
        },
        {
          status: 'In progress',
          title: 'Science outreach page redesign',
          summary:
            'Social media and page redesign for a physics and astronomy education initiative, improving how educational posts and community identity are presented.',
          tags: ['Redesign', 'Science education', 'Content system'],
        },
        {
          status: 'In progress',
          title: 'Supermarket purchase tracker',
          summary:
            'Tool for tracking supermarket purchases so people can understand what they buy, repeat common lists, and spot household spending patterns.',
          tags: ['Mobile tool', 'Household tracking', 'Personal data'],
        },
      ],
    },
    education: {
      eyebrow: 'Education plans',
      title: 'Mentoring for practical software growth.',
      description:
        'The first education offer is focused 1:1 mentoring. Courses and workshops can be added once the learning catalog is defined.',
      items: [
        {
          title: '1:1 Web Development Mentoring',
          format: 'Personal sessions',
          outcome: 'Build stronger fundamentals and ship better web interfaces.',
          focus: ['HTML/CSS', 'React', 'Next.js', 'TypeScript', 'Product delivery'],
        },
        {
          title: '1:1 Mobile Development Mentoring',
          format: 'Personal sessions',
          outcome: 'Improve mobile app structure, implementation habits, and delivery confidence.',
          focus: ['React Native', 'Expo', 'Navigation', 'State', 'Release basics'],
        },
      ],
    },
    reviews: {
      eyebrow: 'Reviews',
      title: 'Customer trust will be added from real feedback.',
      description:
        'These reviews are placeholders so the layout is clear while avoiding fake testimonials.',
      items: [
        {
          quote:
            'Placeholder review. Replace this with real customer feedback before publishing testimonial claims.',
          author: 'Placeholder Customer 01',
          context: 'Placeholder company or role',
        },
        {
          quote:
            'Placeholder review. This area is reserved for specific outcomes, context, and permission-approved quotes.',
          author: 'Placeholder Customer 02',
          context: 'Placeholder company or role',
        },
      ],
    },
    company: {
      eyebrow: 'Company brief',
      title: 'A founder-led company with creative lab energy.',
      description:
        'Zinns is being rebuilt as a small but capable company site: clear enough for consulting, broad enough for creative technical work, and honest about what is still forming.',
      timeline: [
        {
          year: 'Now',
          title: 'Migration and foundation',
          description: 'Modernizing the site, workflow, and release base before expanding content.',
        },
        {
          year: 'Next',
          title: 'Projects and education',
          description: 'Adding real project case studies and mentoring paths.',
        },
        {
          year: 'Later',
          title: 'Automations and dashboard',
          description:
            'Bringing back webhooks, authenticated areas, and internal automation tools.',
        },
      ],
    },
    team: {
      eyebrow: 'People',
      title: 'The real team content will replace these neutral placeholders.',
      description:
        'Use this area for founder context, collaborators, workers, teachers, or project partners.',
      items: [
        {
          initials: 'ZF',
          name: 'Placeholder Founder',
          role: 'Founder / Builder',
          note: 'Strategy, software, mentoring, and creative technical direction.',
        },
        {
          initials: 'P1',
          name: 'Placeholder Worker 01',
          role: 'Collaborator',
          note: 'Reserved for a real profile, avatar, and specialty.',
        },
        {
          initials: 'P2',
          name: 'Placeholder Worker 02',
          role: 'Collaborator',
          note: 'Reserved for a real profile, avatar, and specialty.',
        },
      ],
    },
    stack: {
      eyebrow: 'Common stack',
      title: 'Tools chosen for shipping useful digital systems.',
      description:
        'The stack should stay practical and evolve by project, but these are the common lanes.',
      groups: [
        { title: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
        { title: 'Backend', items: ['Node.js', 'Python', 'APIs', 'PostgreSQL'] },
        { title: 'Delivery', items: ['Vercel', 'GitHub Actions', 'Testing', 'Release automation'] },
      ],
    },
    next: {
      eyebrow: 'Next integrations',
      title: 'The lab side has room to grow.',
      description:
        'Future capabilities can expand around technical depth without making the first site too large.',
      items: [
        {
          title: 'Python automations',
          description:
            'Separate backend services for webhooks, scheduled work, and operational flows.',
        },
        {
          title: 'Data science',
          description: 'Data cleaning, lightweight analysis, dashboards, and decision support.',
        },
        {
          title: 'Cybersecurity',
          description: 'Security-minded reviews, hardening, monitoring, and education content.',
        },
        {
          title: 'Content creation',
          description:
            'Technical writing, educational material, courses, and product storytelling.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us what you want to build or learn.',
      description:
        'Use the form for project, mentoring, or collaboration requests. You can also write directly to help@zinns.io.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send message',
      sending: 'Sending...',
      success: 'Message sent. We will reply by email.',
      error:
        'The message could not be sent. Email help@zinns.io directly or check the contact email configuration.',
      direct: 'Direct email',
    },
    footer: {
      tagline: 'Creative technology with human warmth.',
    },
  },
  es: {
    nav: {
      work: 'Trabajo',
      education: 'Educación',
      company: 'Compañía',
      contact: 'Contacto',
      language: 'Idioma',
    },
    common: {
      placeholder: 'Contenido temporal',
      email: 'help@zinns.io',
    },
    hero: {
      eyebrow: 'Laboratorio creativo de tecnología liderado por su fundador',
      title:
        'Construimos herramientas digitales personalizadas y ayudamos a las personas a aumentar sus habilidades.',
      description:
        'Zinns combina consultoría, pensamiento de producto, educación y experimentación para convertir ideas prácticas en software útil.',
      primaryCta: 'Iniciar conversación',
      secondaryCta: 'Explorar el mapa',
      note: 'Esta primera versión incluye resúmenes de proyectos activos, con reseñas e información del equipo aún marcadas como contenido temporal hasta ser aprobadas.',
      metrics: [
        { value: '01', label: 'Primero el sitio público' },
        { value: '02', label: 'Después proyectos y educación' },
        { value: '03', label: 'Automatizaciones cuando la base sea estable' },
      ],
    },
    intro: {
      title: 'Una estructura pequeña para una práctica técnica amplia.',
      description:
        'La dirección de la compañía es flexible a propósito: construir software, enseñar habilidades útiles, conectar sistemas y crear contenido que ayude a avanzar más rápido.',
      items: [
        {
          title: 'Herramientas digitales',
          description:
            'Productos web y móviles personalizados alrededor de flujos reales de negocio.',
        },
        {
          title: 'Educación',
          description:
            'Mentoría enfocada para personas que quieren fortalecer sus habilidades en desarrollo web y móvil.',
        },
        {
          title: 'Integraciones',
          description:
            'Automatización, APIs, datos y sistemas técnicos que reducen trabajo manual.',
        },
      ],
    },
    projects: {
      eyebrow: 'Mapa de proyectos activos',
      title: 'Trabajo actual basado en proyectos reales.',
      description:
        'Una vista de productos y rediseños activos en fitness, interiores, herramientas para creadores, educación científica y seguimiento del hogar.',
      items: [
        {
          status: 'En progreso',
          title: 'Tracker de progreso fitness',
          summary:
            'App móvil para planear rutinas de gimnasio, registrar avances de entrenamiento y dar una vista clara de la constancia en el tiempo.',
          tags: ['App móvil', 'Fitness', 'Seguimiento de progreso'],
        },
        {
          status: 'En progreso',
          title: 'Rediseño web para materiales de interiores',
          summary:
            'Rediseño de sitio para un negocio de materiales de interiores enfocado en pisos de madera, láminas, alfombras y presentación más clara de productos y servicios.',
          tags: ['Rediseño web', 'Interiores', 'Catálogo de productos'],
        },
        {
          status: 'En progreso',
          title: 'Herramienta de analítica para creadores principiantes',
          summary:
            'Concepto de app para que creadores de contenido principiantes registren actividad de publicación, crecimiento de audiencia y rendimiento por canal sin herramientas pesadas.',
          tags: ['Analítica', 'Herramientas para creadores', 'Dashboard'],
        },
        {
          status: 'En progreso',
          title: 'Rediseño para divulgación científica',
          summary:
            'Rediseño de página y red social para una iniciativa de física y astronomía, mejorando la presentación de publicaciones educativas e identidad de comunidad.',
          tags: ['Rediseño', 'Educación científica', 'Sistema de contenido'],
        },
        {
          status: 'En progreso',
          title: 'Tracker de compras de supermercado',
          summary:
            'Herramienta para registrar compras de supermercado, repetir listas comunes y detectar patrones de consumo del hogar.',
          tags: ['App móvil', 'Seguimiento del hogar', 'Datos personales'],
        },
      ],
    },
    education: {
      eyebrow: 'Planes de educación',
      title: 'Mentoría para crecimiento práctico en software.',
      description:
        'La primera oferta educativa es mentoría 1:1. Cursos y talleres pueden agregarse cuando el catálogo esté definido.',
      items: [
        {
          title: 'Mentoría 1:1 en Desarrollo Web',
          format: 'Sesiones personales',
          outcome: 'Fortalecer fundamentos y construir mejores interfaces web.',
          focus: ['HTML/CSS', 'React', 'Next.js', 'TypeScript', 'Entrega de producto'],
        },
        {
          title: 'Mentoría 1:1 en Desarrollo Mobile',
          format: 'Sesiones personales',
          outcome:
            'Mejorar estructura de apps móviles, hábitos de implementación y confianza de entrega.',
          focus: ['React Native', 'Expo', 'Navegación', 'Estado', 'Bases de release'],
        },
      ],
    },
    reviews: {
      eyebrow: 'Reseñas',
      title: 'La confianza de clientes se agregará con feedback real.',
      description:
        'Estas reseñas son temporales para mostrar el layout sin publicar testimonios falsos.',
      items: [
        {
          quote:
            'Reseña temporal. Reemplazar con feedback real de clientes antes de publicar afirmaciones testimoniales.',
          author: 'Placeholder Customer 01',
          context: 'Compañía o rol temporal',
        },
        {
          quote:
            'Reseña temporal. Este espacio queda reservado para resultados específicos, contexto y citas aprobadas.',
          author: 'Placeholder Customer 02',
          context: 'Compañía o rol temporal',
        },
      ],
    },
    company: {
      eyebrow: 'Resumen de compañía',
      title: 'Una compañía liderada por su fundador con energía de laboratorio creativo.',
      description:
        'Zinns se está reconstruyendo como un sitio pequeño pero capaz: claro para consultoría, amplio para trabajo técnico creativo y honesto sobre lo que sigue tomando forma.',
      timeline: [
        {
          year: 'Ahora',
          title: 'Migración y base',
          description:
            'Modernizar el sitio, el flujo de trabajo y la base de releases antes de crecer.',
        },
        {
          year: 'Después',
          title: 'Proyectos y educación',
          description: 'Agregar casos reales de proyectos y rutas de mentoría.',
        },
        {
          year: 'Más tarde',
          title: 'Automatizaciones y dashboard',
          description:
            'Traer de vuelta webhooks, áreas autenticadas y herramientas internas de automatización.',
        },
      ],
    },
    team: {
      eyebrow: 'Personas',
      title: 'El contenido real del equipo reemplazará estos placeholders neutrales.',
      description:
        'Usa esta área para contexto del fundador, colaboradores, trabajadores, profesores o partners de proyecto.',
      items: [
        {
          initials: 'ZF',
          name: 'Placeholder Founder',
          role: 'Founder / Builder',
          note: 'Estrategia, software, mentoría y dirección técnica creativa.',
        },
        {
          initials: 'P1',
          name: 'Placeholder Worker 01',
          role: 'Colaborador',
          note: 'Reservado para un perfil real, avatar y especialidad.',
        },
        {
          initials: 'P2',
          name: 'Placeholder Worker 02',
          role: 'Colaborador',
          note: 'Reservado para un perfil real, avatar y especialidad.',
        },
      ],
    },
    stack: {
      eyebrow: 'Stack común',
      title: 'Herramientas elegidas para construir sistemas digitales útiles.',
      description:
        'El stack debe mantenerse práctico y evolucionar por proyecto, pero estas son las líneas comunes.',
      groups: [
        { title: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
        { title: 'Backend', items: ['Node.js', 'Python', 'APIs', 'PostgreSQL'] },
        { title: 'Entrega', items: ['Vercel', 'GitHub Actions', 'Testing', 'Release automation'] },
      ],
    },
    next: {
      eyebrow: 'Próximas integraciones',
      title: 'El lado laboratorio tiene espacio para crecer.',
      description:
        'Las capacidades futuras pueden expandirse con profundidad técnica sin hacer demasiado grande la primera versión.',
      items: [
        {
          title: 'Automatizaciones en Python',
          description:
            'Servicios backend separados para webhooks, tareas programadas y flujos operativos.',
        },
        {
          title: 'Data science',
          description: 'Limpieza de datos, análisis ligero, dashboards y apoyo a decisiones.',
        },
        {
          title: 'Ciberseguridad',
          description:
            'Revisiones, hardening, monitoreo y contenido educativo con enfoque de seguridad.',
        },
        {
          title: 'Creación de contenido',
          description:
            'Escritura técnica, material educativo, cursos y narrativa alrededor de productos.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntanos qué quieres construir o aprender.',
      description:
        'Usa el formulario para proyectos, mentorías o colaboraciones. También puedes escribir directamente a help@zinns.io.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      submit: 'Enviar mensaje',
      sending: 'Enviando...',
      success: 'Mensaje enviado. Responderemos por email.',
      error:
        'No se pudo enviar el mensaje. Escribe directamente a help@zinns.io o revisa la configuración de email.',
      direct: 'Email directo',
    },
    footer: {
      tagline: 'Tecnología creativa con calidez humana.',
    },
  },
};
