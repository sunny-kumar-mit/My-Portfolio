-- Create the table for contact messages
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text not null,
  file_url text
);

-- Enable Row Level Security (RLS)
alter table contact_messages enable row level security;

-- Create policy to allow public to insert messages
create policy "Allow public to insert messages"
  on contact_messages
  for insert
  with check (true);

-- STORAGE SETUP
-- Create a storage bucket 'contact-files'
insert into storage.buckets (id, name, public)
values ('contact-files', 'contact-files', true)
on conflict (id) do nothing;

-- Set up storage policies for 'contact-files' bucket
create policy "Allow public to upload files"
  on storage.objects
  for insert
  with check ( bucket_id = 'contact-files' );

create policy "Allow public to view files"
  on storage.objects
  for select
  using ( bucket_id = 'contact-files' );

