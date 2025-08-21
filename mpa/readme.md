【现代 CSS 正在终结 SPA?我读完文章后,彻底改变了对... - 今日头条】
https://m.toutiao.com/is/-ZK78WwoSjM/


页面切换效果
```css
@view-transition {
  navigation: auto;
}
::view-transition-old(root),
::view-transition-new(root) {
  animation: fade 0.3s ease both;
}
@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

预加载页面
<script type="speculationrules">
{
  "prerender": [
    { "where": { "selector_matches": "a" } }
  ]
}
</script>



前进后退缓存
Back/Forward Cache（bfcache）