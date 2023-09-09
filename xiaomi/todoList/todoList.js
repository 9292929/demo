window.onload = function () {
  let todoList = document.getElementsByClassName("todo-list")[0];
  let newInput = document.querySelector("#content");
  let todoCom = document.getElementsByClassName("todo-com")[0];
  let Hint = document.getElementsByClassName("hint")[0];
  load();
  //存储input里的内容
  newInput.onkeydown = function (event) {
    if (event.keyCode === 13 && newInput.value !== "") {
      var local = getData();
      //存储格式
      local.push({ title: newInput.value, done: false });
      savaDate(local);
      load();
    }
  };

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
          '">&#xe600;</i>' +
          "</button>" +
          '<p class="content" title=' +
          event.title +
          ">" +
          event.title +
          "</p>" +
          '<button class="press-del">' +
          '<i class="iconfont epo" id="' +
          index +
          '" style="cursor: pointer;">&#xe6de;' +
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
          '" style="cursor: pointer;">&#xe869;</i>' +
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
    newInput.value = "";
    //渲染内容到HTML
    todoList.innerHTML = str;
    todoCom.innerHTML = stv;
    //删除的方法
    del();
    //完成的方法
    sel();
    //收拢的方式
    store();
    //完成隐藏
    com();
    console.log(timers);
    //提醒事件
    timers();
    //提醒时间
    second();
    hour();
    day();
    //雨点
    // rain();
    //拖动
    drag();
    sup();
  }
  //删除操作
  function del() {
    var del = document.querySelectorAll(".del");
    // console.log(del);
    if (del !== "") {
      del.forEach((element) => {
        element.onclick = function () {
          //本地读取
          var data = getData();
          //修改数据
          var index = element.getAttribute("id");
          data.splice(index, 1);
          //保存本地
          savaDate(data); 
          //渲染
          load();
        };
      });
    }
  }
  //完成
  function sel() {
    var sel = document.querySelectorAll(".sel");
    if (sel !== "") {
      sel.forEach((element) => {
        element.onclick = function () {
          //本地读取
          var data = getData();
          //修改数据
          //获得索引
          var index = element.getAttribute("id");
          // console.log(data[index].done);
          //修改数组
          if (data[index].done === false) {
            //下雨庆祝
            rain();
            data.splice(index, 1, { title: data[index].title, done: true });
          } else {
            data.splice(index, 1, { title: data[index].title, done: false });
          }
          //保存本地
          savaDate(data);

          //渲染
          load();
        };
      });
    }
  }
  //完成收拢
  function store() {
    var store = document.querySelectorAll(".store");
    var vue = document.getElementById("vue");
    store.forEach((element) => {
      element.onclick = function () {
        if (todoCom.style.display == "none") {
          todoCom.style.display = "block";
          vue.innerHTML = "&#xe602;";
        } else {
          todoCom.style.display = "none";
          vue.innerHTML = "&#xe645;";
        }
      };
    });
  }
  //完成隐藏
  function com() {
    let Com = document.querySelectorAll(".com");
    Com.forEach((element) => {
      if (todoCom.innerHTML == "") {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    });
  }
  //提醒事件
  function timers() {
    var epo = document.querySelectorAll(".epo");
    console.log(epo);
    epo.forEach((element) => {
      var isShow = false;
      var time;
      element.onclick = function () {
        clearTimeout(time);
        if (!isShow) {
          isShow = true;
          element.childNodes[1].style.display = "block";
        } else {
          isShow = false;
          element.childNodes[1].style.display = "none";
        }
        //鼠标移入事件
        element.onmouseover = () => {
          clearTimeout(time);
        };
        //鼠标移出事件
        element.onmouseout = () => {
          clearTimeout(time);
          //计时器更改属性
          if (isShow) {
            time = setTimeout(() => {
              element.childNodes[1].style.display = "none";
              isShow = false;
            }, 400);
          }
        };
      };
    });
  }
  //计时5s
  function second() {
    let second1 = document.querySelectorAll(".second");
    // let hint=document.getElementById("hint");
    second1.forEach((element) => {
      element.onclick = function () {
        //本地读取
        var data = getData();
        var index = element.getAttribute("id");
        var time;
        var stv = "";
        console.log(index);
        clearTimeout(time);
        time = setTimeout(function () {
          Hint.style.display = "block";
          stv = data[index].title;
          Hint.innerHTML = stv;
          // alert("任务`"+data[index].title+"`时间到啦");
        }, 5000);
      };
    });
  }
  //计时1小时
  function hour() {
    let hour = document.querySelectorAll(".hour");
    hour.forEach((element) => {
      element.onclick = function () {
        //本地读取
        var data = getData();
        var stv = "";
        var index = element.getAttribute("id");
        var time;
        clearTimeout(time);
        time = setTimeout(function () {
          // alert("任务`"+data[index].title+"`时间到啦")
          Hint.style.display = "block";
          stv = data[index].title;
          Hint.innerHTML = stv;
        }, 60 * 1000 * 60);
      };
    });
  }
  //计时一天
  function day() {
    let day = document.querySelectorAll(".day");
    day.forEach((element) => {
      element.onclick = function () {
        //本地读取
        var data = getData();
        var index = element.getAttribute("id");
        var time;
        var stv = "";
        // console.log(index)
        clearTimeout(time);
        time = setTimeout(function () {
          Hint.style.display = "block";
          stv = data[index].title;
          Hint.innerHTML = stv;
        }, 1000 * 60 * 60 * 24);
      };
    });
  }
  //下雨事件
  function rain() {
    const box = document.getElementById("rainBox");
    var time;
    //每隔一段时间添加雨点
    time = setInterval(() => {
      // clearInterval(timer)
      let boxHeight = box.clientHeight;
      let boxWidth = box.clientWidth;
      const rain = document.createElement("div");
      rain.classList.add("rain");
      rain.style.top = 0;
      //随机刷新雨点位置
      rain.style.left = Math.random() * boxWidth + "px";
      //随机雨点透明度
      rain.style.opacity = Math.random();
      box.appendChild(rain);
      //每隔一段时间雨点下落
      let race = 1;
      const timer = setInterval(() => {
        if (parseInt(rain.style.top) > boxHeight) {
          clearInterval(timer);
          box.removeChild(rain);
        }
        race++;
        rain.style.top = parseInt(rain.style.top) + race + "px";
      }, 1);
    }, 1);
    setInterval(() => {
      clearTimeout(time);
    }, 10000);
  }
  //小猫
  function drag() {
    var isShow = false;
    let div = document.getElementById("div");
    let body;
    setInterval(() => {
      // 获取整个网页的宽度
      body = document.body.scrollWidth;
      //   console.log(body)
      div.onclick = function () {
        if (body === 1490) {
          if (!isShow) {
            isShow = true;
          } else {
            isShow = false;
          }
          if (isShow) {
            // onmousemove鼠标指针移到指定的对象时发生
            document.onmousemove = function (e) {
              let event = e || window.event;
              //解决兼容问题，获得鼠标位置
              div.style.left = event.clientX - div.clientWidth / 2 + "px";
            };
          } else {
            document.onmousemove = function (e) {
              let event = e || window.event;
              //解决兼容问题，获得鼠标位置
              div.style.left = div.style.left;
            };
          }
        }
      };
    }, 100);
  }
  //超人
  function sup() {
    var isShow = false;
    let sup = document.getElementById("sup");
    var num = 0;
    sup.onclick = function () {
      //隐藏提醒框
      Hint.style.display = "none";
      let speed = 15;
      if (!isShow) {
        isShow = true;
      } else {
        isShow = false;
      }
      if (isShow) {
        timer = setInterval(() => {
          num += speed;
          //   获取整个网页的高度
          let body = document.body.scrollHeight;
          sup.style.bottom = num + "px";
          if (num >= body) {
            num = -250;
          }
        }, 100);
      } else {
        //结束计时
        clearInterval(timer);
        num = num;
      }
    };
  }
};
