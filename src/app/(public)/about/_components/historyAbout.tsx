import { aboutData } from "@/data/about";

export default function HistoryAbout() {
  return (
    <section className="container mx-auto py-24 px-4 max-w-7xl animate-fade-in">
      <div className="flex flex-col gap-16">
        <div className="w-full">
          <h2 className="text-4xl font-bold mb-8 text-amber-600 text-center lg:text-left">
            {aboutData.history?.title}
          </h2>

          <div className="columns-1 md:columns-2 gap-8 space-y-6 text-gray-700">
            {aboutData.history?.paragraphs?.map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-base text-justify leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {[
            { value: "500+", label: "Animais resgatados" },
            { value: "80", label: "Sob cuidados" },
            { value: "400+", label: "Adoções realizadas" },
            { value: "10", label: "Voluntários ativos" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#f4923a] to-[#dc7011] p-6 rounded-xl text-center text-white transition-transform duration-300 hover:scale-[1.03] shadow-lg"
            >
              <p className="text-5xl font-bold mb-2">{item.value}</p>
              <p className="text-white text-sm md:text-base">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
