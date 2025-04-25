import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-24 relative overflow-hidden" id="sobre">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Texto no lado esquerdo */}
          <div className="lg:w-1/2 text-justify">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-amber-600 animate-fade-in">
              O Projeto Bonny
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in">
              <p>
                Fundado em <b>2018</b>, o projeto Bonny nasceu muito antes, impulsionado pelo carinho e dedicação aos animais em situação de risco. O nome Bonny foi escolhido em homenagem ao primeiro cachorrinho resgatado por nossa diretora.
              </p>
              
              <p className=" animate-fade-in">
                Resgatamos animais em condições vulneráveis, muitos chegando até nós debilitados e doentes. Eles recebem cuidados veterinários completos incluindo exames, tratamentos e cirurgias quando necessárias.
              </p>
              
              <p className=" animate-fade-in">
                Antes da adoção, realizamos entrevistas com os interessados, analisando o perfil tanto do adotante quanto do animal, garantindo uma adaptação harmoniosa.
              </p>
              
              <blockquote className="relative p-6 mt-8 italic bg-amber-50 rounded-lg border-l-4 border-amber-400 text-amber-800  animate-fade-in">
                <svg 
                  className="w-8 h-8 text-amber-400 absolute -top-5 -left-4" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="relative">
                  "Adotar é mais do que oferecer um lar — é dar uma segunda chance a um coração que já conheceu o abandono." 🐾❤️
                </p>
              </blockquote>
            </div>
          </div>

          {/* Imagem no lado direito */}
          <div className="lg:w-1/2  animate-fade-in">
          <div className="relative h-full min-h-[550px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/bonny.svg"
              alt="Cachorro resgatado pelo Projeto Bonny"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
          </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}