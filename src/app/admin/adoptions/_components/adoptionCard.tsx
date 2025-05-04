"use client";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check, Trash2 } from "lucide-react";
import Image from "next/image";
import { Adoption } from "../_lib/listAdoptions";
import { dogSizeLabel } from "@/constants/labels";
import { updateLastCheck } from "../_lib/updateLastCheck";
import { useRouter } from "next/navigation";

interface AdoptionCardProps {
  adoption: Adoption;
  onDelete: (id: string) => void;
}

export default function AdoptionCard({
  adoption,
  onDelete,
}: AdoptionCardProps) {
  const { _id, user, dog, lastCheck, deletedAt } = adoption;

  const lastCheckDate = new Date(lastCheck);
  const router = useRouter();
  const formattedLastCheck = formatDistanceToNow(lastCheckDate, {
    addSuffix: true,
    locale: ptBR,
  });

  const updateCheck = async () => {
    await updateLastCheck(adoption._id);
    router.refresh();
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full">
          <Image
            src={dog.imageProfile || "/placeholder.svg?height=200&width=400"}
            alt={dog.name}
            fill
            className="object-cover"
          />
        </div>
        {deletedAt && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Cancelada
          </Badge>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{dog.name}</h3>
            <p className="text-sm text-muted-foreground">
              {dog.breed}, Porte {dogSizeLabel?.[dog.size] ?? ""}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{dog.age} anos</p>
            <p className="text-xs text-muted-foreground">{dog.fellColor}</p>
          </div>
        </div>

        <div className="border-t pt-3">
          <h4 className="font-medium">Adotante</h4>
          <p className="text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
          <p className="text-xs text-muted-foreground">Tel: {user.cellPhone}</p>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          <p>Último acompanhamento: {formattedLastCheck}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        {!deletedAt && (
          <>
            <Button variant="default" size="sm" onClick={updateCheck}>
              <Check className="h-4 w-4 " />
              Verificado hoje
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(_id)}
            >
              <Trash2 className="h-4 w-4" />
              Cancelar adoção
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
