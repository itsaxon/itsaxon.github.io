'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import type { ComponentProps } from 'react';

export type Navigate = (to: string, options?: { replace?: boolean; scroll?: boolean }) => void;
type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to: string;
  navigate?: Navigate;
};

export function Link({ to, navigate: _navigate, ...props }: LinkProps) {
  void _navigate;
  return <NextLink href={to} {...props} />;
}

export function useNavigate(): Navigate {
  const router = useRouter();
  return useCallback(
    (to, { replace = false, scroll = true } = {}) => {
      const url = new URL(to, window.location.origin);
      // Native history is integrated with App Router. Keep search fields mounted while typing.
      if (
        url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '') &&
        !scroll
      ) {
        window.history[replace ? 'replaceState' : 'pushState'](null, '', to);
      } else {
        router[replace ? 'replace' : 'push'](to, { scroll });
      }
    },
    [router],
  );
}
