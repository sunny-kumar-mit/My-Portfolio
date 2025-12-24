import { supabase } from './supabase';

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export const contactApi = {
  // Submit contact form
  async submitContact(data: Omit<ContactSubmission, 'id' | 'created_at'>) {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([data])
      .select()
      .maybeSingle();

    if (error) throw error;
    return result;
  },

  // Get all contact submissions (for admin purposes if needed)
  async getAllSubmissions() {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },
};
