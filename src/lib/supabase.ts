import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Photo uploads will be disabled.');
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
};

export const uploadPhoto = async (file: File, path: string) => {
  const supabase = getSupabase();
  if (!supabase) {
    console.error('Supabase not initialized');
    return null;
  }

  try {
    const { data, error } = await supabase.storage
      .from('customization-photos')
      .upload(`${path}/${Date.now()}-${file.name}`, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('customization-photos')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return null;
  }
};
