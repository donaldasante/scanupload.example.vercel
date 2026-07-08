'use client';

import dynamic from 'next/dynamic';

/**
 * Client-only wrapper so `dynamic({ ssr: false })` can be used in a
 * Server Component page.  The @scanupload package accesses localStorage at
 * module initialisation, which would fail during server-side prerendering.
 */
const GeneralForm = dynamic(() => import('./GeneralForm'), { ssr: false });

export default function ClientPage() {
  return <GeneralForm />;
}
