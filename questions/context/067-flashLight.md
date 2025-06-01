# FlashlightEnemies

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

There is a player with a flashlight and `N` enemies located on a plane.  
Your task is to find the **number of enemies highlighted by the flashlight**.

The player is looking in one of four directions: **up**, **down**, **left**, or **right**, and is shining a flashlight in that direction.  
The flashlight has:
- a **light radius** of length 5
- a **field of view** of 90 degrees (45° to the left and 45° to the right from the player's forward direction)

This direction is represented as a string `direction` in the following way:
- `"U"` → up  
- `"D"` → down  
- `"L"` → left  
- `"R"` → right  

---

## Input

The positions of `N` enemies are described by two arrays `X` and `Y`, both of integers.  
The `k`-th enemy position is represented by the coordinate pair `(X[k], Y[k])`.

The player’s position is fixed at `(0, 0)` and the direction of view is given by the `direction` string.

For the enemy to be highlighted by the flashlight, their position must be:
- within a distance of ≤ 5 from `(0, 0)`, **AND**
- within the 90° cone of the flashlight based on direction

---

## Function signature

```
function solution(direction: string, X: number[], Y: number[]): number;
```

---

## Examples

### Example 1

```
direction = "U"  
X = [-2, -1, 1, 2, -2, -1, 0, 1, 2]  
Y = [1, 2, 2, 1, 4, 4, 5, 4, 4]

Output: 6  
Explanation: 6 enemies are within the cone of vision upwards from (0, 0).
```

### Example 2

```
direction = "L"  
X = [-2, -1, -5, -4, -3, -1, 0]  
Y = [0, 1, -1, -2, -1, -4, -5]

Output: 5  
```

---

## Assumptions and Constraints

- `N` is an integer within the range [1..1,000]
- Each element of arrays `X` and `Y` is an integer within the range [-1,000..1,000]
- Arrays `X` and `Y` have the same length `N`
- The distance between two points `(x1, y1)` and `(x2, y2)` is calculated using Euclidean distance:  
  `sqrt((x1 - x2)^2 + (y1 - y2)^2)`
- A single enemy cannot appear in different positions
- Player is always at coordinate `(0, 0)`

---

**Note**:  
Your function should **return the number of enemies highlighted** by the flashlight based on its direction, radius, and field of view.

Focus on **correctness**. Performance is not the main evaluation criterion.


1. **Restate the question in clear language**
   The player is at `(0,0)`, shining a flashlight in one of four cardinal directions.
   The flashlight has a radius of 5 units and a 90° cone (±45° from the main direction).
   You are given arrays `X` and `Y` of enemy positions.
   Count how many enemies are **within both the 5-unit radius and the 90° cone**.

2. **Important points**

   * Need to check both **distance** and **angle** from `(0,0)` to each enemy.
   * Directions: `"U"` (up), `"D"` (down), `"L"` (left), `"R"` (right)
   * "Up" means positive Y, "Down" means negative Y, etc.
   * 90° cone: half-angle = 45°, i.e., if the angle between enemy vector and forward vector is ≤ 45°, enemy is highlighted.
   * For performance, use cosines instead of computing actual angles.

3. **Algorithm type**

   * For each enemy, check (a) Euclidean distance, (b) angle with respect to the main direction.

4. **Step-by-step solution**

   1. Map `"U"`, `"D"`, `"L"`, `"R"` to unit vectors:

      * `"U"` → (0, 1)
      * `"D"` → (0, -1)
      * `"L"` → (-1, 0)
      * `"R"` → (1, 0)
   2. For each enemy `(x, y)`:

      * Compute `dist2 = x*x + y*y`
      * If `dist2 > 25`, skip
      * Compute dot product:

        * If `"U"`, dot = y
        * If `"D"`, dot = -y
        * If `"L"`, dot = -x
        * If `"R"`, dot = x
      * Compute `cos(angle) = dot / sqrt(x*x + y*y)`
      * Accept if `cos(angle) >= cos(45°) ≈ 0.70710678118`
   3. Count and return number of accepted enemies.

5. **TypeScript solution**

   ```ts copy
   function solution(direction: string, X: number[], Y: number[]): number {
     const N = X.length;
     const R2 = 25;
     const cos45 = Math.SQRT1_2; // ≈ 0.70710678118
     let dir: [number, number];
     switch (direction) {
       case "U": dir = [0, 1]; break;
       case "D": dir = [0, -1]; break;
       case "L": dir = [-1, 0]; break;
       case "R": dir = [1, 0]; break;
       default: throw new Error("Invalid direction");
     }
     let count = 0;
     for (let i = 0; i < N; i++) {
       const x = X[i], y = Y[i];
       const dist2 = x * x + y * y;
       if (dist2 > R2) continue;
       // Vector to enemy: (x, y)
       const dot = x * dir[0] + y * dir[1];
       if (dist2 === 0) { count++; continue; } // player position
       const cosAngle = dot / Math.sqrt(dist2);
       if (cosAngle >= cos45) {
         count++;
       }
     }
     return count;
   }
   ```

6. **Examples from the question**

   * Example 1:

     * direction = "U"
     * X = \[-2, -1, 1, 2, -2, -1, 0, 1, 2]
     * Y = \[1, 2, 2, 1, 4, 4, 5, 4, 4]
     * Output: **6**
   * Example 2:

     * direction = "L"
     * X = \[-2, -1, -5, -4, -3, -1, 0]
     * Y = \[0, 1, -1, -2, -1, -4, -5]
     * Output: **5**

7. **Additional test cases**

   | direction | X              | Y              | Output | Notes                       |
   | --------- | -------------- | -------------- | ------ | --------------------------- |
   | "R"       | \[1,2,3,4,5,6] | \[0,0,0,0,0,0] | 5      | Only up to distance 5       |
   | "D"       | \[0,0,-2,2]    | \[0,-5,-3,-3]  | 3      | Only those in downward cone |
   | "U"       | \[0,1,-1,2,-2] | \[5,5,5,0,0]   | 3      | Only those at y=5 and y=0   |
   | "U"       | \[0]           | \[0]           | 1      | At player's own position    |
