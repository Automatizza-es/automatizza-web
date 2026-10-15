# Caso 02 — Figuras independientes

Assets preparados con la herramienta integrada `image_gen`. El fondo permanece inmóvil y las figuras se animan mediante transformaciones CSS. La silla original se conserva en una capa fija de primer plano. La foto original sirve de respaldo mientras cargan las capas o si falla algún recurso.

- Fondo: `public/images/automation/team-office-clean-v1.webp`.
- Figuras con transparencia real: `public/images/automation/team-office-actors-v1.webp`.
- Ciclo de pasos: `public/images/automation/team-office-walk-v1.webp`.

## Recorrido y ciclo de pasos

La caminante recorre 180 unidades de la imagen original hacia el centro durante 4,5 segundos. Se detiene 3,5 segundos, vuelve orientada hacia la derecha durante 4,5 segundos y descansa 4,5 segundos. Ocho poses cambian las piernas, las rodillas, los pies y los brazos durante el desplazamiento; en las pausas se mantiene el fotograma de contacto del mismo ciclo, con ambos pies apoyados. Así no cambia la proporción del cuerpo al detenerse. Los fotogramas se empaquetaron con la misma altura, eje de cabeza y línea de suelo para evitar saltos. El reloj se pausa fuera de pantalla y con la pestaña del navegador oculta, y se cancela al salir del caso 02 o activar `prefers-reduced-motion`. La pared y las sillas permanecen en capas fijas.

Generado con la herramienta integrada `image_gen`, con transparencia; la referencia fue la figura ya extraída. Prompt del asset final:

Use case: stylized-concept
Asset type: production transparent walking-cycle sprite sheet for a premium website illustration.
Input image 1 is a reference for the EXACT standing/walking brunette woman in the UPPER part of the transparent reference, not the seated woman below.
Create an eight-frame realistic walking cycle of this same adult woman, facing LEFT in all eight frames. Preserve her brown blazer, dark navy tailored trousers, flat dark shoes, long brunette hair, face, body proportions, softly lit photorealistic 3D architectural illustration aesthetic. No cartoon exaggeration.
Layout: exactly FOUR columns and TWO rows of equally sized cells, read left to right then next row. Overall canvas 1536 by 1024, each cell 384 by 512. One full-body woman per cell, all same scale, head top around y55 of each cell, ground baseline at y480, hips centered at x192. All cells have genuinely transparent backgrounds. No lines, no borders, no labels, no numbers, no floor, no shadows outside the person, no scenery, no other people.
Animation requirements: frames must be sequential phases of ONE full walk cycle: 1 left-foot-forward contact, 2 downward weight transfer, 3 passing (rear knee bent and moving forward), 4 upward (raised heel, advancing knee), 5 right-foot-forward contact, 6 downward transfer, 7 passing with opposite leg raised and bent, 8 upward opposite phase. Two steps alternate naturally. Visible changing angles of thighs, knees, ankles and feet; heel-to-toe planted contact. Modest professional walking pace, not running. Slight natural opposite arm swing, bent relaxed elbows. Torso, face and clothing remain remarkably consistent across cells; no zoom, no changes in hair length or lighting. Frame 8 should loop naturally to frame 1. Crisp clean cutout edges and alpha transparency.

## Fondo limpio

Use case: precise-object-edit.
Asset type: a stationary clean background plate for an animated office scene.
Input image: edit target, the attached original wide two-story office image.
Primary request: remove ONLY two precisely identified people and reconstruct the surfaces behind them. 1) The walking/standing brunette woman in dark brown jacket and black trousers on the UPPER floor, about 60% across the image, immediately to the right of the seated woman at a computer. She occupies approximately x=966..1048, y=205..406 in the original 1672x941 image. 2) The woman seen from behind wearing a light blouse in the LOWER foreground, at the central computer, approximately x=852..994, y=710..849. Remove her head, hair, shoulders and blouse ONLY; KEEP her foreground gray chair exactly fixed and intact, plus the desk and monitor.
Invariants: retain the identical canvas aspect ratio and camera framing, same 1672x941 composition, preserve every other person, plants, computers, furniture, straight window mullions, walls, floor slab, chair geometry, light fixtures, colors and lighting. Reconstruct the desk/wall/office background behind those two women naturally, with all architectural lines perfectly straight and matching the original. The other people must not move or change. Do not insert replacement people, do not redesign the room, do not add text or labels, no UI. This is a highly localized background cleanup, NOT a new illustration.

## Figuras transparentes

Use case: background-extraction.
Asset type: transparent animation sprite layer.
Input image: edit target, the original two-floor office picture.
Primary request: extract ONLY TWO EXISTING PEOPLE from the attached image onto genuine transparent background. Preserve their exact original painted appearance, identity, colors, lighting, silhouette and pixel position.
Person 1: the brunette walking woman wearing a dark brown jacket and black trousers on the UPPER floor, near 60% across the image, x=966..1048, y=205..406. Include her entire body, hair, hands, both trouser legs and shoes. Keep her existing pose and scale.
Person 2: the seated woman seen from behind in a light/cream blouse at the central computer in the LOWER foreground, x=852..994, y=710..849. Include ONLY her hair, head, shoulders and blouse above/in front of her chair. Exclude ALL chair, desk, monitor, keyboard, plants and any other person.
CRITICAL canvas registration: retain EXACTLY the same 1672x941 landscape canvas as the input. Each extracted person must remain at precisely the same original location and size. Everything else on that canvas must have alpha=0. Do not crop or center or enlarge the people. No background, no shadow belonging to the room, no chair, no floor, no office architecture, no labels, no UI, no new people. This is faithful segmentation of the existing artwork for animation, NOT redrawing a new character sheet.
