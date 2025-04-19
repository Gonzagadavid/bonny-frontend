'use client'

import React from 'react';
import { useParams } from 'next/navigation';

export default function EditAdoptersPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Editar Cadastro de Adotante (Admin)</h1>
      <p>ID do Cadastro para Edição (Admin): {id}</p>
      {/* Aqui você colocará o formulário de edição dos dados do cadastro do adotante (uso interno do admin) */}
    </div>
  );
}