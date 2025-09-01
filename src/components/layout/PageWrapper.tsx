
'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ x: '100vw', opacity: 0 }}
                animate={{ x: '0', opacity: 1 }}
                exit={{ x: '-100vw', opacity: 0 }}
                transition={{
                    type: 'tween',
                    ease: 'anticipate',
                    duration: 0.5,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
