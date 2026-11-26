# Templates

Each website template is fully independent of the agency site.

```
src/templates/<category-slug>/<template-slug>/
  index.tsx        # template entry
  components/      # template-only components
  styles/          # template-only theme/styles
```

Rules:
- Never import from `src/components`, `src/app`, or `src/styles` of the agency site.
- Register new templates in `registry.ts`; categories live in `categories.ts`.
- Template assets go in `public/templates/<template-slug>/`.

