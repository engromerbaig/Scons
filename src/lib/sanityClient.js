// lib/sanityClient.js
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'y7evdl39', // replace this with your actual Sanity project ID
  dataset: 'production',        // or your dataset name
  useCdn: true,                 // `true` to use cached data for faster responses
apiVersion: '2025-05-31',
});

export default client;
