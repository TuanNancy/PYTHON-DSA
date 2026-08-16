# Ke hoach hoc 25 DSA Patterns

## Muc tieu

- Nam duoc 25 pattern trong `opinons.md`, khong hoc thuoc dap an.
- Nhan ra pattern phu hop trong khoang 90 giay.
- Tu giai lai bai cot loi ma khong xem ghi chu.
- Giai thich duoc tinh dung va do phuc tap cua loi giai.
- Hoan thanh lan hoc dau cua 75 bai cot loi trong 14 tuan.
- Dung 2 tuan tiep theo de on cach quang, dat mastery va luyen de tron.

## Cam ket thoi gian

- 5 buoi moi tuan, moi buoi 60-90 phut.
- 4 buoi hoc bai moi; moi buoi 1 bai kho hoac 2 bai ngan.
- 1 buoi giai lai bai cu va giai bai tron pattern.
- Danh 15-20 phut dau moi buoi de on mot bai den han.
- Neu chi co 30 phut, uu tien giai lai mot bai cu thay vi xem loi giai bai moi.

## Quy trinh cho moi bai

### Truoc khi code (toi da 10 phut)

1. Viet lai input, output va constraint bang loi cua minh.
2. Neu ro cach brute force va do phuc tap.
3. Tim dau hieu nhan dang pattern.
4. Xac dinh invariant: dieu gi luon dung trong khi thuat toan chay?
5. Chon cau truc du lieu va uoc luong time/space complexity.

### Trong khi code

1. Tu code trong 25-35 phut, khong xem dap an.
2. Neu bi tac, chi xem goi y theo tung muc: pattern -> y tuong -> pseudocode -> code.
3. Test bang vi du nho, bien rong, mot phan tu, trung lap va gia tri cuc bien.

### Sau khi code

Ghi lai ngan gon:

- Dau hieu nao giup nhan ra pattern?
- Bai nay khac template chuan o dau?
- Invariant va ly do thuat toan dung la gi?
- Truong hop nao co the lam loi giai sai?
- Time/space complexity la bao nhieu?

Danh dau ket qua:

- `A`: Tu giai dung, khong can goi y.
- `B`: Can goi y ve y tuong nhung tu code duoc.
- `C`: Phai xem pseudocode hoac dap an.

Bai `B` giai lai sau 3 va 7 ngay. Bai `C` giai lai sau 1, 3, 7 va 14 ngay.

## Tieu chi ket thuc lan hoc dau

Co the sang tuan tiep theo khi dat tat ca dieu kien:

- [ ] Hoan thanh 3 bai cot loi.
- [ ] Tu viet duoc template ma khong xem tai lieu.
- [ ] Giai thich duoc invariant va complexity.
- [ ] Phan biet duoc khi nao pattern nay khong ap dung.

Nhung bai `B` va `C` van tiep tuc duoc on theo lich, song song voi pattern moi.

## Tieu chi mastery mot pattern

Mastery duoc danh gia sau cac lan on cach quang, khong bat buoc phai dat ngay trong tuan hoc dau:

- [ ] Co it nhat 2 trong 3 bai cot loi dat `A` khi giai lai.
- [ ] Nhan ra pattern trong mot bai tron trong 90 giay.

## Lo trinh 16 tuan

### Tuan 1: Nen tang va Hashing

On lai Big-O, array, string, `dict`, `set`, sorting va recursion trong Python.

Pattern 6 - Hashing:

- [ ] LC 1 - Two Sum
- [ ] LC 49 - Group Anagrams
- [ ] LC 128 - Longest Consecutive Sequence

Trong tam: tra cuu nhanh, dem tan suat, nhom du lieu va danh doi bo nho lay toc do.

### Tuan 2: Two Pointers va Sliding Window

Pattern 2 - Two pointers:

- [ ] LC 167 - Two Sum II
- [ ] LC 11 - Container With Most Water
- [ ] LC 15 - 3Sum

Pattern 1 - Sliding window:

- [ ] LC 3 - Longest Substring Without Repeating Characters
- [ ] LC 209 - Minimum Size Subarray Sum
- [ ] LC 424 - Longest Repeating Character Replacement

Trong tam: dieu kien nao cho phep dich con tro ma khong bo sot dap an; phan biet fixed window va variable window.

### Tuan 3: Prefix Sum va Difference Array

Pattern 7 - Prefix sum:

- [ ] LC 303 - Range Sum Query
- [ ] LC 560 - Subarray Sum Equals K
- [ ] LC 974 - Subarray Sums Divisible by K

Pattern 8 - Difference array:

- [ ] LC 1094 - Car Pooling
- [ ] LC 1109 - Corporate Flight Bookings
- [ ] LC 2381 - Shifting Letters II

Trong tam: bien truy van tong doan thanh O(1); bien cap nhat ca doan thanh hai moc bien.

### Tuan 4: Binary Search

Pattern 4 - Binary search:

- [ ] LC 704 - Binary Search
- [ ] LC 35 - Search Insert Position
- [ ] LC 153 - Find Minimum in Rotated Sorted Array

Pattern 5 - Binary search on answer:

- [ ] LC 875 - Koko Eating Bananas
- [ ] LC 1011 - Capacity To Ship Packages Within D Days
- [ ] LC 1482 - Minimum Number of Days to Make m Bouquets

Trong tam: xac dinh search space, predicate don dieu, cap nhat bien va dieu kien dung vong lap.

### Tuan 5: Linked List Pointers va Intervals

Pattern 3 - Fast and slow pointers:

- [ ] LC 141 - Linked List Cycle
- [ ] LC 142 - Linked List Cycle II
- [ ] LC 876 - Middle of the Linked List

Pattern 12 - Intervals:

- [ ] LC 56 - Merge Intervals
- [ ] LC 57 - Insert Interval
- [ ] LC 435 - Non-overlapping Intervals

Trong tam: khoang cach giua hai con tro; chon sap xep theo diem dau hay diem cuoi.

### Tuan 6: Stack

Pattern 10 - Stack parsing:

- [ ] LC 20 - Valid Parentheses
- [ ] LC 150 - Evaluate Reverse Polish Notation
- [ ] LC 394 - Decode String

Pattern 9 - Monotonic stack:

- [ ] LC 496 - Next Greater Element I
- [ ] LC 739 - Daily Temperatures
- [ ] LC 84 - Largest Rectangle in Histogram

Trong tam: stack dai dien cho phan nao chua duoc xu ly; moi phan tu duoc push/pop bao nhieu lan.

### Tuan 7: Queue, Deque va Heap

Pattern 11 - Queue and deque:

- [ ] LC 933 - Number of Recent Calls
- [ ] LC 622 - Design Circular Queue
- [ ] LC 239 - Sliding Window Maximum

Pattern 13 - Heap and Top K:

- [ ] LC 215 - Kth Largest Element in an Array
- [ ] LC 973 - K Closest Points to Origin
- [ ] LC 295 - Find Median from Data Stream

Trong tam: khi nao can FIFO, monotonic deque, min-heap, max-heap hoac hai heap.

### Tuan 8: Tree DFS va Tree BFS

Pattern 16 - Tree DFS:

- [ ] LC 104 - Maximum Depth of Binary Tree
- [ ] LC 110 - Balanced Binary Tree
- [ ] LC 236 - Lowest Common Ancestor of a Binary Tree

Pattern 17 - Tree BFS:

- [ ] LC 102 - Binary Tree Level Order Traversal
- [ ] LC 199 - Binary Tree Right Side View
- [ ] LC 515 - Find Largest Value in Each Tree Row

Trong tam: moi subtree tra thong tin gi cho cha; cach co lap tung level trong BFS.

### Tuan 9: Graph BFS va Union Find

Pattern 14 - Grid and graph BFS:

- [ ] LC 200 - Number of Islands
- [ ] LC 542 - 01 Matrix
- [ ] LC 994 - Rotting Oranges

Pattern 19 - Union Find:

- [ ] LC 547 - Number of Provinces
- [ ] LC 684 - Redundant Connection
- [ ] LC 721 - Accounts Merge

Trong tam: multi-source BFS, visited, bieu dien graph, path compression va union by rank/size.

### Tuan 10: Topological Sort va Backtracking

Pattern 20 - Topological sort:

- [ ] LC 207 - Course Schedule
- [ ] LC 210 - Course Schedule II
- [ ] LC 310 - Minimum Height Trees (bien the leaf-peeling tren cay vo huong)

Pattern 15 - Backtracking:

- [ ] LC 78 - Subsets
- [ ] LC 46 - Permutations
- [ ] LC 39 - Combination Sum

Trong tam: indegree va cycle; mo hinh choose -> explore -> undo; tranh tao trung ket qua.

### Tuan 11: Trie va Greedy

Pattern 18 - Trie:

- [ ] LC 208 - Implement Trie
- [ ] LC 211 - Design Add and Search Words Data Structure
- [ ] LC 648 - Replace Words

Pattern 21 - Greedy:

- [ ] LC 55 - Jump Game
- [ ] LC 45 - Jump Game II
- [ ] LC 763 - Partition Labels

Trong tam: node va prefix trong Trie; phai giai thich tai sao lua chon cuc bo khong pha dap an toi uu.

### Tuan 12: One-dimensional DP

Pattern 22 - One-dimensional DP:

- [ ] LC 70 - Climbing Stairs
- [ ] LC 198 - House Robber
- [ ] LC 322 - Coin Change

Voi moi bai, viet ro:

- State la gi?
- Transition la gi?
- Base case la gi?
- Thu tu tinh state la gi?
- Co toi uu bo nho duoc khong?

### Tuan 13: Two-dimensional DP va Knapsack

Pattern 23 - Two-dimensional DP:

- [ ] LC 62 - Unique Paths
- [ ] LC 64 - Minimum Path Sum
- [ ] LC 1143 - Longest Common Subsequence

Pattern 24 - Knapsack and subset DP:

- [ ] LC 416 - Partition Equal Subset Sum
- [ ] LC 494 - Target Sum
- [ ] LC 518 - Coin Change II

Trong tam: hai chieu cua state; phan biet 0/1 knapsack va unbounded knapsack; y nghia cua thu tu vong lap.

### Tuan 14: Bit Manipulation va Tong on

Pattern 25 - Bit manipulation:

- [ ] LC 136 - Single Number
- [ ] LC 191 - Number of 1 Bits
- [ ] LC 338 - Counting Bits

Tong on:

- [ ] Giai 6 bai ngau nhien, khong xem ten pattern.
- [ ] Lam 2 de thi thu, moi de 2 bai trong 70-90 phut.
- [ ] Liet ke 5 pattern yeu nhat dua tren so bai `B` va `C`.
- [ ] Giai lai mot bai kho cua moi pattern yeu.

### Tuan 15: Cung co co muc tieu

- [ ] Loc tat ca bai dang o muc `B` va `C`.
- [ ] Giai lai toi da 2 bai moi ngay, uu tien `C` truoc `B`.
- [ ] Cap nhat ket qua on gan nhat cho tung bai.
- [ ] Chon 5 pattern co ti le `A` thap nhat va giai mot bai tron cho moi pattern.
- [ ] Khong them pattern moi trong tuan nay.

### Tuan 16: Kiem tra mastery

- [ ] Giai 10 bai ngau nhien ma khong xem nhan pattern.
- [ ] Lam 2 de thi thu, moi de 2 bai trong 70-90 phut.
- [ ] Danh gia lai tieu chi mastery cua ca 25 pattern.
- [ ] Lap danh sach bai can tiep tuc on sau lo trinh.
- [ ] Chi chuyen sang giai de phong van khi dat dinh nghia hoan thanh.

## Mau template ghi chu

Tao mot ghi chu ngan cho tung bai theo mau:

```text
LC:
Ngay giai:
Ket qua lan dau: A / B / C
Ket qua on gan nhat: A / B / C
Pattern:
Dau hieu nhan dang:
Brute force:
Invariant:
Y tuong toi uu:
Time / Space:
Loi sai da gap:
Bien the co the gap:
Ngay da giai lai:
Ngay can giai lai tiep:
```

## Bang theo doi hang tuan

| Tuan | Pattern | Bai moi | A lan dau | A sau on | Bai con B/C | Ghi chu |
|---:|---|---:|---:|---:|---:|---|
| 1 | Hashing | 0 | 0 | 0 | 0 | |
| 2 | Two pointers, Sliding window | 0 | 0 | 0 | 0 | |
| 3 | Prefix sum, Difference array | 0 | 0 | 0 | 0 | |
| 4 | Binary search | 0 | 0 | 0 | 0 | |
| 5 | Fast/slow pointers, Intervals | 0 | 0 | 0 | 0 | |
| 6 | Stack parsing, Monotonic stack | 0 | 0 | 0 | 0 | |
| 7 | Queue/deque, Heap | 0 | 0 | 0 | 0 | |
| 8 | Tree DFS, Tree BFS | 0 | 0 | 0 | 0 | |
| 9 | Graph BFS, Union Find | 0 | 0 | 0 | 0 | |
| 10 | Topological sort, Backtracking | 0 | 0 | 0 | 0 | |
| 11 | Trie, Greedy | 0 | 0 | 0 | 0 | |
| 12 | One-dimensional DP | 0 | 0 | 0 | 0 | |
| 13 | Two-dimensional DP, Knapsack | 0 | 0 | 0 | 0 | |
| 14 | Bit manipulation, Tong on | 0 | 0 | 0 | 0 | |
| 15 | Cung co co muc tieu | 0 | 0 | 0 | 0 | |
| 16 | Kiem tra mastery | 0 | 0 | 0 | 0 | |

## Quy tac dieu chinh

- Khong dat tieu chi lan hoc dau: keo dai them mot tuan, khong nhoi bai.
- Bai Easy da qua de: thay bang mot bai Medium cung pattern.
- Bi tac hon 35 phut: xem goi y tung muc, khong ngoi vo thoi han.
- Pattern yeu: them mot bai moi va mot bai giai lai, khong them hang loat.
- Moi 4 tuan: danh mot buoi chi de giai bai tron pattern.
- Neu nghi hoc tren 7 ngay: bat dau lai bang 3 bai cu, khong tiep tuc bai moi ngay lap tuc.

## Dinh nghia hoan thanh lo trinh

Lo trinh duoc xem la hoan thanh khi:

- [ ] 75 bai cot loi da duoc giai.
- [ ] It nhat 60 bai dat `A` trong mot lan giai lai.
- [ ] Tat ca 25 pattern dat tieu chi mastery.
- [ ] Dat it nhat 3/4 bai trong hai de thi thu lien tiep.
- [ ] Moi loi giai deu co complexity va ly do dung, khong chi co code chay qua test.

Sau do, chuyen sang luyen bai tron theo chu de phong van thay vi tiep tuc hoc them template.
