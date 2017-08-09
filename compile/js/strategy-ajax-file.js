
//保存
function btnAdd() {
 var formData = new FormData($("#frm")[0]);
 
 $.ajax({
  url: "/Admin/ContentManage/SaveEdit",
  type: "POST",
  data: formData,
  contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 XMLHttpRequest会对 formdata 进行正确的处理 
  processData: false, //必须false才会自动加上正确的Content-Type
  success: function (data) {
   if (data == "OK") {
    alert("保存成功");
    $.iDialog("close"); //刷新父页面
   }
   else {
    alert("保存失败：" + data);
   }
  }
 });
}
 



 function up() {
        if (document.getElementById("f").value == "") {
            document.getElementById("result").innerHTML = "请选择文件";
        }
        else {
            var fileObj = document.getElementById("f").files[0];
            //创建xhr
            var xhr = new XMLHttpRequest();
            var url = "upFile.ashx";
            //FormData对象
            var fd = new FormData();
            fd.append("path", "D:\\");    //上传路径
            fd.append("file", fileObj); 
            fd.append("acttime",new Date().toString());    //本人喜欢在参数中添加时间戳，防止缓存（--、）
            xhr.open("POST", url, true);
            xhr.send(fd);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var result = xhr.responseText;
                    document.getElementById("result").innerHTML = result;
                }
            }
            //进度条部分
            xhr.upload.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    document.getElementById('progress').value = percentComplete;
                    document.getElementById('progressNumber').style.width = percentComplete + "%";
                }
            };
        }
    }