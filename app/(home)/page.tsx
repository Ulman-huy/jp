import Link from "next/link";

const services = [
  {
    name: "Hiragana",
    path: "/sub-hiragana",
  },
];

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-[150px] text-center font-semibold">JP</h1>
      <div className="mt-10 max-w-[600px] mx-auto">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.path}
            className="text-2xl font-semibold p-4 bg-white/5 w-full block rounded-lg"
          >
            {service.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
