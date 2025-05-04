import { getCandidaciesByUser } from "@/app/admin/users/_lib/getCandidaciesByUser";
import { CandidacyStatus } from "@/types/enums";
import {
  Heart,
  Clock,
  CheckCircle2,
  XCircle,
  PawPrint,
  MessageCircle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import { formatDate } from "@/utils/formatDate";
import { auth } from "@/app/api/auth/auth";

export default async function DashboardPageUser() {
  const session = await auth();

  const userId = session?.user?.userId;

  const candidacies = await getCandidaciesByUser(userId);

  if (candidacies.length === 0) {
    return (
      <Card className="max-w-md mx-auto mt-8 text-center bg-[#f4e4d0]/50">
        <CardHeader className="pb-2">
          <div className="mx-auto bg-[#f4923a]/20 p-4 rounded-full w-fit">
            <PawPrint className="h-12 w-12 text-[#c03619]" />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2 text-2xl text-[#803033]">
            Histórico de Adoção
          </CardTitle>
          <CardDescription className="mb-4 text-base text-[#803033]/80">
            Ainda não encontramos nenhum processo de adoção iniciado por você.
          </CardDescription>
          <CardDescription className="text-base text-[#803033]/80">
            Quando encontrar um amiguinho que conquistar seu coração, sua
            jornada aparecerá aqui!
          </CardDescription>
          <Button className="mt-6 gap-2 bg-amber-600 hover:bg-amber-700">
            <Link href={Routes.ADOPTION}>Conhecer nossos animais</Link>
            <PawPrint className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-2 mt-10">
          <Heart className="h-8 w-8 text-[#ed8931]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mt-10 text-[#eb8a34]">
          Histórico de Adoção
        </h1>
      </div>

      <div className="grid gap-8">
        {candidacies.map(({ _id, dog, status, createdAt }) => {
          return (
            <Card
              key={_id}
              className="hover:shadow-md transition-shadow overflow-hidden bg-[#f4e4d0]/30 border-[#f4923a] mb-5"
            >
              <div className="grid md:grid-cols-3 gap-0">
                <div className="p-6 bg-gradient-to-br from-[#f4e4d0]/70 to-[#f4e4d0]/30 border-r border-[#f4923a]/20">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="w-[60%] h-[60%] mb-4 border-4 border-[#f4923a]/30 shadow-md">
                      <AvatarImage
                        src={dog.imageProfile || "/images/path/placeholder.svg"}
                        alt={dog.name}
                      />
                      <AvatarFallback className="bg-[#f4923a]/20 text-[#c03619] text-xl font-bold">
                        {dog.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl text-[#803033]">
                      {dog.name}
                    </CardTitle>
                    <Badge className="mt-2 gap-1 bg-[#f4923a]/20 text-[#c03619] hover:bg-[#f4923a]/30">
                      <PawPrint className="h-3 w-3" />
                      {dog.breed}
                    </Badge>
                  </div>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#803033]">
                        Processo de Adoção
                      </h2>
                      <p className="text-sm text-[#803033]/70">
                        Iniciado em {formatDate(createdAt)}
                      </p>
                    </div>
                    <Badge
                      className={`gap-1 ${
                        status === CandidacyStatus.PENDING ||
                        status === CandidacyStatus.APPROVED
                          ? "bg-[#f4923a]/20 text-[#c03619] hover:bg-[#f4923a]/30"
                          : status === CandidacyStatus.CONCLUDED
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-[#d94545]/10 text-[#d94545] hover:bg-[#d94545]/20"
                      }`}
                    >
                      {(status === CandidacyStatus.PENDING ||
                        status === CandidacyStatus.APPROVED) && (
                        <Clock className="h-4 w-4" />
                      )}
                      {status === CandidacyStatus.CONCLUDED && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      {(status === CandidacyStatus.REJECTED ||
                        status === CandidacyStatus.CANCELED) && (
                        <XCircle className="h-4 w-4" />
                      )}
                      {(status === CandidacyStatus.PENDING ||
                        status === CandidacyStatus.APPROVED) &&
                        "Em análise"}
                      {status === CandidacyStatus.CONCLUDED && "Concluído"}
                      {(status === CandidacyStatus.REJECTED ||
                        status === CandidacyStatus.CANCELED) &&
                        "Não aprovado"}
                    </Badge>
                  </div>

                  <Separator className="my-4 bg-[#f4923a]/30" />

                  <div className="space-y-4">
                    <div className="rounded-lg bg-white p-5 border border-[#f4923a]/30 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#f4923a]"></div>
                      <h3 className="font-medium mb-3 flex items-center gap-2 text-[#803033]">
                        <MessageCircle className="h-5 w-5 text-[#c03619]" />
                        Mensagem da equipe
                      </h3>
                      <p className="text-sm leading-relaxed text-[#803033]/90">
                        {status === CandidacyStatus.PENDING ||
                        status === CandidacyStatus.APPROVED ? (
                          <>
                            🕵️‍♀️ Estamos analisando com carinho sua solicitação
                            para adotar <strong>{dog.name}</strong>! 💖 Nossa
                            equipe está avaliando a compatibilidade para
                            garantir uma união feliz e segura. 🐶✨ Esse
                            processo leva em média{" "}
                            <strong>3 a 7 dias úteis</strong>. Agradecemos sua
                            paciência! 🙏
                          </>
                        ) : status === CandidacyStatus.CONCLUDED ? (
                          <>
                            🎉 <strong>Parabéns!</strong> Você concluiu o
                            processo de adoção do <strong>{dog.name}</strong>!
                            Estamos muito felizes por essa nova amizade que
                            começa. 🐶❤️
                            <br />
                            Agora daremos início ao acompanhamento do pós-adoção
                            para garantir que tudo continue indo bem. 🐾
                          </>
                        ) : (
                          <>
                            💛 O{" "}
                            <strong className="dog-name">{dog.name}</strong>{" "}
                            encontrou um novo lar! 🏡 Agradecemos imensamente o
                            seu carinho e interesse. Ainda há muitos outros
                            animaizinhos incríveis esperando por uma família!{" "}
                            <Link
                              href={Routes.ADOPTION}
                              className="text-orange-600 underline font-medium hover:text-orange-700 transition-colors"
                            >
                              Conheça todos aqui
                            </Link>{" "}
                            🐾✨
                          </>
                        )}
                      </p>
                    </div>

                    {status === CandidacyStatus.REJECTED && (
                      <Button className="w-full mt-4 gap-2 bg-amber-600 hover:bg-amber-700 text-white">
                        <Link href={Routes.ADOPTION}>
                          Ver outros animais disponíveis
                        </Link>
                        <PawPrint className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
