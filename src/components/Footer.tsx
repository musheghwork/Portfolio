export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 border-t border-cyan-500/30 py-10 px-6 shadow-2xl shadow-cyan-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white text-center md:text-left text-sm font-light tracking-wider">
            &copy; {currentYear} All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white text-sm">
            <span>Made with</span>
            <span>by Mushegh</span>
          </div>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-white text-sm hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white text-sm hover:text-cyan-400 transition-all duration-300 hover:scale-105"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
