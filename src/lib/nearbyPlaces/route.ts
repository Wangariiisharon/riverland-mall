import { client } from "@/lib/sanity";
import type { NearbyPlace } from "../../types/nearby_places";

export async function getNearbyPlaces(): Promise<NearbyPlace[]> {
  return client.fetch<NearbyPlace[]>(`
    *[_type == "nearbyPlaces"] | order(AddedAt desc) {
      _id,
      title,
      AddedAt,
      "logoUrl": logo.asset->url
    }
  `);
}
