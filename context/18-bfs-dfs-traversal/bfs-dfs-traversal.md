# 18. BFS and DFS Traversal

## How the Approach Works

**Breadth-First Search (BFS)** and **Depth-First Search (DFS)** are methods to traverse trees, graphs, or similar structures.

- **BFS** explores neighbors level by level (uses a **queue**).
- **DFS** explores as deep as possible first before backtracking (uses a **stack** or **recursion**).

Key characteristics:
- BFS is great for finding the **shortest path** in unweighted graphs.
- DFS is better for **full exploration** and solving backtracking problems.

Time complexity:  
- O(N + E) where N = nodes, E = edges.

## What Kind of Questions Use BFS and DFS

- Graph traversal
- Finding shortest paths (BFS)
- Checking connectivity
- Maze solving, tree problems
- Backtracking and exhaustive search

## Real Examples and Solutions

### Example 1 — BFS Level Order Traversal (Binary Tree)

**Problem:**  
Return the level-order traversal of a binary tree.

**Solution (BFS with queue):**

```javascript
function levelOrder(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const level = [];
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}
```
> Queue stores nodes to be visited level-by-level.

---

### Example 2 — DFS Preorder Traversal (Binary Tree)

**Problem:**  
Return preorder traversal (root -> left -> right) of a binary tree.

**Solution (DFS with recursion):**

```javascript
function preorderTraversal(root) {
    const result = [];

    function dfs(node) {
        if (!node) return;
        result.push(node.val);
        dfs(node.left);
        dfs(node.right);
    }

    dfs(root);
    return result;
}
```
> Visit node, then children recursively.

---

### Example 3 — Number of Islands (DFS)

**Problem:**  
Count number of islands in a grid (connected 1s).

**Solution:**

```javascript
function numIslands(grid) {
    if (!grid.length) return 0;

    const rows = grid.length, cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
            return;
        }
        grid[r][c] = '0';
        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c - 1);
        dfs(r, c + 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}
```
> DFS marks visited land cells to avoid re-visiting.

---

### Example 4 — Shortest Path in Binary Matrix (BFS)

**Problem:**  
Find the shortest path from top-left to bottom-right in binary grid.

**Solution:**

```javascript
function shortestPathBinaryMatrix(grid) {
    if (grid[0][0] !== 0) return -1;

    const n = grid.length;
    const queue = [[0, 0, 1]];
    const directions = [[0,1],[1,0],[1,1],[-1,0],[0,-1],[-1,-1],[1,-1],[-1,1]];

    while (queue.length > 0) {
        const [x, y, dist] = queue.shift();
        if (x === n - 1 && y === n - 1) return dist;

        for (const [dx, dy] of directions) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < n && ny < n && grid[nx][ny] === 0) {
                grid[nx][ny] = 1;
                queue.push([nx, ny, dist + 1]);
            }
        }
    }
    return -1;
}
```
> BFS guarantees the shortest path because it explores equally outward.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| BFS (Breadth-First Search) | Level-order, shortest paths |
| DFS (Depth-First Search) | Full exploration, backtracking |
| Queue for BFS | Explore neighbors first |
| Stack or recursion for DFS | Explore deep paths first |
| Applications | Graph traversal, grid problems, maze solving |
