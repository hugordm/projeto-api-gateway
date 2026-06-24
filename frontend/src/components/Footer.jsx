import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-100 text-center text-sm font-medium text-gray-400 bg-white">
      <p>© {new Date().getFullYear()} Projeto desenvolvido pelo grupo G4 da turma de Full Stack com React, Node.js e Tailwind CSS.</p>
    </footer>
  );
}