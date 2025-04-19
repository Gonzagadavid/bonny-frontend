'use client'

import React from 'react';
import { useParams } from 'next/navigation';

export default function EditAnimalsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Editar Animal</h1>
      <p>ID do Animal para Edição: {id}</p>
    </div>
  );
}