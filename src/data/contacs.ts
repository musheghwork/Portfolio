import { Mail, Linkedin, Github, Phone } from "lucide-react";

export const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/musho-work",
    gradient: "from-blue-600 to-cyan-500",
    tooltip: "Click to copy",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/musheghwork",
    gradient: "from-gray-600 to-gray-400",
    tooltip: "Click to copy",
  },
  {
    icon: Mail,
    label: "Gmail",
    value: "mushegh.work@gmail.com",
    gradient: "from-red-500 to-orange-500",
    tooltip: "Click to copy",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+37493554384",
    gradient: "from-green-400 to-teal-500",
    tooltip: "Click to copy",
  },
];
