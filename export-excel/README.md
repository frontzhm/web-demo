# 纯前端用XLSX库导出excel，可含多个sheet

[实现的demo](https://frontzhm.github.io/web-demo/export-excel/)  

如果有更多需要参考[xlsx库的github](https://github.com/SheetJS/js-xlsx)，部分参考[大神的研究](http://blog.haoji.me/js-excel.html#dao-chu-excel)

导出excel的逻辑：

* excel整个表格专业名词是`workbook`，里面每张表格是`sheet`
* 页面引入xlsx的库，`https://unpkg.com/xlsx/dist/xlsx.core.min.js`
* 把数据生成sheet，`var sheet = XLSX.utils.json_to_sheet(jsonData)`，json_to_sheet是将由对象组成的数组转化成sheet，当然还有 aoa_to_sheet将一个二维数组转成sheet 和 table_to_sheet将table的dom直接转成sheet
* 创建虚拟的workbook，`var wb = XLSX.utils.book_new()`
* 把sheet添加到workbook里，`XLSX.utils.book_append_sheet(wb, sheet, "这里是sheetName");`
* 把workbook转成blob，`var blob = workbook2blob(wb)`，这里workbook2blob需要手动写啦，下面会贴代码
* 利用a标签和createObjectURL实现下载功能，`openDownloadDialog(blob, 'excel的标题.xlsx');`，这里openDownloadDialog也会在下面放上代码

```js
 // 将workbook装化成blob对象
function workbook2blob(workbook) {
    // 生成excel的配置项
    var wopts = {
        // 要生成的文件类型
        bookType: "xlsx",
        // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        bookSST: false,
        type: "binary"
    };
    var wbout = XLSX.write(workbook, wopts);
    // 将字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }
    var blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    });
    return blob;
}

    // 将blob对象创建bloburl，然后用a标签实现弹出下载框
function openDownloadDialog(blob, fileName) {
    if (typeof blob == "object" && blob instanceof Blob) {
        blob = URL.createObjectURL(blob); // 创建blob地址
    }
    var aLink = document.createElement("a");
    aLink.href = blob;
    // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
    aLink.download = fileName || "";
    var event;
    if (window.MouseEvent) event = new MouseEvent("click");
    //   移动端
    else {
        event = document.createEvent("MouseEvents");
        event.initMouseEvent( "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
    }
    aLink.dispatchEvent(event);
}
// 用的例子
let sheet1data = [ { department: "行政部", count: 2 }, { department: "前端部", count: 2 } ];
let sheet2data = [ { name: "张三", do: "整理文件" }, { name: "李四", do: "打印" } ];
let sheet3data = [ { name: "张大人", do: "vue" }, { name: "李大人", do: "react" } ];
var sheet1 = XLSX.utils.json_to_sheet(sheet1data);
var sheet2 = XLSX.utils.json_to_sheet(sheet2data);
var sheet3 = XLSX.utils.json_to_sheet(sheet3data);

/* create a new blank workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, sheet1, "部门统计");
XLSX.utils.book_append_sheet(wb, sheet2, "行政部");
XLSX.utils.book_append_sheet(wb, sheet3, "前端部");
const workbookBlob = workbook2blob(wb);
openDownloadDialog(workbookBlob, `部门统计.xlsx`);
```
