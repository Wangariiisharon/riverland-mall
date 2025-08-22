import Image from "next/image";

const amenities = [
  { id: 1, name: "Fine Dining", icon: "/dining_amenities.svg" },
  { id: 2, name: "Health & Wellness", icon: "/health_amenities.svg" },
  { id: 3, name: "Shopping", icon: "/shopping_amenities.svg" },
  { id: 4, name: "Entertainment", icon: "/entertainment_amenities.svg" },
  { id: 5, name: "Outdoor Space", icon: "/outdoors_amenities.svg" },
  { id: 6, name: "Petrol Station", icon: "/petrolstation_amenities.svg" },
  { id: 7, name: "Office Space", icon: "/office_amenities.svg" },
  { id: 8, name: "Gym", icon: "/gym_amenities.svg" },
];

export default function Amenities() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-12">
      <div className="text-center max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#00032E] mb-10">
          Amenities
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 sm:gap-8">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="flex flex-col items-center text-center"
            >
              {/* Icon wrapper with responsive size */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                <Image
                  src={amenity.icon}
                  alt={amenity.name}
                  fill
                  sizes="(max-width: 640px) 64px,
                         (max-width: 768px) 80px,
                         (max-width: 1024px) 96px,
                         120px"
                  className="object-contain"
                />
              </div>
              {/* Label */}
              <p className="mt-3 text-xs sm:text-sm md:text-base font-medium text-[#00032E]">
                {amenity.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
