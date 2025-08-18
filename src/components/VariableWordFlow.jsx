import React, { useMemo, useRef, useState, useLayoutEffect } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const AFFIRMATION_PHRASES = [
    'I am worthy of love and care',
    'Their need for space does not mean rejection',
    'My feelings are valid and understandable',
    'I am not defined by someone else’s responses',
    'I am safe even when I feel uncertain',
    'I can take things one step at a time',
    'I am enough exactly as I am',
    'Distance does not always mean danger',
    'My needs matter and I can honor them',
    'I can give myself the reassurance I seek',
    'It’s okay to feel anxious and still be okay',
    'I deserve a secure and steady love',
    'My worth is not measured by someone else’s attention',
    'I am stronger than my anxious thoughts'
];

function hashToUnitInterval(input) {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0) / 4294967295;
}

/**
 * VariableWordFlow (packed only)
 * Absolute-position skyline packing to tightly fit words with no gaps.
 * Preserves input order while minimizing both vertical and horizontal space.
 */
function VariableWordFlow({
                              text,
                              minFontRem = 0.6,
                              maxFontRem = 5.0,
                              lineHeight = 0.6,
                              align = 'left',
                              maxWidth = '800px',
                              seed = 'default',
                              packedUnitPx = 2, // granularity of the skyline in pixels (lower = tighter)
                              packedXGapPx = 0,
                              packedYGapPx = 0,
                              scrollActive = false
                          }) {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [floatingPhrase, setFloatingPhrase] = useState(null);
    const phraseTimerRef = useRef(null);
    const [explosionOrigin, setExplosionOrigin] = useState(null);
    const [isExploding, setIsExploding] = useState(false);
    const words = useMemo(() => (typeof text === 'string' ? text.trim().split(/\s+/) : []), [text]);
    const safeMin = Math.max(0.4, minFontRem);
    const safeMax = Math.max(safeMin, maxFontRem);

    // Measure container width on mount and resize
    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const measure = () => {
            if (!containerRef.current) return;
            setContainerWidth(containerRef.current.clientWidth);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(containerRef.current);
        window.addEventListener('resize', measure);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    // Measure each word's width/height based on its computed font size
    const measured = useMemo(() => {
        if (!containerWidth || words.length === 0) return [];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const fontFamily = 'Roboto, Arial, sans-serif';

        return words.map((word, index) => {
            const base = `${seed}:${word}:${index}`;
            const rSize = hashToUnitInterval(base);
            const fontRem = safeMin + rSize * (safeMax - safeMin);
            const fontPx = fontRem * 16;
            const heightPx = Math.ceil(fontPx * lineHeight);
            ctx.font = `${fontPx}px ${fontFamily}`;
            const widthPx = Math.ceil(ctx.measureText(word).width);
            return { word, index, fontRem, widthPx, heightPx };
        });
    }, [containerWidth, words, safeMin, safeMax, lineHeight, seed]);

    // Skyline packing to compute absolute positions with minimal gaps
    const layout = useMemo(() => {
        if (!containerWidth || measured.length === 0) return { items: [], height: 0 };

        const unit = Math.max(1, Math.floor(packedUnitPx));
        const cols = Math.max(1, Math.floor(containerWidth / unit));
        const heights = new Array(cols).fill(0);

        const items = [];
        let maxHeight = 0;

        for (const m of measured) {
            const colsNeeded = Math.min(cols, Math.max(1, Math.ceil((m.widthPx + packedXGapPx) / unit)));

            let bestCol = 0;
            let bestY = Number.POSITIVE_INFINITY;

            for (let c = 0; c <= cols - colsNeeded; c++) {
                let windowMax = 0;
                for (let k = 0; k < colsNeeded; k++) {
                    windowMax = Math.max(windowMax, heights[c + k]);
                }
                if (windowMax < bestY) {
                    bestY = windowMax;
                    bestCol = c;
                    if (bestY === 0) break;
                }
            }

            const left = bestCol * unit;
            const top = bestY + (bestY === 0 ? 0 : packedYGapPx);
            const newHeight = top + m.heightPx;

            for (let k = 0; k < colsNeeded; k++) {
                heights[bestCol + k] = newHeight;
            }

            maxHeight = Math.max(maxHeight, newHeight);
            items.push({ key: `${m.word}-${m.index}`, word: m.word, index: m.index, left, top, fontRem: m.fontRem, widthPx: m.widthPx, heightPx: m.heightPx });
        }

        return { items, height: maxHeight };
    }, [containerWidth, measured, packedUnitPx, packedXGapPx, packedYGapPx]);

    const containerVariants = useMemo(() => ({
        hidden: {},
        show: {},
        explode: {}
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 300 },
        show: (custom) => ({
            opacity: 1,
            x: 0,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 130, delay: custom && typeof custom.delay === 'number' ? custom.delay : 0 }
        }),
        explode: (custom) => ({
            opacity: 0,
            x: custom && typeof custom.explodeX === 'number' ? custom.explodeX : 0,
            y: custom && typeof custom.explodeY === 'number' ? custom.explodeY : 0,
            transition: { type: 'spring', stiffness: 160, damping: 24, duration: 0.8 }
        })
    }), []);

    const handleClick = (e) => {
        if (!scrollActive || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const origin = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        setExplosionOrigin(origin);
        setIsExploding(true);

        // Show a brief affirmation phrase at the click point
        const idx = Math.floor(Math.random() * AFFIRMATION_PHRASES.length);
        setFloatingPhrase({ text: AFFIRMATION_PHRASES[idx], x: origin.x, y: origin.y, id: Date.now() });
        if (phraseTimerRef.current) {
            clearTimeout(phraseTimerRef.current);
        }
        phraseTimerRef.current = setTimeout(() => setFloatingPhrase(null), 4000);

        window.clearTimeout(handleClick._timer);
        handleClick._timer = window.setTimeout(() => setIsExploding(false), 900);
    };

    return (
        <Box
            ref={containerRef}
            component={motion.div}
            onClick={handleClick}
            initial={'hidden'}
            animate={scrollActive ? (isExploding ? 'explode' : 'show') : 'hidden'}
            variants={containerVariants}
            sx={{ position: 'relative', width: '100%', maxWidth, textAlign: align, height: layout.height, mx: 'auto', cursor: scrollActive ? 'pointer' : 'default' }}
        >
            {layout.items.map(item => {
                const rDelay = hashToUnitInterval(`${seed}:delay:${item.word}:${item.index}`);
                const delay = 0.8 + rDelay * 0.4 + (item.index %17) * 0.7;

                let explodeX = 0;
                let explodeY = 0;
                if (explosionOrigin) {
                    const centerX = item.left + (item.widthPx || 0) / 2;
                    const centerY = item.top + (item.heightPx || 0) / 2;
                    const vx = centerX - explosionOrigin.x;
                    const vy = centerY - explosionOrigin.y;
                    const mag = Math.hypot(vx, vy) || 1;
                    const unitX = vx / mag;
                    const unitY = vy / mag;
                    const rDist = hashToUnitInterval(`${seed}:dist:${item.word}:${item.index}`);
                    const distance = 220 + rDist * 380; // 220px - 600px
                    explodeX = unitX * distance;
                    explodeY = unitY * distance;
                }

                return (
                    <Box
                        key={item.key}
                        component={motion.span}
                        variants={itemVariants}
                        custom={{ delay, explodeX, explodeY }}
                        sx={{
                            position: 'absolute',
                            left: `${item.left}px`,
                            top: `${item.top}px`,
                            fontSize: `${item.fontRem}rem`,
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none'
                        }}
                    >
                        {item.word}
                    </Box>
                );
            })}

            <AnimatePresence>
                {floatingPhrase && (
                    <Box
                        key={floatingPhrase.id}
                        component={motion.div}
                        initial={{ opacity: 0, scale: 0.9, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -8 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 240, duration: 12 }}
                        sx={{
                            position: 'absolute',
                            left: `${floatingPhrase.x - 110}px`,
                            top: `${floatingPhrase.y}px`,
                            color: 'white',
                            backgroundColor: 'transparent',
                            px: 1.5,
                            py: 0.75,
                            borderRadius: '8px',
                            pointerEvents: 'none',
                            zIndex: 10,
                            fontSize: '0.95rem',
                            textAlign: 'center',
                            minWidth: '200px',
                            lineHeight: 1.3
                        }}
                    >
                        {floatingPhrase.text}
                    </Box>
                )}
            </AnimatePresence>
        </Box>
    );
}

export default VariableWordFlow;