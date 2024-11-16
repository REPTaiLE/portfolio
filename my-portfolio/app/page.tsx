'use client'
import React, { ReactNode } from "react";
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Server, Database, Workflow, Cpu, FileJson, ChevronDown, ExternalLink, Globe, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import dynamic from 'next/dynamic'
import { useInView as useInViewIntersectionObserver } from 'react-intersection-observer';
import Profile from './profile.png';

interface Translations {
    home: string;
    skills: string;
    projects: string;
    contact: string;
    viewProjects: string;
    contactMe: string;
    skillsTitle: string;
    projectsTitle: string;
    contactTitle: string;
    openToOpportunities: string;
    reachOut: string;
    allRightsReserved: string;
    resume: string;
    switchtoSpanish: string;
    cambiarAIngles: string;
    about: string;
    aboutTitle: string;
    aboutText1: string;
    aboutText2: string;
    skillsDescription: string;
    backendDevelopment: string;
    automationWorkflows: string;
    databaseManagement: string;
    apiDevelopment: string;
    viewProject: string;
    projectAutomatedWorkflow: {
      name: string;
      description: string;
    },
    projectDataProcessing: {
      name: string;
      description: string;
    },
    projectRestfulAPI: {
      name: string;
      description: string;
    }
}

interface TranslationsByLanguage {
  en: Translations;
  es: Translations;
}

const translations: TranslationsByLanguage = {
  en: {
    home: "Home",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    skillsTitle: "Skills & Expertise",
    projectsTitle: "Featured Projects",
    contactTitle: "Get in Touch",
    openToOpportunities: "I'm always open to new opportunities and collaborations.",
    reachOut: "Feel free to reach out if you'd like to work together!",
    allRightsReserved: "All rights reserved.",
    resume: "Resume",
    switchtoSpanish: "Switch to Spanish",
    cambiarAIngles: "Cambiar a Inglés",
    about: "About",
    aboutTitle: "About",
    aboutText1: "I'm a passionate Backend Developer with a focus on automation workflows and database management. With extensive experience in Python, JavaScript, MySQL and n8n, I specialize in creating efficient, scalable, and robust automated solutions.",
    aboutText2: "My expertise lies in developing automation workflows using tools like n8n and optimizing database performance. I'm dedicated to streamlining processes and enhancing productivity through innovative backend solutions.",
    skillsDescription: "Specializing in backend development and automation, I create efficient and scalable solutions to streamline workflows and enhance productivity.",
    backendDevelopment: "Backend Development",
    automationWorkflows: "Automation Workflows",
    databaseManagement: "Database Management",
    apiDevelopment: "API Development",
    viewProject: "View Project",
    projectAutomatedWorkflow: {
      name: "Automated Workflow System",
      description: "Developed a comprehensive automation system using n8n and Python"
    },
    projectDataProcessing: {
      name: "Data Processing Pipeline",
      description: "Built a scalable data processing pipeline using Python and PostgreSQL"
    },
    projectRestfulAPI: {
      name: "RESTful API Service",
      description: "Designed and implemented a RESTful API service for a client management system"
    }
  },
  es: {
    home: "Inicio",
    skills: "Habilidades",
    projects: "Proyectos",
    contact: "Contacto",
    viewProjects: "Ver Proyectos",
    contactMe: "Contáctame",
    skillsTitle: "Habilidades y Experiencia",
    projectsTitle: "Proyectos Destacados",
    contactTitle: "Ponte en Contacto",
    openToOpportunities: "Siempre estoy abierto a nuevas oportunidades y colaboraciones.",
    reachOut: "¡No dudes en contactarme si quieres trabajar juntos!",
    allRightsReserved: "Todos los derechos reservados.",
    resume: "Currículum",
    switchtoSpanish: "Cambiar a Español",
    cambiarAIngles: "Cambiar a Inglés",
    about: "Sobre mí",
    aboutTitle: "Sobre mí",
    aboutText1: "Soy un Desarrollador Backend apasionado, enfocado en flujos de trabajo de automatización y gestión de bases de datos. Con amplia experiencia en Python, JavaScript, MySQL y n8n, me especializo en crear soluciones eficientes, escalables y robustas.",
    aboutText2: "Mi experiencia se centra en desarrollar flujos de trabajo de automatización utilizando herramientas como n8n y optimizar el rendimiento de bases de datos. Estoy dedicado a agilizar procesos y mejorar la productividad a través de soluciones backend innovadoras.",
    skillsDescription: "Especializado en desarrollo backend y automatización, creo soluciones eficientes y escalables para optimizar flujos de trabajo y mejorar la productividad.",
    backendDevelopment: "Desarrollo Backend",
    automationWorkflows: "Flujos de Trabajo de Automatización",
    databaseManagement: "Gestión de Bases de Datos",
    apiDevelopment: "Desarrollo de APIs",
    viewProject: "Ver Proyecto",
    projectAutomatedWorkflow: {
      name: "Sistema de Flujo de Trabajo Automatizado",
      description: "Desarrollé un sistema integral de automatización utilizando n8n y Python"
    },
    projectDataProcessing: {
      name: "Pipeline de Procesamiento de Datos",
      description: "Construí un pipeline escalable de procesamiento de datos utilizando Python y PostgreSQL"
    },
    projectRestfulAPI: {
      name: "Servicio de API RESTful",
      description: "Diseñé e implementé un servicio de API RESTful para un sistema de gestión de clientes"
    }
  }
};

const skills = [
  { 
    nameKey: 'backendDevelopment', 
    icon: <Server />, 
    technologies: ['Python', 'JavaScript']
  },
  { 
    nameKey: 'automationWorkflows', 
    icon: <Workflow />, 
    technologies: ['n8n', 'Make']
  },
  { 
    nameKey: 'databaseManagement', 
    icon: <Database />, 
    technologies: ['MySQL', 'Heidi', 'MongoDB']
  },
  { 
    nameKey: 'apiDevelopment', 
    icon: <FileJson />, 
    technologies: ['RESTful APIs']
  },
]

const projects = [
  { 
    nameKey: 'projectAutomatedWorkflow',
    image: '/placeholder.svg?height=200&width=300',
    technologies: ['n8n', 'Python', 'MySQL'],
    link: 'https://example.com/project-a'
  },
  { 
    nameKey: 'projectDataProcessing',
    image: '/placeholder.svg?height=200&width=300',
    technologies: ['Python', 'PostgreSQL', 'Apache Airflow'],
    link: 'https://example.com/project-b'
  },
  { 
    nameKey: 'projectRestfulAPI',
    image: '/placeholder.svg?height=200&width=300',
    technologies: ['JavaScript', 'Express.js', 'MongoDB'],
    link: 'https://example.com/project-c'
  },
]

type SectionProps = {
  children: ReactNode;
  id: string;
};

const Section: React.FC<SectionProps> = ({ children, id }) => {
  const { ref, inView } = useInViewIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center py-20 relative"
      ref={ref}
    >
      <AnimatePresence>
        {inView && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-6xl px-4 sm:px-6 lg:px-8"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

type Particle = {
  index: number;
};

type ParticleProps = {
  index: number;
};

const Particle: React.FC<ParticleProps> = ({ index }) => {
  const randomX = Math.random() * 100 + index; // Usar `index` para variar la posición
  const randomY = Math.random() * 100 + index;
  const size = Math.random() * 3 + 1;

  return (
    <motion.div
      className="absolute bg-orange-500 rounded-full"
      style={{
        width: size,
        height: size,
        left: `${randomX % 100}%`, // Usar módulo para evitar valores fuera del rango
        top: `${randomY % 100}%`,
      }}
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 5 + index % 5, // Usar `index` para variar la duración
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(249,115,22,0.1) 2px, transparent 2px),
            radial-gradient(circle, rgba(249,115,22,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 100px 100px',
        }}
      />
      {[...Array(50)].map((_, index) => (
        <Particle key={index} index={index} />
      ))}
    </div>
  )
}

const PointerIllumination = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.045), transparent 80%)`,
      }}
    />
  );
};

type FooterProps = {
  language: "en" | "es"; // Ajusta según los idiomas soportados
};

const Footer: React.FC<FooterProps> = ({ language }) => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-slate-900 text-center py-6 mt-20 flex flex-col items-center justify-center relative z-10">
      <p className="text-slate-400">
        &copy; {year} Francisco González. {translations[language].allRightsReserved}
      </p>
      <p className="text-slate-400 mt-2">
        Powered by{" "}
        <a
          href="https://v0.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:text-orange-400"
        >
          v0.dev
        </a>
      </p>
    </footer>
  );
};

// const NavMenu = ({ activeSection, scrollTo, language, setLanguage, isDesktop }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);

//   const menuItems = ['home', 'about', 'skills', 'projects', 'contact']; 

//   const menuContent = (
//     <>
//       {menuItems.map((section) => (
//         <li key={section}>
//           <motion.button
//             onClick={() => {
//               scrollTo(section);
//               if (!isDesktop) toggleMenu();
//             }}
//             className={`text-lg transition-colors duration-300 ${
//               activeSection === section ? 'text-orange-500 border-b-2 border-orange-500' : 'text-orange-200 hover:text-orange-100'
//             }`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {translations[language][section]}
//           </motion.button>
//         </li>
//       ))}
//       <li>
//         <motion.button
//           onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
//           className="text-orange-200 hover:text-orange-100"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           aria-label={language === 'en' ? translations[language].switchtoSpanish : translations[language].cambiarAIngles}
//         >
//           <Globe className="w-6 h-6" />
//         </motion.button>
//       </li>
//       <li>
//         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//           <a
//             href="/path-to-your-resume.pdf"
//             download
//             className="text-orange-200 hover:text-orange-100 px-3 py-2 rounded-md bg-orange-500 text-slate-900"
//           >
//             {translations[language].resume}
//           </a>
//         </motion.div>
//       </li>
//     </>
//   );

//   return (
//     <nav className="relative z-50">
//       {isDesktop ? (
//         <ul className="flex items-center space-x-8">
//           {menuContent}
//         </ul>
//       ) : (
//         <>
//           <button
//             onClick={toggleMenu}
//             className="text-orange-200 hover:text-orange-100"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//           <AnimatePresence>
//             {isOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-2"
//               >
//                 <ul className="flex flex-col space-y-2">
//                   {menuContent}
//                 </ul>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </>
//       )}
//     </nav>
//   );
// };


interface NavMenuProps {
  activeSection: string;
  scrollTo: (section: string) => void;
  language: "en" | "es";
  setLanguage: (language: "en" | "es") => void;
  isDesktop: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ activeSection, scrollTo, language, setLanguage, isDesktop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = ["home", "about", "skills", "projects", "contact"];

  const menuContent = (
    <>
      {menuItems.map((section) => (
        <li key={section}>
          <motion.button
            onClick={() => {
              scrollTo(section);
              if (!isDesktop) toggleMenu();
            }}
            className={`text-lg transition-colors duration-300 ${
              activeSection === section
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-orange-200 hover:text-orange-100"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {translations[language][section]}
          </motion.button>
        </li>
      ))}
      <li>
        <motion.button
          onClick={() => setLanguage(language === "en" ? "es" : "en")}
          className="text-orange-200 hover:text-orange-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={
            language === "en"
              ? translations[language].switchtoSpanish
              : translations[language].cambiarAIngles
          }
        >
          <Globe className="w-6 h-6" />
        </motion.button>
      </li>
      <li>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <a
            href="/path-to-your-resume.pdf"
            download
            className="text-orange-200 hover:text-orange-100 px-3 py-2 rounded-md bg-orange-500 text-slate-900"
          >
            {translations[language].resume}
          </a>
        </motion.div>
      </li>
    </>
  );

  return (
    <nav className="relative z-50">
      {isDesktop ? (
        <ul className="flex items-center space-x-8">{menuContent}</ul>
      ) : (
        <>
          <button
            onClick={toggleMenu}
            className="text-orange-200 hover:text-orange-100"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-2"
              >
                <ul className="flex flex-col space-y-2">{menuContent}</ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </nav>
  );
};


const DynamicNavMenu = dynamic(() => Promise.resolve(NavMenu), { ssr: false })

export default function Component() {
  const [activeSection, setActiveSection] = useState('home')
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [language, setLanguage] = useState('en');
  const { scrollYProgress } = useScroll()
  const lastScrollY = useRef(0)
  const [isDesktop, setIsDesktop] = useState(true)

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY.current) {
          setIsNavVisible(false)
        } else {
          setIsNavVisible(true)
        }
        lastScrollY.current = currentScrollY

        const sections = ['home', 'about', 'skills', 'projects', 'contact']
        const currentSection = sections.find(section => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })
        if (currentSection) {
          setActiveSection(currentSection)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 min-h-screen relative perspective-1000">
      <AnimatedBackground />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50"
        style={{ scaleX }}
      />
      <motion.header 
        className="fixed top-0 left-0 right-0 z-40 bg-slate-900 bg-opacity-90 backdrop-blur-sm shadow-md"
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ 
                scale: 1.05,
                color: "#F97316",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-4xl font-bold text-white cursor-pointer"
            >
              F G
            </motion.div>
            <DynamicNavMenu
              activeSection={activeSection}
              scrollTo={scrollTo}
              language={language}
              setLanguage={setLanguage}
              isDesktop={isDesktop}
            />
          </div>
        </div>
      </motion.header>

      <Section id="home">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ 
              rotateY: 360,
              transition: { duration: 1.5, ease: "linear", repeat: Infinity }
            }}
            className="mb-8 relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-orange-500 shadow-lg cursor-pointer transform-gpu perspective-1000"
          >
            <Image
              src={Profile}
              alt="Profile picture"
              layout="fill"
              className="rounded-full object-cover"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300"
          >
            Francisco González
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl text-slate-400 mb-8"
          >
            Backend Developer Jr. | Automation Enthusiast | Workflow Optimizer
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-4"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollTo('projects')} 
                className="bg-orange-500 hover:bg-orange-600 text-slate-900"
              >
                {translations[language].viewProjects}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => scrollTo('contact')} 
                variant="outline" 
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-slate-900"
              >
                {translations[language].contactMe}
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <ChevronDown 
              className="w-12 h-12 mx-auto text-orange-500 animate-bounce cursor-pointer" 
              onClick={() => scrollTo('about')}
            />
          </motion.div>
        </div>
      </Section>

      <Section id="about">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300"
        >
          {translations[language].aboutTitle}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xl text-slate-300 mb-6">
            {translations[language].aboutText1}
          </p>
          <p className="text-xl text-slate-300">
            {translations[language].aboutText2}
          </p>
        </motion.div>
      </Section>

      <Section id="skills">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300"
        >
          {translations[language].skillsTitle}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.nameKey}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)" }}
              className="bg-slate-800 p-6 pb-4 rounded-lg shadow-lg border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-2">
                  <div className="text-orange-500 mr-2">
                    {React.cloneElement(skill.icon, { className: "w-6 h-6" })}
                  </div>
                  <h3 className="text-xl font-semibold text-center">{translations[language][skill.nameKey]}</h3>
                </div>
                <ul className="text-sm text-slate-400 mt-4">
                  {skill.technologies.map((tech, i) => (
                    <li key={i} className="mb-2 flex items-center justify-center">
                      <div className="w-full max-w-[150px] flex items-center">
                        <Cpu className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
                        <span className="text-left">{tech}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-slate-400">
            {translations[language].skillsDescription}
          </p>
        </motion.div>
      </Section>

      <Section id="projects">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300"
        >
          {translations[language].projectsTitle}
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.nameKey}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)" }}
              className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300"
            >
              <Image src={project.image} alt={translations[language][project.nameKey].name} width={300} height={200} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{translations[language][project.nameKey].name}</h3>
                <p className="text-slate-400 mb-4">{translations[language][project.nameKey].description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <motion.span 
                      key={i} 
                      className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.3)" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <motion.a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-500 hover:text-orange-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {translations[language].viewProject} <ExternalLink className="ml-1 w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300"
        >
          {translations[language].contactTitle}
        </motion.h2>
        <div className="text-center mb-8">
          <p className="text-xl text-slate-400 mb-4">{translations[language].openToOpportunities}</p>
          <p className="text-xl text-slate-400">{translations[language].reachOut}</p>
        </div>
        <div className="flex justify-center space-x-12">
          {[
            { icon: <Github className="w-12 h-12" />, href: 'https://github.com', label: 'GitHub' },
            { icon: <Linkedin className="w-12 h-12" />, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: <Mail className="w-12 h-12" />, href: 'mailto:jane@example.com', label: 'Email' },
          ].map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, color: "#F97316" }}
              className="text-slate-400 hover:text-orange-500 transition-colors duration-300 flex flex-col items-center"
            >
              {item.icon}
              <span className="mt-2 text-sm">{item.label}</span>
            </motion.a>
          ))}
        </div>
      </Section>

      <Footer language={language} />
      <PointerIllumination />
    </div>
  )
}