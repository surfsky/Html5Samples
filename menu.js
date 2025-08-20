/**
 * 项目树形结构数据
 * TreeNode结构: {name, text, icon, url, children}
 */

export const menuData = [
    {
        name: 'animation',
        text: 'CSS3动画',
        icon: '🎬',
        url: null,
        children: [
            { name: 'css3-animation-popup', text: 'CSS3弹窗动画', icon: '📄', url: 'eg-animation/css3-animation-popup.html', children: null },
            { name: 'css3-animation-rotate', text: 'CSS3旋转动画', icon: '📄', url: 'eg-animation/css3-animation-rotate.html', children: null },
            { name: 'css3-animation', text: 'CSS3基础动画', icon: '📄', url: 'eg-animation/css3-animation.html', children: null },
            { name: 'motion-one', text: 'Motion One动画', icon: '📄', url: 'eg-animation/motion-one.html', children: null }
        ]
    },
    {
        name: 'canvas',
        text: 'Canvas画布',
        icon: '🎨',
        url: null,
        children: [
            { name: 'canvas-fabric-draw', text: 'Fabric绘图', icon: '📄', url: 'eg-canvas/canvas-fabric-draw.html', children: null },
            { name: 'canvas-fabric-event', text: 'Fabric事件', icon: '📄', url: 'eg-canvas/canvas-fabric-event.html', children: null },
            { name: 'canvas-fabric-form', text: 'Fabric表单', icon: '📄', url: 'eg-canvas/canvas-fabric-form.html', children: null },
            { name: 'canvas-fabric', text: 'Fabric基础', icon: '📄', url: 'eg-canvas/canvas-fabric.html', children: null },
            { name: 'canvas-konva-form', text: 'Konva表单', icon: '📄', url: 'eg-canvas/canvas-konva-form.html', children: null },
            { name: 'canvas-konva', text: 'Konva基础', icon: '📄', url: 'eg-canvas/canvas-konva.html', children: null }
        ]
    },
    {
        name: 'chart',
        text: '图表组件',
        icon: '📊',
        url: null,
        children: [
            { name: 'chartjs', text: 'Chart.js图表', icon: '📄', url: 'eg-chart/chartjs.html', children: null }
        ]
    },
    {
        name: 'css3',
        text: 'CSS3样式',
        icon: '🎨',
        url: null,
        children: [
            { name: 'css-parser', text: 'CSS解析器', icon: '📄', url: 'eg-css3/css-parser.html', children: null },
            { name: 'css3-avatar', text: 'CSS3头像', icon: '📄', url: 'eg-css3/css3-avatar.html', children: null },
            { name: 'css3-before-after', text: 'CSS3伪元素', icon: '📄', url: 'eg-css3/css3-before-after.html', children: null },
            { name: 'css3-color', text: 'CSS3颜色', icon: '📄', url: 'eg-css3/css3-color.html', children: null },
            { name: 'css3-flip', text: 'CSS3翻转', icon: '📄', url: 'eg-css3/css3-flip.html', children: null },
            { name: 'css3-icon', text: 'CSS3图标', icon: '📄', url: 'eg-css3/css3-icon.html', children: null },
            { name: 'css3-layout-col', text: 'CSS3列布局', icon: '📄', url: 'eg-css3/css3-layout-col.html', children: null },
            { name: 'css3-layout-flex', text: 'CSS3弹性布局', icon: '📄', url: 'eg-css3/css3-layout-flex.html', children: null },
            { name: 'css3-layout-flexgrid12', text: 'CSS3弹性网格', icon: '📄', url: 'eg-css3/css3-layout-flexgrid12.html', children: null },
            { name: 'css3-layout-grid', text: 'CSS3网格布局', icon: '📄', url: 'eg-css3/css3-layout-grid.html', children: null },
            { name: 'css3-layout-gridportal', text: 'CSS3网格门户', icon: '📄', url: 'eg-css3/css3-layout-gridportal.html', children: null },
            { name: 'css3-layout-row', text: 'CSS3行布局', icon: '📄', url: 'eg-css3/css3-layout-row.html', children: null },
            { name: 'css3-position-anchor', text: 'CSS3锚点定位', icon: '📄', url: 'eg-css3/css3-position-anchor.html', children: null },
            { name: 'css3-position-autosize', text: 'CSS3自动尺寸', icon: '📄', url: 'eg-css3/css3-position-autosize.html', children: null },
            { name: 'css3-position-fix', text: 'CSS3固定定位', icon: '📄', url: 'eg-css3/css3-position-fix.html', children: null },
            { name: 'css3-position-float', text: 'CSS3浮动定位', icon: '📄', url: 'eg-css3/css3-position-float.html', children: null },
            { name: 'css3-position-inline', text: 'CSS3内联定位', icon: '📄', url: 'eg-css3/css3-position-inline.html', children: null },
            { name: 'css3-position-sticky', text: 'CSS3粘性定位', icon: '📄', url: 'eg-css3/css3-position-sticky.html', children: null },
            { name: 'css3-position-valign', text: 'CSS3垂直对齐', icon: '📄', url: 'eg-css3/css3-position-valign.html', children: null },
            { name: 'css3-position', text: 'CSS3定位', icon: '📄', url: 'eg-css3/css3-position.html', children: null },
            { name: 'css3-reflection-fail', text: 'CSS3反射失败', icon: '📄', url: 'eg-css3/css3-reflection-fail.html', children: null },
            { name: 'css3-ripplebutton', text: 'CSS3波纹按钮', icon: '📄', url: 'eg-css3/css3-ripplebutton.html', children: null },
            { name: 'css3-shadow', text: 'CSS3阴影', icon: '📄', url: 'eg-css3/css3-shadow.html', children: null },
            { name: 'css3-sidebar-fixed', text: 'CSS3固定侧边栏', icon: '📄', url: 'eg-css3/css3-sidebar-fixed.html', children: null },
            { name: 'css3-sidebar-flex', text: 'CSS3弹性侧边栏', icon: '📄', url: 'eg-css3/css3-sidebar-flex.html', children: null },
            { name: 'css3-text', text: 'CSS3文本', icon: '📄', url: 'eg-css3/css3-text.html', children: null },
            { name: 'css3-unit-rem', text: 'CSS3 REM单位', icon: '📄', url: 'eg-css3/css3-unit-rem.html', children: null },
            { name: 'css3-unit-vh-js', text: 'CSS3 VH单位JS', icon: '📄', url: 'eg-css3/css3-unit-vh-js.html', children: null },
            { name: 'css3-unit-vh', text: 'CSS3 VH单位', icon: '📄', url: 'eg-css3/css3-unit-vh.html', children: null },
            { name: 'css3-variable-change', text: 'CSS3变量变化', icon: '📄', url: 'eg-css3/css3-variable-change.html', children: null },
            { name: 'css3-variable-region', text: 'CSS3变量区域', icon: '📄', url: 'eg-css3/css3-variable-region.html', children: null },
            { name: 'css3-variable', text: 'CSS3变量', icon: '📄', url: 'eg-css3/css3-variable.html', children: null }
        ]
    },
    {
        name: 'customTag',
        text: '自定义标签',
        icon: '🏷️',
        url: null,
        children: [
            { name: 'basic-body', text: '基础Body', icon: '📄', url: 'eg-customTag/basic-body.html', children: null },
            { name: 'basic-shadow', text: '基础Shadow', icon: '📄', url: 'eg-customTag/basic-shadow.html', children: null },
            { name: 'basic-this', text: '基础This', icon: '📄', url: 'eg-customTag/basic-this.html', children: null },
            { name: 'basic-xrow-iframe', text: '基础XRow iframe', icon: '📄', url: 'eg-customTag/basic-xrow-iframe.html', children: null },
            { name: 'basic-xrow', text: '基础XRow', icon: '📄', url: 'eg-customTag/basic-xrow.html', children: null },
            { name: 'page1', text: '页面1', icon: '📄', url: 'eg-customTag/page1.html', children: null },
            { name: 'page2', text: '页面2', icon: '📄', url: 'eg-customTag/page2.html', children: null },
            { name: 'page3', text: '页面3', icon: '📄', url: 'eg-customTag/page3.html', children: null },
            { name: 'tag-release', text: '标签释放', icon: '📄', url: 'eg-customTag/tag-release.html', children: null },
            { name: 'variant', text: '变体', icon: '📄', url: 'eg-customTag/variant.html', children: null },
            { name: 'xsign', text: 'XSign', icon: '📄', url: 'eg-customTag/xsign.html', children: null },
            { name: 'splitpanel', text: 'SplitPanel', icon: '📄', url: 'eg-customTag/splitpanel.html', children: null },
        ]
    },
    {
        name: 'effects',
        text: '视觉效果',
        icon: '✨',
        url: null,
        children: [
            { name: 'bubbly', text: '气泡效果', icon: '📄', url: 'eg-effects/bubbly.html', children: null },
            { name: 'cloudy', text: '云朵效果', icon: '📄', url: 'eg-effects/cloudy.html', children: null },
            { name: 'diamond', text: '钻石效果', icon: '📄', url: 'eg-effects/diamond.html', children: null },
            { name: 'effect-changStyleTag', text: '动态样式标签', icon: '📄', url: 'eg-effects/effect-changStyleTag.html', children: null },
            { name: 'effect-highlight', text: '高亮效果', icon: '📄', url: 'eg-effects/effect-highlight.html', children: null },
            { name: 'effect-showPageCode', text: '显示页面代码', icon: '📄', url: 'eg-effects/effect-showPageCode.html', children: null },
            { name: 'flapCorner', text: '翻角效果', icon: '📄', url: 'eg-effects/flapCorner.html', children: null },
            { name: 'heart', text: '心形效果', icon: '📄', url: 'eg-effects/heart.html', children: null },
            { name: 'hover', text: '悬停效果', icon: '📄', url: 'eg-effects/hover.html', children: null },
            { name: 'notching', text: '缺口效果', icon: '📄', url: 'eg-effects/notching.html', children: null },
            { name: 'parallelogram', text: '平行四边形', icon: '📄', url: 'eg-effects/parallelogram.html', children: null },
            { name: 'pie', text: '饼图效果', icon: '📄', url: 'eg-effects/pie.html', children: null },
            { name: 'solarsystem', text: '太阳系', icon: '📄', url: 'eg-effects/solarsystem.html', children: null },
            { name: 'spectiveBlur', text: '透视模糊', icon: '📄', url: 'eg-effects/spectiveBlur.html', children: null },
            { name: 'stripe', text: '条纹效果', icon: '📄', url: 'eg-effects/stripe.html', children: null },
            { name: 'sun', text: '太阳效果', icon: '📄', url: 'eg-effects/sun.html', children: null },
            { name: 'trapezoid', text: '梯形效果', icon: '📄', url: 'eg-effects/trapezoid.html', children: null }
        ]
    },
    {
        name: 'es6module',
        text: 'ES6模块',
        icon: '📦',
        url: null,
        children: [
            { name: 'index', text: 'ES6模块示例', icon: '📄', url: 'eg-es6module/index.html', children: null }
        ]
    },
    {
        name: 'html5ui',
        text: 'HTML5界面',
        icon: '🖥️',
        url: null,
        children: [
            { name: 'html5-contextmenu', text: 'HTML5右键菜单', icon: '📄', url: 'eg-html5ui/html5-contextmenu.html', children: null },
            { name: 'html5-data', text: 'HTML5数据', icon: '📄', url: 'eg-html5ui/html5-data.html', children: null },
            { name: 'html5-dialog-mask', text: 'HTML5对话框遮罩', icon: '📄', url: 'eg-html5ui/html5-dialog-mask.html', children: null },
            { name: 'html5-dialog-resize', text: 'HTML5对话框调整', icon: '📄', url: 'eg-html5ui/html5-dialog-resize.html', children: null },
            { name: 'html5-dialog-tag', text: 'HTML5对话框标签', icon: '📄', url: 'eg-html5ui/html5-dialog-tag.html', children: null },
            { name: 'html5-dialog', text: 'HTML5对话框', icon: '📄', url: 'eg-html5ui/html5-dialog.html', children: null },
            { name: 'html5-drag', text: 'HTML5拖拽', icon: '📄', url: 'eg-html5ui/html5-drag.html', children: null },
            { name: 'html5-form', text: 'HTML5表单', icon: '📄', url: 'eg-html5ui/html5-form.html', children: null },
            { name: 'html5-iframe', text: 'HTML5 iframe', icon: '📄', url: 'eg-html5ui/html5-iframe.html', children: null },
            { name: 'html5-link', text: 'HTML5链接', icon: '📄', url: 'eg-html5ui/html5-link.html', children: null },
            { name: 'html5-marquee-css', text: 'HTML5跑马灯CSS', icon: '📄', url: 'eg-html5ui/html5-marquee-css.html', children: null },
            { name: 'html5-marquee', text: 'HTML5跑马灯', icon: '📄', url: 'eg-html5ui/html5-marquee.html', children: null },
            { name: 'html5-menu', text: 'HTML5菜单', icon: '📄', url: 'eg-html5ui/html5-menu.html', children: null },
            { name: 'html5-spliter', text: 'HTML5分割器', icon: '📄', url: 'eg-html5ui/html5-spliter.html', children: null },
            { name: 'html5-svg', text: 'HTML5 SVG', icon: '📄', url: 'eg-html5ui/html5-svg.html', children: null },
            { name: 'html5-tag', text: 'HTML5标签', icon: '📄', url: 'eg-html5ui/html5-tag.html', children: null },
            { name: 'html5-tooltip-title', text: 'HTML5工具提示标题', icon: '📄', url: 'eg-html5ui/html5-tooltip-title.html', children: null },
            { name: 'html5-tooltip', text: 'HTML5工具提示', icon: '📄', url: 'eg-html5ui/html5-tooltip.html', children: null }
        ]
    },
    {
        name: 'iconfont',
        text: '图标字体',
        icon: '🔤',
        url: null,
        children: [
            { name: 'iconfont', text: '图标字体示例', icon: '📄', url: 'eg-iconfont/iconfont.html', children: null }
        ]
    },
    {
        name: 'layout',
        text: '布局技巧',
        icon: '📐',
        url: null,
        children: [
            { name: 'autoCenterBootstrap', text: 'Bootstrap居中', icon: '📄', url: 'eg-layout/autoCenterBootstrap.html', children: null },
            { name: 'autoCenterByCss', text: 'CSS居中', icon: '📄', url: 'eg-layout/autoCenterByCss.html', children: null },
            { name: 'autoCenterByCss2', text: 'CSS居中2', icon: '📄', url: 'eg-layout/autoCenterByCss2.html', children: null },
            { name: 'autoCenterByFlex', text: 'Flex居中', icon: '📄', url: 'eg-layout/autoCenterByFlex.html', children: null },
            { name: 'autoCenterByFlex2', text: 'Flex居中2', icon: '📄', url: 'eg-layout/autoCenterByFlex2.html', children: null },
            { name: 'autoCenterByJs', text: 'JS居中', icon: '📄', url: 'eg-layout/autoCenterByJs.html', children: null },
            { name: 'autoCenterByJs2', text: 'JS居中2', icon: '📄', url: 'eg-layout/autoCenterByJs2.html', children: null },
            { name: 'fullscreenByCss', text: 'CSS全屏', icon: '📄', url: 'eg-layout/fullscreenByCss.html', children: null },
            { name: 'fullscreenByJs', text: 'JS全屏', icon: '📄', url: 'eg-layout/fullscreenByJs.html', children: null }
        ]
    },
    {
        name: 'misc',
        text: '其他示例',
        icon: '📂',
        url: null,
        children: [
            { name: 'eg-advertise', text: '广告示例', icon: '📄', url: 'eg-misc/eg-advertise.html', children: null }
        ]
    },
    {
        name: 'mpa',
        text: '现代MPA',
        icon: '🚀',
        url: null,
        children: [
            { name: 'mpa-basic', text: 'MPA基础', icon: '📄', url: 'eg-mpa/mpa-basic.html', children: null },
            { name: 'mpa-cache', text: 'MPA缓存', icon: '📄', url: 'eg-mpa/mpa-cache.html', children: null },
            { name: 'mpa-page2', text: 'MPA页面2', icon: '📄', url: 'eg-mpa/mpa-page2.html', children: null },
            { name: 'mpa-preload', text: 'MPA预加载', icon: '📄', url: 'eg-mpa/mpa-preload.html', children: null },
            { name: 'spa-comparison', text: 'SPA对比', icon: '📄', url: 'eg-mpa/spa-comparison.html', children: null }
        ]
    },
    {
        name: 'picocss',
        text: 'Pico.css',
        icon: '💎',
        url: null,
        children: [
            { name: 'pico-basic', text: 'Pico基础', icon: '📄', url: 'eg-picocss/pico-basic.html', children: null },
            { name: 'pico-classless', text: 'Pico无类', icon: '📄', url: 'eg-picocss/pico-classless.html', children: null },
            { name: 'pico-dialog', text: 'Pico对话框', icon: '📄', url: 'eg-picocss/pico-dialog.html', children: null },
            { name: 'pico-form', text: 'Pico表单', icon: '📄', url: 'eg-picocss/pico-form.html', children: null },
            { name: 'pico-grid', text: 'Pico网格', icon: '📄', url: 'eg-picocss/pico-grid.html', children: null },
            { name: 'pico-table', text: 'Pico表格', icon: '📄', url: 'eg-picocss/pico-table.html', children: null },
            { name: 'pico-text', text: 'Pico文本', icon: '📄', url: 'eg-picocss/pico-text.html', children: null },
            { name: 'pico-theme', text: 'Pico主题', icon: '📄', url: 'eg-picocss/pico-theme.html', children: null }
        ]
    },
    {
        name: 'svg',
        text: 'SVG图形',
        icon: '🖼️',
        url: null,
        children: [
            { name: 'svg-animation-css', text: 'SVG CSS动画', icon: '📄', url: 'eg-svg/svg-animation-css.html', children: null },
            { name: 'svg-anmiate-js', text: 'SVG JS动画', icon: '📄', url: 'eg-svg/svg-anmiate-js.html', children: null },
            { name: 'svg-anmiate-js2', text: 'SVG JS动画2', icon: '📄', url: 'eg-svg/svg-anmiate-js2.html', children: null },
            { name: 'svg-anmiate', text: 'SVG动画', icon: '📄', url: 'eg-svg/svg-anmiate.html', children: null },
            { name: 'svg-filter-noise', text: 'SVG噪声滤镜', icon: '📄', url: 'eg-svg/svg-filter-noise.html', children: null },
            { name: 'svg-filter-reflect', text: 'SVG反射滤镜', icon: '📄', url: 'eg-svg/svg-filter-reflect.html', children: null }
        ]
    },
    {
        name: 'tailwindcss',
        text: 'TailwindCSS',
        icon: '🎯',
        url: null,
        children: [
            { name: 'basic', text: 'Tailwind基础', icon: '📄', url: 'eg-tailwindcss/basic.html', children: null },
            { name: 'grid-color', text: 'Tailwind网格颜色', icon: '📄', url: 'eg-tailwindcss/grid-color.html', children: null },
            { name: 'shadow', text: 'Tailwind阴影', icon: '📄', url: 'eg-tailwindcss/shadow.html', children: null },
            { name: 'text', text: 'Tailwind文本', icon: '📄', url: 'eg-tailwindcss/text.html', children: null }
        ]
    }
];
