# TaskBoard Demo

A small vanilla JavaScript task manager designed to test AI-assisted documentation generation with Mintlify.

## Features

- Add, edit, complete and delete tasks.
- Search by task title and filter by status.
- Save tasks in the browser's localStorage. No backend or account is required.
- Four unit tests for core task logic.

## Getting started

This project uses ES modules and requires no build step. Serve the folder over HTTP:

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000.

For unit tests, use Node.js 18 or later:

```bash
npm test
```

## Structure

- `index.html`: accessible UI structure.
- `src/styles.css`: presentation and responsive layout.
- `src/app.js`: DOM interactions and persistence.
- `src/tasks.js`: pure task operations and filtering.
- `tests/tasks.test.js`: unit tests.

## Architecture and data model

The browser loads `index.html`, which imports `src/app.js`. The app module imports reusable functions from `src/tasks.js`. Task changes are saved as JSON in `localStorage` under `taskboard-demo.tasks.v1`.

Each task is represented as:

```json
{"id":"uuid","title":"Read docs","status":"active","createdAt":"2026-01-01T00:00:00.000Z"}
```

Valid statuses are `active` and `done`. This demo has no HTTP API or server database.

## Documentation generation experiment

Ask an AI coding agent to inspect this repository and create Mintlify MDX pages describing the app, architecture, task data model, functions and developer setup. Verify the generated statements against the source files before publishing.

## Limitations

- Storage is local to one browser and may be cleared.
- This is a demo, not a production multi-user task service.
