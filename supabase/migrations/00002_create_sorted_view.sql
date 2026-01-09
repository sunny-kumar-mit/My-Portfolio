-- Create a view to see messages sorted by date (Newest First)
CREATE OR REPLACE VIEW sorted_contact_messages AS
SELECT *
FROM contact_messages
ORDER BY created_at DESC;

-- Grant access to the view (optional, if you want to access it via API)
-- GRANT SELECT ON sorted_contact_messages TO anon, authenticated, service_role;
