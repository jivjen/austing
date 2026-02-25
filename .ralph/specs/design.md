<design_system>
<mockup_references>
**CRITICAL:** You must read and analyze the document at `./austinG.pdf`. This PDF contains the exact copy, product names (e.g., "Sola & Luna Collection", "Radiant Sun"), pricing layout, and structural hierarchy you must use. You may cross-reference the images in `./mockups/` for color context, but the PDF is your absolute source of truth for the UI layout and text.
</mockup_references>
  <color_palette>
    - **Primary Dark:** `#5c2a41` (Deep Burgundy) - Use for prominent text on light backgrounds, dark section backgrounds, and footer.
    - **Primary Light:** `#d9c8d5` (Soft Blush) - Use for the main app background and subtle card backgrounds.
    - **Accent Gold:** `#c5a059` - Use sparingly for subtle borders, active states, or highlight text.
    - **Neutral:** `#ffffff` (White) - Use for text on dark backgrounds.
    *Rule:* Ensure strict contrast ratios. Never use Tailwind's default grays or blues. Use arbitrary values (e.g., `bg-[#5c2a41]`) or configure them in `tailwind.config.ts`.
  </color_palette>

  <typography>
    - **Headings (H1-H4):** `Playfair Display` or `Cinzel` (via `next/font/google`). Must feel editorial and high-end.
    - **Body/Utility Text:** `Inter` or `Lato`. Keep it clean, highly legible, and lightweight.
    - **Spacing:** Apply generous tracking (letter-spacing) to uppercase subheadings (e.g., `tracking-widest`).
  </typography>

  <layout_constraints>
    - **Grid System:** Product showcases must strictly use CSS Grid. Desktop: 3 columns (`grid-cols-3`). Tablet: 2 columns (`grid-cols-2`). Mobile: 1 column (`grid-cols-1`).
    - **Negative Space:** Luxury design requires breathing room. Over-index on vertical padding between sections (e.g., `py-24` or `py-32`).
    - **Component Edges:** Use sharp, elegant corners (`rounded-none` or very subtle `rounded-sm`). Avoid large, bubbly border radii.
  </layout_constraints>
</design_system>