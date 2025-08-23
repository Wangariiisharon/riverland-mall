import type { PortableTextBlock } from "@portabletext/types";

export interface Stores {
  _id: string;
  title: string;
  AddedAt: string;
  phoneNumber: string;
  storeNumber: string;
  openHours: string;
  slug: string;
  logo?: string;
  details: PortableTextBlock[];
  gallery: {
    _type: string;
    url: string;
  }[];
  category: string;
}

// categoryMap.ts
export const CategoryMap: Record<string, string> = {
  finedining: "Fine Dining",
  healthwellness: "Health & Wellness",
  shopping: "Shopping",
  entertainment: "Entertainment",
  outdoor: "Outdoor Space",
  petrolstation: "Petrol Station",
  officespace: "Office Space",
  gym: "Gym",
};
