# Contact Email

The contact form posts to:

```text
/api/contact
```

The API route is implemented in:

```text
src/app/api/contact/route.ts
```

## Delivery Provider

The route uses the Resend HTTP API directly. No SDK dependency is installed.

## Environment Variables

Create local or Vercel environment variables with:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=help@zinns.io
CONTACT_FROM_EMAIL="Zinns Website <website@zinns.io>"
```

`CONTACT_FROM_EMAIL` must use a sender domain verified in Resend.

## Runtime Behavior

- Valid form submissions are sent to `CONTACT_TO_EMAIL`.
- The sender email is `CONTACT_FROM_EMAIL`.
- The visitor email is sent as `reply_to`.
- If Resend is not configured, the endpoint returns `503`.
- The homepage still shows the direct `help@zinns.io` email link.

## Validation

The endpoint requires:

- Name with at least 2 characters
- Valid email shape
- Message with at least 10 characters
