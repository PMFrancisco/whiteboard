# Whiteboard Editor with tldraw

This application is a whiteboard editor built using tldraw, Next.js, and tRPC for type-safe API implementation.

## Technologies Used

- **Next.js**: App router for robust server-side rendering and API routes
- **TailwindCSS**: Utility-first CSS framework for styling
- **Shadcn UI**: Component library built on top of Tailwind for consistent design
- **tRPC**: End-to-end typesafe API layer
- **tldraw**: Feature-rich drawing library
- **Prisma**: Type-safe ORM for database operations
- **PostgreSQL**: Database for storing whiteboard data
- **OpenAI**: AI integration for image generation

## Features

- Create and manage multiple whiteboards
- Real-time saving of whiteboard state
- Shape styling controls (color, fill, stroke style)
- Export drawings as SVG
- Persistent storage of whiteboard data in PostgreSQL
- Type-safe API endpoints for retrieving and storing data
- AI-powered image generation for whiteboard elements
- Custom UI with tools panel, styles panel, and AI panel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd whiteboard
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
   
Create a `.env` file in the root directory with the following:
```
DATABASE_URL="postgresql://username:password@localhost:5432/whiteboard_db"
OPENAI_API_KEY="your-openai-api-key" # Required for AI image generation
```

4. Run Prisma migrations to set up your database
```bash
npx prisma migrate dev --name init
```

5. Start the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

The application uses tRPC for type-safe API calls. The main endpoints are:

- `drawing.getDrawing`: Retrieves a specific whiteboard by ID
- `drawing.saveDrawing`: Saves the current state of a whiteboard
- `drawing.listDrawings`: Lists all available whiteboards
- `drawing.deleteDrawing`: Deletes a specific whiteboard
- `openAI.generateImage`: Generates images using AI based on text prompts

## Testing API Calls

The application uses tRPC for type-safe API calls. Here's how to test the API endpoints:

### Using the Browser

1. Navigate to the whiteboard list page at [http://localhost:3000/whiteboard](http://localhost:3000/whiteboard)
2. Create a new whiteboard or select an existing one
3. Make changes to the whiteboard and observe that they are automatically saved
4. Check the browser's developer tools Network tab to see the tRPC API calls

### Using cURL

You can test the API endpoints directly using cURL:

#### List all whiteboards (Query)
```bash
curl -X GET http://localhost:3000/api/trpc/drawing.listDrawings \
  -H "Content-Type: application/json"
```

#### Get a specific whiteboard (Query)
```bash
curl -X GET http://localhost:3000/api/trpc/drawing.getDrawing \
  -H "Content-Type: application/json" \
  -d '{"json":{"0":{"json":"your-whiteboard-id"}}}'
```

#### Save a whiteboard (Mutation)
```bash
curl -X POST http://localhost:3000/api/trpc/drawing.saveDrawing \
  -H "Content-Type: application/json" \
  -d '{"json":{"0":{"json":{"id":"your-whiteboard-id","content":{"schemaVersion":1,"document":{},"session":{}}}}}}'
```

#### Delete a whiteboard (Mutation)
```bash
curl -X POST http://localhost:3000/api/trpc/drawing.deleteDrawing \
  -H "Content-Type: application/json" \
  -d '{"json":{"0":{"json":"your-whiteboard-id"}}}'
```

#### Generate an image using AI (Mutation)
```bash
curl -X POST http://localhost:3000/api/trpc/openAI.generateImage \
  -H "Content-Type: application/json" \
  -d '{"json":{"0":{"json":{"prompt":"A happy dog playing with a ball"}}}}'
```

### Using tRPC Client in Code

You can also test the API calls programmatically using the tRPC client:

```typescript
import { trpc } from '@/utils/trpc';

// List all whiteboards
const drawings = await trpc.drawing.listDrawings.query();

// Get a specific whiteboard
const drawing = await trpc.drawing.getDrawing.query('your-whiteboard-id');

// Save a whiteboard
const result = await trpc.drawing.saveDrawing.mutate({
  id: 'your-whiteboard-id',
  content: {
    schemaVersion: 1,
    document: {},
    session: {}
  }
});

// Delete a whiteboard
const deleteResult = await trpc.drawing.deleteDrawing.mutate('your-whiteboard-id');

// Generate an image using AI
const imageResult = await trpc.openAI.generateImage.mutate({
  prompt: 'A happy dog playing with a ball'
});
```
## Project Structure

- `/app`: Next.js app directory with page components
  - `/whiteboard`: Whiteboard list page
  - `/whiteboard/[uuid]`: Dynamic route for individual whiteboards
  - `/api`: API routes
- `/components`: Reusable UI components
  - `/tldraw`: Custom tldraw UI components and tools
  - `/ui`: Shadcn UI components
  - `/layout`: Layout components
  - `/buttons`: Button components
  - `/cards`: Card components
  - `/lists`: List components
  - `/skeletons`: Loading skeleton components
- `/server`: Server-side code
  - `/routers`: tRPC router definitions
  - `/api`: API route handlers
  - `/trpc.ts`: tRPC server configuration
  - `/prisma.ts`: Prisma client configuration
  - `/context.ts`: tRPC context definition
  - `/actions.ts`: Server actions
  - `/openAiClient.ts`: OpenAI client configuration
- `/prisma`: Database schema and migrations
- `/hooks`: Custom React hooks for whiteboard functionality
  - `/useDeleteKey.ts`: Hook for handling delete key press
  - `/useImageUploader.ts`: Hook for image upload functionality
  - `/useImageGeneration.ts`: Hook for AI image generation
- `/utils`: Utility functions
  - `/trpc.tsx`: tRPC client configuration
  - `/uuidGenerator.ts`: UUID generation utility
- `/lib`: Library code
  - `/utils.ts`: General utility functions
- `/data`: Sample data
  - `/drawings.json`: Sample drawing data

## Custom Features

- **Auto-saving**: Changes to the whiteboard are automatically saved to the database
- **Style Controls**: Customize colors, fills, and stroke styles of shapes
- **AI Integration**: Generate images from text descriptions using OpenAI
- **Status Indicators**: Visual feedback when saving or encountering errors
- **Shape Styling**: Buttons to modify shape appearance (colors, fills, strokes)

## Development Notes

- The application uses tRPC's optimistic updates for a smoother user experience
- The whiteboard state is persisted in PostgreSQL using a JSON data type
- Error handling is implemented at both client and server levels
