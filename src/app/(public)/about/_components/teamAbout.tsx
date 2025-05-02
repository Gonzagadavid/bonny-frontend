import Image from "next/image";
import { aboutData } from "@/data/about";

export default function TeamAbout() {
  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-12 text-center text-amber-600">
        {aboutData.team.title}
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {aboutData.team.members.map((member, index) => (
          <div key={index} className="text-center">
            <Image
              src={member.image}
              alt={member.name}
              width={240}
              height={240}
              className="rounded-full w-60 h-60 object-cover mx-auto mb-4"
            />
            <h3 className="font-bold text-3x1">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
