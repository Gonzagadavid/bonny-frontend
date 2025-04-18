'use client';

import { useEffect, useState } from 'react';
import { getAnimais } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';

interface Animal {
  id: string;
  nome: string;
  especie: string;
  raca?: string;
}

export default function ListaAnimais() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarAnimais() {
      try {
        const data = await getAnimais();
        setAnimais(data);
      } catch (err: any) {
        setErro(err.message || 'Falha ao carregar os animais.');
      } finally {
        setCarregando(false);
      }
    }

    carregarAnimais();
  }, []);

  if (carregando) {
    return <div>Carregando animais...</div>;
  }

  if (erro) {
    return <div>Erro: {erro}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Animais</h2>
        <Button asChild>
          <Link href="/admin/animais/new">Adicionar Animal</Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="w-[100px]">ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Espécie</TableCell>
              <TableCell>Raça</TableCell>
              <TableCell className="text-right">Ações</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animais.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell className="font-medium">{animal.id}</TableCell>
                <TableCell>{animal.nome}</TableCell>
                <TableCell>{animal.especie}</TableCell>
                <TableCell>{animal.raca || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" asChild>
                    <Link href={`/admin/animais/${animal.id}`}>Visualizar</Link>
                  </Button>
                  <Button size="sm" variant="secondary" className="ml-2" asChild>
                    <Link href={`/admin/animais/${animal.id}/edit`}>Editar</Link>
                  </Button>
                  <Button size="sm" variant="destructive" className="ml-2">
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}