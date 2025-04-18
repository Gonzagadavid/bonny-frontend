// detalhes do cadastro de um adotante

import React from 'react';
import { useParams } from 'next/navigation';

export default function AdoptersDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Detalhes do Cadastro de Adotante</h1>
      <p>ID do Cadastro: {id}</p>
      {/* Aqui você mostrará os detalhes do cadastro do adotante com o ID */}
      {/* Poderá ter ações como "Aprovar Cadastro", "Rejeitar Cadastro", etc. */}
    </div>
  );
}