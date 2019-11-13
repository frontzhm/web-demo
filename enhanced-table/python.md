---
title: python的简单入门
tags: python
categories: python
---

mac本终端输入`idle`，会打开一个软件，然后新建一个`xx.py`输入以下，然后f5，就能看到图像

```python
import turtle
turtle.bgcolor('black') # 改变画布背景颜色为黑色
george = turtle.Turtle()
george.color("yellow")
for side in [1, 2, 3, 4]:
    george.forward(100)
    george.right(90)
```

![turtle](https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/python1.png)
![turtle](https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/python2.png)
![turtle](https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/python3.png)

画一个六边形和星星

```python
import turtle
Amy = turtle.Turtle()
Amy.color('yellow')
for side in [1,2,3,4,5,6]
  Amy.forward(100)
  Amy.right(60)
```

## 画多个六边形，嵌套循环

![这样的](https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/python8.png)

```python
import  turtle

turtle.bgcolor('black')

sharp = turtle.Turtle()

sharp.color('green')

six = [1,2,3,4,5,6]

number = [1,2,3]

for num in number:
    for side in six:
        sharp.forward(10)
        sharp.right(60)
    sharp.penup()
    sharp.forward(20)
    sharp.pendown()
    # sharp.forward(5)
    # sharp.left(60)

```

注释里面的，打开现在的注释，![x](https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/python9.png)

![turtle](https://blog-huahua.oss-cn-beijing.aliyuncs.com/blog/code/turtle.png)

## range

range(3)会产生`[0,1,2]`的数组。

## 趣闻

### 为啥是turtle

“turtle graphics”这个概念是在上世纪六十年代由计算机教育家 Seymour Papert 提出来的。一开始，turtle 是一个实际机器人，半球形的外壳看起来像海龟的外壳。该机器人拿着一个笔并且能够在一张大纸上画画。随着计算机越来越便宜，图形效果越来越好，turtle 机器人通常被替换成了屏幕上的版本，就像我们在这门课程中使用的虚拟机器人一样。
