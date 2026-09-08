# Serverless notification API

Vercel deploys `api/notifications.js` as a Node.js function. The frontend calls relative API URLs through `api.js`. There is no standalone HTTP listener and no runtime filesystem access.

## Endpoints

- `GET /api/notifications?tenant=acme&start=YYYY-MM-DD&end=YYYY-MM-DD&from=ISO_UTC&to=ISO_UTC` returns `{notifications, source:"serverless-demo", storage:"ephemeral"}`. Dates are inclusive (maximum 180), while UTC from/to boundaries are start-inclusive/end-exclusive. The client computes aggregates, applies remaining filters and paginates.
- `GET /api/notifications/:id?tenant=acme` returns `{notification}`.
- `POST /api/notifications/:id/reprocess?tenant=acme` returns `{notification, storage:"ephemeral"}`. No request body is required. The function rechecks Failed status and template-error exclusions before queueing. The frontend immediately replaces the record with the returned Retry state.

`vercel.json` rewrites detail/reprocess URLs into the same function, preserving query parameters. Requests require a supported tenant. Unknown records in that tenant return 404, invalid scopes return 400, and duplicate/ineligible retries return 409. Cross-origin browser requests are rejected; the public demo does not implement user authentication.

## Record shape

Notifications include `id`, `correlation`, `tenant`, `template`, `category`, `priority`, `sender`, `activity`, UTC `created`/`modified`, `status`, masked `recipient`, `channels`, `errorType`, raw `error`, `deliveries` and `reprocessHistory`.

Each delivery contains `channel`, `status`, `provider`, `retryCount`, UTC `nextRetryTime` or null, masked `recipient`, rendered `message: {subject, body}`, raw `error`, and `history` entries with `kind`, optional `attempt`, UTC `timestamp`, `result`, and optional raw `error`.

Reprocess preserves successful channels and completed attempts, queues failed channels, stamps modified, and adds an audit event with actor **Serverless demo operator**. Retry count does not increment until an attempt occurs. There is no delivery worker in the demo, so queued notifications do not actually send.

## Storage and production integration

Seed data and updates live in function-instance memory only. Cold starts, scaling or redeployments can reset changes. Different instances do not share state. This intentionally avoids the read-only filesystem failure and makes the demo deployable without infrastructure credentials; it does not provide persistent storage.

For production, provide the real rnotify API contract, authentication and server-side tenant authorization, a durable database/queue, an authenticated audit identity and a delivery worker. Queue writes should be transactional/idempotent across instances. Replace this fixture-backed function with those integrations. Keep masked payloads and provider histories supplied by the real service, rather than generating them in the frontend.
