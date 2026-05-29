"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-8 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Section 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-linear-to-tr from-teal-400 to-teal-600 p-2 rounded-xl text-white shadow-lg shadow-teal-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M21 21h1.5M3 21h1.5m10.5-18v15.75M3.75 18h16.5M3 7.5h16.5M21 3.545a1.125 1.125 0 0 0-1.096-1.124H4.096A1.125 1.125 0 0 0 3 3.545v15.356" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-wider bg-linear-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                SportNest
              </span>
            </div>
            <p className="text-sm font-light text-slate-400 leading-relaxed max-w-sm">
              The most modern and seamless platform to discover and reserve premium sports venues, turfs, and courts. Elevate your game with us.
            </p>
          </div>

          {/* Section 2: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase border-b border-slate-800 pb-2 max-w-37.5">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-3 hover:text-teal-400 transition-colors">
                <FaMapMarkerAlt className="text-teal-400 mt-1 shrink-0" />
                <span>MC College Road, Sylhet, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 hover:text-teal-400 transition-colors">
                <FaPhoneAlt className="text-teal-400 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3 hover:text-teal-400 transition-colors">
                <FaEnvelope className="text-teal-400 shrink-0" />
                <span>support@sportnest.com</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase border-b border-slate-800 pb-2 max-w-37.5">
              Follow Us
            </h3>
            <p className="text-sm font-light text-slate-400">
              Stay connected with our social media networks for exclusive updates and exciting offers.
            </p>
            
            {/* Social Icons Container */}
            <div className="flex space-x-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-slate-950 hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-md">
                <FaFacebookF size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-slate-950 hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-md">
                <FaTwitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-slate-950 hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-md">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-slate-950 hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-md">
                <FaGithub size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800/60 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-500">
          <p>© {new Date().getFullYear()} <span className="text-slate-400 font-medium">SportNest</span>. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;