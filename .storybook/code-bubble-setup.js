import { CodeBubble } from 'code-bubble';
import packageJson from '../package.json';

(async () => {
  async function fetchLibData(url) {
    const baseUrl = window.location.href.includes('localhost')
      ? ''
      : window.location.href.split('/iframe')[0];

    try {
      const response = await fetch(baseUrl + url); // Make the request
      return await response.text(); // Extract JSON data
    } catch (error) {
      console.error('Error fetching data:', url, error);
      return null; // Handle the error gracefully
    }
  }

  /** @type { import('code-bubble').CodeBubbleConfig } */
  new CodeBubble({
    sandbox: 'stackblitz',
    component: {
      frameworkButtons: {
        label: framework =>
          ({
            html: 'HTML',
            tsx: 'React',
          })[framework],
      },
    },
    sandboxConfig: {
      /** StackBlitz sandbox configuration */
      stackBlitz: {
        html: {
          project: {
            title: packageJson.name + ' Demo',
            description: 'A live web component demo',
            files: {
              [`libs/${packageJson.name}/index.js`]:
                await fetchLibData('/html/index.js'),
            },
          },
          exampleTemplate: {
            fileName: 'index.html',
            template: `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>${packageJson.name} Demo</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <script type="module" src="libs/${packageJson.name}/index.js"></script>
  </head>

  <body>
    %example%
  </body>
</html>`,
          },
        },
        tsx: {
          project: {
            title: packageJson.name + ' React Demo',
            description: 'A live react/web component demo',
            files: {
              [`libs/${packageJson.name}/react/index.js`]:
                await fetchLibData('/react/index.js'),
              [`libs/${packageJson.name}/react/index.d.ts`]:
                await fetchLibData('/react/index.d.ts'),
              'src/index.tsx': `import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);`,
              [`libs/${packageJson.name}/package.json`]: `{
  "name": "${packageJson.name}",
  "version": "${packageJson.version}",
  "description": "A live react/web component demo",
  "main": "index.js"
}`,
              'package.json': `{
  "name": "react-sandbox",
  "version": "1.0.0",
  "main": "src/index.tsx",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "${packageJson.name}": "file:./libs/${packageJson.name}"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "typescript": "^5.2.2",
    "vite": "^5.3.2"
  }
}`,
              'tsconfig.json': `{
  "include": ["./src/**/*"],
  "compilerOptions": {
    "strict": false,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "baseUrl": "."
  }
}`,
              'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});`,
              'index.html': `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React code example</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`,
            },
          },
          exampleTemplate: {
            fileName: 'src/App.tsx',
            template: `%example%`,
          },
        },
      },
    },
  });
})();
