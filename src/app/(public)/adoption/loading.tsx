import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { PawPattern } from "@/components/custom/background/pawPattern";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4e4d0] to-white">
      <section
        className="relative flex items-center justify-center overflow-hidden py-24"
        style={{
          background: "radial-gradient(circle, #f4923a 0%, #d94545 100%)",
        }}
      >
        <div className="absolute inset-0 z-0">
          <PawPattern />
        </div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre seu amigo
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Cada animal merece um lar amoroso. Conheça nossos animais esperando
            por uma família.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-16 -mt-10 relative z-20">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-[#f4e4d0]">
          <h2 className="text-xl font-semibold text-[#f4923a] mb-4">
            Filtrar por:
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Skeleton className="h-12 w-full sm:w-48" />
            <Skeleton className="h-12 w-full sm:w-36" />
            <Skeleton className="h-12 w-full sm:w-36" />
            <Skeleton className="h-12 w-full sm:w-36" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <div className="flex items-center bg-[#f8d7da] border border-[#f5c6cb] rounded-lg p-4 shadow-lg">
          <AlertTriangle className="h-6 w-6 sm:h-5 sm:w-5 text-[#d42b2b] mr-3" />
          <p className="text-sm text-[#e44545] flex-1 text-center">
            As adoções são realizadas após <strong>entrevista</strong> e{" "}
            <strong>assinatura de termo de responsabilidade.</strong>
            <br />
            <span>
              Parte dos custos veterinários podem ser repassados para os
              adotantes.
            </span>
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="h-full">
              <div className="h-full flex flex-col overflow-hidden bg-white border border-zinc-200 rounded-2xl">
                <Skeleton className="h-52 w-full rounded-t-2xl" />

                <div className="flex flex-col flex-grow p-5 space-y-3">
                  <Skeleton className="h-6 w-32" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-40" />
                  </div>

                  <div className="space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>

                <div className="p-4">
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            </div>
          ))}
      </section>

      <div className="w-full bg-[#f4923a]/10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
