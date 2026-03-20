import { supabase } from '../config/supabase.js';

async function listCategories() {
  if (!supabase) {
    console.error('Supabase not configured');
    return;
  }
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
  } else {
    console.log('Categories:', JSON.stringify(data, null, 2));
  }
}

listCategories();
