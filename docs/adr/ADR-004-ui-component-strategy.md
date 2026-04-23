# ADR-004: UI Component Strategy

| Field        | Detail                              |
|--------------|-------------------------------------|
| **ID**       | ADR-004                             |
| **Issue**    | S3-DEV-05                           |
| **Date**     | 2026-04-22                          |
| **Status**   | Accepted                            |
| **Deciders** | Developer (reviewed by PM & UX/UI Designer) |

---

## Context

The Student Mental Health & Wellness Tracker requires a consistent, accessible component system for Sprint 3 features (Dashboard, Mood Tracker, etc.). We face two major constraints within the 8-week sprint: strict accessibility mandates (WCAG AA, ARIA compliance) and an oral defense requirement mandating that the Developer must be able to explain every line of codebase without relying on black-box library internals.

---

## Options Considered

### 1. shadcn/ui + Tailwind CSS — **Selected**

**Pros:** Copies full component source code directly into `/src/components/ui/`, completely satisfying the oral defense requirement. It utilizes Radix UI primitives to provide ARIA roles, keyboard navigation, and focus management out of the box. Styling is pure Tailwind CSS, making it 100% compatible with Next.js Server Components.

### 2. Pure Tailwind CSS (Utility-Only) — **Rejected**

**Cons:** Provides no behavioral or accessibility primitives. Hand-rolling ARIA attributes, focus trapping, and keyboard navigation for complex components (modals, date pickers) across five screens is prohibitively time-consuming and introduces significant accessibility audit risk.

### 3. Chakra UI / Material UI — **Rejected**

**Cons:** Both rely heavily on CSS-in-JS (Emotion/styled-components), which is incompatible with Next.js App Router Server Components. This would force unnecessary client-side rendering, undermining the architecture established in ADR-003, and adding unacceptable bundle weight for a Vercel deployment.

### 4. CSS Modules (Custom-Built) — **Rejected**

**Cons:** While maintainable, CSS modules provide no accessibility primitives. Like Option 2, the time cost of manually building a fully accessible component library from scratch is not justifiable given the strict sprint deadline.

---

## Decision

**We will use shadcn/ui components, initialized with Tailwind CSS, as the project's UI component system.**

This decision perfectly aligns with our established architecture. It natively supports the Server Component model required by Supabase (ADR-001) and our Auth approach (ADR-003) without forcing client-side rendering. It adds zero runtime overhead, optimizing our Vercel deployment (ADR-002). Crucially, because shadcn/ui copies the component source code directly into our repository, every component can be fully audited and explained during the oral defense.

---

## Implementation Notes

- Run `npx shadcn@latest init` to generate `components.json` and configure `globals.css` with required CSS variable tokens.
- Add components only as needed per feature sprint (e.g., `Button`, `Input`, `Dialog`) to prevent repository bloat.
- Treat `/src/components/ui/` as owned code; document any customizations via comments so future `shadcn` CLI updates do not silently overwrite them.
- Override default shadcn color tokens directly in `globals.css` to match the application's calm, low-stimulation palette.

---

## Consequences

- **Positive:** Immediate compliance with Sprint 4 accessibility audits (built-in ARIA/keyboard support). Full code ownership for the oral defense. Seamless integration with our existing Tailwind setup.
- **Negative:** Setup modifies `globals.css` and `tailwind.config.ts`, requiring coordination with the UX/UI Designer to avoid style conflicts. We are responsible for manually patching components if Radix UI introduces breaking changes.

---

*This ADR was authored by the Developer and is considered accepted upon merge of the `feature/dev-scaffold` branch into `main`.*