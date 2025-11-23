import {
  FaReact,
  FaVuejs,
  FaHtml5,
  FaCss3Alt,
  FaNetworkWired,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiGit,
  SiSharp,
  SiGitlab,
  SiGithub,
  SiExpress,
} from "react-icons/si";
import { GiSmartphone } from "react-icons/gi";
import {
  FaNodeJs,
  FaPhp,
  FaPython, // или другой для C#
  FaOpencart,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiJquery,
  SiNestjs,
  SiNextdotjs,
  SiNuxtdotjs,
  SiSass,
  SiRedux,
  SiShopify,
} from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";
import { GiPineapple } from "react-icons/gi";
import { TbLetterZSmall } from "react-icons/tb";

export const skills = [
  {
    name: "React",
    level: 95,
    icon: FaReact,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Vue.js",
    level: 90,
    icon: FaVuejs,
    color: "from-green-500 to-teal-500",
  },
  {
    name: "HTML",
    level: 100,
    icon: FaHtml5,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "CSS3",
    level: 100,
    icon: FaCss3Alt,
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "JavaScript",
    level: 95,
    icon: SiJavascript,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "TypeScript",
    level: 88,
    icon: SiTypescript,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Redux",
    level: 95,
    icon: SiRedux,
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Pinia",
    level: 90,
    icon: GiPineapple,
    color: "from-yellow-300 to-yellow-400",
  },
  {
    name: "Tailwind",
    level: 90,
    icon: SiTailwindcss,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Git",
    level: 90,
    icon: SiGit,
    color: "from-orange-400 to-red-600",
  },
  {
    name: "Networking (HTTP & APIs)",
    level: 80,
    icon: FaNetworkWired,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Responsive Design",
    level: 95,
    icon: GiSmartphone,
    color: "from-green-500 to-emerald-500",
  },
];
export const otherSkills = [
  { name: "C#", icon: SiSharp, color: "from-blue-400/80 to-blue-600/80" },
  { name: "PHP", icon: FaPhp, color: "from-purple-400/80 to-indigo-500/80" },
  {
    name: "Python",
    icon: FaPython,
    color: "from-yellow-300/80 to-blue-400/80",
  },
  { name: "jQuery", icon: SiJquery, color: "from-blue-300/80 to-blue-500/80" },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "from-green-400/80 to-green-600/80",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color: "from-gray-400/80 to-gray-600/80",
  },
  { name: "Nest.js", icon: SiNestjs, color: "from-red-400/80 to-red-600/80" },
  { name: "Next.js", icon: SiNextdotjs, color: "from-black/80 to-gray-700/80" },
  {
    name: "Nuxt.js",
    icon: SiNuxtdotjs,
    color: "from-teal-400/80 to-teal-600/80",
  },
  {
    name: "Zustand",
    icon: TbLetterZSmall,
    color: "from-neutral-800/80 to-neutral-500/80",
  },
  {
    name: "Sass (SCSS)",
    icon: SiSass,
    color: "from-pink-400/80 to-pink-600/80",
  },
  {
    name: "Bootstrap",
    icon: FaBootstrap,
    color: "from-purple-400/80 to-blue-500/80",
  },
  {
    name: "OpenCart",
    icon: FaOpencart,
    color: "from-white/40 to-blue-500/80",
  },
  {
    name: "Shopify",
    icon: SiShopify,
    color: "from-green-400/80 to-green-600/80",
  },
  { name: "GitHub", icon: SiGithub, color: "from-gray-700/80 to-black/80" },
  { name: "GitLab", icon: SiGitlab, color: "from-orange-500/80 to-red-600/80" },
  {
    name: "Azure",
    icon: TbBrandAzure,
    color: "from-blue-400/80 to-blue-600/80",
  },
];
