# 排序

## 冒泡排序

**原理**  

一次比较两个元素，如果它们的顺序错误就把它们交换过来, 重复地进行直到没有再需要交换, 最小的元素会经由交换慢慢“浮”到数列的顶端 

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/算法/冒泡排序.gif)

```js
function bubbleSort (arr) {
	var len = arr.length;
	while (len > 0) {
		for (var j = 0; j < len; j++) {
			if (arr[j] > arr[j+1]){
				var temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
			}
		}
		len--
  }
	return arr
}
var arr = [10, 8, 12, 9, 2, 4]
console.log('排序前: ', arr) // 排序前: [10, 8, 12, 9, 2, 4]
console.log('排序后: ', bubbleSort(arr)) // 排序后: [2, 4, 8, 9, 10, 12]
```

## 选择排序

**原理**

首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/算法/选择排序.gif)  

```js
function selectSort(arr) {
  var len = arr.length
  for (var i = 0; i < len - 1; i++) {
    for (var j = i + 1; j < len; j++) {
      if (arr[i] > arr[j]) {
        var minNum = arr[j]
        arr[j] = arr[i]
        arr[i] = minNum
      }
    }
  }
  return arr
}
var arr = [10, 8, 12, 9, 2, 4]
console.log('排序前: ', arr) // 排序前: [10, 8, 12, 9, 2, 4]
console.log('排序后: ', selectSort(arr)) // 排序后: [2, 4, 8, 9, 10, 12]
```

## 插入排序

**原理**
通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入，从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/算法/插入排序.gif)

```js
function insertSort(arr) {
  var len = arr.length
  for (var i = 1; i < len; i++) {
    var temp = arr[i] // 备份arr[i]
    var j = i - 1
    while (j >= 0 && arr[j] > temp) {
      // arr[j + 1] 就是arr[i],所以在给arr[j + 1]赋值时，先备份arr[i]
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = temp
  }
  return arr
}
var arr = [10, 8, 12, 9, 2, 4]
console.log('排序前: ', arr) // 排序前: [10, 8, 12, 9, 2, 4]
console.log('排序后: ', insertSort(arr)) // 排序后: [2, 4, 8, 9, 10, 12]
```

## 快速排序

**原理**

通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/算法/快速排序.jpg)

i = j = 3， 这样序列就这样分割成了两部分，左边部分{15， 30， 17} 均小于 基准值（46）；右边部分 {56， 90，95，82}，均大于基准值。这样子我们就达到了分割序列的目标。在接着对子序列用同样的办法进行分割，直至子序列不超过一个元素，那么排序结束，整个序列处于有序状态

![An image](https://github.com/MY729/BLOG/raw/gh-pages/img/算法/快速排序.gif)

:::danger TODO
https://www.cnblogs.com/roam/p/7423805.html
:::