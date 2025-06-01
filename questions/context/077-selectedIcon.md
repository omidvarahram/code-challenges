# SelectedIcon

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

You are given a device with a touch screen of 1080 pixels in height and 1920 pixels in width.

There are `N` icons on the screen, each with a **tap-sensitive radius of 20 pixels**, centered at their own coordinates.

You are also given:
- Arrays `A` and `B` representing the positions of the icons, where:
  - `A[i]` is the x-coordinate
  - `B[i]` is the y-coordinate of icon `i`
- A tap on the screen at coordinates `(X, Y)`

Your task is to return the **index of the icon** that the tap selects, if the tap is within the 20-pixel radius from that icon.

> If the tap is **not within** range of any icon, return `-1`.  
> There is **at most one** icon within range of the tap.

---

## Function signature

```
function solution(A: number[], B: number[], X: number, Y: number): number;
```

---

## Examples

### Example 1

```
A = [100, 200, 300]
B = [100, 100, 100]
Tap: (100, 100)

Output: 0
```

### Example 2

```
A = [100, 200, 190]
B = [50, 100, 100]
Tap: (100, 70)

Output: 0
```

### Example 3

```
A = [100, 200, 190]
B = [50, 100, 100]
Tap: (200, 60)

Output: -1
```

---

## Assumptions

- There is **at most one icon** within the tap range of `(X, Y)`
- `N` is an integer within the range `[1..100]`
- `A[i]` ∈ `[0..1919]` and `B[i]` ∈ `[0..1079]` for all `i`
- `X` ∈ `[0..1919]`
- `Y` ∈ `[0..1079]`

---

## Notes

A point `(x, y)` is within the range of icon `(cx, cy)` if:

```
(x - cx)² + (y - cy)² ≤ 20² = 400
```

---

Focus on **correctness**.


1. **Restate the question in clear language**
   Given N icons at given positions (with a tap radius of 20 pixels) and a tap at (X, Y), return the index of the icon within range of the tap (if any). Return `-1` if the tap is not within range of any icon.

2. **Important points**

   * The radius for selection is 20 pixels (distance squared ≤ 400).
   * There is **at most one** icon within range.
   * Coordinates are integers and within the device’s screen bounds.

3. **Algorithm type**

   * Simple iteration and Euclidean distance check.

4. **Step-by-step solution**

   1. For each icon, calculate the squared distance from `(A[i], B[i])` to `(X, Y)`.
   2. If it is ≤ 400, return index `i`.
   3. If no such icon is found, return `-1`.

5. **TypeScript solution**

   ```ts copy
   function solution(A: number[], B: number[], X: number, Y: number): number {
     for (let i = 0; i < A.length; i++) {
       const dx = X - A[i];
       const dy = Y - B[i];
       if (dx * dx + dy * dy <= 400) {
         return i;
       }
     }
     return -1;
   }
   ```

6. **Examples from the question**

   * Example 1: `A = [100, 200, 300], B = [100, 100, 100], Tap = (100,100)` → Output: **0**
   * Example 2: `A = [100, 200, 190], B = [50, 100, 100], Tap = (100,70)` → Output: **0**
   * Example 3: `A = [100, 200, 190], B = [50, 100, 100], Tap = (200,60)` → Output: **-1**

7. **Additional test cases**

   | A                              | B    | X    | Y | Output                         | Notes                      |
   | ------------------------------ | ---- | ---- | - | ------------------------------ | -------------------------- |
   | \[0], \[0]                     | 0    | 0    | 0 | 0                              | Exactly at the icon center |
   | \[1919], \[1079]               | 1919 | 1079 | 0 | Last pixel on screen, in range |                            |
   | \[100], \[100], \[120], \[120] | 100  | 100  | 0 | Only first icon within range   |                            |
