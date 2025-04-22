"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export interface Sponsorship {
  _id: string;
  user: {
    _id: string;
    name: string;
    birthDate: string;
    individualTaxpayerRegistry: string;
    email: string;
    cellPhone: string;
  };
}

interface SponsorshipListProps {
  sponsorships: Sponsorship[];
}

export default function SponsorshipList({
  sponsorships,
}: SponsorshipListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredSponsorships = sponsorships.filter(
    (sponsorship) =>
      sponsorship.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sponsorship.user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredSponsorships.length / itemsPerPage);

  const currentItems = filteredSponsorships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="mb-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Apadrinhamentos</CardTitle>
          <CardDescription>
            Total de apadrinhamentos: {sponsorships.length}
          </CardDescription>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </CardHeader>
        <CardContent>
          {currentItems.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Data de Nascimento</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>CPF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((sponsorship) => (
                    <TableRow key={sponsorship._id}>
                      <TableCell className="font-medium">
                        {sponsorship.user.name}
                      </TableCell>
                      <TableCell>
                        {formatDate(sponsorship.user.birthDate)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{sponsorship.user.email}</div>
                        <div className="text-xs text-muted-foreground">
                          {sponsorship.user.cellPhone}
                        </div>
                      </TableCell>
                      <TableCell>
                        {sponsorship.user.individualTaxpayerRegistry}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Página {currentPage} de {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {searchTerm
                ? "Nenhum apadrinhamento encontrado para sua busca."
                : "Nenhum apadrinhamento encontrado."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
