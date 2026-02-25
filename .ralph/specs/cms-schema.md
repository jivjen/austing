<sanity_architecture>
  <core_directive>
    Define these schemas inside the Sanity `schemaTypes` array. Ensure all fields are strongly typed and include appropriate validation (e.g., `Rule.required()`).
  </core_directive>

  <schema name="category" type="document">
    - **name:** `string` (Required. e.g., "Latest Collections", "Sola & Luna")
    - **slug:** `slug` (Required. Must automatically generate from the `name` field using `options: { source: 'name' }`)
  </schema>

  <schema name="product" type="document">
    - **name:** `string` (Required. The name of the jewelry piece)
    - **slug:** `slug` (Required. Must generate from the `name` field)
    - **price:** `number` (Required. The cost of the item)
    - **image:** `image` (Required. MUST include `options: { hotspot: true }` to allow editors to crop the image inside the Sanity Studio)
    - **category:** `reference` (Required. Must reference the `category` document type to allow filtering)
    - **description:** `text` (Optional. A short paragraph describing the piece)
  </schema>

  <data_fetching_rules>
    - When writing GROQ queries to fetch this data for the frontend, ensure you resolve the `image` asset URL correctly using `@sanity/image-url`.
    - Always fetch the resolved `category->name` when querying products.
  </data_fetching_rules>
</sanity_architecture>