import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface LogData {
    ip?: string;
    city?: string;
    country_name?: string;
    region?: string;
    user_agent?: string;
}

export const useVisitorTracker = () => {
    useEffect(() => {
        const trackVisit = async () => {
            // Check if we already tracked this session to avoid spamming db on refresh
            const sessionKey = 'visitor_tracked_session';
            if (sessionStorage.getItem(sessionKey)) {
                return;
            }

            try {
                // 1. Get User Data (IP, Location)
                // Using ipapi.co (Free tier, no key required for low volume)
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                // 2. Prepare Payload
                const visitRecord = {
                    ip_address: data.ip,
                    city: data.city,
                    country: data.country_name,
                    region: data.region,
                    user_agent: navigator.userAgent,
                };

                // 3. Send to Supabase
                const { error } = await supabase
                    .from('site_visits')
                    .insert([visitRecord]);

                if (error) {
                    console.error('Error logging visit:', error);
                } else {
                    // Mark session as tracked
                    sessionStorage.setItem(sessionKey, 'true');
                }

            } catch (error) {
                console.error('Visitor tracking failed:', error);
                // Fail silently, don't impact user experience
            }
        };

        trackVisit();
    }, []);
};
