# Assets

## Brand

The current isologo lives at:

```text
public/brand/isologo.png
```

Use it in Next.js with the public path:

```tsx
<Image src="/brand/isologo.png" alt="Zinns isologo" width={426} height={426} />
```

## Rules

- Public static assets belong under `public/`.
- Brand assets belong under `public/brand/`.
- Do not keep image files at the repository root.
- Use empty `alt=""` for decorative logo instances.
- Use descriptive alt text for the primary brand image when it communicates identity.
