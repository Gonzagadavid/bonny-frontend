"use client";

import { Button } from "@/components/ui/button";
import { BackendRoutes } from "@/constants/backend-routes";
import { Routes } from "@/constants/routes";
import { fetcher } from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { createCandidacy } from "../_lib/createCandidacy";
import { toast } from "@/hooks/use-toast";

export const AdoptionButton = ({ animalId }: { animalId: string }) => {
  const session = useSession();
  const route = useRouter();

  const { data } = useSWR(
    session?.data?.user?.userId
      ? `${BackendRoutes.FORM_ANSWERS}/by-user/${session.data?.user.userId}`
      : null,
    fetcher,
  );

  const onAdoption = async () => {
    if (!session || session.status === "unauthenticated") {
      route.push(Routes.LOGIN);
      return;
    }

    if (!data) {
      route.push(Routes.FORM_ANSWERS);
      return;
    }

    try {
      if (session.data?.user.userId) {
        await createCandidacy(session.data.user.userId, animalId);

        toast({ title: "Candidatura de adoção criada com sucesso!" });
      }
    } catch {
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao criar sua candidatura para adoção. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={onAdoption}
      className="w-full bg-amber-600 hover:bg-amber-700"
    >
      Quero Adotar
    </Button>
  );
};
