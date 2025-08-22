// hooks/useStore.ts
import { client } from "@/lib/sanity";
import { Stores } from "../types/stores";
import { useEffect, useState } from "react";

interface UseStoreProps {
  slug: string;
}

interface UseStoreReturn {
  store: Stores | null;
  loading: boolean;
  error: string | null;
  selectedImage: string;
  setSelectedImage: (url: string) => void;
  refetch: () => Promise<void>;
}

function useStore({ slug }: UseStoreProps): UseStoreReturn {
  const [store, setStore] = useState<Stores | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState("");

  const fetchStore = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await client.fetch(
        `*[_type == "store" && slug.current == $slug][0]{
          _id,
          title,
          AddedAt,
          phoneNumber,
          storeNumber,
          openHours,
          "logo": logo.asset->url,
          details,
          gallery[]{ "url": asset->url }
        }`,
        { slug }
      );

      if (!data) {
        setError("Store not found");
        setStore(null);
        return;
      }

      setStore(data);

      // Auto-select first image if gallery exists
      if (data.gallery && data.gallery.length > 0) {
        setSelectedImage(data.gallery[0].url);
      } else {
        setSelectedImage("");
      }
    } catch (err) {
      console.error("Error fetching store:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load store data"
      );
      setStore(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchStore();
    }
  }, [slug]);

  return {
    store,
    loading,
    error,
    selectedImage,
    setSelectedImage,
    refetch: fetchStore,
  };
}

export default useStore;
