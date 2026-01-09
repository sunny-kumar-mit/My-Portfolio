
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env vars manually since dotenv might not be installed
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = Object.fromEntries(
    envContent
        .split('\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .map(line => line.split('='))
);

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStorage() {
    console.log('--- Checking Supabase Storage ---');

    // 1. List Buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
        console.error('Error listing buckets:', bucketsError.message);
        return;
    }

    console.log('Available Buckets:', buckets.map(b => `${b.name} (public: ${b.public})`));

    const contactFilesBucket = buckets.find(b => b.name === 'contact-files');

    if (!contactFilesBucket) {
        console.error('❌ Bucket "contact-files" NOT FOUND.');
        console.log('   -> Please run the SQL script to create the bucket.');
    } else {
        console.log('✅ Bucket "contact-files" exists.');

        // 2. Test Upload (Small text file)
        const testFileName = `test_${Date.now()}.txt`;
        const { error: uploadError } = await supabase.storage
            .from('contact-files')
            .upload(testFileName, 'test content', {
                contentType: 'text/plain',
                upsert: true
            });

        if (uploadError) {
            console.error('❌ Upload Test Failed:', uploadError.message);
            console.log('   -> Check your RLS policies for the bucket.');
            if (uploadError.context) console.log('   Context:', uploadError.context);
        } else {
            console.log('✅ Upload Test Passed.');

            // Cleanup
            await supabase.storage.from('contact-files').remove([testFileName]);
        }
    }
}

checkStorage().catch(console.error);
