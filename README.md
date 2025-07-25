# FlowBot

A modern, extensible chatbot flow builder built with React, Vite, and React Flow. FlowBot provides an intuitive drag-and-drop interface for creating and managing chatbot conversation flows with persistent storage capabilities.

## 🚀 Features

### Core Functionality

-   **Visual Flow Builder**: Intuitive drag-and-drop interface for creating chatbot flows
-   **Text Nodes**: Support for text message nodes with customizable content
-   **Edge Connections**: Connect nodes to create conversation paths
-   **Persistent Storage**: Save and switch between multiple flows using local storage
-   **Real-time Editing**: Live editing of node properties through the settings panel

### Node System

-   **Text Message Nodes**: Primary building blocks for conversation flows
-   **Extensible Architecture**: Designed to easily accommodate new node types
-   **Source Handles**: Each node can have one outgoing connection
-   **Target Handles**: Nodes can receive multiple incoming connections

### User Interface

-   **Nodes Panel**: Centralized library of available node types
-   **Settings Panel**: Context-sensitive editing panel that appears when nodes are selected
-   **Save System**: Built-in validation and saving with error handling
-   **Flow Management**: Create, save, and switch between different chatbot flows

## 🛠️ Tech Stack

-   **Frontend Framework**: React 19.1.0
-   **Build Tool**: Vite
-   **Flow Library**: @xyflow/react 12.8.2
-   **Styling**: Tailwind CSS 4.1.11
-   **State Management**: Zustand 5.0.6
-   **Icons**: Lucide React 0.525.0
-   **Notifications**: React Hot Toast 2.5.2

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Sagar-Shetty21/FlowBot
cd flowbot
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
flowbot/
├── src/
│   ├── components/
│   │   ├── nodes/           # Node components
│   │   ├── panels/          # UI panels (Nodes, Settings)
│   │   └── flow/            # Flow-related components
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Zustand store configuration
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/
└── package.json
```

## 🎯 Usage

### Creating a Flow

1. **Add Nodes**: Drag text message nodes from the Nodes Panel onto the canvas
2. **Connect Nodes**: Create edges by connecting source handles to target handles
3. **Edit Content**: Select any node to open the Settings Panel and edit its text content
4. **Save Flow**: Use the Save button to persist your flow (validation included)

### Managing Flows

-   **Create New**: Start with a blank canvas for new flows
-   **Save Current**: Store your current flow with a custom name
-   **Switch Flows**: Load previously saved flows from the dropdown menu
-   **Auto-save**: Flows are automatically saved to local storage

### Validation Rules

-   Flows with multiple nodes must have proper connections
-   Nodes cannot have empty target handles (except for terminal nodes)
-   Save operation will display helpful error messages for validation failures

## 🔧 Extending FlowBot

### Adding New Node Types

1. **Create Node Component**:

```jsx
// src/components/nodes/CustomNode.jsx
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data, selected }) => {
    return (
        <div className="custom-node">
            <Handle type="target" position={Position.Top} />
            {/* Your custom node content */}
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default CustomNode;
```

2. **Register Node Type**:

```jsx
// Add to your node types configuration
const nodeTypes = {
    textMessage: TextMessageNode,
    customNode: CustomNode, // Add your new node type
};
```

3. **Update Nodes Panel**:

```jsx
// Add to the nodes panel configuration
const availableNodes = [
    { type: "textMessage", label: "Text Message" },
    { type: "customNode", label: "Custom Node" }, // Add your new node
];
```

### Adding New Features

The codebase is structured for easy extension:

-   **State Management**: Extend the Zustand store in `src/store/`
-   **Custom Hooks**: Add reusable logic in `src/hooks/`
-   **UI Components**: Create new panels or components in `src/components/`
-   **Utilities**: Add helper functions in `src/utils/`

## 🎨 Styling

FlowBot uses Tailwind CSS for styling with a modern, clean design:

<!-- - **Responsive Design**: Works seamlessly across different screen sizes
- **Dark/Light Mode**: Ready for theme switching implementation -->

-   **Custom Components**: Styled with Tailwind utility classes
-   **Consistent UI**: Unified design language throughout the application

## 🚦 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 🙏 Acknowledgments

-   [React Flow](https://reactflow.dev/) for the excellent flow building library
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
-   [Zustand](https://github.com/pmndrs/zustand) for lightweight state management

---

**FlowBot** - Building the future of conversational AI, one flow at a time. 🤖✨
