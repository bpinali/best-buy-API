var bestBuy={};bestBuy.Model=function(){},bestBuy.Model.prototype.getResults=function(e){var t="https://crossorigin.me/https://api.bestbuy.com/v1/products((name="+e+"*)&type!=BlackTie&customerTopRated=true)?sort=salesRankShortTerm.asc";$.ajax({method:"GET",url:t,data:{format:"json",apiKey:"t5reggzup769kevta2bdabkx",page:1,pageSize:36},cache:!0,preowned:!1,active:!0,dataType:"jsonp"}).done(this.ajaxDone.bind(this)).fail(this.ifResultsFail.bind(this))},bestBuy.Model.prototype.ajaxDone=function(e){var t="";0==e.products.length?alert("No Results Found!"):this.resultsIntoListItem(e)},bestBuy.Model.prototype.ifResultsFail=function(e,t,o){console.log(e),console.log(t),console.log(o)},bestBuy.View=function(){this.searchBox=$("#search-box"),this.loadingAnimation=!0,this.toggleAnimation(),$("#search-button").on("click",this.getUserQuery.bind(this)),$(document).on("keypress",function(e){13==e.keyCode&&this.getUserQuery()}.bind(this))},bestBuy.View.prototype.getUserQuery=function(){this.getResults&&this.getResults(this.searchBox.val()),this.searchBox.val("")},bestBuy.View.prototype.resultsIntoListItem=function(e){var t="";t=!e.error&&e.products?e.products.reduce(this.reduceItemResult,""):"Unable to access products (see browser console for more information)",$(".results ul").html(t),$(".clamp-this").each(function(e,t){$clamp(t,{clamp:3})})},bestBuy.View.prototype.reduceItemResult=function(e,t){var o=$("#product-list-item").html(),s=Handlebars.compile(o);return t.isSale=t.salePrice<t.regularPrice&&t.salePrice,e+=s(t),console.log(e),e},bestBuy.View.prototype.toggleAnimation=function(){this.loadingAnimation?$(".loader").fadeOut("slow"):$(".loader").fadeIn("slow"),this.loadingAnimation=!this.loadingAnimation},bestBuy.Controller=function(e,t){t.getResults=e.getResults.bind(e),e.resultsIntoListItem=t.resultsIntoListItem.bind(t)},document.addEventListener("DOMContentLoaded",function(){var e=new bestBuy.Model,t=new bestBuy.View,o=new bestBuy.Controller(e,t)});