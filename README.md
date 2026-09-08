# rnotify Notification Dashboard

A tenant-scoped notification console with Overview, Search & Results, per-channel delivery details, and confirmed reprocessing. Includes generated demo notifications, masked recipients, interactive volume charts, themes, and responsive navigation.

## Deploy to Vercel

Import this GitHub repository. The committed `vercel.json` configures:

- Framework preset: **Other**
- Build command: **npm run build**
- Output directory: **dist**
- Node.js: **22.x**

Vercel serves the frontend and runs `api/notifications.js` as a Node.js serverless function. Search, detail and reprocess requests go to that function. No local server, filesystem writes, or environment variables are required for the demo. Do not set the build command to `npm start`.

After an update, use the latest successful deployment or production domain; an old immutable deployment URL still points to its original build.

## Demo storage

Demo records are generated on function cold start. Reprocess changes and their audit entries are held in memory within a warm function instance. They are **temporary**, can reset on restarts, and are not shared reliably between instances. Audit entries say **Serverless demo operator**, not an authenticated user. The UI labels the data as a temporary demo. This is not a real delivery queue, and no messages are sent.

For production, connect a durable database, authenticated rnotify API, server-side tenant permissions and a delivery worker. See [API.md](API.md) for the endpoint contract.

## Development checks

Run `npm test` for nine data and serverless-handler tests. Run `npm run build` to generate the frontend. To emulate Vercel routing and functions, use the Vercel CLI (`npx vercel dev`) from this project.

## PRD coverage

Overview includes four KPIs, a stacked channel volume chart and recent failures. Search supports status/channel/category/sender filters with client-side pagination. The drawer shows metadata, per-channel statuses and retry history; the Error tab appears for Failed/Rejected records. Reprocessing requires overall Failed without a template error, names the exact notification in confirmation, and updates to Retry after API confirmation.

Dates default to 90 days with an inclusive maximum of 180. UTC timestamps display in the viewer's labelled local timezone. Recipients remain masked. Aggregates and paging are client-side for v1; cross-tenant mode is not included. Total Sent currently counts notification records in scope; Success Rate counts overall Success records. Confirm these semantics with the production backend.

The chart supports daily/weekly groups, area/bars, channel toggles, hover, drag, keyboard inspection and period-to-search navigation. Sidebar collapse and light/dark preferences are saved locally. Ctrl/Cmd B toggles the sidebar; Ctrl/Cmd K opens Quick find. Manual refresh fetches current data.

`DESIGN.md` is the user-provided Nebula design specification. `refinement.css` contains the dashboard refinements. Local Lucide icons and IBM Plex fonts include upstream licenses in `vendor/`.
