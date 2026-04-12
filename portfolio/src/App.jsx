import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ]

  const projects = [
    {
      title: 'Project Title One',
      description: 'Description goes here for a futuristic web platform concept.',
      stack: ['React', 'Tailwind', 'API'],
    },
    {
      title: 'Project Title Two',
      description: 'Description goes here for a modern dashboard prototype.',
      stack: ['Vite', 'Framer', 'Node'],
    },
    {
      title: 'Project Title Three',
      description: 'Description goes here for an AI-assisted productivity app.',
      stack: ['TypeScript', 'UX', 'Cloud'],
    },
  ]

  const skills = {
    Languages: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    Tools: ['Git', 'Docker', 'VS Code', 'Postman'],
    ML: ['TensorFlow', 'PyTorch', 'Pandas', 'Scikit-learn'],
  }

  const blogPosts = [
    {
      title: 'Blog Title One',
      excerpt: 'Description goes here for a short technical insight post.',
    },
    {
      title: 'Blog Title Two',
      excerpt: 'Description goes here for a design and engineering article.',
    },
    {
      title: 'Blog Title Three',
      excerpt: 'Description goes here for an experimentation diary entry.',
    },
  ]

  const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E5E7EB]">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/10 bg-[#0B0F19]/80 shadow-lg shadow-black/20 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#hero" className="text-sm font-semibold tracking-[0.24em] text-[#E5E7EB]">
            YOUR NAME
          </a>
          <ul className="flex items-center gap-3 text-xs text-[#9CA3AF] sm:gap-4 sm:text-sm md:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors duration-300 hover:text-[#3B82F6]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section
          id="hero"
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 md:px-8"
        >
          <div className="hero-glow" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
          >
            <p className="mb-6 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-[#9CA3AF] backdrop-blur">
              MINIMAL DARK FUTURISTIC PORTFOLIO
            </p>
            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">Your Name</h1>
            <p className="mt-6 max-w-2xl text-base font-medium text-[#9CA3AF] md:text-lg">
              Placeholder tagline goes here for your role and what you build.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                href="#projects"
                className="rounded-xl border border-[#3B82F6]/50 bg-[#3B82F6]/20 px-6 py-3 text-sm font-semibold text-[#E5E7EB] shadow-lg shadow-[#3B82F6]/20 transition-colors hover:bg-[#3B82F6]/30"
              >
                View Projects
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                href="#contact"
                className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[#E5E7EB] backdrop-blur transition-colors hover:bg-white/10"
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="border-y border-white/5 bg-[#0E1320] px-4 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold md:text-4xl">Projects</h2>
            <p className="mt-4 max-w-2xl text-[#9CA3AF]">Description goes here for your featured work.</p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {projects.map((project) => (
                <motion.article
                  key={project.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="rounded-2xl border border-white/10 bg-[#111827]/80 p-6 shadow-lg shadow-black/20 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm text-[#9CA3AF]">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#E5E7EB]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href="#"
                      className="rounded-lg border border-[#3B82F6]/40 bg-[#3B82F6]/20 px-4 py-2 text-sm font-medium text-[#E5E7EB] transition-colors hover:bg-[#3B82F6]/30"
                    >
                      Demo
                    </a>
                    <a
                      href="#"
                      className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-[#E5E7EB] transition-colors hover:bg-white/10"
                    >
                      GitHub
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="skills" className="px-4 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold md:text-4xl">Skills</h2>
            <p className="mt-4 max-w-2xl text-[#9CA3AF]">Description goes here for your capabilities.</p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid gap-6 md:grid-cols-3"
            >
              {Object.entries(skills).map(([group, items]) => (
                <motion.div
                  key={group}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-[#111827]/70 p-6"
                >
                  <h3 className="text-lg font-semibold text-[#E5E7EB]">{group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-[#9CA3AF]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="about" className="bg-[#0E1320] px-4 py-20 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-3xl font-bold md:text-4xl">About</h2>
              <p className="mt-5 text-[#9CA3AF]">
                Description goes here for your background, interests, and career direction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-72 rounded-2xl border border-white/10 bg-gradient-to-br from-[#3B82F6]/20 via-transparent to-[#8B5CF6]/20"
            >
              <div className="flex h-full items-center justify-center rounded-2xl bg-[#111827]/60 text-sm text-[#9CA3AF] backdrop-blur-sm">
                Image Placeholder
              </div>
            </motion.div>
          </div>
        </section>

        <section id="blog" className="px-4 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold md:text-4xl">Blog</h2>
            <p className="mt-4 max-w-2xl text-[#9CA3AF]">Description goes here for recent writing.</p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {blogPosts.map((post) => (
                <motion.article
                  key={post.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="rounded-2xl border border-white/10 bg-[#111827]/75 p-5 shadow-lg shadow-black/20"
                >
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="mt-3 text-sm text-[#9CA3AF]">{post.excerpt}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/5 bg-[#0E1320] px-4 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold md:text-4xl">Contact</h2>
            <p className="mt-4 text-[#9CA3AF]">Description goes here for contact details.</p>

            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 space-y-4"
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40"
              />
              <textarea
                rows="5"
                placeholder="Message"
                className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                type="button"
                className="glow-button rounded-xl border border-[#8B5CF6]/45 bg-[#8B5CF6]/20 px-6 py-3 text-sm font-semibold text-[#E5E7EB]"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[#9CA3AF] md:flex-row">
          <p>Placeholder Name</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-[#3B82F6]">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-[#3B82F6]">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
