-- 1. Create the 'contact-files' bucket
insert into storage.buckets (id, name, public)
values ('contact-files', 'contact-files', true)
on conflict (id) do nothing;

-- 2. Enable RLS (Security) on the bucket
-- Note: Policies must be created on 'storage.objects'

-- 3. Policy: Allow Anyone (Public) to Upload Files
create policy "Allow public to upload contact files"
  on storage.objects
  for insert
  with check ( bucket_id = 'contact-files' );

-- 4. Policy: Allow Anyone (Public) to View Files
create policy "Allow public to view contact files"
  on storage.objects
  for select
  using ( bucket_id = 'contact-files' );

-- 5. Verify it worked (Optional - checking via SQL)
select * from storage.buckets where id = 'contact-files';
