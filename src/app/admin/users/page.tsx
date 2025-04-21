import TableUsers from "./_components/tableUsers";

export default function RegisterDogPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Usuários</h2>

        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <TableUsers />
        </div>
      </section>
    </div>
  );
}
