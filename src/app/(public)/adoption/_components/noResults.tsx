import Image from "next/image";

export default function NoResults() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <div className="relative w-full max-w-2xl h-96 mb-8">
        <Image
          src="/images/path/no-pets-found.svg"
          alt="Nenhum animal encontrado"
          fill
          className="object-contain"
        />
      </div>
      <p className="text-[#f4923a]/70 text-lg text-center">
        Nenhum animal encontrado com esses critérios.
      </p>
    </div>
  );
}
