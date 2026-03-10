import { createClient, SupabaseClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _adminClient: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAdminClient(): SupabaseClient<any> | null {
  if (_adminClient) return _adminClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey || url === "placeholder") return null;
  _adminClient = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _adminClient;
}

export async function uploadArticleImage(
  imageBase64: string,
  filename: string
): Promise<string | null> {
  const client = getAdminClient();
  if (!client) return null;

  try {
    const buffer = Buffer.from(imageBase64, "base64");
    const { error } = await client.storage
      .from("article-images")
      .upload(filename, buffer, {
        contentType: "image/jpeg",
        cacheControl: "31536000",
        upsert: false,
      });

    if (error) {
      console.error("[Storage] 업로드 실패:", error.message);
      return null;
    }

    const { data } = client.storage.from("article-images").getPublicUrl(filename);
    return data.publicUrl;
  } catch (e) {
    console.error("[Storage] 예외:", e);
    return null;
  }
}
