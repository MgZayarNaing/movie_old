// src/app/page.js

'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <h1>Welcome to the Next.js and Django Integration</h1>
    </div>
  );
}
