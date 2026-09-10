document.addEventListener('DOMContentLoaded',function(){
  var footerHTML='<footer>'+
    '<div class="footer-content">'+
      '<div class="footer-brand">'+
        '<img src="./assets/footer-logo.png" alt="方寸间 FORTUNE HOME" style="width:254px;height:auto;margin-bottom:16px;display:block">'+
        '<p>方寸间 好运之家。曼容豪世旗下家居品牌，甄选全球好物，为每一个家庭带来温暖与品质。</p>'+
      '</div>'+
      '<div class="footer-col">'+
        '<h4>产品分类</h4>'+
        '<ul>'+
          '<li><a href="./index.html#kitchen">厨房餐饮</a></li>'+
          '<li><a href="./index.html#living">居家生活</a></li>'+
          '<li><a href="./index.html#lighting">灯饰美家</a></li>'+
          '<li><a href="./index.html#travel">旅游出行</a></li>'+
          '<li><a href="./index.html#specialty">地方特产</a></li>'+
        '</ul>'+
      '</div>'+
      '<div class="footer-col">'+
        '<h4>品牌板块</h4>'+
        '<ul>'+
          '<li><a href="./index.html#founder">创始人心声</a></li>'+
          '<li><a href="./index.html#story">品牌故事</a></li>'+
          '<li><a href="./app.html">APP展示</a></li>'+
        '</ul>'+
      '</div>'+
      '<div class="footer-col">'+
        '<h4>联系我们</h4>'+
        '<ul>'+
          '<li>客服热线：400-888-0000</li>'+
          '<li>邮箱：service@fortunehome.cn</li>'+
          '<li>地址：杭州市滨江区英飞特大厦</li>'+
        '</ul>'+
      '</div>'+
    '</div>'+
    '<div class="footer-bottom">'+
      '<span>© 2026 方寸间 FORTUNE HOME · 曼容豪世 · 一个三寸见方的小空间 · 沪ICP备XXXXXXXX号</span>'+
      '<div class="footer-social">'+
        '<a href="#" title="微信">微</a>'+
        '<a href="#" title="微博">博</a>'+
        '<a href="#" title="小红书">书</a>'+
        '<a href="#" title="抖音">抖</a>'+
      '</div>'+
    '</div>'+
  '</footer>';
  var footerContainer=document.getElementById('shared-footer');
  if(footerContainer){
    footerContainer.innerHTML=footerHTML;
  }
});
