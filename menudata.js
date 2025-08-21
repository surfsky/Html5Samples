/**
 * 项目树形结构数据
 * TreeNode结构: {name, text, icon, url, children}
 */

export const menuData = [
    {
        name: 'html5',
        text: 'HTML5 TAG',
        icon: '🌐',
        url: null,
        children: [
            { name: 'audio', text: 'HTML5音频', icon: '📄', url: 'tag/audio.html', children: null },
            { name: 'canvas', text: 'HTML5画布', icon: '📄', url: 'tag/canvas.html', children: null },
            { name: 'drag', text: 'HTML5拖拽', icon: '📄', url: 'tag/drag.html', children: null },
            { name: 'file', text: 'HTML5文件', icon: '📄', url: 'tag/file.html', children: null },
            { name: 'form', text: 'HTML5表单', icon: '📄', url: 'tag/form.html', children: null },
            { name: 'geolocation', text: 'HTML5地理位置', icon: '📄', url: 'tag/geolocation.html', children: null },
            { name: 'history', text: 'HTML5历史', icon: '📄', url: 'tag/history.html', children: null },
            { name: 'localstorage', text: 'HTML5本地存储', icon: '📄', url: 'tag/localstorage.html', children: null },
            { name: 'notification', text: 'HTML5通知', icon: '📄', url: 'tag/notification.html', children: null },
            { name: 'offline', text: 'HTML5离线', icon: '📄', url: 'tag/offline.html', children: null },
            { name: 'postmessage', text: 'HTML5消息传递', icon: '📄', url: 'tag/postmessage.html', children: null },
            { name: 'semantic', text: 'HTML5语义', icon: '📄', url: 'tag/semantic.html', children: null },
            { name: 'svg', text: 'HTML5 SVG', icon: '📄', url: 'tag/svg.html', children: null },
            { name: 'video', text: 'HTML5视频', icon: '📄', url: 'tag/video.html', children: null },
            { name: 'webgl', text: 'HTML5 WebGL', icon: '📄', url: 'tag/webgl.html', children: null },
            { name: 'websocket', text: 'HTML5 WebSocket', icon: '📄', url: 'tag/websocket.html', children: null },
            { name: 'webworker', text: 'HTML5 Web Worker', icon: '📄', url: 'tag/webworker.html', children: null }
        ]
    },
    {
        name: 'customTag',
        text: '自定义标签',
        icon: '🏷️',
        url: null,
        children: [
            { name: 'splitPanel', text: '分割面板', icon: '📄', url: 'tagCustom/splitPanel/test.html', children: null },
            { name: 'tabPanel', text: '标签面板', icon: '📄', url: 'tagCustom/tabPanel/test.html', children: null }
        ]
    },
    {
        name: 'css3',
        text: 'CSS3样式',
        icon: '🎨',
        url: null,
        children: [
            { name: 'css-parser', text: 'CSS解析器', icon: '📄', url: 'css3/css-parser.html', children: null },
            { name: 'css3-avatar', text: 'CSS3头像', icon: '📄', url: 'css3/css3-avatar.html', children: null },
            { name: 'css3-before-after', text: 'CSS3伪元素', icon: '📄', url: 'css3/css3-before-after.html', children: null },
            { name: 'css3-color', text: 'CSS3颜色', icon: '📄', url: 'css3/css3-color.html', children: null },
            { name: 'css3-flip', text: 'CSS3翻转', icon: '📄', url: 'css3/css3-flip.html', children: null },
            { name: 'css3-icon', text: 'CSS3图标', icon: '📄', url: 'css3/css3-icon.html', children: null },
            { name: 'css3-layout-col', text: 'CSS3列布局', icon: '📄', url: 'css3/css3-layout-col.html', children: null },
            { name: 'css3-layout-flex', text: 'CSS3弹性布局', icon: '📄', url: 'css3/css3-layout-flex.html', children: null },
            { name: 'css3-layout-flexgrid12', text: 'CSS3弹性网格', icon: '📄', url: 'css3/css3-layout-flexgrid12.html', children: null },
            { name: 'css3-layout-grid', text: 'CSS3网格布局', icon: '📄', url: 'css3/css3-layout-grid.html', children: null },
            { name: 'css3-layout-gridportal', text: 'CSS3网格门户', icon: '📄', url: 'css3/css3-layout-gridportal.html', children: null },
            { name: 'css3-layout-row', text: 'CSS3行布局', icon: '📄', url: 'css3/css3-layout-row.html', children: null },
            { name: 'css3-position-anchor', text: 'CSS3锚点定位', icon: '📄', url: 'css3/css3-position-anchor.html', children: null },
            { name: 'css3-position-autosize', text: 'CSS3自动尺寸', icon: '📄', url: 'css3/css3-position-autosize.html', children: null },
            { name: 'css3-position-fix', text: 'CSS3固定定位', icon: '📄', url: 'css3/css3-position-fix.html', children: null },
            { name: 'css3-position-float', text: 'CSS3浮动定位', icon: '📄', url: 'css3/css3-position-float.html', children: null },
            { name: 'css3-position-inline', text: 'CSS3内联定位', icon: '📄', url: 'css3/css3-position-inline.html', children: null },
            { name: 'css3-position-sticky', text: 'CSS3粘性定位', icon: '📄', url: 'css3/css3-position-sticky.html', children: null },
            { name: 'css3-position-valign', text: 'CSS3垂直对齐', icon: '📄', url: 'css3/css3-position-valign.html', children: null },
            { name: 'css3-position', text: 'CSS3定位', icon: '📄', url: 'css3/css3-position.html', children: null },
            { name: 'css3-reflection-fail', text: 'CSS3反射失败', icon: '📄', url: 'css3/css3-reflection-fail.html', children: null },
            { name: 'css3-ripplebutton', text: 'CSS3波纹按钮', icon: '📄', url: 'css3/css3-ripplebutton.html', children: null },
            { name: 'css3-shadow', text: 'CSS3阴影', icon: '📄', url: 'css3/css3-shadow.html', children: null },
            { name: 'css3-sidebar-fixed', text: 'CSS3固定侧边栏', icon: '📄', url: 'css3/css3-sidebar-fixed.html', children: null },
            { name: 'css3-sidebar-flex', text: 'CSS3弹性侧边栏', icon: '📄', url: 'css3/css3-sidebar-flex.html', children: null },
            { name: 'css3-text', text: 'CSS3文本', icon: '📄', url: 'css3/css3-text.html', children: null },
            { name: 'css3-unit-rem', text: 'CSS3 REM单位', icon: '📄', url: 'css3/css3-unit-rem.html', children: null },
            { name: 'css3-unit-vh-js', text: 'CSS3 VH单位JS', icon: '📄', url: 'css3/css3-unit-vh-js.html', children: null },
            { name: 'css3-unit-vh', text: 'CSS3 VH单位', icon: '📄', url: 'css3/css3-unit-vh.html', children: null },
            { name: 'css3-variable-change', text: 'CSS3变量变化', icon: '📄', url: 'css3/css3-variable-change.html', children: null },
            { name: 'css3-variable-region', text: 'CSS3变量区域', icon: '📄', url: 'css3/css3-variable-region.html', children: null },
            { name: 'css3-variable', text: 'CSS3变量', icon: '📄', url: 'css3/css3-variable.html', children: null }
        ]
    },
    {
        name: 'animation',
        text: 'CSS3动画',
        icon: '🎬',
        url: null,
        children: [
            { name: 'css3-animation-popup', text: 'CSS3弹窗动画', icon: '📄', url: 'css-animation/css3-animation-popup.html', children: null },
            { name: 'css3-animation-rotate', text: 'CSS3旋转动画', icon: '📄', url: 'css-animation/css3-animation-rotate.html', children: null },
            { name: 'css3-animation', text: 'CSS3基础动画', icon: '📄', url: 'css-animation/css3-animation.html', children: null },
            { name: 'motion-one', text: 'Motion One动画', icon: '📄', url: 'css-animation/motion-one.html', children: null }
        ]
    },
    {
        name: 'canvas',
        text: 'Canvas画布',
        icon: '🎨',
        url: null,
        children: [
            { name: 'canvas-fabric-draw', text: 'Fabric绘图', icon: '📄', url: 'draw-canvas/canvas-fabric-draw.html', children: null },
            { name: 'canvas-fabric-event', text: 'Fabric事件', icon: '📄', url: 'draw-canvas/canvas-fabric-event.html', children: null },
            { name: 'canvas-fabric-form', text: 'Fabric表单', icon: '📄', url: 'draw-canvas/canvas-fabric-form.html', children: null },
            { name: 'canvas-fabric', text: 'Fabric基础', icon: '📄', url: 'draw-canvas/canvas-fabric.html', children: null },
            { name: 'canvas-konva-form', text: 'Konva表单', icon: '📄', url: 'draw-canvas/canvas-konva-form.html', children: null },
            { name: 'canvas-konva', text: 'Konva基础', icon: '📄', url: 'draw-canvas/canvas-konva.html', children: null }
        ]
    },
    {
        name: 'chart',
        text: '图表组件',
        icon: '📊',
        url: null,
        children: [
            { name: 'chartjs', text: 'Chart.js图表', icon: '📄', url: 'draw-chart/chartjs.html', children: null }
        ]
    },

    {
        name: 'effects',
        text: '视觉效果',
        icon: '✨',
        url: null,
        children: [
            { name: 'bubbly', text: '气泡效果', icon: '📄', url: 'effects/bubbly.html', children: null },
            { name: 'cloudy', text: '云朵效果', icon: '📄', url: 'effects/cloudy.html', children: null },
            { name: 'diamond', text: '钻石效果', icon: '📄', url: 'effects/diamond.html', children: null },
            { name: 'effect-changStyleTag', text: '动态样式标签', icon: '📄', url: 'effects/effect-changStyleTag.html', children: null },
            { name: 'effect-highlight', text: '高亮效果', icon: '📄', url: 'effects/effect-highlight.html', children: null },
            { name: 'effect-showPageCode', text: '显示页面代码', icon: '📄', url: 'effects/effect-showPageCode.html', children: null },
            { name: 'flapCorner', text: '翻角效果', icon: '📄', url: 'effects/flapCorner.html', children: null },
            { name: 'heart', text: '心形效果', icon: '📄', url: 'effects/heart.html', children: null },
            { name: 'hover', text: '悬停效果', icon: '📄', url: 'effects/hover.html', children: null },
            { name: 'notching', text: '缺口效果', icon: '📄', url: 'effects/notching.html', children: null },
            { name: 'parallelogram', text: '平行四边形', icon: '📄', url: 'effects/parallelogram.html', children: null },
            { name: 'pie', text: '饼图效果', icon: '📄', url: 'effects/pie.html', children: null },
            { name: 'solarsystem', text: '太阳系', icon: '📄', url: 'effects/solarsystem.html', children: null },
            { name: 'spectiveBlur', text: '透视模糊', icon: '📄', url: 'effects/spectiveBlur.html', children: null },
            { name: 'stripe', text: '条纹效果', icon: '📄', url: 'effects/stripe.html', children: null },
            { name: 'sun', text: '太阳效果', icon: '📄', url: 'effects/sun.html', children: null },
            { name: 'trapezoid', text: '梯形效果', icon: '📄', url: 'effects/trapezoid.html', children: null }
        ]
    },
    {
        name: 'es6module',
        text: 'ES6模块',
        icon: '📦',
        url: null,
        children: [
            { name: 'index', text: 'ES6模块示例', icon: '📄', url: 'es6module/index.html', children: null }
        ]
    },
    {
        name: 'html5ui',
        text: 'HTML5界面',
        icon: '🖥️',
        url: null,
        children: [
            { name: 'contextmenu', text: 'HTML5右键菜单', icon: '📄', url: 'tag/contextmenu.html', children: null },
            { name: 'data', text: 'HTML5数据', icon: '📄', url: 'tag/data.html', children: null },
            { name: 'dialog-mask', text: 'HTML5对话框遮罩', icon: '📄', url: 'tag/dialog-mask.html', children: null },
            { name: 'dialog-resize', text: 'HTML5对话框调整', icon: '📄', url: 'tag/dialog-resize.html', children: null },
            { name: 'dialog-tag', text: 'HTML5对话框标签', icon: '📄', url: 'tag/dialog-tag.html', children: null },
            { name: 'dialog', text: 'HTML5对话框', icon: '📄', url: 'tag/dialog.html', children: null },
            { name: 'drag', text: 'HTML5拖拽', icon: '📄', url: 'tag/drag.html', children: null },
            { name: 'form', text: 'HTML5表单', icon: '📄', url: 'tag/form.html', children: null },
            { name: 'iframe', text: 'HTML5 iframe', icon: '📄', url: 'tag/iframe.html', children: null },
            { name: 'link', text: 'HTML5链接', icon: '📄', url: 'tag/link.html', children: null },
            { name: 'marquee-css', text: 'HTML5跑马灯CSS', icon: '📄', url: 'tag/marquee-css.html', children: null },
            { name: 'marquee', text: 'HTML5跑马灯', icon: '📄', url: 'tag/marquee.html', children: null },
            { name: 'menu', text: 'HTML5菜单', icon: '📄', url: 'tag/menu.html', children: null },
            { name: 'spliter', text: 'HTML5分割器', icon: '📄', url: 'tag/spliter.html', children: null },
            { name: 'svg', text: 'HTML5 SVG', icon: '📄', url: 'tag/svg.html', children: null },
            { name: 'tag', text: 'HTML5标签', icon: '📄', url: 'tag/tag.html', children: null },
            { name: 'tooltip-title', text: 'HTML5工具提示标题', icon: '📄', url: 'tag/tooltip-title.html', children: null },
            { name: 'tooltip', text: 'HTML5工具提示', icon: '📄', url: 'tag/tooltip.html', children: null }
        ]
    },
    {
        name: 'iconfont',
        text: '图标字体',
        icon: '🔤',
        url: null,
        children: [
            { name: 'iconfont', text: '图标字体示例', icon: '📄', url: 'iconfont/iconfont.html', children: null }
        ]
    },
    {
        name: 'svg',
        text: 'SVG图形',
        icon: '🖼️',
        url: null,
        children: [
            { name: 'svg-animation-css', text: 'SVG CSS动画', icon: '📄', url: 'draw-svg/svg-animation-css.html', children: null },
            { name: 'svg-anmiate-js', text: 'SVG JS动画', icon: '📄', url: 'draw-svg/svg-anmiate-js.html', children: null },
            { name: 'svg-anmiate-js2', text: 'SVG JS动画2', icon: '📄', url: 'draw-svg/svg-anmiate-js2.html', children: null },
            { name: 'svg-anmiate', text: 'SVG动画', icon: '📄', url: 'draw-svg/svg-anmiate.html', children: null },
            { name: 'svg-filter-noise', text: 'SVG噪声滤镜', icon: '📄', url: 'draw-svg/svg-filter-noise.html', children: null },
            { name: 'svg-filter-reflect', text: 'SVG反射滤镜', icon: '📄', url: 'draw-svg/svg-filter-reflect.html', children: null }
        ]
    },
    {
        name: 'layout',
        text: '布局技巧',
        icon: '📐',
        url: null,
        children: [
            { name: 'autoCenterBootstrap', text: 'Bootstrap居中', icon: '📄', url: 'layout/autoCenterBootstrap.html', children: null },
            { name: 'autoCenterByCss', text: 'CSS居中', icon: '📄', url: 'layout/autoCenterByCss.html', children: null },
            { name: 'autoCenterByCss2', text: 'CSS居中2', icon: '📄', url: 'layout/autoCenterByCss2.html', children: null },
            { name: 'autoCenterByFlex', text: 'Flex居中', icon: '📄', url: 'layout/autoCenterByFlex.html', children: null },
            { name: 'autoCenterByFlex2', text: 'Flex居中2', icon: '📄', url: 'layout/autoCenterByFlex2.html', children: null },
            { name: 'autoCenterByJs', text: 'JS居中', icon: '📄', url: 'layout/autoCenterByJs.html', children: null },
            { name: 'autoCenterByJs2', text: 'JS居中2', icon: '📄', url: 'layout/autoCenterByJs2.html', children: null },
            { name: 'fullscreenByCss', text: 'CSS全屏', icon: '📄', url: 'layout/fullscreenByCss.html', children: null },
            { name: 'fullscreenByJs', text: 'JS全屏', icon: '📄', url: 'layout/fullscreenByJs.html', children: null }
        ]
    },
    {
        name: 'mpa',
        text: '现代MPA',
        icon: '🚀',
        url: null,
        children: [
            { name: 'mpa-basic', text: 'MPA基础', icon: '📄', url: 'mpa/mpa-basic.html', children: null },
            { name: 'mpa-cache', text: 'MPA缓存', icon: '📄', url: 'mpa/mpa-cache.html', children: null },
            { name: 'mpa-page2', text: 'MPA页面2', icon: '📄', url: 'mpa/mpa-page2.html', children: null },
            { name: 'mpa-preload', text: 'MPA预加载', icon: '📄', url: 'mpa/mpa-preload.html', children: null },
            { name: 'spa-comparison', text: 'SPA对比', icon: '📄', url: 'mpa/spa-comparison.html', children: null }
        ]
    },
    {
        name: 'picocss',
        text: 'Pico.css',
        icon: '💎',
        url: null,
        children: [
            { name: 'pico-basic', text: 'Pico基础', icon: '📄', url: 'css-pico/pico-basic.html', children: null },
            { name: 'pico-classless', text: 'Pico无类', icon: '📄', url: 'css-pico/pico-classless.html', children: null },
            { name: 'pico-dialog', text: 'Pico对话框', icon: '📄', url: 'css-pico/pico-dialog.html', children: null },
            { name: 'pico-form', text: 'Pico表单', icon: '📄', url: 'css-pico/pico-form.html', children: null },
            { name: 'pico-grid', text: 'Pico网格', icon: '📄', url: 'css-pico/pico-grid.html', children: null },
            { name: 'pico-table', text: 'Pico表格', icon: '📄', url: 'css-pico/pico-table.html', children: null },
            { name: 'pico-text', text: 'Pico文本', icon: '📄', url: 'css-pico/pico-text.html', children: null },
            { name: 'pico-theme', text: 'Pico主题', icon: '📄', url: 'css-pico/pico-theme.html', children: null }
        ]
    },
    {
        name: 'tailwindcss',
        text: 'TailwindCSS',
        icon: '🎯',
        url: null,
        children: [
            { name: 'basic', text: 'Tailwind基础', icon: '📄', url: 'css-tailwind/basic.html', children: null },
            { name: 'grid-color', text: 'Tailwind网格颜色', icon: '📄', url: 'css-tailwind/grid-color.html', children: null },
            { name: 'shadow', text: 'Tailwind阴影', icon: '📄', url: 'css-tailwind/shadow.html', children: null },
            { name: 'text', text: 'Tailwind文本', icon: '📄', url: 'css-tailwind/text.html', children: null }
        ]
    },
    {
        name: 'misc',
        text: '其他示例',
        icon: '📂',
        url: null,
        children: [
            { name: 'advertise', text: '广告示例', icon: '📄', url: 'misc/advertise.html', children: null }
        ]
    },
];
