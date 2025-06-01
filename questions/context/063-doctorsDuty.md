# DoctorsDuty

**Programming language:** TypeScript  
**Language:** English  

---

## Task description

There are `N` hospitals, numbered from `0` to `N-1`. You are given a schedule of work in each of the hospitals for the following `M` days.

The schedule is provided as a two-dimensional array `A` containing `N` rows, each row representing the schedule of one hospital, and `M` columns, each column representing one day.

Integer `A[K][L]` (for `K` in range `[0..N-1]` and `L` in range `[0..M-1]`) represents the **ID of the doctor** working at hospital `K` on day `L`.

> Note: An individual doctor may work at **more than one hospital** on the **same day**.

---

## Goal

Write a function:

```
function solution(A: number[][]): number;
```

that, given a matrix `A` consisting of `N` rows and `M` columns representing the hospitals’ schedules, returns the **number of doctors** working at **more than one hospital on the same day**.

---

## Examples

### Example 1:

```
Input:
A = [
  [1, 2, 3],
  [3, 2, 4]
]

Day 0 → doctors: 1, 3
Day 1 → doctors: 2, 2 → doctor 2 works in 2 hospitals
Day 2 → doctors: 3, 4

Doctor 2 works in more than one hospital on Day 1.
Output: 1
```

---

### Example 2:

```
Input:
A = [
  [1, 2, 4],
  [2, 4, 5],
  [1, 1, 1]
]

Doctor 1: appears on Day 0 (2x), Day 1, Day 2  
Doctor 2: appears on Day 0, Day 1  
Doctor 4: appears on Day 0, Day 1  
Doctor 5: appears on Day 2  

Output: 3  
(Doctors 1, 2, and 4 worked in more than one hospital on the same day.)
```

---

### Example 3:

```
Input:
A = [
  [1, 3],
  [6, 2]
]

All doctors work at only one hospital per day.
Output: 0
```

---

## Constraints

- `N` and `M` are integers within the range `[1..1000]`
- Each element `A[i][j]` is an integer within the range `[1..1000000000]`
- Each doctor ID is a positive integer
- Matrix A has dimensions `N x M`

---

In your solution, focus on **correctness**. The performance will not be the focus of the assessment.


1. **Restate the question in clear language**
   Given a schedule matrix where each row is a hospital and each column is a day, and each cell contains the doctor’s ID working at that hospital on that day, find how many distinct doctors worked at **more than one hospital on the same day** (i.e., their ID appears more than once in any column).

2. **Important points**

   * For each day (column), count doctor IDs.
   * If a doctor appears in a column more than once, they worked at multiple hospitals that day.
   * Count each such doctor only **once**, even if they did this on multiple days.

3. **Algorithm type**

   * Use a Set to accumulate such “multi-hospital” doctors.

4. **Step-by-step solution**

   1. Initialize a Set `doctorsWithMultiDuty` to keep doctor IDs found to work at >1 hospital on the same day.
   2. For each day (column), build a Map from doctorID → count of appearances.
   3. For each doctor ID with count > 1, add it to `doctorsWithMultiDuty`.
   4. After all days, return the size of the Set.

5. **TypeScript solution**

   ```ts copy
   function solution(A: number[][]): number {
     const N = A.length;
     if (N === 0) return 0;
     const M = A[0].length;
     const multiHospitalDoctors = new Set<number>();

     for (let day = 0; day < M; day++) {
       const seen = new Map<number, number>();
       for (let hosp = 0; hosp < N; hosp++) {
         const doctorId = A[hosp][day];
         seen.set(doctorId, (seen.get(doctorId) || 0) + 1);
       }
       for (const [doctorId, count] of seen.entries()) {
         if (count > 1) {
           multiHospitalDoctors.add(doctorId);
         }
       }
     }

     return multiHospitalDoctors.size;
   }
   ```

6. **Covering the examples**

   * Example 1:

     ```
     A = [
       [1, 2, 3],
       [3, 2, 4]
     ]
     Day 0: 1,3   → OK
     Day 1: 2,2   → doctor 2 (add)
     Day 2: 3,4   → OK
     Output: 1
     ```
   * Example 2:

     ```
     A = [
       [1, 2, 4],
       [2, 4, 5],
       [1, 1, 1]
     ]
     Day 0: 1,2,1 → doctor 1 (add)
     Day 1: 2,4,1 → doctor 2, 4 (add)
     Day 2: 4,5,1 → no new
     Output: 3
     ```
   * Example 3:

     ```
     A = [
       [1, 3],
       [6, 2]
     ]
     Day 0: 1,6
     Day 1: 3,2
     Output: 0
     ```

7. **Additional test cases**

   | A                           | Expected | Notes                              |
   | --------------------------- | -------- | ---------------------------------- |
   | `[[5]]`                     | 0        | Only one doctor, one hospital/day  |
   | `[[2,2],[2,2]]`             | 1        | Doctor 2 works at both every day   |
   | `[[1,2],[1,3],[4,2]]`       | 2        | Doctor 1 (day 0), doctor 2 (day 1) |
   | `[[1,2,3],[4,5,6],[7,8,9]]` | 0        | No doctor ever overlaps            |
   | `[[1,1],[1,1],[1,1]]`       | 1        | Doctor 1 works everywhere, always  |
