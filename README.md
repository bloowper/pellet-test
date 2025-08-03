# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🚀 Deploying to GitHub Pages

This project is configured for easy deployment to GitHub Pages. Follow these steps:

1. Update the `astro.config.mjs` file with your GitHub username:
   ```javascript
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/eminent-ephemera',
   });
   ```

2. Push your code to a GitHub repository named `eminent-ephemera`.

3. In your GitHub repository:
   - Go to Settings > Pages
   - Under "Source", select "GitHub Actions"
   - Make sure GitHub Pages is enabled

4. Push a commit to the `main` branch or manually trigger the workflow from the Actions tab.

The GitHub Actions workflow will automatically build and deploy your site to GitHub Pages. Once deployed, your site will be available at `https://yourusername.github.io/eminent-ephemera/`.
