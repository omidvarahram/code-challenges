# 21. Union-Find (Disjoint Set Union - DSU)

## How the Approach Works

**Union-Find** (or **Disjoint Set Union - DSU**) is a data structure that keeps track of a set of elements partitioned into disjoint (non-overlapping) subsets.

Key operations:
- **Find(x):** Return the representative (root) of the set containing `x`.
- **Union(x, y):** Merge the sets containing `x` and `y`.

Optimizations:
- **Path compression:** Flatten the tree when calling `find()`, so future queries are faster.
- **Union by rank/size:** Always attach the smaller tree under the root of the larger tree.

Time complexity:  
- Almost O(1) per operation (specifically, O(α(N)), where α is the inverse Ackermann function).

## What Kind of Questions Use Union-Find

- Finding connected components
- Detecting cycles in undirected graphs
- Kruskal's Minimum Spanning Tree (MST) algorithm
- Grouping problems
- Connectivity queries

## Real Examples and Solutions

### Example 1 — Find and Union Basic Implementation

**Problem:**  
Implement basic Union-Find structure with path compression.

**Solution:**

```javascript
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;

        if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        return true;
    }
}
```
> Path compression during `find` and union by rank.

---

### Example 2 — Number of Connected Components in a Graph

**Problem:**  
Given N nodes and a list of edges, find the number of connected components.

**Solution:**

```javascript
function countComponents(n, edges) {
    const uf = new UnionFind(n);
    let components = n;

    for (let [u, v] of edges) {
        if (uf.union(u, v)) {
            components--;
        }
    }
    return components;
}
```
> Merge nodes and decrement component count when a union occurs.

---

### Example 3 — Redundant Connection (Cycle Detection)

**Problem:**  
Find the edge that can be removed to make the graph a tree (i.e., no cycles).

**Solution:**

```javascript
function findRedundantConnection(edges) {
    const uf = new UnionFind(edges.length);

    for (let [u, v] of edges) {
        if (!uf.union(u - 1, v - 1)) {
            return [u, v];
        }
    }
}
```
> If union fails, a cycle is detected.

---

### Example 4 — Kruskal's Algorithm (Minimum Spanning Tree)

**Problem:**  
Find the minimum cost to connect all points (edges with weights).

**Solution Outline (Pseudocode):**

```javascript
function kruskal(n, edges) {
    edges.sort((a, b) => a[2] - b[2]); // sort by weight
    const uf = new UnionFind(n);
    let cost = 0;

    for (let [u, v, weight] of edges) {
        if (uf.union(u, v)) {
            cost += weight;
        }
    }
    return cost;
}
```
> Kruskal picks smallest weight edges, connecting components.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Find | Locate set representative (root) |
| Union | Merge two sets together |
| Path compression | Flatten trees for faster finds |
| Union by rank | Attach smaller tree under larger |
| Applications | Connectivity, cycle detection, MST construction |