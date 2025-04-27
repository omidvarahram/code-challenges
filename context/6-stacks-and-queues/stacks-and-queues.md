# 6. Stacks and Queues

## How the Approach Works

A **stack** is a Last-In-First-Out (LIFO) data structure.  
A **queue** is a First-In-First-Out (FIFO) data structure.

In Codility problems:
- **Stacks** are used when the most recent element needs to be accessed first (e.g., matching parentheses, managing previous states).
- **Queues** are used when elements need to be processed in the order they arrived (e.g., breadth-first search, river crossing simulations).

Key operations:
- Stack: `push()`, `pop()`, `peek()`
- Queue: `enqueue()`, `dequeue()`

Both structures provide **O(1)** operations for adding/removing from ends.

## What Kind of Questions Use Stacks and Queues

- Matching brackets or parentheses
- Processing items in order of appearance (queues)
- Keeping track of the last seen values (stacks)
- Simulating real-world processes (e.g., cars on a bridge, customers in line)
- Undo functionality (stacks)

## Real Examples and Solutions

### Example 1 — Brackets

**Problem:**  
Determine whether a string of brackets is properly nested.

**Solution:**

```javascript
function solution(S) {
    const stack = [];
    const matching = { ')': '(', ']': '[', '}': '{' };

    for (let char of S) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== matching[char]) {
                return 0;
            }
        }
    }
    return stack.length === 0 ? 1 : 0;
}
```
> Push open brackets onto stack, pop when matching closing brackets appear.

---

### Example 2 — Fish

**Problem:**  
Given two arrays (sizes and directions), find how many fish will stay alive.

**Solution (using a stack for upstream fish):**

```javascript
function solution(A, B) {
    const stack = [];
    let alive = 0;

    for (let i = 0; i < A.length; i++) {
        if (B[i] === 1) {
            stack.push(A[i]);
        } else {
            while (stack.length > 0) {
                if (stack[stack.length - 1] > A[i]) {
                    break;
                } else {
                    stack.pop();
                }
            }
            if (stack.length === 0) {
                alive++;
            }
        }
    }
    return alive + stack.length;
}
```
> Stack stores downstream fish. Upstream fish either eat or are eaten.

---

### Example 3 — Stone Wall

**Problem:**  
Find the minimum number of blocks needed to build a wall with varying heights.

**Solution (stack approach):**

```javascript
function solution(H) {
    const stack = [];
    let blocks = 0;

    for (let height of H) {
        while (stack.length > 0 && stack[stack.length - 1] > height) {
            stack.pop();
        }
        if (stack.length === 0 || stack[stack.length - 1] < height) {
            stack.push(height);
            blocks++;
        }
    }
    return blocks;
}
```
> Each new block height either extends or finishes the previous one.

---

### Example 4 — Nesting

**Problem:**  
Check if a string of parentheses only is properly nested.

**Solution:**

```javascript
function solution(S) {
    const stack = [];

    for (let char of S) {
        if (char === '(') {
            stack.push(char);
        } else {
            if (stack.length === 0) {
                return 0;
            }
            stack.pop();
        }
    }
    return stack.length === 0 ? 1 : 0;
}
```
> A simpler version of the brackets matching problem.

## Quick Summary

| Concept | Usage |
|:--------|:------|
| Stack (LIFO) | Matching, undo, backtracking |
| Queue (FIFO) | Order-preserving, simulations |
| Stack operations | `push()`, `pop()`, `peek()` |
| Queue operations | `enqueue()`, `dequeue()` |
| Time complexity | O(N) traversal and processing |