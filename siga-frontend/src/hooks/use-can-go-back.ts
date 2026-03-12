import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

let internalHistoryCount = 0;

export function useCanGoBack() {
  const pathname = usePathname();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    internalHistoryCount++;
    setCanGoBack(internalHistoryCount > 1);
  }, [pathname]);

  return canGoBack;
}
