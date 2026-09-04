"use client";

import apiServer from "@/lib/api/client/api-server";
import { AUTH_ENDPOINTS } from "@/lib/endpoints";
//import apiServer from "@/lib/api/client/api-server";
//import { AUTH_ENDPOINTS } from "@/lib/api/endpoints";
import { useEffect, useState } from "react";

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    apiServer.post(AUTH_ENDPOINTS.auth.verify);
  }, []);


  if (!mounted) return null;

  return <>{children}</>;
}
