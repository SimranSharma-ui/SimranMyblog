import React from "react";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Products</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  Flutter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  React
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  iOS
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Design to code</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  Figma plugin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  Templates
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Comparison</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  DhiWise vs Anima
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  DhiWise vs Appsmith
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  DhiWise vs FlutterFlow
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  DhiWise vs Monday Hero
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  DhiWise vs Retool
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  DhiWise vs Bubble
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  DhiWise vs Figma Dev Mode
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-700">
        <div className="text-xl font-semibold text-gray-200 hidden md:flex">
          Cilli<span className="text-blue-500 font-bold">Blog</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; 2024 DhiWise PVT. LTD. All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
            <FaGithub className="h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
            <BsYoutube className="h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
