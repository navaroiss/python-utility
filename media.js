var http = createRequestObject();
var http2 = createRequestObject();
var lastUrl = '';
var current_url = '';
var field = '';
var interval = '';
var loading=0;
var isPlay = 0;
var chkAll = 0;
var loadingText = "<center><img src='http://"+ location.host+"/Music/templates/funnycolors/img/loading.gif'> <b class='loadingText'>Đang tải dữ liệu ...</b></center>";

function createRequestObject() {
	var xmlhttp;
	try { xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); }
	catch(e) {
    try { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
	catch(f) { xmlhttp=null; }
  }
  if(!xmlhttp&&typeof XMLHttpRequest!="undefined") {
	xmlhttp=new XMLHttpRequest();
  }
	return  xmlhttp;
}

function sendRequest(current_url,act) {	
	try{
		if( act == 'Play_Playlist'){
			playList = '';
			var frmPlay = document.getElementById("frmPlayList");
			tt = 0;
			total = frmPlay.play_list.length;
			
			for(var i=0; i < total; i++){
				if(frmPlay.play_list[i].checked && tt < 10){
					if(playList != ''){
						playList = playList + "," + frmPlay.play_list[i].value;
					}else{
						playList = playList + frmPlay.play_list[i].value;
					}
					tt++ ;
				}
			}
			//alert(playList);
			field = document.getElementById("playing_field");
			
		}else if (act == 'Play' || act == 'Gift' || act == 'Play_Singer' || act == 'Album'){
			// added by thaodx
			// aug 06 2009
			var arrUrl = current_url.split(",");
			if(act == 'Play' && arrUrl.length >= 3){
				field2 = document.getElementById("data_field");
				current_url2 = encodeURIComponent('List,'+arrUrl[2]);
				http2.open('POST',  '/Music/index.php');
				http2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				http2.onreadystatechange = handleResponse2;
				
				http2.send('url='+current_url2);
			}
			else if(act == 'Album' && arrUrl.length >= 3){
				field2 = document.getElementById("data_field2");
				current_url2 = encodeURIComponent('List_Album2,-1,1');
				http2.open('POST',  '/Music/index.php');
				http2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				http2.onreadystatechange = handleResponse2;
				
				http2.send('url='+current_url2);
			}
			else if(arrUrl.length >= 3){
				document.getElementById("data_field").innerHTML = '';
			}
			if(act == 'Album'){
				field = document.getElementById("data_field");
			}
			else{
				field = document.getElementById("playing_field");
			}
			/*Hidden banner below search*/
			objSearch = document.getElementById("layout_adv_search");
			objSearch.innerHTML = '';
			objSearch.style.display = "none";
			//alert(objSearch.style.display);
			//var d = document.getElementById('myDiv');
			/*olddiv = document.getElementById(divNum);
			d.removeChild(olddiv);*/

		}else if(act == 'Play_Album'){
			var arrUrl = current_url.split(",");
			if(arrUrl.length >= 3){
				document.getElementById("data_field").innerHTML=document.getElementById("playing_field").innerHTML;
				field = document.getElementById("playing_field");
			}
			else{
				// list danh sach bai hat trong album
				// khi past link vao trinh duyet
				// added by thaodx aug 10 2009
				field2 = document.getElementById("data_field");
				current_url2 = encodeURIComponent('Album,'+arrUrl[1]);
				http2.open('POST',  '/Music/index.php');
				http2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				http2.onreadystatechange = handleResponse2;
				
				http2.send('url='+current_url2);

				field = document.getElementById("playing_field");
			}
		}
		else{
			field = document.getElementById("data_field");
		}
//		document.getElementById("loading").innerHTML = loadingText;
//		document.getElementById("loading").style.display = "block";
		if (loading==0) {
			loading=1;
			show_Loading();
		}
		
		current_url = encodeURIComponent(current_url);

		http.open('POST',  '/Music/index.php');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = handleResponse;
		if( act == 'Play_Playlist'){
			http.send('url='+current_url+'&playList='+playList);
		}else{
			http.send('url='+current_url);
		}
	}
	catch(e){}
	finally{}
}

function handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
//			document.getElementById("loading").style.display = "none";
			hide_Loading();
			loading=0;
			response = http.responseText;
			if (current_url.indexOf('Play') != -1 || current_url.indexOf('Gift') != -1) {
				field.style.marginBottom = "10";
				/*document.getElementById("show_hide").style.display = "block";*/
			}
			field.innerHTML = response;
			field.style.display = "";
			field.scrollIntoView();
			if ( current_url.indexOf('Play') != -1)
			{
				document.getElementById("AdsFocus").scrollIntoView();
				isPlay = 1;
			}
			if ( isPlay == 0)
			{
				document.getElementById("AdsFocus").scrollIntoView();
			}
		}
  	}
	catch(e){}
	finally{}
}
function handleResponse2() {
	try {
		if((http2.readyState == 4)&&(http2.status == 200)){
//			document.getElementById("loading").style.display = "none";
			hide_Loading();
			loading=0;
			response = http2.responseText;
			field2.innerHTML = response;
			field2.style.display = "block";
			//field2.scrollIntoView();
		}
  	}
	catch(e){}
	finally{}
}
// NDK Loading
var ie45,ns6,ns4,dom;
if (navigator.appName=="Microsoft Internet Explorer") ie45=parseInt(navigator.appVersion)>=4;
else if (navigator.appName=="Netscape"){  ns6=parseInt(navigator.appVersion)>=5;  ns4=parseInt(navigator.appVersion)<5;}
dom=ie45 || ns6;

var timershow=false;
var curx=-200;
var cury=200;
var win_w=window.innerWidth ? window.innerWidth : document.body.offsetWidth;
var mid_w=win_w/2;
var timershow1=window.setInterval("stayMiddle()",1);

function getobj(id) {
el = document.all ? document.all[id] :   dom ? document.getElementById(id) :   document.layers[id];
return el;
}

function show_Loading() {
	try{
		obj = getobj('LoadingDiv');
		if (timershow) window.clearTimeout(timershow);
		timershow=window.setInterval("nshow()",1);
	}catch( e){ }
}

function hide_Loading() {
	obj = getobj('LoadingDiv');
	if (timershow) window.clearTimeout(timershow);
	timershow=window.setInterval("nhide()",1);
}

function moveobj(obj,x,y) {
	obj.style.left=x + "px";
	obj.style.top=y+ "px";
	curx=x;
	cury=y;
}

function stayMiddle() {
	if (document.documentElement && document.documentElement.scrollTop)
		var pY =  document.documentElement.scrollTop;
	else if (document.body)
		var pY =  document.body.scrollTop;

	obj = getobj('LoadingDiv');
	newy = cury+((pY-cury)/16)+12;
	moveobj(obj,curx, newy);
}

function nshow() {
	obj = getobj('LoadingDiv');
	newx = curx+((mid_w-curx)/16)-7;
	moveobj(obj,newx, cury);
}
function nhide() {
	obj = getobj('LoadingDiv');
	newx = curx+((0-curx)/16)-15;
	moveobj(obj,newx, cury);
}
// End
function getVar(url,cnt)
{
	url=url+'#';
	url=url.split('#');
	if (!url[1]) window.location.href = '#Home';
	url=url[1];
	url=url+',';
	url=url.split(',');
	if (url[0] == 'Logout')
		document.location.href = '?refresh=1';
	if (cnt != -1) {
		url=url[cnt];
		if (!url) return '';
	}
	return url;
}

function loadPage() {
	act = getVar(window.location.href,0);
	if (act) {
		current_url=window.location.href;
		current_url=current_url+'#';
		current_url=current_url.split('#');
		current_url=current_url[1];
		if (current_url) sendRequest(current_url,act);
	}
	//alert(act);
}

function urlCheck()
{
	url=window.location.href;
	if (url.indexOf('?') != -1 ) {
		url_temp = url.split('?');
		clearInterval(interval);
		href = url_temp[0];
		
		url=url+'#';
		url=url.split('#');
		//if (url[1]) window.location.href = href+'#'+url[1];
		return;
	}
	

	if (url != '' && url!=lastUrl)
	{

		if(url.indexOf('Play_Playlist') > 0){
			lastUrl = '';
		}
		loadPage();
		lastUrl=url;
	}
	
	
}

function startLoad() {
	interval = setInterval('urlCheck()',100);
}

function alertBrokenLink(id) {
	if (confirm("Báo Link nhạc này đã hỏng ?")) {
		try{
			http.open('POST',  '/Music/index.php');
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			http.onreadystatechange = BrokenResponse;
			http.send('url=Broken,'+id);
		}
		catch(e){}
		finally{}
	}
}

function BrokenResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			response = http.responseText;
			if (response == 1) alert("Thông báo đã được gởi đi. Cám ơn bạn đã báo cho chúng tôi.");
			else alert("Cám ơn bạn đã báo cho chúng tôi.");
		}
  	}
	catch(e){
		alert("Lỗi. Mong bạn thử lại.");
	}
	finally{}
}

function do_search() {
	kw = document.getElementById("keyword").value;		
	if (!kw) alert('Bạn chưa nhập từ khóa');
	else {
		kw = encodeURIComponent(kw);
		s_type = document.getElementById("searchType");
		type = s_type.value;
		switch (type) {
			case 'song' : type = 1; break;
			case 'singer' : type = 2; break;
			case 'album' : type = 3; break;
		}
		last_url = '';
		window.location.href = '#Search,'+type+','+kw;
	}
	return false;

}

function do_search_tool() {
	
	kw = document.frmSearch.keyword.value;	
	if (!kw) alert('Bạn chưa nhập từ khóa');
	else {
		kw = encodeURIComponent(kw);
		s_type = document.frmSearch.searchType;
		type = s_type.value;
		switch (type) {
			case 'song' : type = 1; break;
			case 'singer' : type = 2; break;
			case 'album' : type = 3; break;
			case 'composer' : type = 4; break;
			case 'lyric' : type = 5; break;
		}
		last_url = '';
		
		window.location.href = 'http://'+ location.host +'/Music/#Search,'+type+','+kw;
	}
	return false;

}
function do_search_tool_bottom() {
	kw = document.frmSearch_bottom.keyword.value;	
	if (!kw) alert('Bạn chưa nhập từ khóa');
	else {
		kw = encodeURIComponent(kw);
		s_type = document.frmSearch_bottom.searchTypeBottom;
		type = s_type.value;
		switch (type) {
			case 'song' : type = 1; break;
			case 'singer' : type = 2; break;
			case 'album' : type = 3; break;
			case 'composer' : type = 4; break;
			case 'lyric' : type = 5; break;
		}
		last_url = '';
		//alert('http://'+ location.host+'/Music/#Search,'+type+','+kw);
		window.location.href = 'http://'+ location.host+'/Music/#Search,'+type+','+kw;
	}
	return false;

}
// + ---------------------- +
// |        PLAYLIST        |
// + ---------------------- +

function reloadPlaylist(add_id,remove_id) {
	try{
		document.getElementById("playlist_field").innerHTML = loadingText;
		http.open('POST',  '/Music/index.php');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = playlist_handleResponse;
		http.send('reloadPlaylist=1&add_id='+add_id+'&remove_id='+remove_id);
		
		if(add_id != 0){
			alert('Đã thêm bài hát này vào danh sách nhạc của bạn!');
		}
		if(remove_id != 0){
			alert('Đã xóa bài hát này khỏi danh sách nhạc của bạn!');
		}
	}
	catch(e){
		alert('Bạn cần đăng nhập');
		}
	finally{}
}
function reloadAlbumlist(add_id,remove_id) {
	try{
		document.getElementById("albumlist_field").innerHTML = loadingText;
		http.open('POST',  '/Music/index.php');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = albumlist_handleResponse;
		http.send('reloadAlbumlist=1&add_id='+add_id+'&remove_id='+remove_id);
		
		if(add_id != 0){
			alert('Đã thêm Album này vào danh sách Album của bạn!');
		}
		if(remove_id != 0){
			alert('Đã xóa Album này khỏi danh sách Album của bạn!');
		}
	}
	catch(e){
		alert('Bạn cần đăng nhập');
		}
	finally{}
}

function playlist_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			var response = http.responseText;
			document.getElementById("playlist_field").innerHTML = response;
		}
  	}
	catch(e){}
	finally{}
}
function albumlist_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			var response = http.responseText;
			document.getElementById("albumlist_field").innerHTML = response;
		}
  	}
	catch(e){}
	finally{}
}

function addToPlaylist(song_id)
{
	reloadPlaylist(song_id,0);
}
function addToAlbumlist(album_id)
{
	reloadAlbumlist(album_id,0);
}
function removeFromPlaylist(song_id)
{
	reloadPlaylist(0,song_id);
}
function removeFromAlbumlist(song_id)
{
	reloadAlbumlist(0,song_id);
}

/*------------------------------------------------------*/


function trim(a) {
	return a.replace(/^s*(S*(s+S+)*)s*$/, "$1");
}

// + ------------------- +
// |        LOGIN        |
// + ------------------- +

function login_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			document.getElementById("login_loading").style.display = "none";
			var response = http.responseText;
			if (response) {
				document.getElementById("login_loading").innerHTML = response;
				document.getElementById("login_loading").style.display = "block";
			}
			else window.location.href = '?refresh=1';
		}
  	}
	catch(e){}
	finally{}
}

function login(form) {
	name = eval('encodeURIComponent('+form+'.name.value);');
	pwd = eval('encodeURIComponent('+form+'.pwd.value);');
	if(	trim(name) == "" ||	trim(pwd) == "")
		alert("Bạn chưa nhập đầy đủ thông tin");
	else {
		try{
			
			document.getElementById("login_loading").innerHTML = loadingText;
			document.getElementById("login_loading").style.display = "block";
			
			http.open('POST',  '/Music/index.php');
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			
			http.onreadystatechange = login_handleResponse;
			http.send('login=1&name='+name+'&pwd='+pwd);
			
		}
		catch(e){}
		finally{}
	}
	return false;
}

// + ---------------------- +
// |        REGISTER        |
// + ---------------------- +

function reg_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			document.getElementById("reg_loading").style.display = "none";
			var response = http.responseText;
			if (response) {
				if(response.indexOf("2") > 0){
					document.getElementById("reg_success").innerHTML = response;
					document.getElementById("reg_success").style.display = "block";					
					document.getElementById("frmReg").style.display = "none";
				}else{
					document.getElementById("reg_loading").innerHTML = response;
					document.getElementById("reg_loading").style.display = "block";
				}				
				
			}
			else {
				window.location.href = '#Login';
			}
		}
  	}
	catch(e){}
	finally{}
}

function reg_check_values() {
	ok = false;
	
	var frm = document.frm;
	alert(frm.name.value);
	name = encodeURIComponent(document.getElementById("reg_name").value);
	//alert(name);
	pwd = encodeURIComponent(document.getElementById("reg_pwd").value);
	pwd2 = encodeURIComponent(document.getElementById("reg_pwd2").value);
	email = encodeURIComponent(document.getElementById("reg_email").value);
	agree = document.getElementById("agree").checked;
	
	s = document.getElementsByName("reg_sex");
	if (s[0].checked) sex = s[0].value;
	if (s[1].checked) sex = s[1].value;
	
	if(	trim(name) == "" ||	trim(pwd) == "" ||	trim(pwd2) == "" ||	trim(email) == "" ){
		alert("Bạn chưa nhập đầy đủ thông tin");		
	}else
		if (pwd != pwd2) alert("Xác nhận mật khẩu không chính xác");
		else if (!agree) alert("Bạn chưa đồng ý với các quy định của trang Web");
		else {
			try{
				
				document.getElementById("reg_loading").innerHTML = loadingText;
				document.getElementById("reg_loading").style.display = "block";
				http.open('POST',  '/Music/index.php');
				http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				http.onreadystatechange = reg_handleResponse;
				http.send('reg=1&name='+name+'&pwd='+pwd+'&email='+email+'&sex='+sex);
				
			}
			catch(e){}
			finally{}
		}
	return ok;
}

// + ------------------------- +
// |        CHANGE INFO        |
// + ------------------------- +

function change_info_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			document.getElementById("change_info_loading").style.display = "none";
			var response = http.responseText;
			if (response) {
				document.getElementById("change_info_loading").innerHTML = response;
				document.getElementById("change_info_loading").style.display = "block";
			}
			else window.location.href = '?refresh=1';
		}
  	}
	catch(e){}
	finally{}
}

function change_info() {
	email = encodeURIComponent(document.getElementById("u_email").value);
	oldpwd = encodeURIComponent(document.getElementById("u_oldpwd").value);
	newpwd_1 = encodeURIComponent(document.getElementById("u_newpwd_1").value);
	newpwd_2 = encodeURIComponent(document.getElementById("u_newpwd_2").value);
	h_sex = document.getElementById("hide_sex").checked;
	h_email = document.getElementById("hide_email").checked;
	s = document.getElementsByName("u_sex");
	if (s[0].checked) sex = s[0].value;
	if (s[1].checked) sex = s[1].value;
	if(	trim(email) == "" )
		alert("Bạn chưa nhập đầy đủ thông tin");
	else if (newpwd_1 != newpwd_2)
		alert("Xác nhận mật khẩu không đúng");
	else {
		try{
			document.getElementById("change_info_loading").innerHTML = loadingText;
			document.getElementById("change_info_loading").style.display = "block";
			http.open('POST',  '/Music/index.php');
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			http.onreadystatechange = change_info_handleResponse;
			http.send('change_info=1&email='+email+'&oldpwd='+oldpwd+'&newpwd='+newpwd_1+'&sex='+sex+'&hide_sex='+h_sex+'&hide_email='+h_email);
		}
		catch(e){}
		finally{}
	}
	return false;
}

// + ----------------------------- +
// |        FORGOT PASSWORD        |
// + ----------------------------- +

function forgot_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			document.getElementById("forgot_loading").style.display = "none";
			var response = http.responseText;
			if (response) {
				document.getElementById("forgot_loading").innerHTML = response;
				document.getElementById("forgot_loading").style.display = "block";
			}
		}
  	}
	catch(e){}
	finally{}
}

function forgot() {
	email = encodeURIComponent(document.getElementById("u_email").value);
	if(	trim(email) == "" )	alert("Bạn chưa nhập email");
	else {
		try{
			document.getElementById("forgot_loading").innerHTML = loadingText;
			document.getElementById("forgot_loading").style.display = "block";
			http.open('POST',  '/Music/index.php');
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			http.onreadystatechange = forgot_handleResponse;
			http.send('forgot=1&email='+email);
		}
		catch(e){}
		finally{}
	}
	return false;
}

function popup(url,wdname,width,height)
{
	if (width == null)  { width  = 200; }   // default width
	if (height == null) { height = 400; }   // default height
	newwin=window.open(url,wdname,'top=0, left=0, fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width='+width+',height='+height);
}

function gift(id,width,height) {
	popup('gift.php?id='+id,'gift',width,height);
}

function comment(id,width,height) {
	popup('comment.php?id='+id,'comment',width,height);
}

function receive_gift(id) {
	window.location.href = '#Gift,'+id;
}

function showComment(media_id) {
	try {
		document.getElementById("comment_field").innerHTML = loadingText;
		document.getElementById("comment_field").style.display = "block";
		http.open('POST',  'comment.php');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function() {
			if((http.readyState == 4)&&(http.status == 200)){
				document.getElementById("comment_field").innerHTML = http.responseText;
			}
		}
		http.send('showcomment=1&media_id='+media_id);
	}
	catch(e){}
	finally{}
	return false;
}
function submitLyric(frm, media_id) {
	if(frm.lyric.value == ''){
		alert('Bạn vui lòng nhập vào lời bài hát');	
		return false;
	}
	else{
		try {
			document.getElementById("lyricRs").innerHTML = loadingText;
			document.getElementById("lyricRs").style.display = "block";
			http.open('POST',  'lyric.php');
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			http.onreadystatechange = function() {
				if((http.readyState == 4)&&(http.status == 200)){
					document.getElementById("lyricRs").innerHTML = http.responseText;
				}
			}
			http.send('lyric='+frm.lyric.value+'&media_id='+media_id);
		}
		catch(e){}
		finally{}
		return false;
	}
}

function send_request(frm) {
	if(frm.song_name.value == '' && frm.singer.value == '' && frm.comment.value == ''){
		alert('Bạn vui lòng nhập vào thông tin yêu cầu');	
		return false;
	}
	else{		
		try {
			document.getElementById("yc").innerHTML = loadingText;
			document.getElementById("yc").style.display = "block";
			http.open('POST',  'yeucaunhac.php');
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			http.onreadystatechange = function() {
				if((http.readyState == 4)&&(http.status == 200)){
					//document.getElementById("yc").innerHTML = "Yêu cầu của bạn đã được gửi đến chúng tôi.";
					document.getElementById("yc").innerHTML = http.responseText;
				}
			}
			//alert('song_name='+frm.song_name.value+'&singer='+frm.singer.value + '&comment='+frm.comment.value);
			http.send('song_name='+frm.song_name.value+'&singer='+frm.singer.value + '&comment='+frm.comment.value);
		}
		catch(e){}
		finally{}
		return false;
	}
}


function comment_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			var response = http.responseText;
			if (response == 'OK') {
				media_id = encodeURIComponent(document.getElementById("media_id").value);
				showComment(media_id);
			}
			else document.getElementById("comment_loading").innerHTML = response;

		}
  	}
	catch(e){}
	finally{}
}

function comment_check_values() {
	media_id = encodeURIComponent(document.getElementById("media_id").value);
	comment_content = encodeURIComponent(document.getElementById("comment_content").value);
	if(trim(comment_content) == "")
		alert("Bạn chưa nhập cảm nhận");
	else if (comment_content.length > 255)
		alert("Nội dung cảm nhận quá 255 ký tự.");
	else {
		try {
			document.getElementById("comment_loading").innerHTML = loadingText;
			document.getElementById("comment_loading").style.display = "block";
			http.open('POST',  'comment.php');
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			http.onreadystatechange = comment_handleResponse;
			http.send('comment=1&media_id='+media_id+'&comment_content='+comment_content);
		}
		catch(e){}
		finally{}
	}
	return false;
}

function comment_delete(media_id,comment_id) {
	if (confirm("Bạn có muốn xóa cảm nhận này không ?")) {
		document.getElementById("comment_loading").innerHTML = loadingText;
		document.getElementById("comment_loading").style.display = "block";
		http.open('POST',  'comment.php');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = comment_handleResponse;
		http.send('delete=1&media_id='+media_id+'&comment_id='+comment_id);
	}
	return false;
}

<!-- Begin
function checkAll(field)
{
	if(chkAll == 0){
		for (i = 0; i < field.length; i++)
			field[i].checked = true ;
		chkAll = 1;
	}else{
		for (i = 0; i < field.length; i++)
			field[i].checked = false ;	
		
		chkAll = 0;
	}
}

function uncheckAll(field)
{
for (i = 0; i < field.length; i++)
	field[i].checked = false ;
}
//  End -->
function checkPlaylist(){
	var frmPlay = document.getElementById("frmPlayList");
		k = 0;
		total = frmPlay.play_list.length;
		lastUrl = '';
		for(var i=0; i < total; i++){				
			if(frmPlay.play_list[i].checked){
				k++;					
			}
		}
	if(k == 0){
		alert("Bạn phải chọn bài hát muốn nghe");
		return false;
	}
	return true;
}

	function checkLogin(){
		var frm = document.frm;	
		
		name = encodeURIComponent(frm.name.value);
		//alert(name);
		pwd = encodeURIComponent(frm.pwd.value);
		pwd2 = encodeURIComponent(frm.pwd2.value);
		email = encodeURIComponent(frm.email.value);
		
		
		agree = frm.agree.checked;
		
		s = frm.reg_sex;
		if (s[0].checked) sex = s[0].value;
		if (s[1].checked) sex = s[1].value;
		
		if(	trim(name) == "" ||	trim(pwd) == "" ||	trim(pwd2) == "" ||	trim(email) == "" ){
			alert("Bạn chưa nhập đầy đủ thông tin");
			return false;
		} else {
					
			if (pwd != pwd2){
				 alert("Xác nhận mật khẩu không chính xác");
				 return false;
			} else if(check_email("reg_email") == false ) {
				alert("Email address incorect!");
				return false;
			} else if (!agree) {
				alert("Bạn chưa đồng ý với các quy định của trang Web");
				return false;
			}	
		}		
		
		return true;
	}
	
	function check_email(email_id){
                 emailRegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.([a-z]){2,4})$/;
                
                 if(emailRegExp.test(document.getElementById(email_id).value)){                   
                     return true;
                 }else{                 
                   
                    return false;
                }
     }

function loadAgain(hml){
	document.getElementById('data_field').innerHTML = hml;	
}