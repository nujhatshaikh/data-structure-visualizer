# Data Structure Visualizer

An interactive, browser-based tool that helps students understand how data structures work internally through **step-by-step animations**. Every operation (insert, delete, search, traverse) is animated and explained in a live log, so you can see exactly what the algorithm is doing at each step.

**Live Demo:** https://nujhatshaikh.github.io/data-structure-visualizer/

> Built with plain HTML, CSS and JavaScript. No frameworks, no installation, no build step.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Modules in Detail](#modules-in-detail)
- [Time Complexity Reference](#time-complexity-reference)
- [How the Animation Works](#how-the-animation-works)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)
- [Learning Outcomes](#learning-outcomes)
- [Future Improvements](#future-improvements)
- [Team](#team)

---

## About the Project

Data structures are easy to read about but hard to *picture*. This project turns the theory into something you can watch and play with:

- Type a value, click an operation, and watch the structure change.
- Slow the animation down to follow every comparison, shift and pointer move.
- Read the live log at the bottom to see the exact step being executed.

It is useful for learning, for teaching, and for presentations or viva demos.

---

## Features

| Module | Operations |
|---|---|
| **Array** | Insert at index, delete at index, linear search, access by index, traverse, random fill |
| **Stack** | Push, pop, peek, overflow / underflow detection, TOP pointer |
| **Queue** | Enqueue, dequeue, peek front, overflow / underflow detection, FRONT and REAR pointers |
| **Linked List** | Insert at head / tail / position, delete by value, search, traverse (HEAD to NULL) |
| **Binary Search Tree** | Insert, delete, search, Inorder / Preorder / Postorder traversal, random tree |
| **Graph** | BFS and DFS with live queue / stack display, choose start node, add custom edges |

**General features**

- Adjustable animation speed (Very Slow to Turbo)
- Colour-coded highlights for current, found, deleted and moved elements
- Live step-by-step operation log for every module
- Input validation with clear error messages
- Responsive dark UI that works on desktop and mobile

---

## Modules in Detail

### 1. Array
Elements are stored in contiguous memory and accessed by index.
- **Insert / Delete:** elements to the right are shifted one by one (purple highlight) so you can see why these operations cost O(n).
- **Search:** linear search highlights each element in yellow and turns the match green.
- **Access:** jumps straight to an index, showing O(1) access.

### 2. Stack (LIFO)
Last In, First Out. All operations happen at the **TOP**.
- **Push** places a value on top, **Pop** removes it, **Peek** only reads it.
- Pushing onto a full stack shows **Stack Overflow**; popping an empty stack shows **Stack Underflow**.

### 3. Queue (FIFO)
First In, First Out. Insertion at the **REAR**, removal from the **FRONT**.
- The FRONT and REAR labels move as you enqueue and dequeue.
- Overflow and underflow cases are handled and shown.

### 4. Linked List
Each node holds a **data** field and a **next** pointer. The list starts at **HEAD** and ends at **NULL**.
- Inserting at a position walks the list node by node before linking the new node.
- Deleting by value finds the node, removes it and re-links the previous node.

### 5. Binary Search Tree
Left child is smaller than its parent; right child is larger.
- **Insert / Search:** the path is highlighted node by node ("go left" / "go right" in the log).
- **Delete:** handles all three cases: leaf node, one child, and two children (replaced by the inorder successor).
- **Traversals:** Inorder (L, Root, R), Preorder (Root, L, R), Postorder (L, R, Root), with the visited order shown as chips.

### 6. Graph
An undirected graph with nodes A to G.
- **BFS** uses a queue and explores level by level.
- **DFS** uses recursion (the call stack) and goes deep first, then backtracks.
- Neighbours are visited in alphabetical order. Edges used by the traversal turn green.
- You can add your own edges and restore the default graph at any time.

---

## Time Complexity Reference

| Structure | Operation | Time |
|---|---|---|
| Array | Access by index | O(1) |
| Array | Search | O(n) |
| Array | Insert / Delete | O(n) |
| Stack | Push / Pop / Peek | O(1) |
| Queue | Enqueue / Dequeue / Peek | O(1) |
| Linked List | Insert at head | O(1) |
| Linked List | Insert at tail / position, delete, search | O(n) |
| BST | Insert / Search / Delete (average) | O(log n) |
| BST | Insert / Search / Delete (worst case, skewed tree) | O(n) |
| Graph | BFS / DFS | O(V + E) |

---

## How the Animation Works

The animations are built with three simple ideas:

1. **Step-by-step execution:** each operation is an `async` function. After every step it calls a `wait()` helper that pauses for a moment. The speed slider changes how long that pause is.
2. **State and re-render:** the structure is stored in a normal JavaScript array / object. A highlight map marks which element is `active`, `found`, `danger` or `move`, and the view is redrawn after each step.
3. **CSS transitions:** colour and position changes are smoothed with CSS transitions, so highlights fade and move instead of jumping.

A simplified example (linked list traversal):

```js
for (let k = 0; k < L.length; k++) {
  lHL = { [k]: 'active' };  // mark this node
  lR();                     // redraw the list
  await D();                // pause (speed-controlled)
}
```

The tree and graph are drawn as **SVG**, and node positions are calculated from the tree depth and inorder position.

---

## Getting Started

### Run locally

1. Clone the repository
   ```bash
   git clone https://github.com/nujhatshaikh/data-structure-visualizer.git
   ```
2. Open the folder
   ```bash
   cd data-structure-visualizer
   ```
3. Open `index.html` in any modern browser, **or** use the VS Code **Live Server** extension and click **Go Live**.

No dependencies are required.

### How to use

1. Pick a data structure from the tabs at the top.
2. Enter a value (and an index / position where needed).
3. Click an operation button and watch the animation.
4. Use the **Speed** slider to slow down or speed up the animation.
5. Read the log at the bottom for a step-by-step explanation.

---

## Project Structure

```
data-structure-visualizer/
|-- index.html            # Page layout and all module panels
|-- css/
|   `-- style.css         # Styling, colours, animation transitions
|-- js/
|   |-- common.js         # Helpers: wait(), log(), tabs, speed control
|   |-- array.js          # Array module
|   |-- stack.js          # Stack module
|   |-- queue.js          # Queue module
|   |-- linkedlist.js     # Linked list module
|   |-- tree.js           # Binary search tree module
|   |-- graph.js          # Graph module (BFS / DFS)
|   `-- app.js            # Initial render and sample data
|-- .gitignore
`-- README.md
```

---

## Tech Stack

- **HTML5** for structure
- **CSS3** for layout, theming and transitions
- **Vanilla JavaScript (ES6+)** for logic, async animation and DOM updates
- **SVG** for tree and graph drawing
- **Git and GitHub Pages** for version control and hosting

---

## Deployment

The project is a static website and is hosted on **GitHub Pages**:

1. Push the code to the `main` branch.
2. In the repository, open **Settings, Pages**.
3. Set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then save.

The site is then available at `https://<username>.github.io/data-structure-visualizer/`.

---

## Learning Outcomes

- Understanding how arrays, stacks, queues, linked lists, trees and graphs behave internally
- Seeing why some operations are O(1) while others are O(n) or O(log n)
- Understanding BFS vs DFS and the role of queue vs stack
- Practising asynchronous JavaScript, DOM manipulation and SVG rendering
- Working with Git, GitHub and GitHub Pages

---

## Future Improvements

- Sorting algorithm visualizer (Bubble, Selection, Insertion, Merge, Quick)
- Doubly and circular linked lists
- AVL tree and heap visualization
- Weighted graphs with Dijkstra's shortest path
- Step-forward / step-back controls and a pause button
- Save and share a structure's state

---

## Author

- Nujhat Aara

Department of Computer Science, Bansal College of Engineering

---

If you found this project helpful, consider giving it a star on GitHub.