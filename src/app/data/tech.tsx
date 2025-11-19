import React from 'react'
import { FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaBootstrap, FaReact, FaNodeJs, FaPython, FaDatabase, FaFire, FaTerminal, FaAws } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiDjango, SiPostgresql, SiTypescript, SiRedux, SiExpress, SiMongodb } from 'react-icons/si'

export const frontendTech = [
  { name: 'HTML', icon: <FaHtml5 className="text-orange-500" size={32} /> },
  { name: 'CSS (SASS)', icon: <FaCss3Alt className="text-blue-500" size={32} /> },
  { name: 'JavaScript', icon: <FaJs className="text-yellow-400" size={32} /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-600" size={32} /> },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-600" size={32} /> },
  { name: 'React', icon: <FaReact className="text-cyan-400" size={32} /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-gray-200" size={28} /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" size={28} /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" size={28} /> },
  { name: 'Redux', icon: <SiRedux className="text-purple-500" size={28} /> },
]

export const backendTech = [
  { name: 'Node.js', icon: <FaNodeJs className="text-green-500" size={32} /> },
  { name: 'Python', icon: <FaPython className="text-blue-400" size={32} /> },
  { name: 'SQL/NoSQL', icon: <FaDatabase className="text-slate-400" size={32} /> },
  { name: 'Firebase', icon: <FaFire className="text-yellow-500" size={32} /> },
  { name: 'Terminal', icon: <FaTerminal className="text-slate-300" size={32} /> },
  { name: 'AWS', icon: <FaAws className="text-orange-400" size={32} /> },
  { name: 'Django', icon: <SiDjango className="text-green-600" size={28} /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-sky-500" size={28} /> },
  { name: 'Express.js', icon: <SiExpress className="text-gray-300" size={28} /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-600" size={28} /> },
]