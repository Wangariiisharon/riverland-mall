import Image from "next/image";

const amenities = [
  { id: 1, name: "Fine Dining", icon: "/placeholder.png" },
  { id: 2, name: "Health & Wellness", icon: "/placeholder.png" },
  { id: 3, name: "Shopping", icon: "/placeholder.png" },
  { id: 4, name: "Entertainment", icon: "/placeholder.png" },
  { id: 5, name: "Outdoor Space", icon: "/placeholder.png" },
  { id: 6, name: "Petrol Station", icon: "/placeholder.png" },
  { id: 7, name: "Office Space", icon: "/placeholder.png" },
];

export default function Amenities() {
  return (
    <section className="py-6">
      <div className="text-center">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-10">Amenities</h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 justify-items-center">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex flex-col items-center">
              {/* Icon box */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <Image
                  src={amenity.icon}
                  alt={amenity.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              {/* Label */}
              <p className="mt-3 text-sm font-medium text-gray-800">
                {amenity.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
