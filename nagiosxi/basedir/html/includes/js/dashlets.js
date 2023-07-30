
$(document).ready(function(){init_dashlet_js();if(document.getElementById("maincontentframe")){document.getElementById("maincontentframe").focus();}});$(window).load(function(){let dashlets=JSON.parse(localStorage.getItem("dashlets"));if(dashlets){let size=dashlets.length;for(var i=0;i<size;i++){var optsarr={board:dashlets[i].board,dashlet:dashlets[i].dashlet,props:{type:"opacity",},};let dashlet=document.querySelector("#dashletcontainer-"+optsarr.dashlet);if(dashlet){dashlet.style.opacity=0;}}
for(var i=0;i<size;i++){var optsarr={board:dashlets[i].board,dashlet:dashlets[i].dashlet,props:{type:"delete",},};let dashlet=document.querySelector("#dashletcontainer-"+optsarr.dashlet);var opts=JSON.stringify(optsarr);var result=get_ajax_data("deletedashlet",opts);dashlets.splice(i,1);localStorage.setItem("dashlets",JSON.stringify(dashlets));}}});function get_dashlet_dashboard_id(){var b=$("body");var bid=b[0].id;var board="";var pre=bid.substr(0,9);if(pre=="dashboard"){board=bid.substr(10);}else{board="screen";}
return board;}
function init_dashlet_js(){var Mementos=[];var redoMementos=[];var toBeDeleted=[];$(".dashboarddashletcontainer").hover(function(){var theclass="dashboarddashlethover";var dragdisabled=$(this).hasClass("ui-draggable-disabled");if(dragdisabled==true){theclass+=" dashboarddashlethover-pinned";}
$(this).addClass(theclass);$(this).find(".dashboarddashletcontrol").each(function(){$(this).css("visibility","visible");});$(this).children(".ui-resizable-se").each(function(){$(this).css("visibility","visible");});},function(){$(this).removeClass("dashboarddashlethover");$(this).removeClass("dashboarddashlethover-pinned");$(this).find(".dashboarddashletcontrol").each(function(){$(this).css("visibility","hidden");});$(this).children(".ui-resizable-se").each(function(){$(this).css("visibility","hidden");});});$(".dashletpin").click(function(){var p=this.parentNode.parentNode;var gp=p.parentNode;var pinned=0;var dragdisabled=$(gp).hasClass("ui-draggable-disabled");if(dragdisabled==true){$(gp).draggable("enable");$(this).find("i").removeClass("fa-rotate-180");$(this).attr("data-original-title","Pin");$(this).tooltip("show");$(gp).resizable("enable");pinned=0;}else{$(gp).draggable("disable");$(this).find("i").addClass("fa-rotate-180");$(this).attr("data-original-title","Unpin");$(this).tooltip("show");$(gp).resizable("disable");pinned=1;}
var board=get_dashlet_dashboard_id();var gp=$(this).parent().parent().parent();var dashletid=$(gp)[0].id;var dashlet=dashletid.substr(17);var zindex=$(gp[0]).css("z-index");var optsarr={board:board,dashlet:dashlet,props:{pinned:pinned,zindex:zindex,type:"pin",},};Mementos.push(optsarr);var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);});$(".dashlethidetitle").click(function(){var p=this.parentNode.parentNode;var gp=p.parentNode;var d=$(this).parent().parent().find(".dashlettitle");var showtitle=1;if(!d.hasClass("hiddentitle")){showtitle=0;$(this).find("i").removeClass("fa-eye-slash").addClass("fa-eye");$(this).attr("data-original-title","Show Title");$(this).tooltip("show");d.addClass("hiddentitle");}else{$(this).find("i").removeClass("fa-eye").addClass("fa-eye-slash");$(this).attr("data-original-title","Hide Title");$(this).tooltip("show");d.removeClass("hiddentitle");}
var board=get_dashlet_dashboard_id();var gp=$(this).parent().parent().parent();var dashletid=$(gp)[0].id;var dashlet=dashletid.substr(17);var optsarr={board:board,dashlet:dashlet,props:{showtitle:showtitle,type:"title",},};var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);});$(".dashletdelete").click(function(){show_throbber();var board=get_dashlet_dashboard_id();if(demo_mode==1&&board=="home"){var content="<div id='popup_header' style='margin-bottom: 5px;'><b>"+
_("Error")+"</b></div><div id='popup_data'><p>"+
_("Deleting dashlets from the home page dashboard is disabled while in demo mode.")+"</p></div>";hide_throbber();set_child_popup_content(content);display_child_popup();fade_child_popup("red",2000);return;}
var conf=confirm(_("Are you sure you would like to delete this dashlet?."));if(!conf){hide_throbber();return;}
var gp=$(this).parent().parent().parent();var dashletid=$(gp)[0].id;var dashlet=dashletid.substr(17);var optsarr={board:board,dashlet:dashlet,props:{type:"delete",},};Mementos.push(optsarr);var opts=JSON.stringify(optsarr);toBeDeleted.push(optsarr);localStorage.setItem("dashlets",JSON.stringify(toBeDeleted));show_throbber();var content="<div id='popup_header'><b>"+
_("Dashlet Deleted")+"</b></div><div id='popup_data'><p>"+
_("Dashlet removed from dashboard.")+"</p></div>";hide_throbber();set_child_popup_content(content);display_child_popup();fade_child_popup("red");$(gp).fadeOut("slow");});function undo(){let optsarr=Mementos[Mementos.length-1];if(optsarr){let dashlet=document.querySelector("#dashletcontainer-"+optsarr.dashlet);if(optsarr.props.type=="drag"){let top=dashlet.style.top.slice(0,-2);let left=dashlet.style.left.slice(0,-2);const currentDashletState={board:optsarr.board,dashlet:optsarr.dashlet,props:{top:top,left:left,zindex:optsarr.props.zindex,type:optsarr.props.type,},};redoMementos.push(currentDashletState);dashlet.style.top=`${optsarr.props.top}px`;dashlet.style.left=`${optsarr.props.left}px`;dashlet.style.zindex=`${optsarr.props.zindex}`;var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);var y=1;Mementos.pop();}else if(optsarr.props.type=="resize"){let dashlet=document.querySelector("#dashletcontainer-"+optsarr.dashlet);let dashletContent=dashlet.querySelector(".dashboarddashlet");let height=dashlet.style.height.slice(0,-2);let width=dashlet.style.width.slice(0,-2);let currentDashletState={board:optsarr.board,dashlet:optsarr.dashlet,props:{height:height,width:width,type:optsarr.props.type,},};redoMementos.push(currentDashletState);dashlet.style.height=`${optsarr.props.height}px`;dashlet.style.width=`${optsarr.props.width}px`;dashletContent.style.height=`${optsarr.props.height}px`;dashletContent.style.width=`${optsarr.props.width}px`;var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);Mementos.pop();}else if(optsarr.props.type=="pin"){let gp=document.querySelector("#dashletcontainer-"+optsarr.dashlet);let pinButton=gp.querySelector(".dashletpin");let pinned=0;let dragdisabled=$(gp).hasClass("ui-draggable-disabled");if(dragdisabled==true){$(gp).draggable("enable");$(pinButton).find("i").removeClass("fa-rotate-180");$(pinButton).attr("data-original-title","Pin");$(gp).resizable("enable");pinned=0;}
else{$(gp).draggable("disable");$(pinButton).find("i").addClass("fa-rotate-180");$(pinButton).attr("data-original-title","Unpin");$(gp).resizable("disable");pinned=1;}
const currentDashletState={board:optsarr.board,dashlet:optsarr.dashlet,props:{type:optsarr.props.type,},};var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);redoMementos.push(currentDashletState);Mementos.pop();}else if(optsarr.props.type=="delete"){let dashlet=document.querySelector("#dashletcontainer-"+optsarr.dashlet);let dashlets=JSON.parse(localStorage.getItem("dashlets"));for(let i=0;i<dashlets.length;i++){if(dashlets[i].dashlet==optsarr.dashlet){dashlets.splice(i,1);}}
localStorage.setItem("dashlets",JSON.stringify(dashlets));$(dashlet).fadeIn("fast");const currentDashletState={board:optsarr.board,dashlet:optsarr.dashlet,props:{type:optsarr.props.type,},};redoMementos.push(currentDashletState);toBeDeleted.pop();Mementos.pop();}}}
function redo(){let optsarr=redoMementos[redoMementos.length-1];if(optsarr){let dashlet=document.querySelector("#dashletcontainer-"+optsarr.dashlet);if(optsarr.props.type=="drag"){let top=dashlet.style.top.slice(0,-2);let left=dashlet.style.left.slice(0,-2);const currentDashletState={board:optsarr.board,dashlet:optsarr.dashlet,props:{top:top,left:left,zindex:optsarr.props.zindex,type:optsarr.props.type,},};Mementos.push(currentDashletState);dashlet.style.top=`${optsarr.props.top}px`;dashlet.style.left=`${optsarr.props.left}px`;dashlet.style.zindex=`${optsarr.props.zindex}`;var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);redoMementos.pop();}else if(optsarr.props.type=="resize"){let dashlet=document.querySelector("#dashletcontainer-"+optsarr.dashlet);let dashletContent=dashlet.querySelector(".dashboarddashlet");let height=dashlet.style.height.slice(0,-2);let width=dashlet.style.width.slice(0,-2);let currentDashletState={board:optsarr.board,dashlet:optsarr.dashlet,props:{height:height,width:width,type:optsarr.props.type,},};Mementos.push(currentDashletState);dashlet.style.height=`${optsarr.props.height}px`;dashlet.style.width=`${optsarr.props.width}px`;dashletContent.style.height=`${optsarr.props.height}px`;dashletContent.style.width=`${optsarr.props.width}px`;var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);redoMementos.pop();}else if(optsarr.props.type=="pin"){let gp=document.querySelector("#dashletcontainer-"+optsarr.dashlet);let pinButton=gp.querySelector(".dashletpin");let pinned=0;let dragdisabled=$(gp).hasClass("ui-draggable-disabled");if(dragdisabled==true){$(gp).draggable("enable");$(pinButton).find("i").removeClass("fa-rotate-180");$(pinButton).attr("data-original-title","Pin");$(gp).resizable("enable");pinned=0;}
else{$(gp).draggable("disable");$(pinButton).find("i").addClass("fa-rotate- 180");$(pinButton).attr("data-original-title","Unpin");$(gp).resizable("disable");pinned=1;}
const currentDashletState={board:optsarr.board,dashlet:optsarr.dashlet,props:{type:optsarr.props.type,pinned:pinned,},};Mementos.push(currentDashletState);var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);redoMementos.pop();}else if(optsarr.props.type=="delete"){let dashlet=document.querySelector("#dashletcontainer-"+optsarr.dashlet);let dashlets=JSON.parse(localStorage.getItem("dashlets"));dashlets.push(optsarr);localStorage.setItem("dashlets",JSON.stringify(dashlets));$(dashlet).fadeOut("fast");let currentDashletState={board:optsarr.board,dashlet:optsarr.dashlet,props:{type:optsarr.props.type,},};toBeDeleted.push(currentDashletState);Mementos.push(currentDashletState);redoMementos.pop();}}}
function load_undo_button(){if(window.location.pathname.includes("dashboards")){if(!document.getElementById("undoButton")){var undoButton=document.createElement("div");undoButton.id="undoButton";undoButton.className="btn btn-sm btn-default tt-bind";undoButton.setAttribute("data-placement","left");undoButton.setAttribute("data-html","true");undoButton.setAttribute("data-toggle","tooltip");undoButton.setAttribute("title",getShortcutTextUndo("Undo"));undoButton.setAttribute("data-delay","300");undoButton.style.height="40px";undoButton.style.width="40px";undoButton.style.display="flex";undoButton.style.justifyContent="center";undoButton.style.alignItems="center";undoButton.innerHTML='<i class="fa fa-rotate-left" style="color:inherit; font-size:20px"></i>';undoButton.style.position="fixed";undoButton.style.bottom="20px";undoButton.style.right="80px";undoButton.style.zIndex="10";var mediaQuery=window.matchMedia("(max-width: 768px)");if(mediaQuery.matches){undoButton.style.bottom="40px";}
$(document).ready(function(){setInterval(function(){var iframe=document.getElementById("maincontentframe");let activeElement=document.activeElement;if(iframe&&activeElement.tagName!=="BODY"&&activeElement.tagName!=="INPUT"){iframe.focus();var iframeDoc=iframe.contentDocument||iframe.contentWindow.document;if(!iframeDoc.getElementById("undoButton")&&iframeDoc.body){iframeDoc.body.appendChild(undoButton);}}},20);});}}}
function getShortcutTextUndo(actionName){if(navigator.userAgent.indexOf("Mac OS X")!==-1){return"<span class='undo-tag'>Undo</span><span class ='undo-redo-spanners'>⌘</span><span class ='undo-redo-spanners'>Z</span>";}else{return"<span class ='undo-tag'>Undo</span><span class ='undo-redo-spanners'>Ctrl</span><span class ='undo-redo-spanners'>Z</span>";}}
function getShortcutTextRedo(actionName){if(navigator.userAgent.indexOf("Mac OS X")!==-1){return"<span class ='undo-tag'>Redo</span><span class ='undo-redo-spanners'>⌘</span><span class ='undo-redo-spanners'>Shift</span><span class ='undo-redo-spanners'>Z</span>";}else{return"<span class ='undo-tag'>Redo</span><span class ='undo-redo-spanners'>Ctrl</span><span class ='undo-redo-spanners'>Shift</span><span class ='undo-redo-spanners'>Z</span>";}}
function load_redo_button(){if(window.location.pathname.includes("dashboards")){if(!document.getElementById("redoButton")){var redoButton=document.createElement("div");redoButton.id="redoButton";redoButton.className="btn btn-sm btn-default tt-bind";redoButton.setAttribute("data-placement","left");redoButton.setAttribute("data-html","true");redoButton.setAttribute("data-toggle","tooltip");redoButton.setAttribute("title",getShortcutTextRedo("Redo"));redoButton.setAttribute("data-delay","200");redoButton.style.height="40px";redoButton.style.width="40px";redoButton.style.display="flex";redoButton.style.justifyContent="center";redoButton.style.alignItems="center";redoButton.innerHTML='<i class="fa fa-rotate-right"  style="color:inherit; font-size: 20px;"></i>';redoButton.style.position="fixed";redoButton.style.bottom="20px";redoButton.style.right="20px";redoButton.style.zIndex="10";var mediaQuery=window.matchMedia("(max-width: 768px)");if(mediaQuery.matches){redoButton.style.bottom="40px";}
$(document).ready(function(){setInterval(function(){var iframe=document.getElementById("maincontentframe");let activeElement=document.activeElement;if(iframe&&activeElement.tagName!=="BODY"&&activeElement.tagName!=="INPUT"){iframe.focus();var iframeDoc=iframe.contentDocument||iframe.contentWindow.document;if(!iframeDoc.getElementById("redoButton")&&iframeDoc.body){iframeDoc.body.appendChild(redoButton);}}},20);});}}}
$(document).ready(function(){load_undo_button();load_redo_button();let undo=document.getElementById("undoButton");let redo=document.getElementById("redoButton");if(undo&&redo){if(!window.location.pathname.endsWith('dashboard.php')){undo.style.display="none";redo.style.display='none';}else{undo.style.display="flex";redo.style.display="flex";}}
var iframe=document.getElementById("maincontentframe");if(iframe){var iframeDoc=iframe.contentDocument||iframe.contentWindow.document;$(iframeDoc.body).tooltip({selector:'[rel=tooltip]',html:true});}});$("body").on("click","#undoButton",function(e){e.preventDefault();undo();});$("body").on("click","#redoButton",function(e){e.preventDefault();redo();});$("body").keydown(function(e){if(e.which===90&&(e.ctrlKey||e.metaKey)&&!e.shiftKey){e.preventDefault();if(document.activeElement.tagName!="IFRAME"){var iframe=document.getElementById("maincontentframe");if(iframe){iframe.focus();}}
undo();}else if((e.which===89&&e.ctrlKey)||(e.which===90&&(e.ctrlKey||e.metaKey)&&e.shiftKey)){e.preventDefault();if(document.activeElement.tagName!="IFRAME"){var iframe=document.getElementById("maincontentframe");if(iframe){iframe.focus();}}
redo();}});let i=0;$(".dashboarddashletcontainer").each(function(){var c=$(this).children(".dashboarddashlet");var w=$(c).width();var h=$(c).height();var pr=parseInt($(c).css("padding-right"));var pl=parseInt($(c).css("padding-left"));var mr=parseInt($(this).css("margin-right"))+
parseInt($(c).css("margin-right"));var ml=parseInt($(this).css("margin-left"))+parseInt($(c).css("margin-left"));var pt=parseInt($(c).css("padding-top"));var pb=parseInt($(c).css("padding-bottom"));var mt=parseInt($(this).css("margin-top"))+parseInt($(c).css("margin-top"));var mb=parseInt($(this).css("margin-bottom"))+
parseInt($(c).css("margin-bottom"));if(isNaN(ml))ml=0;if(isNaN(mr))mr=0;if(isNaN(mt))mt=0;if(isNaN(mb))mb=0;var neww=w+pr+pl+mr+ml;var newh=h+pt+pb+mt+mb;if(neww>0){$(this).css("width",neww);}
$(this).resizable({grid:10,resize:function(event,ui){$(".dashboarddashletcontainer").not(this).addClass("dashboardragborder");var board=get_dashlet_dashboard_id();var dashletid=this.id;var dashlet=dashletid.substr(17);var height=ui.size.height;var width=ui.size.width;var zindex=$(this).css("z-index");var c=$(this).children(".dashboarddashlet");var fc=$(c[0]);var pr=parseInt($(c).css("padding-right"));var pl=parseInt($(c).css("padding-left"));var mr=parseInt($(this).css("margin-right"))+
parseInt($(c).css("margin-right"));var ml=parseInt($(this).css("margin-left"))+
parseInt($(c).css("margin-left"));var pt=parseInt($(c).css("padding-top"));var pb=parseInt($(c).css("padding-bottom"));var mt=parseInt($(this).css("margin-top"))+
parseInt($(c).css("margin-top"));var mb=parseInt($(this).css("margin-bottom"))+
parseInt($(c).css("margin-bottom"));if(isNaN(ml))ml=0;if(isNaN(mr))mr=0;if(isNaN(mt))mt=0;if(isNaN(mb))mb=0;var neww=width-pr-pl-mr-ml;var newh=height-pt-pb-mt-mb;if(neww>0){$(fc).css("width",neww);}
if(newh>0){$(fc).css("height",newh);}
var cif=$(c).children("iframe");var fcif=$(cif)[0];if(fcif){$(fcif).css("width",neww);var ncifh=newh-parseInt(fcif.offsetTop);$(fcif).css("height",ncifh);}
var optsarr={board:board,dashlet:dashlet,props:{height:newh,width:neww,zindex:zindex,type:"resize",},};Mementos.push(optsarr);i++;},stop:function(event,ui){$(".dashboarddashletcontainer").removeClass("dashboardragborder");var board=get_dashlet_dashboard_id();var dashletid=this.id;var dashlet=dashletid.substr(17);var height=ui.size.height;var width=ui.size.width;var zindex=$(this).css("z-index");var c=$(this).children(".dashboarddashlet");var fc=$(c[0]);var pr=parseInt($(c).css("padding-right"));var pl=parseInt($(c).css("padding-left"));var mr=parseInt($(this).css("margin-right"))+
parseInt($(c).css("margin-right"));var ml=parseInt($(this).css("margin-left"))+
parseInt($(c).css("margin-left"));var pt=parseInt($(c).css("padding-top"));var pb=parseInt($(c).css("padding-bottom"));var mt=parseInt($(this).css("margin-top"))+
parseInt($(c).css("margin-top"));var mb=parseInt($(this).css("margin-bottom"))+
parseInt($(c).css("margin-bottom"));if(isNaN(ml))ml=0;if(isNaN(mr))mr=0;if(isNaN(mt))mt=0;if(isNaN(mb))mb=0;var neww=width-pr-pl-mr-ml;var newh=height-pt-pb-mt-mb;if(neww>0){$(fc).css("width",neww);}
if(newh>0){$(fc).css("height",newh);}
var cif=$(c).children("iframe");var fcif=$(cif)[0];if(fcif){$(fcif).css("width",neww);var ncifh=newh-parseInt(fcif.offsetTop);$(fcif).css("height",ncifh);}
var optsarr={board:board,dashlet:dashlet,props:{height:newh,width:neww,zindex:zindex,type:"resize",},};redoMementos.pop();for(let j=0;j<i-1;j++){Mementos.pop();}
i=0;var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);},});var sizeinfo=$(this).find(".size-info");if($(sizeinfo).data("min-height")){$(this).resizable("option","minHeight",$(sizeinfo).data("min-height"));}
if($(sizeinfo).data("min-width")){$(this).resizable("option","minWidth",$(sizeinfo).data("min-width"));}
if($(sizeinfo).data("max-height")){$(this).resizable("option","maxHeight",$(sizeinfo).data("max-height"));}
if($(sizeinfo).data("max-width")){$(this).resizable("option","maxWidth",$(sizeinfo).data("max-width"));}
$(this).draggable({stack:".dashboarddashletcontainer",grid:[10,10],start:function(event,ui){$(".dashboarddashletcontainer").not(this).addClass("dashboardragborder");var x=1;var board=get_dashlet_dashboard_id();var dashletid=this.id;var dashlet=dashletid.substr(17);var t=$(ui.helper);var topa=t.css("top");var lefta=t.css("left");var top=topa.replace("px","");var left=lefta.replace("px","");var zindex=$(this).css("zIndex");var optsarrtyped={board:board,dashlet:dashlet,props:{type:"drag",top:top,left:left,zindex:zindex,},};Mementos.push(optsarrtyped);redoMementos.pop();},stop:function(event,ui){$(".dashboarddashletcontainer").removeClass("dashboardragborder");var x=this;var board=get_dashlet_dashboard_id();var dashletid=this.id;var dashlet=dashletid.substr(17);var t=$(ui.helper);var topa=t.css("top");var lefta=t.css("left");var top=topa.replace("px","");var left=lefta.replace("px","");var zindex=$(this).css("zIndex");var optsarr={board:board,dashlet:dashlet,props:{top:top,left:left,zindex:zindex,},};var opts=JSON.stringify(optsarr);var result=get_ajax_data("setdashletproperty",opts);var y=1;},});});$(".dashlet-pinned").each(function(){var p=this.parentNode.parentNode;var gp=p.parentNode;$(gp).draggable("disable");$(gp).resizable("disable");});$("body").on("mouseenter","div.dashifybutton",function(){var p=$(this).parent();$(p).addClass("dashlettablehover");$(p).find(".dashlettableinnercontent").fadeTo(0,0.33);});$("body").on("mouseleave","div.dashifybutton",function(){var p=$(this).parent();$(p).removeClass("dashlettablehover");$(p).find(".dashlettableinnercontent").fadeTo(0,1.0);});$("body").on("click",".dashifybutton a",function(){whiteout();show_throbber();var theparent=this.parentNode;var thegp=theparent.parentNode;var thecontent=$(thegp).find("div.dashlettablecontentargs");var params=thecontent[0].innerHTML;var d=get_ajax_data("getadddashletdata",params);var dashlet=JSON.parse(d);get_ajax_data_innerHTML("getdashboardselectmenuhtml","",true,"#addToDashboardBoardSelect");var theurl="";var content="<div id='popup_header' style='margin-bottom: 5px;'><b>"+
_("Add to Dashboard")+"</b></div><div id='popup_data'><p>"+
_("Add this powerful little dashlet to one of your dashboards for visual goodness.")+"</p></div><form id='addtodashboard_form' method='get' action='"+
ajax_helper_url+"'><input type='hidden' name='cmd' value='addtodashboard'><input type='hidden' name='params' value='"+
params+"'><input type='hidden' name='name' value='"+
dashlet.name+"'><div class='popup-form-box'><label for='addToDashboardTitleBox'>"+
_("Dashlet Title")+"</label><input type='text' size='30' name='title' id='addtoDashboardTitleBox' value='"+
dashlet.title+"' class='form-control'></div><div class='popup-form-box'><label for='addToDashboardBoardSelect'>"+
_("Select a Dashboard to Add To")+"</label><select name='board' id='addToDashboardBoardSelect' class='form-control'></select></div>"+
dashlet.confightml+"<div id='addToDashboardFormButtons'><input type='submit' class='btn btn-sm btn-primary' name='submitButton' value='"+
_("Add It")+"' id='submitAddToDashboardButton'></div></form>";hide_throbber();set_child_popup_content(content);display_child_popup();$("#addtodashboard_form").submit(function(){hide_throbber();var params={};$(this).find(":input, :password, :checkbox, :radio, :submit, :reset").each(function(){if(!$(this).is(":checked")&&($(this).is(":checkbox")||$(this).is(":radio"))){return;}
params[this.name||this.id||this.parentNode.name||this.parentNode.id]=this.value;});params["nsp"]=nsp_str;$.ajax({type:"POST",url:this.getAttribute("action"),data:params,beforeSend:function(XMLHttpRequest){$("#child_popup_container").each(function(){this.origHTML=this.innerHTML;this.innerHTML="<div id='child_popup_header' style='margin-bottom: 5px;'><b>"+
_("Please Wait")+"</b></div><div id='child_popup_data'><p>"+
_("Processing")+"...</p><div id='throbber' class='sk-spinner sk-spinner-center sk-spinner-three-bounce'><div class='sk-bounce1'></div><div class='sk-bounce2'></div><div class='sk-bounce3'></div></div></div>";});},success:function(msg){$("#child_popup_container").each(function(){this.innerHTML="<div id='child_popup_header' style='margin-bottom: 5px;'><b>"+
_("Dashlet Added")+"</b></div><div id='child_popup_data'><p>"+
_("The dashlet has been added and will now show up on your dashboard.")+"</p></div>";fade_child_popup("green");clear_whiteout();});},error:function(msg){$("#child_popup_container").each(function(){this.innerHTML="<div id='child_popup_header' style='margin-bottom: 5px;'><b>"+
_("Error")+"</b></div><div id='child_popup_data'><p>"+
_("An error occurred processing your request.")+"</p></div>";clear_whiteout();});},});return false;});});}