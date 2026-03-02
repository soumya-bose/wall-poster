# Wall Art Customizer - Documentation

A modern web application built with **Next.js**, **React**, and **HTML5 Canvas** that allows users to create and preview custom-framed wall art in real-time.

## 🚀 Key Features

- **Real-time Preview**: See your uploaded image inside a realistic wooden frame mockup.
- **Interactive Controls**: 
  - **Zoom**: Use the slider or mouse wheel to adjust the image size.
  - **Pan**: Drag and drop the image within the frame for perfect positioning.
- **Frame Selection**: Choose from various premium frame styles (Natural Wood, Dark Walnut, Black, White).
- **High-Quality Export**: Download your customized poster as a PNG file.
- **Modern UI**: Styled with Tailwind CSS and Radix UI primitives for a premium feel.

---

## 🏗️ Architecture

The project follows a modular React architecture using the **Next.js App Router**.

### Project Structure (Key Files)

```text
├── app/
│   ├── layout.tsx         # Root layout with Theme Provider
│   └── page.tsx           # Main application entry point & layout
├── components/
│   ├── preview-canvas.tsx # Core rendering and interaction logic
│   ├── image-upload.tsx   # File handling UI
│   ├── template-selector.tsx # Frame style selection UI
│   └── ui/                # Reusable shadcn/ui components (Buttons, Sliders, etc.)
├── hooks/
│   └── use-image-preview.ts # Central state management & Canvas rendering logic
└── public/
    └── mockup.jpg         # Base mockup background image
```

---

## 🧩 Component Breakdown

### 1. `Home` ([app/page.tsx](file:///h:/Projects/wall%20poster/app/page.tsx))
The main orchestrator. It uses the `useImagePreview` hook to manage global state and coordinates communication between the preview and control components.

### 2. `PreviewCanvas` ([components/preview-canvas.tsx](file:///h:/Projects/wall%20poster/components/preview-canvas.tsx))
A specialized component that wraps the HTML5 `<canvas>`.
- **Interactions**: Handles mouse events (`onMouseDown`, `onMouseMove`, `onWheel`) to calculate drag deltas and zoom levels.
- **Responsiveness**: Maintains a `3/2` aspect ratio container for the canvas.

### 3. `ImageUpload` ([components/image-upload.tsx](file:///h:/Projects/wall%20poster/components/image-upload.tsx))
A simple, accessible UI for file selection. It accepts `JPG`, `PNG`, and `WebP` files and passes the file object to the parent via the `onImageUpload` callback.

### 4. `TemplateSelector` ([components/template-selector.tsx](file:///h:/Projects/wall%20poster/components/template-selector.tsx))
Renders a grid of frame options. Each option displays a mini preview of the frame's color and texture.

---

## 🧠 Core Logic: `useImagePreview`

The heart of the application resides in this custom hook ([hooks/use-image-preview.ts](file:///h:/Projects/wall%20poster/hooks/use-image-preview.ts)).

### State Management
It manages the `PreviewState` object:
- `imageSrc`: Base64 string of the uploaded photo.
- `template`: Current frame configuration (colors, widths).
- `scale`: Zoom multiplier (0.5x to 3x).
- `offsetX/Y`: Normalized position within the frame (-1 to 1).

### The Canvas Rendering Pipeline
The `renderPreview` function is triggered whenever the state changes:

1.  **DPI Scaling**: Uses `window.devicePixelRatio` for sharp rendering on high-resolution screens.
2.  **Base Mockup**: Draws the `mockup.jpg` background (1024x682).
3.  **Coordinate Precision**: Defines hardcoded coordinates for the inner frame area:
    ```typescript
    const contentX = 344;
    const contentY = 264;
    const contentWidth = 343;
    const contentHeight = 253;
    ```
4.  **Clipping**: Creates a rectangular clipping path to ensure the uploaded photo stays within the frame boundaries.
5.  **Smart Scaling**: Automatically calculates 'Cover' object-fit behavior before applying user-defined `scale` and `offset`.
6.  **Transformation Logic**: Applies the final `x` and `y` coordinates based on the center of the frame and user offsets.

---

## 🛠️ Development

### Setup
```bash
pnpm install
pnpm run dev
```

### Adding New Templates
To add a new frame style, simply append a `Template` object to the `TEMPLATES` array in `use-image-preview.ts`:
```typescript
{
  id: 'new-style',
  name: 'Modern Gold',
  frameColor: '#FFD700',
  frameWidth: 35
}
```

---

## ✅ Summary of Dependencies
- **UI**: `@radix-ui/react-*`, `lucide-react`, `shadcn/ui`
- **Styling**: `tailwindcss`, `autoprefixer`
- **Framework**: `Next.js 16.1.6`, `React 19`
