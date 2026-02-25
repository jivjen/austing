<animation_guidelines>
  <smooth_scroll>
    - **Library:** `@studio-freight/lenis`
    - **Implementation:** Create a global client-side provider component and wrap the application. This must hijack native scrolling to provide momentum-based, buttery-smooth scrolling across all pages.
  </smooth_scroll>

  <framer_motion_rules>
    - **Scroll Reveals:** When elements (like product cards or text blocks) enter the viewport, they must fade up slowly. 
      - *Example Config:* `initial={{ opacity: 0, y: 30 }}` and `whileInView={{ opacity: 1, y: 0 }}`.
      - *Viewport Config:* Always use `viewport={{ once: true, margin: "-100px" }}` so animations trigger cleanly as the user scrolls down, but do not repeat aggressively.
    - **Staggered Children:** If rendering a grid of products, the parent container should stagger the entrance of its children (e.g., `staggerChildren: 0.15`).
  </framer_motion_rules>

  <micro_interactions>
    - **Hover States:** Hovering over a product image must trigger a slow, subtle zoom.
      - *Tailwind Config:* `hover:scale-105 transition-transform duration-700 ease-out`.
    - **Strict Prohibition:** Absolutely NO bouncy spring animations, rapid color flashing, or aggressive layout shifts. Motion must feel slow, deliberate, and expensive.
  </micro_interactions>
</animation_guidelines>