export const part1RenderingContent = {
  id: 'part1-rendering',
  sections: [
    {
      id: 'definition',
      title: 'Definition',
      content: `
Rendering in React is the process of **calling your component functions** (or class render methods) to calculate what the UI should look like based on the current props and state.

**Key distinction**: React rendering ≠ Browser rendering. React rendering is a pure JavaScript calculation that produces a description of the UI (React Elements). Browser rendering is the process of painting pixels on screen.
      `,
    },
    {
      id: 'why-rendering-exists',
      title: 'Why Rendering Exists',
      content: `
React uses a **declarative programming model**. You describe *what* the UI should look like for a given state, and React figures out *how* to update the DOM.

Rendering exists because:
1. **State changes** - When state changes, the UI description must be recalculated
2. **Props change** - Parent passes new data, child must recalculate
3. **Context changes** - Consumers must recalculate when context value changes
4. **Force update** - Rare cases where you manually trigger recalculation

The render output is a **React Element tree** (Virtual DOM) - a lightweight JavaScript object representation of the UI.
      `,
    },
    {
      id: 'initial-rendering',
      title: 'Initial Rendering',
      content: `
**Initial render** happens when your app first mounts:

1. **createRoot(container).render(<App />)** - Entry point
2. **React creates a Fiber tree** for the entire component hierarchy
3. **Render phase begins** - React calls each component function
4. **Components return JSX** - Transpiled to React.createElement calls
5. **React Elements created** - Lightweight objects describing the UI
6. **Commit phase** - React applies changes to the actual DOM
7. **Browser paints** - User sees the UI

\`\`\`jsx
// User code
function App() {
  return <div>Hello World</div>;
}

// What React sees (after JSX transform)
function App() {
  return React.createElement('div', null, 'Hello World');
}

// React Element output
{
  type: 'div',
  props: { children: 'Hello World' },
  key: null,
  ref: null,
  $$typeof: Symbol(react.element)
}
\`\`\`
      `,
    },
    {
      id: 'rendering-vs-browser-rendering',
      title: 'Rendering vs Browser Rendering',
      content: `
| Aspect | React Rendering | Browser Rendering |
|--------|-----------------|-------------------|
| **What** | JavaScript function execution | Pixel painting on screen |
| **Output** | React Element tree (Virtual DOM) | Pixels on display |
| **Trigger** | State/props/context change | DOM mutations |
| **Control** | React controls when | Browser controls when |
| **Interruptible** | Yes (React 18+) | No |
| **Performance cost** | CPU (JS execution) | GPU/CPU (layout, paint, composite) |

**React Rendering** = "What should the UI look like?" (Calculation)
**Browser Rendering** = "Draw the pixels" (Rasterization)
      `,
    },
    {
      id: 'rendering-vs-painting',
      title: 'Rendering vs Painting',
      content: `
**Rendering (React)**: Pure calculation phase
- Calls your components
- Runs hooks (useState, useReducer, useContext, etc.)
- Creates React Elements
- Runs reconciliation (diffing)
- Can be paused, aborted, or restarted

**Painting (Browser)**: Visual output phase
- Style calculation (CSSOM)
- Layout (geometry calculation)
- Paint (drawing text, images, borders)
- Composite (layer composition)
- **Cannot be interrupted** once started

React's commit phase bridges these: it mutates the DOM, then the browser handles painting.
      `,
    },
    {
      id: 'what-react-does-during-rendering',
      title: 'What React Actually Does During Rendering',
      content: `
During the **Render Phase**, React:

1. **Creates/updates Fiber nodes** for each component
2. **Calls component functions** with current props/state
3. **Executes hooks** in order (useState, useReducer, useContext, etc.)
4. **Collects returned React Elements** (JSX result)
5. **Reconciles** new elements with current Fiber tree
6. **Marks fibers with flags** (Placement, Update, Deletion, etc.)
7. **Builds Work-In-Progress tree** (alternate tree)
8. **Returns completion** to scheduler

**Important**: No DOM changes happen during render phase!
      `,
    },
    {
      id: 'rendering-as-pure-calculation',
      title: 'Rendering as a Pure Calculation',
      content: `
React rendering should be **pure** - same inputs → same output, no side effects.

\`\`\`jsx
// ✅ Pure - same props/state always returns same JSX
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Impure - side effect during render
function Counter() {
  const [count, setCount] = useState(0);
  console.log('Rendering...'); // Side effect!
  fetch('/api/log-render');    // Side effect!
  return <div>{count}</div>;
}

// ✅ Side effects belong in useEffect
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('Committed:', count);
    fetch('/api/log-render');
  }, [count]);
  return <div>{count}</div>;
}
\`\`\`

**Why purity matters**:
- Enables React to **pause/resume/restart** rendering
- Allows **concurrent features** (time slicing, transitions)
- Makes rendering **predictable and testable**
- Enables **automatic memoization** (React Compiler)
      `,
    },
    {
      id: 'examples',
      title: 'Examples',
      content: `
**Example 1: Simple Component Render**
\`\`\`jsx
function Greeting({ name }) {
  // This function IS the render
  return <h1>Hello, {name}!</h1>;
}

// When parent renders:
<Greeting name="Alice" />  // Calls Greeting({ name: "Alice" })
\`\`\`

**Example 2: State Triggering Render**
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Render happens when setCount is called
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

**Example 3: Render Without DOM Change**
\`\`\`jsx
function ExpensiveComponent({ data }) {
  // This runs every render, but DOM may not change
  const processed = heavyComputation(data);
  return <div>{processed}</div>;
}

// Parent re-renders with same data prop
// ExpensiveComponent re-renders (function runs)
// But if processed === previous processed, DOM doesn't change
\`\`\`
      `,
    },
    {
      id: 'internal-flow',
      title: 'Internal Flow',
      content: `
\`\`\`mermaid
flowchart TD
    A[User Event / State Change] --> B[Scheduler Receives Update]
    B --> C[Assign Priority Lane]
    C --> D[Schedule Work Loop]
    D --> E[Begin Render Phase]
    E --> F[Create/Update Fiber Nodes]
    F --> G[Call Component Functions]
    G --> H[Execute Hooks]
    H --> I[Collect React Elements]
    I --> J[Reconciliation / Diffing]
    J --> K[Mark Fiber Flags]
    K --> L[Build WIP Tree]
    L --> M{Work Complete?}
    M -->|No| N[Yield to Browser]
    N --> D
    M -->|Yes| O[Commit Phase]
    O --> P[DOM Mutations]
    P --> Q[Layout Effects]
    Q --> R[Browser Paint]
    R --> S[Passive Effects]
\`\`\`
      `,
    },
    {
      id: 'performance-considerations',
      title: 'Performance Considerations',
      content: `
1. **Render cost** = Component function execution + hook execution + JSX creation
2. **Unnecessary renders** waste CPU - use \`React.memo\`, \`useMemo\`, \`useCallback\`
3. **Expensive computations** in render block the main thread - move to \`useMemo\` or Web Workers
4. **Inline functions/objects** in JSX cause child re-renders - memoize with \`useCallback\`/\`useMemo\`
5. **React DevTools Profiler** shows render duration and why components rendered

**Render Phase Budget**: Aim for < 16ms per frame (60fps). React yields every ~5ms in concurrent mode.
      `,
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes',
      content: `
| Mistake | Problem | Fix |
|---------|---------|-----|
| Side effects in render | Breaks concurrent rendering, causes bugs | Move to \`useEffect\` |
| Mutating state directly | React won't detect changes | Use setters: \`setCount(c => c + 1)\` |
| Creating objects in JSX | New reference every render | \`useMemo\`/\`useCallback\` |
| Not using keys in lists | Wrong reconciliation, bugs | Use stable unique keys |
| Heavy computation in render | Blocks main thread | \`useMemo\` or Web Worker |
      `,
    },
    {
      id: 'interview-questions',
      title: 'Interview Questions',
      content: `
**Q1: What is rendering in React?**
A: Rendering is the process of calling component functions to calculate the UI description (React Elements) based on current props and state. It's a pure JavaScript calculation, not DOM manipulation.

**Q2: Does rendering mean the DOM updates?**
A: No. Rendering produces a React Element tree. DOM updates happen in the separate commit phase. React can render without DOM changes (e.g., same output).

**Q3: What triggers a render?**
A: State changes (setState), props changes, context changes, forceUpdate, parent re-render.

**Q4: Is rendering synchronous or asynchronous?**
A: In React 18+ with concurrent features, rendering is **interruptible** and can be **asynchronous**. The render phase can pause, yield to browser, and resume. The commit phase is always synchronous.

**Q5: What is the difference between render phase and commit phase?**
A: Render phase: calls components, runs hooks, reconciliation, builds WIP tree (interruptible). Commit phase: DOM mutations, ref updates, layout effects, paint, passive effects (synchronous, cannot interrupt).

**Q6: Why must render be pure?**
A: Purity allows React to safely pause, abort, and restart rendering. Impure renders break concurrent features and cause unpredictable bugs.
      `,
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      content: `
1. **Keep renders pure** - No side effects, no mutations, no async in render
2. **Minimize render work** - Move expensive calculations to \`useMemo\`
3. **Stabilize references** - \`useCallback\` for functions, \`useMemo\` for objects passed as props
4. **Use \`React.memo\`** for components that render often with same props
5. **Profile before optimizing** - Use React DevTools Profiler
6. **Understand when renders happen** - State, props, context, parent
      `,
    },
    {
      id: 'summary',
      title: 'Summary',
      content: `
- **Rendering** = Calling component functions to calculate UI description
- **React Elements** = Lightweight JS objects (Virtual DOM), not real DOM
- **Render Phase** = Pure calculation, interruptible, no DOM changes
- **Commit Phase** = Actual DOM mutations, synchronous
- **Triggers** = State, props, context, parent re-render
- **Purity** = Essential for concurrent features
- **Performance** = Render cost matters; profile and optimize
      `,
    },
  ],
  diagrams: [
    {
      id: 'rendering-flow',
      title: 'Rendering Flow',
      mermaid: `
flowchart TD
    A[State Change] --> B[Schedule Update]
    B --> C[Render Phase]
    C --> D[Call Components]
    D --> E[Run Hooks]
    E --> F[Create React Elements]
    F --> G[Reconciliation]
    G --> H[Build WIP Tree]
    H --> I[Commit Phase]
    I --> J[DOM Mutations]
    J --> K[Browser Paint]
`,
    },
    {
      id: 'initial-render',
      title: 'Initial Render Process',
      mermaid: `
sequenceDiagram
    participant App
    participant React
    participant DOM
    App->>React: createRoot.render(<App />)
    React->>React: Create Fiber Root
    React->>React: Begin Work Loop
    loop For each component
        React->>React: Call Component Function
        React->>React: Execute Hooks
        React->>React: Create React Elements
        React->>React: Reconcile Children
    end
    React->>React: Complete Work Loop
    React->>DOM: Commit Phase (DOM Mutations)
    DOM->>Browser: Paint
`,
    },
    {
      id: 'react-vs-browser-rendering',
      title: 'React vs Browser Rendering',
      mermaid: `
flowchart LR
    subgraph React["React (JavaScript)"]
        R1[Component Functions]
        R2[Hooks Execution]
        R3[React.createElement]
        R4[Reconciliation]
        R5[Fiber Tree]
    end

    subgraph Bridge["Commit Phase"]
        B1[DOM Mutations]
    end

    subgraph Browser["Browser (Native)"]
        BR1[Style Calculation]
        BR2[Layout]
        BR3[Paint]
        BR4[Composite]
    end

    R1 --> R2 --> R3 --> R4 --> R5 --> B1 --> BR1 --> BR2 --> BR3 --> BR4
`,
    },
  ],
};