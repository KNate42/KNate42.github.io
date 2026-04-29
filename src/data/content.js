export const content = {
  en: {
    nav: {
      links: [
        { label: 'Work',    href: '#work' },
        { label: 'Skills',  href: '#skills' },
        { label: 'Contact', href: '#contact' },
      ],
    },

    hero: {
      eyebrow: 'Open to internships & collaborations',
      // exactly two — Hero.jsx duplicates [0] as a third span for clean looping
      roles: ['Data Scientist', 'Web Developer'],
      location: 'NKU · Petropavlovsk, Kazakhstan',
      bio: 'I work at the intersection of data and the web — visualising insights, learning ML, building functional interfaces.',
      cta: 'Get in Touch',
      ctaSecondary: 'View GitHub',
    },

    stack: [
      'Python', 'Machine Learning', 'SQL', 'NumPy', 'Scikit-learn',
      'Pandas', 'HTML', 'CSS', 'JavaScript', 'React', 'MATLAB', 'Data Pipelines',
    ],

    work: {
      label: '01',
      title: 'Education & Work',
      quote: '"Learning by building."',
      items: [
        {
          date: '2025 — Present',
          role: 'Student',
          title: 'University of Arizona',
          body: 'Studying Data Science with a focus on machine learning, statistical modelling, and data visualisation. Building personal web projects alongside coursework to sharpen programming skills.',
          tags: ['Python', 'Machine Learning', 'Statistics'],
          href: null,
        },
        {
          date: 'Ongoing',
          role: 'Personal Projects',
          title: 'GitHub — KNate42',
          body: 'Open-source experiments and coursework projects covering data analysis, web interfaces, and automation scripts. Each project is a chance to try something new.',
          tags: ['HTML / CSS', 'JavaScript', 'Pandas'],
          href: 'https://github.com/KNate42',
        },
        {
          date: 'Ongoing',
          role: 'Research',
          title: 'Organoid Intelligence — Report',
          body: 'Writing a research report on organoid intelligence: the emerging field that uses lab-grown brain organoids as biological computing substrates. Covers current experimental results, ethical considerations, and long-term applications in neurocomputing.',
          tags: ['Neuroscience', 'Research', 'Writing'],
          href: null,
        },
      ],
    },

    skills: {
      label: '02',
      title: 'Technical Expertise',
      // categories render as 3 columns on desktop. add a 4th and the grid
      // in Skills.jsx will need to change (currently md:grid-cols-3).
      categories: [
        {
          name: 'Core Stack',
          items: [
            // `level` strings have to match a key in LEVEL_VALUES (Skills.jsx),
            // otherwise the bar falls back to 3 cells.
            { name: 'Python',                level: 'Junior'       },
            { name: 'HTML / CSS / JS',       level: 'Intermediate' },
            { name: 'SQL',                   level: 'Junior'       },
            { name: 'NumPy & Scikit-learn',  level: 'Learning'     },
          ],
        },
        {
          name: 'Data & Viz',
          items: [
            { name: 'Pandas',     level: 'Junior'   },
            { name: 'SM Studio',  level: 'Familiar' },
            { name: 'MATLAB',     level: 'Familiar' },
          ],
        },
        {
          name: 'Exploring Now',
          items: [
            { name: 'Data Pipelines', level: 'Learning' },
            { name: 'React',          level: 'Learning' },
            { name: 'Tailwind CSS',   level: 'Learning' },
          ],
        },
      ],
    },

    contact: {
      label: '03',
      heading: ['Got a project or', 'idea', 'to work on?'],
      sub: 'Open to internships, research collaborations, and interesting side projects. Just reach out.',
      links: [
        { label: 'anfinogentov@arizona.edu',           href: 'mailto:anfinogentov@arizona.edu',                  kind: 'email'    },
        { label: 'github.com/KNate42',                  href: 'https://github.com/KNate42',                       kind: 'github'   },
        { label: '@Ezekiel_XIII',                       href: 'https://t.me/Ezekiel_XIII',                        kind: 'telegram' },
        { label: 'linkedin.com/in/nikitaanfinogentov',  href: 'https://www.linkedin.com/in/nikitaanfinogentov',   kind: 'linkedin' },
      ],
    },

    footer: {
      copy: '© 2026 Nikita Anfinogentov',
      links: [
        { label: 'GitHub',   href: 'https://github.com/KNate42' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikitaanfinogentov' },
        { label: 'Email',    href: 'mailto:anfinogentov@arizona.edu' },
      ],
    },
  },

  ru: {
    nav: {
      links: [
        { label: 'Работы',   href: '#work' },
        { label: 'Навыки',   href: '#skills' },
        { label: 'Контакты', href: '#contact' },
      ],
    },

    hero: {
      eyebrow: 'Открыт к стажировкам и сотрудничеству',
      roles: ['Data Scientist', 'Веб-разработчик'],
      location: 'СКУ · Петропавловск, Казахстан',
      bio: 'Работаю на стыке данных и веба — визуализирую инсайты, изучаю ML, строю функциональные интерфейсы.',
      cta: 'Написать',
      ctaSecondary: 'GitHub',
    },

    stack: [
      'Python', 'Machine Learning', 'SQL', 'NumPy', 'Scikit-learn',
      'Pandas', 'HTML', 'CSS', 'JavaScript', 'React', 'MATLAB', 'Пайплайны',
    ],

    work: {
      label: '01',
      title: 'Образование и проекты',
      quote: '"Учусь, создавая."',
      items: [
        {
          date: '2025 — наст. время',
          role: 'Студент',
          title: 'Университет Аризоны',
          body: 'Изучаю Data Science с акцентом на машинное обучение, статистику и визуализацию данных. Параллельно с учёбой строю веб-проекты для закрепления навыков.',
          tags: ['Python', 'Machine Learning', 'Statistics'],
          href: null,
        },
        {
          date: 'В процессе',
          role: 'Личные проекты',
          title: 'GitHub — KNate42',
          body: 'Открытые эксперименты и учебные проекты: анализ данных, веб-интерфейсы, автоматизация. Каждый проект — возможность попробовать что-то новое.',
          tags: ['HTML / CSS', 'JavaScript', 'Pandas'],
          href: 'https://github.com/KNate42',
        },
        {
          date: 'В процессе',
          role: 'Исследование',
          title: 'Органоидный интеллект — Доклад',
          body: 'Пишу исследовательский доклад об органоидном интеллекте: развивающейся области, в которой выращенные в лаборатории мозговые органоиды используются как биологические вычислительные субстраты. Охватывает современные результаты экспериментов, этические вопросы и долгосрочные применения в нейровычислениях.',
          tags: ['Нейронауки', 'Исследование', 'Написание'],
          href: null,
        },
      ],
    },

    skills: {
      label: '02',
      title: 'Технические навыки',
      categories: [
        {
          name: 'Основной стек',
          items: [
            { name: 'Python',                 level: 'Джуниор' },
            { name: 'HTML / CSS / JS',        level: 'Средний' },
            { name: 'SQL',                    level: 'Джуниор' },
            { name: 'NumPy & Scikit-learn',   level: 'Изучаю'  },
          ],
        },
        {
          name: 'Данные и визуализация',
          items: [
            { name: 'Pandas',     level: 'Джуниор' },
            { name: 'SM Studio',  level: 'Знаком'  },
            { name: 'MATLAB',     level: 'Знаком'  },
          ],
        },
        {
          name: 'Изучаю сейчас',
          items: [
            { name: 'Пайплайны данных', level: 'Изучаю' },
            { name: 'React',            level: 'Изучаю' },
            { name: 'Tailwind CSS',     level: 'Изучаю' },
          ],
        },
      ],
    },

    contact: {
      label: '03',
      heading: ['Есть проект или', 'идея', 'для совместной работы?'],
      sub: 'Открыт для стажировок, исследовательских коллабораций и интересных сайд-проектов. Просто напишите.',
      links: [
        { label: 'anfinogentov@arizona.edu',           href: 'mailto:anfinogentov@arizona.edu',                  kind: 'email'    },
        { label: 'github.com/KNate42',                  href: 'https://github.com/KNate42',                       kind: 'github'   },
        { label: '@Ezekiel_XIII',                       href: 'https://t.me/Ezekiel_XIII',                        kind: 'telegram' },
        { label: 'linkedin.com/in/nikitaanfinogentov',  href: 'https://www.linkedin.com/in/nikitaanfinogentov',   kind: 'linkedin' },
      ],
    },

    footer: {
      copy: '© 2026 Никита Анфиногентов',
      links: [
        { label: 'GitHub',   href: 'https://github.com/KNate42' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikitaanfinogentov' },
        { label: 'Почта',    href: 'mailto:anfinogentov@arizona.edu' },
      ],
    },
  },
}
