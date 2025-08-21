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
    <section className="py-6">
      <div className="text-center">
        {/* Title */}
        <h2 className="text-lg font-semibold text-[#00032E] mb-10">
          Amenities
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 justify-items-center">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex flex-col items-center">
              {/* Icon box */}
              <div className=" rounded-lg flex items-center justify-center">
                <Image
                  src={amenity.icon}
                  alt={amenity.name}
                  width={88}
                  height={92}
                  className="object-contain"
                />
              </div>
              {/* Label */}
              <p className="mt-3 text-sm font-medium text-[#00032E]">
                {amenity.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
