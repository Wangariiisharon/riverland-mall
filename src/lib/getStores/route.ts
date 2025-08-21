import { client } from "@/lib/sanity";
import type { Stores } from "../../types/stores";

export async function getStores(): Promise<Stores[]> {
  return client.fetch<Stores[]>(`
      *[_type == "store"] | order(AddedAt desc) {
        _id,
        title,
        AddedAt,
        phoneNumber,
        storeNumber,
        openHours,
        "slug": slug.current,
        "logo": logo.asset->url,
        details,
        gallery[]{
          _type,
          "url": asset->url
        }
      }
    `);
}
