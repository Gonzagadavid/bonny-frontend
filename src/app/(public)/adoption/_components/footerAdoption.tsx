export default function FooterAdoption() {
  return (
    <footer className="bg-[#c03619] text-white text-center py-10 ">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} Projeto Bonny. Todos os direitos
          reservados.
        </p>
        <p className="text-xs mt-1">
          Feito com ❤️ para promover a adoção responsável.
        </p>
      </div>
    </footer>
  );
}
