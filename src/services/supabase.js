import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nkafbbdfcxpofltefvmx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rYWZiYmRmY3hwb2ZsdGVmdm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMzQ0NzEsImV4cCI6MjAzNDgxMDQ3MX0.XdyBx6KraR0wBytFY7j69mdP2jB9T0GC4NUmFbwnNyw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
