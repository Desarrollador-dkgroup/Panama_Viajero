import { useEffect, useMemo, useRef } from 'react';
import { usePublishedSites } from '../../context/publishedSitesStore.js';
import { getActivityIcon, normalizeActivityName } from '../sites/activityIcons.js';

const normalizeActivity = (activity = '') => normalizeActivityName(activity);

function normalizeActivitySelection(selection = []) {
    const items = Array.isArray(selection) ? selection : selection ? [selection] : [];
    return items.map((activity) => normalizeActivity(typeof activity === 'string' ? activity : '')).filter(Boolean);
}

function Activities({ provinceData, selectedActivities = [], onActivitySelect = () => {} }) {
    const { sites: publishedSites } = usePublishedSites();
    const contentRef = useRef(null);
    const firstGroupRef = useRef(null);
    const dragStateRef = useRef({
        pointerId: null,
        startX: 0,
        startY: 0,
        startOffset: 0,
        isDragging: false,
    });
    const offsetRef = useRef(0);
    const activityNames = useMemo(() => {
        const baseActivities = Array.isArray(provinceData.actividades)
            ? provinceData.actividades
            : [];
        const dynamicActivities = provinceData.isActivityScopeComplete
            ? []
            : publishedSites
                .filter((site) => (
                    site.provinceId === provinceData.id
                    || site.provinceIds?.includes(provinceData.id)
                    || site.sharedProvinceIds?.includes(provinceData.id)
                ))
                .flatMap((site) => site.actividades || [])
                .map((activity) => (
                    typeof activity === 'string' ? activity : activity?.nombre
                ))
                .filter(Boolean);

        return Array.from(
            new Map(
                [...baseActivities, ...dynamicActivities]
                    .map((activity) => [normalizeActivity(activity), activity]),
            ).values(),
        );
    }, [provinceData.actividades, provinceData.id, provinceData.isActivityScopeComplete, publishedSites]);
    // Icono elegido en pv_admin para cada nombre de actividad; sin él, se elige por el nombre.
    const iconByName = useMemo(() => new Map(
        publishedSites
            .flatMap((site) => site.actividades || [])
            .filter((activity) => activity?.icono)
            .map((activity) => [normalizeActivity(activity.nombre), activity.icono]),
    ), [publishedSites]);
    const selectedActivityKeys = new Set(normalizeActivitySelection(selectedActivities));

    useEffect(() => {
        offsetRef.current = 0;
        if (contentRef.current) {
            contentRef.current.style.transform = 'translate3d(0px, 0, 0)';
        }
    }, [activityNames]);

    useEffect(() => {
        let rafId = 0;
        let lastTime = 0;
        const pxPerSecond = 42;

        const tick = (time) => {
            const groupWidth = firstGroupRef.current?.scrollWidth ?? 0;
            const content = contentRef.current;

            if (!content || !groupWidth) {
                lastTime = time;
                rafId = window.requestAnimationFrame(tick);
                return;
            }

            if (dragStateRef.current.isDragging) {
                lastTime = time;
                rafId = window.requestAnimationFrame(tick);
                return;
            }

            const delta = lastTime ? time - lastTime : 0;
            if (delta > 0) {
                offsetRef.current = (offsetRef.current + (pxPerSecond * delta) / 1000) % groupWidth;
                content.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
            }

            lastTime = time;
            rafId = window.requestAnimationFrame(tick);
        };

        rafId = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(rafId);
        };
    }, [activityNames]);

    const handlePointerDown = (event) => {
        const content = contentRef.current;
        if (!content) {
            return;
        }

        dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startOffset: offsetRef.current,
            isDragging: false,
        };

        content.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (dragStateRef.current.pointerId !== event.pointerId) {
            return;
        }

        const groupWidth = firstGroupRef.current?.scrollWidth ?? 0;
        const content = contentRef.current;
        if (!content || !groupWidth) {
            return;
        }

        const deltaX = event.clientX - dragStateRef.current.startX;
        const deltaY = event.clientY - dragStateRef.current.startY;
        const movedEnough = Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6;
        if (!dragStateRef.current.isDragging && !movedEnough) {
            return;
        }

        dragStateRef.current.isDragging = true;
        const nextOffset = dragStateRef.current.startOffset - deltaX;
        offsetRef.current = ((nextOffset % groupWidth) + groupWidth) % groupWidth;
        content.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    const endDragging = (event) => {
        if (dragStateRef.current.pointerId === event.pointerId) {
            dragStateRef.current.pointerId = null;
        }

        dragStateRef.current.isDragging = false;

        const content = contentRef.current;
        if (content?.hasPointerCapture?.(event.pointerId)) {
            content.releasePointerCapture(event.pointerId);
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4 md:mt-[-65px] mt-10">
            <h1
                className="font-main text-3xl font-bold text-brand-white md:text-4xl mb-[-60px]"
                style={{ textShadow: '0 0 6px rgba(0, 0, 0, 0.9)' }}
            >
                Actividades
            </h1>
            <div
                className="overflow-hidden py-5 md:mt-2 [mask-image:linear-gradient(to_right,transparent,black_3%,black_90%,transparent)]"
            >
                <div
                    ref={contentRef}
                    className="flex w-max cursor-grab select-none active:cursor-grabbing will-change-transform py-20"
                    style={{ touchAction: 'pan-y' }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={endDragging}
                    onPointerCancel={endDragging}
                >
                    {[0, 1].map((grupo) => (
                        <div
                            key={grupo}
                            className="flex shrink-0 gap-3 pr-3"
                            ref={grupo === 0 ? firstGroupRef : null}
                            aria-hidden={grupo === 1}
                        >
                            {activityNames.map((actividad) => {
                                const { Icon } = getActivityIcon(actividad, iconByName.get(normalizeActivity(actividad)));
                                const activityKey = normalizeActivity(actividad);
                                const isSelected = selectedActivityKeys.has(activityKey);

                                return (
                                    <button
                                        key={`${grupo}-${actividad}`}
                                        type="button"
                                        aria-pressed={isSelected}
                                        onPointerDown={(event) => event.stopPropagation()}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onActivitySelect(actividad);
                                        }}
                                        className={`font-secondary inline-flex cursor-pointer items-center gap-2 whitespace-nowrap 
                                            rounded-full px-4 py-2 text-sm shadow-sm transition 
                                            ${
                                            isSelected
                                                ? ' bg-brand-red text-brand-white'
                                                : 'bg-brand-white text-brand-charcoal hover:bg-brand-red hover:text-brand-white'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        {actividad}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Activities;
