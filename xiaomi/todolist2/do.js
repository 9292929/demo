window.addEventListener('load', function () {
    var newTaskInput = this.document.querySelector('.new-task input');
    var todoList = this.document.querySelector('.todo-list');
    var doneList = this.document.querySelector('.done-list');
    // 获取模板
    var todoItem = this.document.querySelector('.todo-item');
    var date = null;
    // type 
    var type;
    //计时器(记录秒数)
    var s = 0;
    // var valueText;
    // 如果 localStorage 中存有键值对，则遍历键值对
    // if (this.localStorage) {
    //     // 遍历键值对
    //     for (var i = 0; i < this.localStorage.length; i++) {
    //         if (this.localStorage.getItem(this.localStorage.key(i)).parentNode == todoList) {
    //             // todoList.appendChild(this.localStorage.getItem(this.localStorage.key(i)), todoList.children[0]);
    //             valueText = this.localStorage.getItem(this.localStorage.key(i)).children[1].children[0].innerHTML;
    //             this.document.write("<div class=" + 'todo-item' + "><span class=" + 'iconfont icon-circle' + "></span><div class=" + 'todo-content' + "><div class=" + 'todo-text' + ">+'valueText'+</div><div class=" + 'todo-type' + ">任务</div></div><span class=" + 'iconfont icon-xingxing1' + "></span></div>");
    //             console.log('加入todolist');
    //         } else {
    //             // doneList.appendChild(this.localStorage.getItem(this.localStorage.key(i)), doneList.children[0]);
    //             console.log('加入donelist');
    //         }
    //     }
    // }
    load();
    // 日期显示
    var timesTamp = new Date();
    var year = timesTamp.getFullYear(); // 年
    var month = timesTamp.getMonth() + 1; // 月
    var dates = timesTamp.getDate(); // 日
    var day = timesTamp.getDay(); // 周几
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var myDay = this.document.querySelector('.myday');
    myDay.innerHTML = year + '年' + month + '月' + dates + '日 ' + arr[day];

    //读取本地储存
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
        // JSON.parse() 将一个 JSON 字符串转换为 JavaScript 对象
        return JSON.parse(data);
        } else {
        return [];
        }
    }
    //保存本地数据
    function savaDate(data) {
        // JSON.stringify() 将 JavaScript 值转换为 JSON 字符串
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 添加任务
    newTaskInput.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            if (newTaskInput.value != '') {
                // 克隆任务条款
                var todo_item = todoItem.cloneNode(true);
                // 更改任务条款里的文本
                todo_item.children[1].children[0].innerHTML = newTaskInput.value;
                var local = getData();
                //存储格式
                local.push({ title: newTaskInput.value, done: false });
                savaDate(local);

                // // 实现 刷新页面后不会消失
                // // 获取 时间戳
                // date = Date.now();
                // // 存储数据 (存储任务条款)
                // localStorage.setItem(date, todo_item);
 
                // 把更改 value 后的 新 任务条款添加至最前面(第一个前面)
                todoList.insertBefore(todo_item, todoList.children[0]);
              load();
            }

     }
    })
    //渲染加载数据
  function load() {
    //读取本地数据
    var data = getData();
    var str = "";
    var stv = "";

    //遍历数据,拼接字符串
    data.forEach((event, index) => {
      if (event.done === false) {
        str =
          '<li class="record-item"> ' +
          '<button class="press-sel">' +
          '<i class="iconfont sel" id="' +
          index +
          '">&#xe614;</i>' +
          "</button>" +
          '<p class="content" title=' +
          event.title +
          ">" +
          event.title +
          "</p>" +
          '<button class="press-del">' +
          '<i class="iconfont epo" id="' +
          index +
          '" style="cursor: pointer;">&#xeb26;' +
          '<div class="timer" id="' +
          index +
          '"><span class="second"  id="' +
          index +
          '">5s</span><span class="hour"  id="' +
          index +
          '">1h</span><span class="day"  id="' +
          index +
          '">1d</sapn></div></i>' +
          '<i class="iconfont del" id="' +
          index +
          '" style="cursor: pointer;">&#xe630;</i>' +
          "</li>" +
          str;
      } else {
        stv =
          '<li class="record-ite"> ' +
          '<button class="press-sel">' +
          '<i class="iconfont sel" id="' +
          index +
          '">&#xe603;</i>' +
          "</button>" +
          '<p class="content" title=' +
          event.title +
          " ><s>" +
          event.title +
          "</s></p>" +
          '<button class="press-del">' +
          '<i class="iconfont del" id="' +
          index +
          '" style="cursor: pointer;">&#xe869;</i>' +
          "</li>" +
          stv;
      }
    });
    //遍历之前清空ul里的元素内容·
    newTaskInput.value = "";
    //渲染内容到HTML
    todoList.innerHTML = str;
    // todoCom.innerHTML = stv;
}
    // function timers() {
    //     // 定时功能
    //             // 创建 定时模块 timing
    //             var timing = document.createElement('span');
    //             // 给 timing 内容
    //             timing.innerHTML = '定时';
    //             // 添加 定时模块
    //             var todo_item.insertBefore(timing, todo_item.children[2]);
    //             // 给 timing 创建选项区 timingType，子节点
    //             var timingType = document.createElement('div');
    //             // 给 timing 添加选项区
    //             timing.appendChild(timingType, timing.children[0]);
    //             // 给 timingType 设置style
    //             timingType.className = 'timing-type';
    //             // 给 timingType 创建定时
    //             var typeTimer = null;
    //             // 给 timingType 创建 6个选项
    //             var type1 = document.createElement('div');
    //             type1.innerHTML = '5分钟后';
    //             type1.setAttribute('times', 300);
    //             var type2 = document.createElement('div');
    //             type2.innerHTML = '15分钟后';
    //             type2.setAttribute('times', 900);
    //             var type3 = document.createElement('div');
    //             type3.innerHTML = '30分钟后';
    //             type3.setAttribute('times', 1800);
    //             var type4 = document.createElement('div');
    //             type4.innerHTML = '1小时后';
    //             type4.setAttribute('times', 3600);
    //             var type5 = document.createElement('div');
    //             type5.innerHTML = '3小时后';
    //             type5.setAttribute('times', 10800);
    //             var type6 = document.createElement('div');
    //             type6.innerHTML = '明天';
    //             type6.setAttribute('times', 86400);
 
    //             // 给 timingType 添加 6个选项
    //             timingType.appendChild(type1);
    //             timingType.appendChild(type2);
    //             timingType.appendChild(type3);
    //             timingType.appendChild(type4);
    //             timingType.appendChild(type5);
    //             timingType.appendChild(type6);
 
    //             // 给 timingType 注册 鼠标 移入 移出 事件 
    //             timing.addEventListener('mouseenter', function () {
    //                 timingType.style.display = 'block';
    //             })
    //             timing.addEventListener('mouseleave', function () {
    //                 timingType.style.display = 'none';
    //             })
    //             // 给 type1~6 注册鼠标 经过离开 事件 排他 and 点击事件 (实现定时提醒) 
    //             for (var i = 0; i < timingType.children.length; i++) {
    //                 // 排他
    //                 timingType.children[i].addEventListener('mouseenter', function () {
    //                     for (var i = 0; i < timingType.children.length; i++) {
    //                         timingType.children[i].style.backgroundColor = '';
    //                     }
    //                     this.style.backgroundColor = 'rgb(218, 207, 97)';
    //                 })
    //                 // 给 每一个 type 注册点击事件
    //                 timingType.children[i].addEventListener('click', function () {
    //                     // 如果 点击相同的 则取消定时
    //                     if (this == type) {
    //                         timingType.parentNode.style.backgroundColor = '';
    //                         clearInterval(typeTimer);
    //                         // timing.innerHTML = '定时'+write(timingType)+'';
    //                         alert('已取消定时');
    //                         return;
    //                     }
    //                     // 已定时 给 当前定时模块换个背景色
    //                     timingType.parentNode.style.backgroundColor = 'rgb(212, 57, 57)';
    //                     // type 是当前 点击的选项
    //                     type = this;
    //                     // 如果 没有定时，定时器为null，则开启定时，否则更改定时
    //                     if (typeTimer == null) {
    //                         // 修改 timing 内容
    //                         // timing.innerHTML = '已定时'+write(timingType)+'';
    //                         alert('已定时');
    //                         typeTimer = setInterval(function () {
    //                             s++;
    //                             if (s == type.getAttribute('times')) {
    //                                 // 清零
    //                                 s = 0;
    //                                 timingType.parentNode.style.backgroundColor = '';
    //                                 alert('时间到');
    //                                 // timing.innerHTML = '定时'+write(timingType)+'';
    //                                 clearInterval(typeTimer);
    //                             }
    //                         }, 1000)
    //                     } else {
    //                         s = 0;
    //                         alert('已更改定时');
    //                         typeTimer = setInterval(function () {
    //                             s++;
    //                             if (s == type.getAttribute('times')) {
    //                                 s = 0;
    //                                 timingType.parentNode.style.backgroundColor = '';
    //                                 alert('时间到');
    //                                 // timing.innerHTML = '定时'+write(timingType)+'';
    //                                 clearInterval(typeTimer);
    //                             }
    //                         }, 1000)
    //                     }
    //                 })
    //             }

    // }
})
// window.addEventListener('load',function() {
//     var newTaskInput = this.document.querySelector('.new-task input');
//     var todoList = this.document.querySelector('.todo-list');
//     var doneList = this.document.querySelector('.done-list');
//     // 获取模板
//     var todoItem = this.document.querySelector('.todo-item');
 
//     for(var i=0;i<this.localStorage.length;i++) {
//         if(this.localStorage.getItem(this.localStorage.key(i)).parentNode == todoList) {
//             todoList.appendChild(this.localStorage.getItem(this.localStorage.key(i)),todoList.children[0]);
//         } else {
//             // doneList.appendChild(this.localStorage.getItem(this.localStorage.key(i)),doneList.children[0]);
 
//         }
//     }
// })