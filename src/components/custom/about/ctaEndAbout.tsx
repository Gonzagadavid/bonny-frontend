import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { aboutData } from "@/data/about";

export default function CtaEndAbout() {
  return (
    <section className="relative bg-[--color-red-orange] text-white py-10 text-center">
      <div className="absolute top-0 left-0 w-full h-10 -mb-1 transform z-10">
        <Image
          src="/images/path/waves.svg"
          alt="Divisor decorativo"
          width={500}
          height={50}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4">
        <h2 className="sm:text-2xl md:text-3xl font-bold mb-6">
          {aboutData.cta.title}
        </h2>
        <Button
          asChild
          variant="secondary"
          className="bg-amber-600 hover:bg-amber-700 text-white hover:text-white focus:text-white active:text-white"
        >
          <Link href={aboutData.cta.link}>{aboutData.cta.buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}
