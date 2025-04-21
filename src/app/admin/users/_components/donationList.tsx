import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency, formatDate } from "@/utils/formatDate";
import { Donations } from "../_lib/listDonationByUser";

export function DonationList({ donations }: { donations: Donations[] }) {
  if (!donations.length) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Doações</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Nenhuma doação encontrada.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalDonations = donations.reduce(
    (total, dog) => total + dog.donations.reduce((sum, d) => sum + d.value, 0),
    0,
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Doações ({donations.length})</span>
          <Badge variant="outline">
            Total: {formatCurrency(totalDonations)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {donations.map((dog) => (
              <Card key={dog._id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-48 md:h-auto md:w-1/3">
                    <Image
                      src={
                        dog.imageProfile ||
                        "/placeholder.svg?height=192&width=192"
                      }
                      alt={dog.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg">{dog.name}</h3>
                      <Badge variant={dog.available ? "default" : "secondary"}>
                        {dog.available ? "Disponível" : "Indisponível"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Idade</p>
                        <p>
                          {dog.age} {dog.age === 1 ? "ano" : "anos"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Porte</p>
                        <p>{dog.size}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        Histórico de doações
                      </h4>
                      <div className="space-y-2">
                        {dog.donations.map((donation, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm border-b pb-1 last:border-0"
                          >
                            <span>{formatDate(donation.createdAt)}</span>
                            <span className="font-medium">
                              {formatCurrency(donation.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
