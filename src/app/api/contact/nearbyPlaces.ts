import { client } from "@/lib/sanity";

export async function getNearbyPlaces() {
  return client.fetch(`
      *[_type == "nearbyPlaces"] | order(AddedAt desc) {
        _id,
        title,
        AddedAt,
        "logoUrl": logo.asset->url
      }
    `);
}
