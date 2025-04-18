import React from 'react';
import { useParams } from 'next/navigation';

export default function SponsorshipDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Detalhes do Plano de Apadrinhamento</h1>
      <p>ID do Plano: {id}</p>
      {/* Aqui você mostrará os detalhes do plano de apadrinhamento com o ID */}
    </div>
  );
}