'use client'

import React from 'react';
import { useParams } from 'next/navigation';

export default function EditSponsorshipPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Editar Plano de Apadrinhamento</h1>
      <p>ID do Plano para Edição: {id}</p>
      {/* Aqui você colocará o formulário para editar o plano de apadrinhamento */}
    </div>
  );
}