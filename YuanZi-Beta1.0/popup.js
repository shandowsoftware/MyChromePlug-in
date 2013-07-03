// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */


var kittenGenerator = {
  /**
   * 请求园子地址
   *
   * @type {string}
   * @private
   */
  searchOnFlickr_: 'http://home.cnblogs.com/ing/',
		
		

  /**
   * 发起get请求
   *
   * @public
   */
  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnFlickr_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * 
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
	//获得园子响应的html  这里不是Document对象,我测试无法转成Document对象,只能通过文本追加到我们本地的popup.html
	var x=e.target.responseText;
	//alert(x);
	var div = document.createElement('div');
	div.innerHTML='<div id="divIn"></div>'
	document.body.appendChild(div);
	
	
	var divInHtml=document.getElementById('divIn');
	divInHtml.innerHTML=x;
	
	var newDiv = document.createElement('newDiv');
	//获得闪存html ,这里就可以通过Document对象来获得了
	var textHtml=document.getElementById('container_content');
	
	newDiv.innerHTML=textHtml.innerHTML;
	
	document.body.appendChild(newDiv);
	
	var   oldDiv  = document.getElementById("divIn");   
  
	oldDiv.parentNode.removeChild(oldDiv);	
			var myArrayImg=new Array(); 		//存储头像value
			var myArrayAuthor=new Array();		//存储作者value
			var myArrayContext=new Array();		//存储发布内容value
			
			
			$(".ing_reply").each(function(){
				$(this).remove();
			})
			//获得发布内容
			$(".ing_body").each(function(i){
						
						var bodyContext=$(this).html();
						
						//$("#context_title").append('<div>'+(i+1)+$(this).html()+'</div>');
						myArrayContext[i]=bodyContext;
						//$("#main").remove();
						
					});
			//获得头像
			$(".feed_avatar").each(function(i){
						var imgHead=$(this).html();
						myArrayImg[i]=imgHead;
						//$("#imgHead").append('<div>'+$(this).html()+'</div>');
						
						//$("#main").remove();
			})
			//获得发布人名称
			$(".ing-author").each(function(i){
						var author=$(this).html();
						myArrayAuthor[i]=author;
						//$("#ing-author").append('<div>'+$(this).html()+'</div>');
			})
			
			
			
			$("#headImg").html($(".ar_l_b").html());
			$("#nowRelease").html($(".ing_current").html());
			
			//移除 获得园子响应时 多余的html文档标签
			$("#main").remove();
			
			//遍历 
			for(var i =0;i<myArrayContext.length;i++){
					$("#test_context").append('<div>'+myArrayImg[i]+myArrayAuthor[i]+'˵:'+myArrayContext[i]+'</div></br>');
			}
			
			
  },

  
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  
  kittenGenerator.requestKittens();
  
});

//园子闪存发布，这里通过ajax来访问园子的提交地址，刚好园子提交地址也是ajax 返回json，免去了再次分析html
$(function(){

	$("#btn").click(function(){
		//alert($("#context_text").val());
		var textValue=$("#context_text").val();
		var jsonText='{"content":"'+textValue+'","publicFlag":1}'
		$.ajax({
			url:'http://home.cnblogs.com/ajax/ing/Publish',
			type:'post',
			dataType:'json',
			data:jsonText,
			contentType:'application/json;charset=utf-8',
			error:function(){
				alert('error');
			},
			success:function(data){
				alert('恭喜,闪成功,~~~');
				$("#context_text").val('')
				$(".ing_home_link").remove();
				$("#test_context").html('');	
				
				kittenGenerator.requestKittens();	//发布成功后回调初始化方法,做到实时显示闪存数据
				
			}

		})
	})
})


	



