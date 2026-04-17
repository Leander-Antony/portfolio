import { useMemo, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const EASE_OUT = [0.16, 1, 0.3, 1]
const CARD_EASE = [0.22, 1, 0.36, 1]

function WordsPullUp({ text, className = '', showAsterisk = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = useMemo(() => text.split(' '), [text])

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1
        const shouldDecorate = showAsterisk && isLastWord && word.endsWith('a')

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: index * 0.08, duration: 0.65, ease: EASE_OUT }}
            className="inline-block"
          >
            {shouldDecorate ? (
              <span className="relative inline-block">
                {word.slice(0, -1)}
                <span className="relative inline-block">
                  a
                  <span className="pointer-events-none absolute -right-[0.3em] top-[0.65em] text-[0.31em] leading-none">
                    *
                  </span>
                </span>
              </span>
            ) : (
              word
            )}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        )
      })}
    </span>
  )
}

function WordsPullUpMultiStyle({ segments, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = useMemo(
    () =>
      segments.flatMap((segment) =>
        segment.text.split(' ').map((word) => ({ word, className: segment.className })),
      ),
    [segments],
  )

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map((item, index) => (
        <motion.span
          key={`${item.word}-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: index * 0.08, duration: 0.65, ease: EASE_OUT }}
          className={`inline-block ${item.className ?? ''}`}
        >
          {item.word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}

function AnimatedLetter({ char, index, total, progress }) {
  const charProgress = index / total
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1])

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  )
}

function FeatureCard({ card, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  if (card.type === 'video') {
    return (
      <motion.article
        ref={ref}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: CARD_EASE }}
        className="relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[320px]"
      >
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <p className="absolute bottom-6 left-6 text-lg" style={{ color: '#E1E0CC' }}>
          Your creative canvas.
        </p>
      </motion.article>
    )
  }

  return (
    <motion.article
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: CARD_EASE }}
      className="flex min-h-[320px] flex-col rounded-2xl bg-[#212121] p-5 sm:p-6"
    >
      <img
        src={card.icon}
        alt=""
        className="h-10 w-10 rounded sm:h-12 sm:w-12"
      />
      <div className="mt-5 flex items-start justify-between">
        <h3 className="text-lg leading-tight sm:text-xl" style={{ color: '#E1E0CC' }}>
          {card.title}
        </h3>
        <span className="text-xs text-gray-500">{card.number}</span>
      </div>
      <ul className="mt-5 space-y-3">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="mt-[2px] h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm text-gray-400">{item}</span>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-primary/80 transition hover:text-primary"
      >
        Learn more
        <ArrowRight className="h-4 w-4 -rotate-45" />
      </a>
    </motion.article>
  )
}

function SectionHeader({ lineOne, lineTwo, className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl">
        <WordsPullUpMultiStyle segments={[{ text: lineOne, className: 'text-[#E1E0CC]' }]} />
      </p>
      <p className="mt-2 text-xl font-normal text-gray-500 sm:text-2xl md:text-3xl lg:text-4xl">
        <WordsPullUpMultiStyle segments={[{ text: lineTwo, className: 'text-gray-500' }]} />
      </p>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.article
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: CARD_EASE }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="flex min-h-[300px] flex-col overflow-hidden rounded-2xl bg-[#212121] shadow-none transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/30 sm:min-h-[340px]"
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-black/30">
        <img src={project.image} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base leading-tight sm:text-xl" style={{ color: '#E1E0CC' }}>
            {project.title}
          </h3>
          <span className="text-xs text-gray-500">{project.number}</span>
        </div>

        <p className="mt-3 max-w-[30ch] text-sm leading-[1.45] text-gray-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-primary/70"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-4 sm:pt-5">
          <a
            href="#"
            className="rounded-full border border-white/10 bg-black px-3 py-2 text-sm text-primary/80 transition hover:text-primary sm:px-4"
          >
            View Project
          </a>
          <a
            href="#"
            className="rounded-full border border-white/10 bg-black px-3 py-2 text-sm text-primary/80 transition hover:text-primary sm:px-4"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function BlogCard({ post, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.article
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: CARD_EASE }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="flex min-h-[220px] flex-col rounded-2xl bg-[#212121] p-4 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/30 sm:min-h-[260px] sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base leading-tight sm:text-xl" style={{ color: '#E1E0CC' }}>
          {post.title}
        </h3>
        <span className="text-xs text-gray-500">{post.date}</span>
      </div>

      <p className="mt-3 text-sm leading-[1.45] text-gray-400">{post.description}</p>

      <a
        href="#"
        className="group mt-auto inline-flex w-fit items-center text-sm text-primary/80 transition hover:text-primary"
      >
        <span className="relative inline-block">
          Read more
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary/80 transition-transform duration-300 group-hover:scale-x-100" />
        </span>
      </a>
    </motion.article>
  )
}

function SkillGroup({ group, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE_OUT }}
      className="rounded-2xl bg-[#101010] p-5 text-center sm:p-6"
    >
      <h3 className="text-sm uppercase tracking-[0.18em] text-primary">{group.title}</h3>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[#212121] px-4 py-2 text-sm text-primary/80"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function App() {
  const aboutParagraphRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: aboutParagraphRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const aboutBodyText =
    'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.'

  const navItems = [
    { label: 'Our story', href: '#story' },
    { label: 'Work', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Writing', href: '#writing' },
    { label: 'Contact', href: '#contact' },
  ]

  const featureCards = [
    { type: 'video' },
    {
      type: 'text',
      title: 'Project Storyboard.',
      number: '(01)',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
      items: [
        'Shape cinematic scenes with precision guides.',
        'Map rhythm, framing, and transitions in one flow.',
        'Keep every visual beat aligned to your intent.',
        'Export clear boards for collaborative production.',
      ],
    },
    {
      type: 'text',
      title: 'Smart Critiques.',
      number: '(02)',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
      items: [
        'Receive AI analysis tuned for visual narratives.',
        'Turn feedback into concise creative notes instantly.',
        'Sync critiques with your editing and writing tools.',
      ],
    },
    {
      type: 'text',
      title: 'Immersion Capsule.',
      number: '(03)',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
      items: [
        'Silence non-essential notifications while creating.',
        'Blend ambient soundscapes to hold creative focus.',
        'Sync sessions with your calendar and team schedule.',
      ],
    },
  ]

  const projectCards = [
    {
      title: 'Project Title',
      number: '(01)',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
      description: 'Short description for a portfolio project goes here.',
      tech: ['React', 'Motion', 'Tailwind'],
    },
    {
      title: 'Project Title',
      number: '(02)',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
      description: 'Short description for a portfolio project goes here.',
      tech: ['Vite', 'UI', 'Brand'],
    },
    {
      title: 'Project Title',
      number: '(03)',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
      description: 'Short description for a portfolio project goes here.',
      tech: ['Design', 'Code', 'Strategy'],
    },
    {
      title: 'Project Title',
      number: '(04)',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
      description: 'Short description for a portfolio project goes here.',
      tech: ['Motion', 'Art', 'Build'],
    },
    {
      title: 'Project Title',
      number: '(05)',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
      description: 'Short description for a portfolio project goes here.',
      tech: ['Ideas', 'Systems', 'Film'],
    },
    {
      title: 'Project Title',
      number: '(06)',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
      description: 'Short description for a portfolio project goes here.',
      tech: ['Studio', 'Craft', 'Flow'],
    },
  ]

  const skills = [
    { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL'] },
    { title: 'Data & ML', items: ['Pandas', 'PyTorch', 'TensorFlow', 'Scikit-learn'] },
    { title: 'Tools', items: ['Git', 'Docker', 'Figma', 'Postman'] },
    { title: 'Other', items: ['Design', 'Motion', 'Systems', 'Research'] },
  ]

  const blogPosts = [
    {
      title: 'Blog Title',
      date: 'Apr 2026',
      description: 'Short writing sample description goes here for the blog section.',
    },
    {
      title: 'Blog Title',
      date: 'Mar 2026',
      description: 'Short writing sample description goes here for the blog section.',
    },
    {
      title: 'Blog Title',
      date: 'Feb 2026',
      description: 'Short writing sample description goes here for the blog section.',
    },
    {
      title: 'Blog Title',
      date: 'Jan 2026',
      description: 'Short writing sample description goes here for the blog section.',
    },
  ]

  return (
    <div className="bg-black" style={{ color: '#E1E0CC' }}>
      <section className="relative h-screen p-4 md:p-6">
        <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <ul className="flex max-w-[calc(100vw-1rem)] items-center gap-3 overflow-x-auto rounded-b-2xl bg-black px-4 py-2 text-[10px] sm:gap-6 sm:text-xs md:gap-12 md:rounded-b-3xl md:px-8 md:text-sm lg:gap-14">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="transition-colors duration-200"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.color = '#E1E0CC'
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 md:p-10">
            <div className="grid grid-cols-12 items-end gap-4 sm:gap-6 md:gap-8">
              <div className="col-span-12 md:col-span-8">
                <WordsPullUp
                  text="Leander*"
                  className="text-[18vw] sm:text-[17vw] md:text-[15vw] lg:text-[13vw] xl:text-[12vw] 2xl:text-[11vw] leading-[0.9] tracking-[-0.02em] text-primary"
                />
              </div>

              <div className="col-span-12 pb-2 md:col-span-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
                  className="max-w-[28rem] text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base"
                >
                  Building machine learning systems, full-stack applications, and scalable tools with a focus on real-world impact.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
                  className="group mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-black transition-all hover:gap-3 sm:mt-5 sm:px-5 sm:text-base"
                >
                  Download Résumé
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="bg-black px-4 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl rounded-2xl bg-[#101010] px-6 py-10 text-center sm:px-10 md:px-16 md:py-16">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary sm:text-xs">Visual arts</p>

          <h2 className="mx-auto mt-6 max-w-3xl text-2xl font-normal leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl">
  <WordsPullUpMultiStyle
    segments={[
  { text: 'I am Leander,', className: 'font-normal' },
  { text: 'I build systems that think.', className: 'font-serif italic' },
  {
    text: 'Focused on machine learning, scalable applications, and tools that solve real-world problems.',
    className: 'font-normal',
  },
]}
  />
</h2>

          <p
            ref={aboutParagraphRef}
            className="mx-auto mt-8 max-w-4xl text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:mt-10 md:text-base"
          >
            {aboutBodyText.split('').map((char, index) => (
              <AnimatedLetter
                key={`${char}-${index}`}
                char={char}
                index={index}
                total={aboutBodyText.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-black px-4 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl">
              <WordsPullUpMultiStyle
                segments={[{ text: 'Studio-grade workflows for visionary creators.', className: '' }]}
              />
            </p>
            <p className="mt-2 text-xl font-normal text-gray-500 sm:text-2xl md:text-3xl lg:text-4xl">
              <WordsPullUpMultiStyle
                segments={[{ text: 'Built for pure vision. Powered by art.', className: '' }]}
              />
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">
            {featureCards.map((card, index) => (
              <FeatureCard key={`${card.type}-${index}`} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-black px-4 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            lineOne="Selected works and experiments."
            lineTwo="Built with precision and intent."
          />

          <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 lg:grid-cols-3">
            {projectCards.map((project, index) => (
              <ProjectCard key={`${project.title}-${project.number}`} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="bg-black px-4 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            lineOne="Tools, frameworks, and systems I use."
            lineTwo="Built for performance and scale."
          />

          <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((group, index) => (
              <SkillGroup key={group.title} group={group} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="writing" className="bg-black px-4 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            lineOne="Thoughts, breakdowns, and learnings."
            lineTwo="Exploring systems, code, and ideas."
          />

          <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <BlogCard key={`${post.title}-${post.date}`} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-black px-4 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="text-3xl font-normal leading-[0.95] sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: '#E1E0CC' }}
          >
            Let’s build something meaningful.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="mx-auto mt-4 max-w-xl text-sm text-gray-400 sm:text-base"
          >
            Placeholder contact copy for a thoughtful, cinematic portfolio introduction.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            className="mx-auto mt-8 space-y-4 text-left"
          >
            {[
              { type: 'text', placeholder: 'Name' },
              { type: 'email', placeholder: 'Email' },
            ].map((field, index) => (
              <motion.div
                key={field.placeholder}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (index + 1), ease: EASE_OUT }}
              >
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-[#E1E0CC] outline-none transition focus:border-primary"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
            >
              <textarea
                rows="5"
                placeholder="Message"
                className="w-full rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-[#E1E0CC] outline-none transition focus:border-primary"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
              className="pt-2"
            >
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
              >
                Join the lab
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </span>
              </button>
            </motion.div>
          </motion.form>
        </div>
      </section>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="border-t border-white/10 bg-black px-4 py-8 sm:px-6 md:px-8"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-gray-400 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[#E1E0CC]">Leander Antony J</p>
            {/* <p className="mt-1">© 2026 All rights reserved</p> */}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition-colors hover:text-[#E1E0CC]">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-[#E1E0CC]">
              LinkedIn
            </a>
            <a href="#" className="transition-colors hover:text-[#E1E0CC]">
              Email
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App
