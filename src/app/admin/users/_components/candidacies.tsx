"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Candidacy } from "../_lib/getCandidaciesByUser";
import { CandidacyStatus } from "@/types/enums";
import { Routes } from "@/constants/routes";

interface CandidaciesProps {
  candidacies: Candidacy[];
}

const statusConfig = {
  [CandidacyStatus.PENDING]: {
    label: "Pendente",
    variant: "outline" as const,
  },
  [CandidacyStatus.APPROVED]: {
    label: "Aprovado",
    variant: "success" as const,
  },
  [CandidacyStatus.REJECTED]: {
    label: "Rejeitado",
    variant: "destructive" as const,
  },
  [CandidacyStatus.CANCELED]: {
    label: "Cancelado",
    variant: "secondary" as const,
  },
  [CandidacyStatus.CONCLUDED]: {
    label: "Concluído",
    variant: "default" as const,
  },
};

export default function Candidacies({ candidacies }: CandidaciesProps) {
  if (!candidacies || candidacies.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Candidaturas</h3>
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <PawPrint className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            Nenhuma candidatura encontrada
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Candidaturas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidacies.map((candidacy) => (
          <Link
            href={`${Routes.ADMIN_ANIMALS}/animal-details/${candidacy.dog._id}`}
            key={candidacy._id}
            className="block transition-transform hover:-translate-y-1"
          >
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={
                    candidacy.dog.imageProfile ||
                    "/placeholder.svg?height=200&width=300"
                  }
                  alt={candidacy.dog.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">
                    {candidacy.dog.name}
                  </h4>
                  <Badge
                    variant={
                      statusConfig[candidacy.status].variant as unknown as null
                    }
                  >
                    {statusConfig[candidacy.status].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{candidacy.dog.breed}</p>
                  <p>
                    {candidacy.dog.age}{" "}
                    {candidacy.dog.age === 1 ? "ano" : "anos"}
                  </p>
                  <p>
                    {candidacy.dog.gender === "male" ? "Macho" : "Fêmea"} •{" "}
                    {candidacy.dog.size}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  {candidacy.dog.available
                    ? "Disponível para adoção"
                    : "Não disponível para adoção"}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
