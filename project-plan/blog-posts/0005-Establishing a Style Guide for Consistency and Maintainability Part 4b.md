Blog Post #4a: Establishing a Style Guide for Consistency and Maintainability

Introduction:

As our personal finance dashboard project progresses, it's crucial to establish clear style guidelines. A consistent style guide ensures that our codebase remains readable, maintainable, and easy for others (and our future selves!) to understand. This post outlines the style guide we'll be adhering to throughout the project. We'll cover coding conventions, formatting rules, and best practices for React, TypeScript, Tailwind CSS, and GraphQL.

Why a Style Guide?

A style guide provides several key benefits:

Consistency: Ensures a uniform look and feel across the entire codebase, regardless of who wrote the code.
Readability: Makes the code easier to read, understand, and debug.
Maintainability: Simplifies modifications and updates, reducing the risk of introducing errors.
Collaboration: Facilitates collaboration by providing a common set of rules for all contributors.
Professionalism: Demonstrates attention to detail and a commitment to quality code.
Our Style Guide (./project-plan/style-guide/style-guide.md):

We'll create a style-guide.md file in the ./project-plan/style-guide/ directory. This file will contain the detailed style guide. Here's the content of that file:

Markdown

# Style Guide: Temba Fin Dash Game

This document outlines the coding style guide for the Temba Fin Dash Game project.  Consistency is key for maintainability and collaboration.

## Table of Contents

- [Style Guide: Temba Fin Dash Game](#style-guide-temba-fin-dash-game)
  - [Table of Contents](#table-of-contents)
  - [1. General Principles](#1-general-principles)
  - [2. JavaScript/TypeScript (React \& Next.js)](#2-javascripttypescript-react--nextjs)
  - [3. HTML/JSX](#3-htmljsx)
  - [4. CSS/Tailwind CSS](#4-csstailwind-css)
  - [5. GraphQL](#5-graphql)
  - [6. Dgraph](#6-dgraph)
  - [7. Git](#7-git)
  - [8. Directory Structure](#8-directory-structure)
  - [9. Error Handling](#9-error-handling)
  - [10. Accessibility](#10-accessibility)
  - [11. Performance](#11-performance)
  - [12. Tools](#12-tools)

## 1. General Principles

*   **Keep It Simple:** Favor simplicity and clarity over cleverness.
*   **DRY (Don't Repeat Yourself):** Avoid code duplication. Extract reusable logic into functions and components.
*   **Consistency:** Follow the established conventions consistently throughout the project.
*   **Readability:** Write code that is easy to read and understand. Use meaningful variable and function names.
*   **Comments:** Use comments to explain *why* the code is written the way it is, not *what* it does (the code should be self-explanatory in that regard).

## 2. JavaScript/TypeScript (React & Next.js)

*   **Language:** TypeScript (strict mode).
*   **Linting:** ESLint with the Airbnb config (with modifications as needed), Prettier for formatting.
*   **Formatting:**
    *   2-space indentation.
    *   80-character line length (soft limit, strive for it, but don't be dogmatic).
    *   Single quotes for strings (except for JSX attributes, which use double quotes).
    *   Trailing commas where possible (objects, arrays, function parameters).
    *   Semicolons at the end of statements.
*   **Naming Conventions:**
    *   `PascalCase` for component names (e.g., `TransactionForm`).
    *   `camelCase` for variables and functions (e.g., `transactionData`, `handleSubmit`).
    *   `UPPER_SNAKE_CASE` for constants (e.g., `MAX_TRANSACTIONS`).
*   **Component Structure:**
    *   Functional components with hooks (no class components).
    *   One component per file (unless the components are very small and tightly coupled).
    *   Use arrow functions for component definitions: `const MyComponent: React.FC<Props> = ({ prop }) => { ... }`
    *   Define interfaces for props and state.
    *   Keep components small and focused.
*   **Hooks:**
    *   Follow the Rules of Hooks (call hooks at the top level, not inside loops, conditions, or nested functions).
    *   Use descriptive names for custom hooks (e.g., `useTransactionData`).
*   **Imports:**
    *   Group imports:
        1.  React
        2.  Third-party libraries
        3.  Project modules (absolute imports preferred)
    *   Alphabetize imports within each group.
    *   Use absolute imports for project modules (configured in `tsconfig.json`):
        ```typescript
        import TransactionForm from 'components/TransactionForm'; // Good
        import TransactionForm from '../../components/TransactionForm'; // Avoid
        ```
*   **Asynchronous Operations:**
    *   Use `async/await` for asynchronous code.
    *   Handle errors with `try/catch` blocks.
* **State Management**
    * Use `useState` for simple state.
    * Use `useReducer` for more complex local state.
    * Do not use Context or Redux unless necessary

## 3. HTML/JSX

*   **Indentation:** 2 spaces.
*   **Quotes:** Double quotes for attributes.
*   **Self-Closing Tags:** Use self-closing tags for elements without children (e.g., `<img src="..." />`).
*   **Semantic HTML:** Use semantic HTML elements where appropriate (e.g., `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
*   **Accessibility:**  Follow accessibility best practices (ARIA attributes, alt text for images, etc.).

## 4. CSS/Tailwind CSS

*   **Tailwind First:** Use Tailwind CSS utility classes whenever possible.
*   **Custom CSS (Sparingly):**  Only write custom CSS when necessary (e.g., for complex animations or layouts that are not easily achievable with Tailwind).
*   **Component-Scoped Styles:** If you need custom CSS, keep it scoped to the component (e.g., using CSS Modules or styled-components).  Avoid global styles as much as possible.
*   **Tailwind Configuration:**  Use the `tailwind.config.js` file to customize the default Tailwind theme (colors, fonts, spacing, etc.) to match the project's design.
* **Class Name Order** Use a tool such as Prettier to automatically sort tailwind classes.

## 5. GraphQL

*   **Naming Conventions:**
    *   `UpperCamelCase` for type names (e.g., `Transaction`).
    *   `camelCase` for field names (e.g., `transactionDate`).
    *   Use descriptive names for queries and mutations (e.g., `addTransaction`, `getUserTransactions`).
*   **Fragments:** Use fragments to avoid repeating field selections.
*   **Variables:** Use variables for dynamic values in queries and mutations.
*   **Error Handling:**  Handle GraphQL errors gracefully in the frontend.
*   **Pagination:** Use offset based pagination.

## 6. Dgraph

*   **Schema:**  Maintain a single source of truth for the schema (`schema.graphql` in the project root).
*   **Schema Updates:** Use `curl` to apply schema updates to both local and cloud Dgraph instances.
*   **Indexing:**  Use appropriate indexes (`@search`) to optimize query performance.
* **Data Modeling:** Use relationships to build a graph data model.

## 7. Git

*   **Branch Naming:**  `feature/<feature-name>`, `bugfix/<bug-description>`, `chore/<task-description>`, etc.
*   **Commit Messages:**
    *   Use the imperative mood (e.g., "Add transaction form" instead of "Added transaction form").
    *   Keep the first line under 50 characters.
    *   Use the body of the commit message to provide more details, if necessary.
    *   Reference issue numbers (e.g., "Fixes #123").
*   **Pull Requests:**  Use pull requests for all code changes.
*   **Code Reviews:**  All code should be reviewed before merging (for this project, self-review).

## 8. Directory Structure

temba-fin-dash-game/
├── app/              # Next.js pages (routes)
│   ├── globals.css      # Global styles
│   └── page.tsx        # Main dashboard page
├── components/       # Reusable React components
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── lib/              # Utility functions and shared code
│   └── apolloClient.ts # Apollo Client configuration
├── project-plan/     # Project planning documents
│   ├── data-model.md    # Dgraph schema design (eventually, this and schema.graphql should be kept in sync)
│   ├── blog-posts/      # Blog post drafts
│   └── style-guide/     # Style guide
│          └── style-guide.md
├── public/           # Static assets (images, etc.)
├── styles/           # (Optional) Additional CSS files
├── .env.local       # Environment variables (keep secrets out of the repo!)
├── .gitignore        # Files and folders to ignore in Git
├── docker-compose.yml  # Docker Compose configuration
├── next.config.js   # Next.js configuration
├── package.json      # Project dependencies
├── schema.graphql    # Dgraph schema
└── tsconfig.json     # TypeScript configuration


## 9. Error Handling

*   **Handle Errors Gracefully:**  Anticipate potential errors (e.g., network errors, API errors, invalid user input) and handle them gracefully.
*   **Display User-Friendly Error Messages:**  Don't expose raw error messages to the user. Provide informative and helpful messages.
*   **Log Errors:**  Log errors to the console (in development) and to a logging service (in production) for debugging and monitoring.
* **Use try/catch** Use try/catch blocks around asynchronous code and other operations for errors.

## 10. Accessibility

*   **Semantic HTML:** Use semantic HTML elements (e.g., `nav`, `main`, `article`, `aside`, `header`, `footer`) to structure your content.
*   **ARIA Attributes:** Use ARIA attributes (e.g., `role`, `aria-label`, `aria-labelledby`) where necessary to improve accessibility for screen reader users.
*   **Alt Text for Images:** Provide descriptive alt text for all images.
*   **Keyboard Navigation:** Ensure that all interactive elements are accessible via keyboard navigation.
*   **Color Contrast:**  Ensure sufficient color contrast between text and background.

## 11. Performance
    * **Code Splitting:**  Use Next.js's dynamic imports to split your code into smaller chunks, improving initial load time.
    * **Image Optimization:**  Optimize images for the web (use appropriate formats, compress images, use responsive images).
    * **Caching:**  Use appropriate caching strategies (e.g., browser caching, CDN caching) to reduce server load and improve response times.
    * **Lazy Loading:**  Lazy load images and components that are not immediately visible.
    * **Memoization:** Use React.memo, useMemo, and useCallback to avoid unnecessary re-renders.

## 12. Tools

*   **IDE:** VS Code (recommended) with extensions:
    *   ESLint
    *   Prettier
    *   GraphQL (for syntax highlighting and autocomplete)
    *   Tailwind CSS IntelliSense
    *   Docker
* **Other tools**
    * Dgraph
    * Docker
    * Vercel

This style guide provides a solid starting point.  It may evolve as the project progresses and new needs arise. The key is to maintain consistency and adapt the guidelines as needed.