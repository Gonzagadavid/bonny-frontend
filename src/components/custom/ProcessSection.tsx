export default function ProcessSection() {
    const processSteps = [
      { title: "Resgate", description: "Animais em condições vulneráveis recebem cuidados imediatos" },
      { title: "Tratamento", description: "Exames, cirurgias, vacinação e castração" },
      { title: "Adoção Responsável", description: "Entrevista e acompanhamento pós-adoção" },
    ];
  
    return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-amber-600">Nosso Processo</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-3 text-amber-600">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  