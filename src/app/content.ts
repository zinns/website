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
  summary: string;
  quote: string;
  author: string;
  context: string;
  source: string;
  expandLabel: string;
};

type TeamMember = {
  initials: string;
  name: string;
  role: string;
  note: string;
  avatar: 'signal' | 'orbit';
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
    closeLabel: string;
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
      email: 'help@zinns.io',
    },
    hero: {
      eyebrow: 'Creative technology lab',
      title: 'We build customized digital tools and help people increase their abilities.',
      description:
        'Zinns combines consulting, product thinking, education, and experimentation to turn practical ideas into useful software.',
      primaryCta: 'Start a conversation',
      secondaryCta: 'Explore the map',
      note: 'Explore active builds, mentoring paths, and the technical direction behind the studio.',
      metrics: [
        { value: '05', label: 'Active product and redesign tracks' },
        { value: '02', label: 'Private mentoring paths' },
        { value: '01', label: 'Small technical team' },
      ],
    },
    intro: {
      title: 'Small studio. Broad technical reach.',
      description:
        'The company direction is intentionally flexible: build software, teach useful skills, connect systems, and create content that helps people move faster.',
      items: [
        {
          title: 'Digital tools',
          description:
            'Custom web and mobile products shaped around real workflows, from internal trackers to public-facing sites and dashboards.',
        },
        {
          title: 'Education',
          description:
            'Private mentoring that starts from fundamentals, then moves into modern web or mobile delivery with real tooling habits.',
        },
        {
          title: 'Integrations',
          description:
            'APIs, automation paths, data views, and backend services that connect tools and reduce repeated manual work.',
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
      title: 'Private mentoring for web and mobile development.',
      description:
        'Both plans share a common engineering base and then split by platform. Mentoring is private, usually at least two 1-hour sessions per week, and adjusted to each person.',
      items: [
        {
          title: 'Web Development Mentoring',
          format: 'Web path',
          outcome:
            'From terminal and Git to production web apps with React, Next.js, TypeScript, testing, deployments, GitHub, and SCRUM habits.',
          focus: [
            'Terminal',
            'Git + GitHub',
            'HTML/CSS',
            'Tailwind + Bootstrap',
            'JavaScript',
            'React + Next.js',
            'TypeScript',
            'Testing + deployments',
            'SCRUM',
          ],
        },
        {
          title: 'Mobile Development Mentoring',
          format: 'Mobile path',
          outcome:
            'The same root roadmap, then mobile implementation with React Native, Expo, TypeScript, testing, releases, GitHub, and SCRUM delivery.',
          focus: [
            'Terminal',
            'Git + GitHub',
            'HTML/CSS',
            'JavaScript',
            'React Native',
            'Expo',
            'TypeScript',
            'Testing + deployments',
            'SCRUM',
          ],
        },
      ],
    },
    reviews: {
      eyebrow: 'Reviews',
      title: 'What people say after working with us.',
      description:
        'Real feedback from people who trusted us with mentoring, learning, and technical guidance.',
      closeLabel: 'Close review',
      items: [
        {
          summary: 'Personal rhythm, flexible schedules, and accessible learning.',
          quote:
            'Me gustaron mucho los cursos mientras estuve como alumna activa, me parecieron bastante completos, muy accesibles para personas que buscan aprender, cambiar de área o profundizar en conocimientos técnicos. Lo recomendaría para aquellos que no han encontrado una opción que sea flexible en sus horarios o en temas de costos ya que también me parece muy accesible esta oportunidad.',
          author: 'Abril Muñoz',
          context: 'Web Development mentoring student',
          source: 'Student review, name use authorized',
          expandLabel: 'Read full review',
        },
        {
          summary: 'Complex topics became easier to break down and practice.',
          quote:
            'Me gusta mucho la capacidad de poder desarticular problemas complejos y hacerlos en partes más fáciles.',
          author: 'Student response',
          context: 'Web and Mobile Development mentoring student',
          source: 'Student review, anonymous use authorized',
          expandLabel: 'Read full review',
        },
        {
          summary: 'Patient support helped a beginner start understanding programming.',
          quote:
            'Las clases, el acompañamiento, el trato, la ayuda fue muy buena no me puedo quejar yo no sabía nada de esto y aprendí un poco por cuestiones ajenas al curso decidí pausarlas pero estoy satisfecho con lo aprendido y lo acordado.',
          author: 'Brandon',
          context: 'Web Development mentoring student',
          source: 'Student review, name use authorized',
          expandLabel: 'Read full review',
        },
      ],
    },
    company: {
      eyebrow: 'Company brief',
      title: 'A practical lab for useful digital work.',
      description:
        'Zinns works across custom software, mentoring, product thinking, and technical experimentation. The company stays small on purpose so each project can keep clear direction and careful delivery.',
      timeline: [
        {
          year: 'Build',
          title: 'Digital products',
          description:
            'Designing and shipping focused web and mobile tools for real workflows, public sites, and operational tracking.',
        },
        {
          year: 'Teach',
          title: 'Private mentoring',
          description:
            'Helping people strengthen fundamentals, learn modern frameworks, and practice delivery habits with guided sessions.',
        },
        {
          year: 'Extend',
          title: 'Systems and automation',
          description:
            'Connecting APIs, dashboards, data views, and backend services when projects need more than a static website.',
        },
      ],
    },
    team: {
      eyebrow: 'People',
      title: 'Roles behind the work.',
      description:
        'A small technical team shaping product direction, architecture, implementation, and learning paths.',
      items: [
        {
          initials: 'EZ',
          name: 'Edgar Zea',
          role: 'Co-Founder / Tech Lead',
          note: 'Product direction, architecture, mentoring, and technical delivery across web and mobile projects.',
          avatar: 'signal',
        },
        {
          initials: 'AS',
          name: 'Andrés Soto',
          role: 'Co-Founder / Engineering Team',
          note: 'Engineering execution, systems thinking, implementation support, and product iteration.',
          avatar: 'orbit',
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
      email: 'help@zinns.io',
    },
    hero: {
      eyebrow: 'Laboratorio creativo de tecnología',
      title: 'Creamos herramientas digitales para crecer.',
      description:
        'Zinns combina consultoría, pensamiento de producto, educación y experimentación para convertir ideas prácticas en software útil.',
      primaryCta: 'Iniciar conversación',
      secondaryCta: 'Explorar el mapa',
      note: 'Explora proyectos activos, rutas de mentoría y la dirección técnica del estudio.',
      metrics: [
        { value: '05', label: 'Líneas activas de producto y rediseño' },
        { value: '02', label: 'Rutas de mentoría privada' },
        { value: '01', label: 'Equipo técnico pequeño' },
      ],
    },
    intro: {
      title: 'Estudio pequeño. Alcance técnico amplio.',
      description:
        'La dirección de la compañía es flexible a propósito: construir software, enseñar habilidades útiles, conectar sistemas y crear contenido que ayude a avanzar más rápido.',
      items: [
        {
          title: 'Herramientas digitales',
          description:
            'Productos web y móviles personalizados alrededor de flujos reales: trackers internos, sitios públicos y dashboards.',
        },
        {
          title: 'Educación',
          description:
            'Mentoría privada que empieza con fundamentos y avanza hacia entrega web o mobile con herramientas reales.',
        },
        {
          title: 'Integraciones',
          description:
            'APIs, automatización, vistas de datos y servicios backend para conectar herramientas y reducir trabajo repetido.',
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
      title: 'Mentoría privada para desarrollo web y mobile.',
      description:
        'Ambos planes comparten una base de ingeniería y luego se separan por plataforma. La mentoría es privada, normalmente al menos dos sesiones de 1 hora por semana, y se ajusta a cada persona.',
      items: [
        {
          title: 'Mentoría en Desarrollo Web',
          format: 'Ruta web',
          outcome:
            'Desde terminal y Git hasta apps web en producción con React, Next.js, TypeScript, testing, deployments, GitHub y hábitos SCRUM.',
          focus: [
            'Terminal',
            'Git + GitHub',
            'HTML/CSS',
            'Tailwind + Bootstrap',
            'JavaScript',
            'React + Next.js',
            'TypeScript',
            'Testing + deployments',
            'SCRUM',
          ],
        },
        {
          title: 'Mentoría en Desarrollo Mobile',
          format: 'Ruta mobile',
          outcome:
            'La misma ruta base, después implementación mobile con React Native, Expo, TypeScript, testing, releases, GitHub y entrega SCRUM.',
          focus: [
            'Terminal',
            'Git + GitHub',
            'HTML/CSS',
            'JavaScript',
            'React Native',
            'Expo',
            'TypeScript',
            'Testing + deployments',
            'SCRUM',
          ],
        },
      ],
    },
    reviews: {
      eyebrow: 'Reseñas',
      title: 'Lo que dicen quienes trabajan con nosotros.',
      description:
        'Feedback real de personas que confiaron en nosotros para mentoría, aprendizaje y guía técnica.',
      closeLabel: 'Cerrar reseña',
      items: [
        {
          summary: 'Ritmo personal, horarios flexibles y aprendizaje accesible.',
          quote:
            'Me gustaron mucho los cursos mientras estuve como alumna activa, me parecieron bastante completos, muy accesibles para personas que buscan aprender, cambiar de área o profundizar en conocimientos técnicos. Lo recomendaría para aquellos que no han encontrado una opción que sea flexible en sus horarios o en temas de costos ya que también me parece muy accesible esta oportunidad.',
          author: 'Abril Muñoz',
          context: 'Estudiante de mentoría en Desarrollo Web',
          source: 'Reseña de estudiante, uso de nombre autorizado',
          expandLabel: 'Leer reseña completa',
        },
        {
          summary: 'Los temas complejos se volvieron más fáciles de dividir y practicar.',
          quote:
            'Me gusta mucho la capacidad de poder desarticular problemas complejos y hacerlos en partes más fáciles.',
          author: 'Respuesta de estudiante',
          context: 'Estudiante de mentoría en Desarrollo Web y Mobile',
          source: 'Reseña de estudiante, uso anónimo autorizado',
          expandLabel: 'Leer reseña completa',
        },
        {
          summary: 'Acompañamiento paciente para empezar a entender programación.',
          quote:
            'Las clases, el acompañamiento, el trato, la ayuda fue muy buena no me puedo quejar yo no sabía nada de esto y aprendí un poco por cuestiones ajenas al curso decidí pausarlas pero estoy satisfecho con lo aprendido y lo acordado.',
          author: 'Brandon',
          context: 'Estudiante de mentoría en Desarrollo Web',
          source: 'Reseña de estudiante, uso de nombre autorizado',
          expandLabel: 'Leer reseña completa',
        },
      ],
    },
    company: {
      eyebrow: 'Resumen de compañía',
      title: 'Un laboratorio práctico para trabajo digital útil.',
      description:
        'Zinns trabaja entre software personalizado, mentoría, pensamiento de producto y experimentación técnica. La compañía se mantiene pequeña para conservar dirección clara y entrega cuidadosa.',
      timeline: [
        {
          year: 'Construir',
          title: 'Productos digitales',
          description:
            'Diseñar y entregar herramientas web y mobile para flujos reales, sitios públicos y seguimiento operativo.',
        },
        {
          year: 'Enseñar',
          title: 'Mentoría privada',
          description:
            'Ayudar a fortalecer fundamentos, aprender frameworks modernos y practicar hábitos de entrega con sesiones guiadas.',
        },
        {
          year: 'Extender',
          title: 'Sistemas y automatización',
          description:
            'Conectar APIs, dashboards, vistas de datos y servicios backend cuando un proyecto necesita más que un sitio estático.',
        },
      ],
    },
    team: {
      eyebrow: 'Personas',
      title: 'Roles detrás del trabajo.',
      description:
        'Un equipo técnico pequeño que define producto, arquitectura, implementación y rutas de aprendizaje.',
      items: [
        {
          initials: 'EZ',
          name: 'Edgar Zea',
          role: 'Co-Founder / Tech Lead',
          note: 'Dirección de producto, arquitectura, mentoría y entrega técnica en proyectos web y mobile.',
          avatar: 'signal',
        },
        {
          initials: 'AS',
          name: 'Andrés Soto',
          role: 'Co-Founder / Engineering Team',
          note: 'Ejecución de ingeniería, pensamiento de sistemas, soporte de implementación e iteración de producto.',
          avatar: 'orbit',
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
