"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCandidaciesByUser } from "@/app/admin/users/_lib/getCandidaciesByUser";
import type { Candidacy } from "@/types";
import { CandidacyStatus } from "@/types/enums";
import {
  Heart,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  PawPrint,
  Calendar,
  Weight,
  UserIcon as Male,
  UserIcon as Female,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Routes } from "@/constants/routes";

const DashboardPageUser = () => {
  const { data: session, status } = useSession()
  const [candidaturas, setCandidaturas] = useState<Candidacy[]>([])
  const [carregando, setCarregando] = useState(true)

  const userId = session?.user?.userId

  useEffect(() => {
    if (!userId) return

    const buscarCandidaturas = async () => {
      try {
        const data = await getCandidaciesByUser(userId)
        setCandidaturas(data)
      } catch (error) {
        console.error("Erro ao buscar candidaturas:", error)
      } finally {
        setCarregando(false)
      }
    }

    buscarCandidaturas()
  }, [userId])

  if (status === "loading" || carregando) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 mt-10">
        <div className="relative h-16 w-16">
          <Loader2 className="h-16 w-16 animate-spin text-[#f4923a] absolute" />
        </div>
        <p className="text-lg font-medium">Buscando suas informações...</p>
        <div className="w-full max-w-4xl space-y-4">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <Card className="max-w-md mx-auto mt-8 text-center bg-[#f4e4d0]/50">
        <CardHeader className="pb-2">
          <div className="mx-auto bg-[#f4923a]/20 p-4 rounded-full w-fit">
            <Heart className="h-12 w-12 text-[#c03619]" />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-4 text-2xl text-[#803033]">Acesso necessário</CardTitle>
          <CardDescription className="text-base text-[#803033]/80">
            Para acompanhar suas jornadas de adoção, precisamos que você faça login. Cada patinha merece um lar cheio de
            amor!
          </CardDescription>
          <Button className="mt-6 gap-2 bg-amber-600 hover:bg-amber-700">
            Fazer login
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (candidaturas.length === 0) {
    return (
      <Card className="max-w-md mx-auto mt-8 text-center bg-[#f4e4d0]/50">
        <CardHeader className="pb-2">
          <div className="mx-auto bg-[#f4923a]/20 p-4 rounded-full w-fit">
            <PawPrint className="h-12 w-12 text-[#c03619]" />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2 text-2xl text-[#803033]">Histórico de Adoção</CardTitle>
          <CardDescription className="mb-4 text-base text-[#803033]/80">
            Ainda não encontramos nenhum processo de adoção iniciado por você.
          </CardDescription>
          <CardDescription className="text-base text-[#803033]/80">
            Quando encontrar um amiguinho que conquistar seu coração, sua jornada aparecerá aqui!
          </CardDescription>
          <Button className="mt-6 gap-2 bg-amber-600 hover:bg-amber-700">
            Conhecer nossos animais
            <PawPrint className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-2 mt-10">
          <Heart className="h-8 w-8 text-[#ed8931]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mt-10 text-[#eb8a34]">Histórico de Adoção</h1>
      </div>

      <div className="grid gap-8">
        {candidaturas.map(({ _id, dog, status, createdAt = new Date() }) => {
          return (
            <Card
              key={_id}
              className="hover:shadow-md transition-shadow overflow-hidden bg-[#f4e4d0]/30 border-[#f4923a] mb-5"
            >
              <div className="grid md:grid-cols-3 gap-0">
                <div className="p-6 bg-gradient-to-br from-[#f4e4d0]/70 to-[#f4e4d0]/30 border-r border-[#f4923a]/20">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="w-[60%] h-[60%] mb-4 border-4 border-[#f4923a]/30 shadow-md">
                      <AvatarImage src={dog.imageProfile || "/iamges/path/placeholder.svg"} alt={dog.name} />
                      <AvatarFallback className="bg-[#f4923a]/20 text-[#c03619] text-xl font-bold">
                        {dog.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl text-[#803033]">{dog.name}</CardTitle>
                    <Badge className="mt-2 gap-1 bg-[#f4923a]/20 text-[#c03619] hover:bg-[#f4923a]/30">
                      <PawPrint className="h-3 w-3" />
                      {dog.breed}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#f4923a]/20 p-1.5 rounded-full">
                        <Calendar className="h-4 w-4 text-[#c03619]" />
                      </div>
                      <span className="text-[#803033]">
                        {dog.age} {dog.age === 1 ? "ano" : "anos"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#f4923a]/20 p-1.5 rounded-full">
                        <Weight className="h-4 w-4 text-[#c03619]" />
                      </div>
                      <span className="text-[#803033]">Porte {dog.size}</span>
                    </div>
                    {/*<div className="flex items-center gap-3">
                      <div className="bg-[#f4923a]/20 p-1.5 rounded-full">
                        {dog.gender === "M" ? (
                          <Male className="h-4 w-4 text-[#c03619]" />
                        ) : (
                          <Female className="h-4 w-4 text-[#c03619]" />
                        )}
                      </div>
                      <span className="text-[#803033]">{dog.gender === "M" ? "Macho" : "Fêmea"}</span>
                    </div>*/}
                    <div className="flex items-center gap-3">
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#803033]">Processo de Adoção</h2>
                      <p className="text-sm text-[#803033]/70">
                        ID: {_id.slice(0, 8).toUpperCase()} • Iniciado em {new Date(createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      className={`gap-1 ${
                        status === CandidacyStatus.PENDING
                          ? "bg-[#f4923a]/20 text-[#c03619] hover:bg-[#f4923a]/30"
                          : status === CandidacyStatus.APPROVED
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-[#d94545]/10 text-[#d94545] hover:bg-[#d94545]/20"
                      }`}
                    >
                      {status === CandidacyStatus.PENDING && <Clock className="h-4 w-4" />}
                      {status === CandidacyStatus.APPROVED && <CheckCircle2 className="h-4 w-4" />}
                      {status === CandidacyStatus.REJECTED && <XCircle className="h-4 w-4" />}
                      {status === CandidacyStatus.PENDING && "Em análise"}
                      {status === CandidacyStatus.APPROVED && "Aprovado"}
                      {status === CandidacyStatus.REJECTED && "Não aprovado"}
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
                      {status === CandidacyStatus.PENDING ? (
                        <>
                          🕵️‍♀️ Estamos analisando com carinho sua solicitação para adotar{" "}
                          <strong>{dog.name}</strong>! 💖 Nossa equipe está avaliando a compatibilidade para garantir uma união feliz e segura. 🐶✨ Esse processo leva em média{" "}
                          <strong>3 a 7 dias úteis</strong>. Agradecemos sua paciência! 🙏
                        </>
                      ) : status === CandidacyStatus.APPROVED ? (
                        <>   🎉 <strong>Parabéns!</strong> Seu pedido para adotar <strong>{dog.name}</strong> foi aprovado! Nossa equipe entrará em contato dentro de <strong>48 horas</strong> para agendarmos a entrevista e os próximos passos. Fique tranquilo(a), estamos acompanhando tudo com muito cuidado para garantir que tudo aconteça da melhor forma! 🐶✨
                        </>
                      ) : (
                       <>
                        Queremos agradecer muito pelo seu interesse em adotar <strong className="dog-name">{dog.name}</strong>. 🐾
                        Após uma avaliação cuidadosa, sentimos que, neste momento, essa não seria a melhor opção para o bem-estar do animal. 🐶
                        Isso não reflete de maneira alguma em você como adotante, mas sim em garantir que <strong className="dog-name">{dog.name}</strong> encontre o lar mais adequado. 🌟
                        Fique à vontade para conhecer <Link href={Routes.ADOPTION} className="text-orange-600 underline font-medium hover:text-orange-700 transition-colors"  >outros animais</Link> 🐕✨ que possam se adaptar melhor ao seu perfil. Estamos aqui para ajudar! 💖
                       </>
                      )}
                      </p>
                    </div>

                    {status === CandidacyStatus.APPROVED && (
                      <Button className="w-full mt-4 gap-2 bg-amber-600 hover:bg-amber-700">
                            ✅ Sua candidatura foi aprovada! A ONG entrará em contato em breve.
                      </Button>
                    )}

                    {status === CandidacyStatus.REJECTED && (
                      <Button className="w-full mt-4 gap-2 bg-amber-600 hover:bg-amber-700 text-white">
                        Ver outros animais disponíveis
                        <PawPrint className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPageUser
