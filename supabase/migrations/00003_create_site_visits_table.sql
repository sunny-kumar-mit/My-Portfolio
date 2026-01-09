-- Create a table to track website visits
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address TEXT,
    city TEXT,
    country TEXT,
    region TEXT,
    user_agent TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public visitors)
CREATE POLICY "Allow public insert to site_visits"
    ON public.site_visits
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow admins/authenticated users to view logs
CREATE POLICY "Allow authenticated view of site_visits"
    ON public.site_visits
    FOR SELECT
    TO authenticated
    USING (true);

-- Optional: Create an index on visited_at for faster analytics queries
CREATE INDEX IF NOT EXISTS idx_site_visits_visited_at ON public.site_visits(visited_at);
