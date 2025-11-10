# feather-icons-react Demo

This directory contains demo pages to verify that the exported types and runtime behavior work correctly for projects using `feather-icons-react` as a dependency.

## Demo Pages

1. **TypeScript Demo** (`ts-demo.tsx`) - Verifies TypeScript type checking and runtime behavior
2. **JavaScript Demo** (`js-demo.jsx`) - Verifies runtime behavior without TypeScript

Each demo tests two import patterns:

- Default import: `import FeatherIcon from 'feather-icons-react'`
- Named imports: `import { ArrowDown } from 'feather-icons-react'`

## Running the Demo

1. Install dependencies:

   ```bash
   cd demo
   yarn install
   ```

2. Start the dev server:

   ```bash
   yarn dev
   ```

3. Open your browser to the URL shown (typically http://localhost:3000)

4. Switch between TypeScript and JavaScript demos using the navigation links

## Build Verification

The demo uses the local `feather-icons-react` package (via Vite alias), so it will use the built version from the `build/` directory. This allows you to verify:

- TypeScript types are correctly exported
- Default and named exports work
- Runtime behavior is correct
- Browser compatibility

## Note

This directory is excluded from the published npm package. It's only for local development and testing.
