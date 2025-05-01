"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdoptionCard from "./adoptionCard";
import { Adoption } from "../_lib/listAdoptions";
import { deleteAdoption } from "../_lib/deleteAdoption";
import { toast } from "@/hooks/use-toast";

interface AdoptionsListProps {
  initialAdoptions: Adoption[];
}

export default function AdoptionsList({
  initialAdoptions,
}: AdoptionsListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [adoptions, setAdoptions] = useState<Adoption[]>(initialAdoptions);

  useEffect(() => {
    let filteredAdoptions = [...initialAdoptions];

    const search = searchParams.get("search")?.toLowerCase();
    if (search) {
      filteredAdoptions = filteredAdoptions.filter((adoption) => {
        const dogName = adoption.dog.name.toLowerCase();
        const userName = adoption.user.name.toLowerCase();
        const userEmail = adoption.user.email.toLowerCase();

        return (
          dogName.includes(search) ||
          userName.includes(search) ||
          userEmail.includes(search)
        );
      });
    }

    const status = searchParams.get("status");
    if (status === "active") {
      filteredAdoptions = filteredAdoptions.filter(
        (adoption) => adoption.deletedAt === null,
      );
    } else if (status === "canceled") {
      filteredAdoptions = filteredAdoptions.filter(
        (adoption) => adoption.deletedAt !== null,
      );
    }

    const sortBy = searchParams.get("sortBy");
    if (sortBy === "lastCheck") {
      filteredAdoptions.sort(
        (a, b) =>
          new Date(b.lastCheck).getTime() - new Date(a.lastCheck).getTime(),
      );
    } else if (sortBy === "createdAt") {
      filteredAdoptions.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      });
    }

    setAdoptions(filteredAdoptions);
  }, [searchParams, initialAdoptions]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAdoption(id);
      router.refresh();

      toast({
        title: "Adoption removed successfully",
      });
    } catch {
      toast({
        title: "Erro",
        description:
          "Houve um problema ao cadastrar o Animal. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (adoptions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nenhuma adoção encontrada</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {adoptions.map((adoption) => (
        <AdoptionCard
          key={adoption._id}
          adoption={adoption}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
