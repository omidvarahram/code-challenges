'''
# 26. Additional Examples

## Problem 1 — Cycle Pointer Jumps

### Context:
You're given an array where each element points to the next index. Starting at index 0, follow the jumps:
- Stop if index is `-1`
- Or if a **cycle** occurs (index already visited)

### Approach:
- Use a `Set` to track visited indices
- Keep jumping while index is valid and not visited
- Count steps

### Solution:

```typescript
function solution(A: number[]): number {
  const visited = new Set<number>();
  let index = 0;
  let steps = 0;

  while (index !== -1 && !visited.has(index) && index >= 0 && index < A.length) {
    visited.add(index);
    index = A[index];
    steps++;
  }

  return steps;
}
```

### Examples:

```ts
solution([1, 4, -1, 3, 2]) // → 4
solution([2, 2, 2, 2, -1]) // → 3
solution([1, 1, 1])        // → 2
