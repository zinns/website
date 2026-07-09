# Content Guide

The public site content currently lives in `src/app/content.ts`.

## Language Handling

The first version supports:

- English: `en`
- Spanish: `es`

The language switcher on `/` changes the local dictionary and updates the document language. This is
intentionally lightweight because the site currently has one route. If the site grows into multiple
routes, route-based i18n can be introduced later.

## Placeholder Rules

Temporary content must be clearly labeled.

Project content can use public-safe summaries when the work is approved for mention. Internal labels
and working titles should stay out of website copy until approved for publication.

Use neutral labels such as:

- `Placeholder Customer 01`
- `Placeholder content`
- `In progress`

Do not publish fake customer quotes, fake customer names, fake company names, or implied case studies.
Replace placeholders only when real information is approved.

## Current Content Sections

- Hero
- What Zinns does
- Project preview
- Education plans
- Reviews
- Company brief
- People
- Common stack
- Next integrations
- Contact

## Education Content

The current real offer is:

- Web Development Mentoring
- Mobile Development Mentoring

Both plans share a root roadmap: terminal, Git, HTML, CSS, CSS frameworks, JavaScript, TypeScript,
testing, deployments, GitHub, and SCRUM. Web continues into React and Next.js. Mobile continues into
React Native and Expo.

Delivery is described at the education section level: private mentoring, usually at least two 1-hour
sessions per week, adjusted to each person. Individual plan labels should stay platform-focused, such
as `Web path` and `Mobile path`.

Courses, workshops, and learning paths should remain future content until the catalog is defined.
