import { notFound } from 'next/navigation';
import Image from 'next/image';
import ImageGallery from '@/components/custom/adoption/imageGallery';

export default async function AnimalsDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const mockAnimal = {
    id: '123',
    name: 'Buddy',
    age: 3,
    size: 'Médio',
    breed: 'Beagle',
    fellColor: 'Tricolor',
    fell: 'Curto',
    temperament: 'Amigável e curioso',
    situation: 'Disponível para adoção',
    gender: 'Macho',
    history: 'Encontrado vagando em uma rua movimentada. Buddy foi resgatado por nossos voluntários quando estava desorientado e assustado. Após cuidados veterinários e muito carinho, ele se transformou em um cão alegre e cheio de energia, pronto para encontrar um lar amoroso.',
    imageProfile: '/images/buddy-profile.jpg',
    images: [
      '/images/buddy-image1.jpg',
      '/images/buddy-image2.jpg',
      '/images/buddy-image3.jpg',
    ],
    available: true,
  };

  if (id !== mockAnimal.id) {
    return notFound();
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4e4d0' }}>
      <section className="bg-[#f4923a] sm:bg-amber-600 py-6  shadow-md mt-0 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide drop-shadow">
       Conheça {mockAnimal.name} 🐶
      </h1>
    </section>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-96 transition-all duration-500 ease-in-out transform hover:scale-105">
              <Image
                src={mockAnimal.imageProfile}
                alt={mockAnimal.name}
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>

            <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{mockAnimal.name}</h2>
              <p className="mt-1 text-lg font-semibold" style={{ color: '#dc7011' }}>
                {mockAnimal.situation}
              </p>
            </div>

            {mockAnimal.available && (
              <span
                className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold text-white transition-all duration-300 ease-in-out transform bg-green-600 hover:bg-green-700 shadow-md hover:scale-105"
              >
                Disponível
              </span>
            )}
          </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Idade</p>
                  <p className="mt-1 text-sm text-gray-900">{mockAnimal.age} anos</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Porte</p>
                  <p className="mt-1 text-sm text-gray-900">{mockAnimal.size}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Raça</p>
                  <p className="mt-1 text-sm text-gray-900">{mockAnimal.breed}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Cor do Pelo</p>
                  <p className="mt-1 text-sm text-gray-900">{mockAnimal.fellColor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo de Pelo</p>
                  <p className="mt-1 text-sm text-gray-900">{mockAnimal.fell}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Temperamento</p>
                  <p className="mt-1 text-sm text-gray-900">{mockAnimal.temperament}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Sexo</p>
                  <p className="mt-1 text-sm text-gray-900">{mockAnimal.gender}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">História</h3>
                <p className="mt-2 text-sm text-gray-600">{mockAnimal.history}</p>
                <p className="mt-4 text-sm text-gray-700 bg-orange-100 p-4 rounded-md border-l-4 border-orange-500">
                <strong>Aviso:</strong> As adoções são realizadas <strong>mediante entrevista e assinatura de termo de responsabilidade</strong>. Além disso, parte das despesas com os cuidados veterinários pode ser repassada aos adotantes, garantindo a continuidade do acolhimento de novos animais.

              </p>
              </div>

              <div className="mt-8">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="w-full rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white transition-all duration-300 ease-in-out transform bg-[#c03619] hover:bg-[#d94545] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#803033]"
                  >
                    Quero adotar {mockAnimal.name}
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white transition-all duration-300 ease-in-out transform bg-[#f4923a] hover:bg-[#dc7011] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff903c]"
                  >
                    Quero apadrinhar {mockAnimal.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {mockAnimal.images.length > 1 && (
          <div className="border-t border-gray-200 px-6 py-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mais fotos de {mockAnimal.name}</h3>
            <ImageGallery images={mockAnimal.images} name={mockAnimal.name} />
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
