import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white p-4 flex justify-between items-center font-montserrat shadow">
      <div className="flex items-center mr-14">
        <Image src="/logotipo.webp" alt="Logo Bonny" width={80} height={80} />
      </div>

      <nav className="flex space-x-4 items-center">
        <a href="#" className="text-gray-700 hover:text-accent">Sobre</a>
        <a href="#" className="text-gray-700 hover:text-accent">Adote</a>
        <a href="#" className="text-gray-700 hover:text-accent">Apadrinhe</a>
        <a href="#" className="text-gray-700 hover:text-accent">Ajude a ONG</a>
        <a href="#" className="text-gray-700 hover:text-accent">Contato</a>
      </nav>

      <div className="flex space-x-4">
        <button className="bg-accent text-white px-4 py-2 rounded-md">Faça uma doação</button>
        <button className="bg-accent text-white px-4 py-2 rounded-md">Entrar</button>
      </div>
    </header>
  );
};

export default Header;