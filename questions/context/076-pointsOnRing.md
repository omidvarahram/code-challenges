# PointsOnRing

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

A **ring** is an area limited by two circles that:
- have the **same center** but **different radii**.
- The center is always at `(0, 0)`.

You are given a set of points. Your task is to determine **how many of those points lie inside the ring** (excluding the boundaries).

---

## Function signature

```
function solution(inner: number, outer: number, points_x: number[], points_y: number[]): number;
```

- `inner` = inner radius of the ring  
- `outer` = outer radius of the ring  
- `points_x` and `points_y` = coordinates of the points, such that point `i` has coordinates `(points_x[i], points_y[i])`

A point `(x, y)` is inside the ring **if**:

```
inner² < x² + y² < outer²
```

---

## Examples

### Example 1

```
inner = 1
outer = 3
points_x = [2, 0, 1, -2]
points_y = [4, 0, 1, 4]

Point 0: (2,4) → outside  
Point 1: (0,0) → center → inside inner circle → invalid  
Point 2: (1,1) → 1 < sqrt(2) < 3 → inside  
Point 3: (-2,4) → outside  

Output: 1
```

### Example 2

```
inner = 2
outer = 4
points_x = [-1, 0, 1, 2, 3]
points_y = [4, 4, 4, 4, 8]

Point (1,3) is the only one that lies inside the ring.

Output: 1
```

---

## Assumptions

- `points_x.length = points_y.length = N`
- `1 ≤ N ≤ 100,000`
- Each coordinate is an integer in the range `[-10,000..10,000]`
- `1 ≤ inner < outer ≤ 10,000`

---

Focus on **correctness**. Performance is not the primary focus.


1. **Restate the question in clear language**
   Given two radii (inner and outer), and a list of points, count how many points lie **strictly** inside the ring area between the two circles centered at (0,0), i.e., points where `inner² < x² + y² < outer²`.

2. **Important points**

   * Points **on the boundaries** (where `x² + y² == inner²` or `x² + y² == outer²`) are **excluded**.
   * The comparison must use squared values to avoid unnecessary square roots.

3. **Algorithm type**

   * Simple loop and conditional checks for each point.

4. **Step-by-step solution**

   1. Compute `inner²` and `outer²` once.
   2. For each point, calculate `x² + y²`.
   3. If `inner² < value < outer²`, count it.

5. **TypeScript solution**

   ```ts copy
   function solution(inner: number, outer: number, points_x: number[], points_y: number[]): number {
     const in2 = inner * inner;
     const out2 = outer * outer;
     let count = 0;
     for (let i = 0; i < points_x.length; i++) {
       const d2 = points_x[i] * points_x[i] + points_y[i] * points_y[i];
       if (d2 > in2 && d2 < out2) {
         count++;
       }
     }
     return count;
   }
   ```

6. **Examples from the question**

   * Example 1:
     inner=1, outer=3
     points\_x = \[2,0,1,-2], points\_y = \[4,0,1,4]
     Only (1,1): 1²+1²=2, 1<2<9 ⇒ **1**
   * Example 2:
     inner=2, outer=4
     points\_x = \[-1,0,1,2,3], points\_y = \[4,4,4,4,8]
     Only (1,3): 1²+3²=10, 4<10<16 ⇒ **1**

7. **Additional test cases**

   | inner | outer | points\_x    | points\_y    | Output | Notes                           |
   | ----- | ----- | ------------ | ------------ | ------ | ------------------------------- |
   | 1     | 2     | \[0,1,1]     | \[0,0,1]     | 0      | All on or inside boundaries     |
   | 1     | 5     | \[3,4,2,1,0] | \[4,3,0,1,5] | 2      | (3,4) and (4,3) are on boundary |
   | 1     | 10    | \[6,8,7,0]   | \[8,6,7,9]   | 2      | (7,7) and (0,9)                 |
   | 1     | 10000 | \[100,100,0] | \[0,100,100] | 3      | All inside the big ring         |
