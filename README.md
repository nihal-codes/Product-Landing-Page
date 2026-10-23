# Products

## Overview

**Products** is a single-page web application that displays product information sourced from the [DummyJSON](https://dummyjson.com) public API. It provides a product listing view and a detailed product description view, featuring image galleries, inventory status indicators, and order quantity controls.

The application uses client-side routing to navigate between the main product list and individual product detail pages. Product data is fetched dynamically from `https://dummyjson.com/products/{id}` based on the route parameter.

## Key Features

- **Product Detail View**: Displays comprehensive product information including title, brand, description, price, discount percentage, SKU, category, and tags.
- **Image Gallery**: Supports multiple product images with previous/next navigation and thumbnail selection.
- **Inventory Status Indicators**: Visual badges for "In Stock", "Low Stock", and "Out of Stock" statuses.
- **Order Quantity Control**: Increment/decrement buttons for order quantity, constrained by `minimumOrderQuantity` and `stock` limits from the API.
- **Additional Information Cards**: Displays shipping information, warranty details, return policy, and availability status in dedicated cards.
- **Navigation Between Products**: Previous/next product navigation with boundary checks (products 1–194).
- **Toast Notifications**: User feedback for actions like reaching max stock, minimum quantity limits, or navigation boundaries.
- **Responsive Layout**: Tailwind CSS classes for responsive design across mobile and desktop viewports.

## Architecture

The application follows a standard React component architecture:

- **`main.jsx`**: Entry point that renders the `App` component within `StrictMode` and initializes the `Toaster` from `react-hot-toast`.
- **`App.jsx`**: Configures client-side routing using `react-router-dom` with two routes:
  - `/`: Renders `SideBar` and `MainListing` components.
  - `/desc/:id`: Renders `SideBar` and `CompleteDesc` components.
- **`CompleteDesc.jsx`**: The primary product detail component. It:
  - Extracts the product `id` from the URL parameters.
  - Fetches product data from the DummyJSON API on mount and when `id` changes.
  - Manages state for the product object, order quantity, and current image index.
  - Handles image navigation, quantity adjustments, and product navigation.
- **`Button.jsx`**: A reusable button component with consistent styling.
- **`Card.jsx`**: A reusable card container component with hover effects.
- **`Card2.jsx`**: A compact information card component displaying an icon, title, and description.

> **Note**: The `MainListing`, `SideBar`, and `Star` components are imported in `App.jsx` and `CompleteDesc.jsx` but were not included in the provided source files. Their implementation details could not be determined.

## Tech Stack

- **Language**: JavaScript (ES Modules)
- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Notifications**: React Hot Toast
- **Icons**: Remix Icon
- **Animation**: GSAP (listed as a dependency)
- **Linting**: ESLint 10 with React Hooks and React Refresh plugins

## Project Structure

```
Products/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Button.jsx
        ├── Card.jsx
        ├── Card2.jsx
        └── CompleteDesc.jsx
```

- **`index.html`**: HTML entry point that loads the React application via `/src/main.jsx`.
- **`vite.config.js`**: Vite configuration with React and Tailwind CSS plugins.
- **`eslint.config.js`**: ESLint flat configuration for JavaScript and JSX files.
- **`src/main.jsx`**: React root rendering with `StrictMode` and `Toaster`.
- **`src/App.jsx`**: Router configuration and top-level layout.
- **`src/index.css`**: Tailwind CSS import.
- **`src/components/`**: Reusable UI components.

## Prerequisites

- **Node.js**: A compatible version supporting Vite 8 and React 19.
- **npm**: Node Package Manager for installing dependencies.

## Installation

1. Clone the repository.
2. Navigate to the `Products` directory.
3. Install dependencies:

```bash
npm install
```

## Configuration

No environment variables or configuration files were identified in the provided source. The application relies on the public DummyJSON API endpoint `https://dummyjson.com/products/{id}` for product data.

## Usage

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint the codebase:

```bash
npm run lint
```

### Routes

| Path | Description |
|------|-------------|
| `/` | Main product listing page |
| `/desc/:id` | Product detail page for the specified product ID |

## API Reference

The application consumes the following external API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `https://dummyjson.com/products/{id}` | GET | Fetches product details by ID |

### Expected Response Fields

The `CompleteDesc` component expects the following fields in the JSON response:

- `title` (string)
- `brand` (string)
- `description` (string)
- `price` (number)
- `discountPercentage` (number)
- `rating` (number)
- `reviews` (array)
- `images` (array of strings)
- `availabilityStatus` (string: "In Stock", "Low Stock", or "Out of Stock")
- `shippingInformation` (string)
- `warrantyInformation` (string)
- `returnPolicy` (string)
- `minimumOrderQuantity` (number)
- `stock` (number)
- `sku` (string)
- `category` (string)
- `tags` (array of strings)

## Error Handling and Limitations

- **Loading State**: The `CompleteDesc` component returns `null` if the product data has not yet been fetched. No loading spinner or skeleton is implemented.
- **Navigation Boundaries**: Product navigation is constrained to IDs 1–194. Attempting to navigate beyond these limits triggers a toast error message.
- **Quantity Limits**: Order quantity is constrained by `minimumOrderQuantity` (lower bound) and `stock` (upper bound). Exceeding these limits triggers toast notifications.
- **Image Navigation**: Image navigation wraps around when reaching the first or last image.
- **Missing Components**: The `MainListing`, `SideBar`, and `Star` components are referenced but not provided in the source. Their behavior could not be determined.
- **No Error Handling for API Failures**: The `fetch` call in `CompleteDesc.jsx` does not include explicit error handling for network failures or non-200 responses.

## Security Considerations

- The application uses a public API endpoint (`dummyjson.com`) for product data. No authentication or API keys are required.
- No sensitive data or credentials are present in the provided source files.
- The application is a client-side only application with no server-side logic or database access.

## Contributing

Contributions are welcome. Please ensure that:

- Code follows the existing ESLint configuration.
- New components are placed in the `src/components/` directory.
- Changes are tested in the development environment using `npm run dev`.

## License

No license file or license information was found in the provided source files. The project is marked as `"private": true` in `package.json`.