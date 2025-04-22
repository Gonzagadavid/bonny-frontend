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

export interface Donation {
  _id: string;
  name: string;
  birthDate: string;
  individualTaxpayerRegistry: string;
  email: string;
  cellPhone: string;
  donations: { value: number; createdAt: string }[];
}

interface DonationListProps {
  donations: Donation[];
}

export default function DonationList({ donations }: DonationListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const filteredDonations = donations.filter(
    (donation) =>
      donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  const currentItems = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalDonationAmount = donations.reduce((total, donation) => {
    return total + donation.donations.reduce((sum, d) => sum + d.value, 0);
  }, 0);

  return (
    <div className="mb-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Doações</CardTitle>
          <CardDescription>
            Total de doações: {donations.length} | Valor total:{" "}
            {formatCurrency(totalDonationAmount)}
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
                    <TableHead>Contato</TableHead>
                    <TableHead>Doações</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((donation) => {
                    const totalAmount = donation.donations.reduce(
                      (sum, d) => sum + d.value,
                      0,
                    );

                    return (
                      <TableRow key={donation._id}>
                        <TableCell className="font-medium">
                          <div>{donation.name}</div>
                          <div className="text-xs text-muted-foreground">
                            CPF: {donation.individualTaxpayerRegistry}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{donation.email}</div>
                          <div className="text-xs text-muted-foreground">
                            {donation.cellPhone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {donation.donations.length} doação(ões)
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Última:{" "}
                            {donation.donations.length > 0
                              ? formatDate(
                                  donation.donations[
                                    donation.donations.length - 1
                                  ].createdAt,
                                )
                              : "N/A"}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(totalAmount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
                ? "Nenhuma doação encontrada para sua busca."
                : "Nenhuma doação encontrada."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
