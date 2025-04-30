"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  Phone,
  Mail,
  X,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CandidacyStatus } from "@/types/enums";
import { Candidacy } from "../_lib/getCandidacies";
import { formatDate } from "@/utils/formatDate";
import { updateCandidacyStatusRequest } from "../_lib/updateCandidacyStatus";
import { useRouter } from "next/navigation";

interface CandidaciesProps {
  candidacies: Candidacy[];
}

const candidacyStatus = {
  [CandidacyStatus.PENDING]: {
    variant: "secondary" as const,
    label: "Pendente",
  },
  [CandidacyStatus.APPROVED]: {
    variant: "success" as const,
    label: "Aprovado",
  },
  [CandidacyStatus.CONCLUDED]: {
    variant: "success" as const,
    label: "Concluído",
  },
  [CandidacyStatus.REJECTED]: {
    variant: "destructive" as const,
    label: "Rejeitado",
  },
  [CandidacyStatus.CANCELED]: {
    variant: "outline" as const,
    label: "Cancelado",
  },
};

const getStatusInfo = (status: CandidacyStatus) => {
  return (
    candidacyStatus?.[status] ?? { variant: "outline" as const, label: status }
  );
};

export default function Candidacies({ candidacies }: CandidaciesProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    candidacyId: string;
    newStatus: CandidacyStatus;
    statusLabel: string;
  }>({
    isOpen: false,
    candidacyId: "",
    newStatus: CandidacyStatus.PENDING,
    statusLabel: "",
  });

  const itemsPerPage = 3;

  const filteredCandidacies = candidacies.filter(
    (candidacy) =>
      candidacy.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidacy.user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCandidacies.length / itemsPerPage);

  const currentItems = filteredCandidacies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const updateCandidacyStatus = async (
    candidacyId: string,
    status: CandidacyStatus,
  ) => {
    setIsUpdating(true);
    try {
      await updateCandidacyStatusRequest({ candidacyId, status });

      router.refresh();
      toast({
        title: "Sucesso",
        description: "Status da candidatura atualizado com sucesso",
      });
    } catch {
      toast({
        title: "Erro",
        description: "Falha ao atualizar status da candidatura",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
      setConfirmDialog({
        isOpen: false,
        candidacyId: "",
        newStatus: CandidacyStatus.PENDING,
        statusLabel: "",
      });
    }
  };

  const handleStatusChange = (
    candidacyId: string,
    newStatus: CandidacyStatus,
  ) => {
    const statusInfo = getStatusInfo(newStatus);
    setConfirmDialog({
      isOpen: true,
      candidacyId,
      newStatus,
      statusLabel: statusInfo.label,
    });
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Candidaturas à Adoção</h3>
          <div className="relative w-64">
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
        </div>

        {currentItems.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((candidacy) => {
              const statusInfo = getStatusInfo(candidacy.status);

              return (
                <Card key={candidacy._id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {candidacy.user.name}
                      </CardTitle>
                      <Badge variant={statusInfo.variant as unknown as null}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <CardDescription>
                      CPF: {candidacy.user.individualTaxpayerRegistry}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Nascimento: {formatDate(candidacy.user.birthDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{candidacy.user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{candidacy.user.cellPhone}</span>
                      </div>
                      <div className="flex justify-center">
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/user/user-details/${candidacy.user._id}`}
                          >
                            <User className="mr-2 h-2 w-6" />
                            Ver Perfil
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    {candidacy.status === CandidacyStatus.PENDING && (
                      <>
                        <Button
                          onClick={() =>
                            handleStatusChange(
                              candidacy._id,
                              CandidacyStatus.REJECTED,
                            )
                          }
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <span>
                            <X className="mr-2 h-4 w-4" />
                            Rejeitar
                          </span>
                        </Button>
                        <Button
                          onClick={() =>
                            handleStatusChange(
                              candidacy._id,
                              CandidacyStatus.APPROVED,
                            )
                          }
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <span>
                            <Check className="mr-2 h-4 w-4" />
                            Aprovar
                          </span>
                        </Button>
                      </>
                    )}
                    {candidacy.status === CandidacyStatus.APPROVED && (
                      <>
                        <Button
                          onClick={() =>
                            handleStatusChange(
                              candidacy._id,
                              CandidacyStatus.CANCELED,
                            )
                          }
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <span>
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                          </span>
                        </Button>
                        <Button
                          onClick={() =>
                            handleStatusChange(
                              candidacy._id,
                              CandidacyStatus.CONCLUDED,
                            )
                          }
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <span>
                            <Check className="mr-2 h-4 w-4" />
                            Concluir
                          </span>
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            {searchTerm
              ? "Nenhuma candidatura encontrada para sua busca."
              : "Nenhuma candidatura encontrada."}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
      </div>
      <AlertDialog
        open={confirmDialog.isOpen}
        onOpenChange={(open) =>
          !open && setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar alteração de status</AlertDialogTitle>
            <AlertDialogDescription>
              {`
              Você tem certeza que deseja alterar o status desta candidatura
              para "${confirmDialog.statusLabel}"? Esta ação não pode ser
              desfeita.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                updateCandidacyStatus(
                  confirmDialog.candidacyId,
                  confirmDialog.newStatus,
                )
              }
              disabled={isUpdating}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
