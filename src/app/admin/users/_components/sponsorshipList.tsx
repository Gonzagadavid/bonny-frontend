import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sponsorship } from "../_lib/listSponsorshipByUser";

export function SponsorshipList({
  sponsorships,
}: {
  sponsorships: Sponsorship[];
}) {
  if (!sponsorships.length) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Apadrinhamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Nenhum apadrinhamento encontrado.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          Apadrinhamentos ({sponsorships.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sponsorships.map((sponsorship) => (
              <Card key={sponsorship._id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      sponsorship.dog.imageProfile ||
                      "/placeholder.svg?height=192&width=384"
                    }
                    alt={sponsorship.dog.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        sponsorship.dog.available ? "default" : "secondary"
                      }
                    >
                      {sponsorship.dog.available
                        ? "Disponível"
                        : "Indisponível"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {sponsorship.dog.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Idade</p>
                      <p>
                        {sponsorship.dog.age}{" "}
                        {sponsorship.dog.age === 1 ? "ano" : "anos"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Porte</p>
                      <p>{sponsorship.dog.size}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Raça</p>
                      <p>{sponsorship.dog.breed}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pelagem</p>
                      <p>{sponsorship.dog.fell}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
