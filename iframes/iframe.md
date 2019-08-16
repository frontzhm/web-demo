# iframe的运用---特别是获取父子页面的元素

## 简单的概念

* iframe功能：能够将另一个HTML页面嵌入到当前页面中。
* 父页面：iframe元素存在的页面，也就是当前页面
* 子页面：iframe的src的页面，也就是当前页面里面嵌套的页面
* 同域：子页面和父页面的地址同域（协议端口域名均相同）
* 跨域：子页面和父页面的地址跨域
* ！！！跨域的父子页面不能进行获取元素的操作，只能有显示的操作
* [查看示例demo](https://frontzhm.github.io/web-demo/iframe)，[demo地址]()

## 简单使用和属性介绍

```html
<iframe src="./iframe.html" frameborder="0" scrolling="auto" name="iframe"></iframe>
```
属性如下：

* frameborder:是否显示边框，1(yes),0(no)
* height:框架作为一个普通元素的高度，建议在使用css设置。默认值为150px。
* width:框架作为一个普通元素的宽度，建议使用css设置。
* name:框架的名称，window.frames[name]时专用的属性。
* scrolling:框架的是否滚动。yes,no,auto。
* src：内框架的地址，可以使页面地址，也可以是图片的地址。
* srcdoc , 用来替代原来HTML body里面的内容。但是IE不支持。
* sandbox: 对iframe进行一些列限制，IE10+支持

### 当前页面获取iframe页面的元素---必须是同域

`window.frames`可以获取页面所有的iframe元素。
获取iframe的的window：
  * `window.frames.iframeName`，主要这里的iframeName是iframe的name属性值。这时候就可以用window的一系列属性了。
  * 或者，`document.getElementById("frameid").contentWindow`
  * 这里特别注意，必须等iframe页面都加载完了才能获取iframe里面的元素

```html
<!-- index.html -->
<iframe src ="/iframe.html" id="test" name="test" scrolling="yes">
 <p>Your browser does not support iframes.</p>
</iframe>

<script>
// iframe.html里面的window
var iframe = window.frames.test;
// iframe.html里面的document
var idoc = iwindow.document;
// iframe.html里面的body
var ibody = idoc.body
</script>
```

## iframe获取父页面的元素 --- 必须是同域

在iframe页面里，通过访问`window.parent`，引用它的父框架的window。

```html
  <!-- iframe.html  -->
  <button>点击</button>
  <script>
    // index.html里面的window
    var pwindow = window.parent
    // index.html里面的document
    var pdoc = pwindow.document
    // index.html里面的body
    var pbody = pdoc.body
    // index.html里面的a元素之类的
    var pele = pdoc.querySelector('a')
  </script>
```



<!-- cp -r /Users/zhm/others/code/test-to-del ~/mygit/https-demo -->


> [iframe的使用](https://juejin.im/post/5bdef5ffe51d451a5126086e)
> [mdn上iframe的使用](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)