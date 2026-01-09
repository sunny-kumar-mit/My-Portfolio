
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Uploads an image file to Supabase Storage
 * @param file The file to upload
 * @returns The public URL of the uploaded file
 */
export const uploadImageToSupabase = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('contact-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('contact-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Uploads a file (Image, PDF, ZIP) to Supabase Storage
 * @param file The file to upload
 * @returns The public URL of the uploaded file
 */
export const uploadFileToSupabase = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('contact-files')
      .upload(filePath, file);

    if (uploadError) {
      // Improve 400 error message which usually means bucket missing
      if (uploadError.toString().includes('400') || (uploadError as any).statusCode === '400') {
        throw new Error('Storage bucket "contact-files" not found. Please run fix_storage.sql in Supabase.');
      }
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('contact-files')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error: any) {
    console.error('Error uploading file:', error);
    if (error.message?.includes('bucket')) {
      throw error; // Pass our custom error through
    }
    throw new Error('File upload failed. Please try again.');
  }
};

