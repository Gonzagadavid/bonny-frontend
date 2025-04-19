'use client'

import React from 'react';
import { useParams } from 'next/navigation';

export default function AnimalsDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Detalhes do Animal</h1>
      <p>ID do Animal: {id}</p>
    </div>
  );
}