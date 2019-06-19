# vue3+node+mysql搭建blog（二）

## 使用BEM样式规范

### 安装scss

```js
npm install node-sass sass-loader --save-dev
```

### BEM规范封装

#### 1. src文件夹下创建mixins文件夹和index.scss文件
#### 2. mixins文件夹下创建 function.scss 和 mixin.scss文件

**src/scss/mixins/function.scss**

```scss
$namespace: 'my';
$element-separator: '__';
$modifier-separator: '--';
$state-prefix: 'is-';

/* BEM support Func
 -------------------------- */
@function selectorToString($selector) {
  $selector: inspect($selector);
  $selector: str-slice($selector, 2, -2);

  @return $selector;
}

@function containsModifier($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, $modifier-separator) {
    @return true;
  }
  
  @else {
    @return false;
  }
}

@function containWhenFlag($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, '.' + $state-prefix) {
    @return true;
  }
  
  @else {
    @return false;
  }
}

@function containPseudoClass($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, ':') {
    @return true;
  }

  @else {
    @return false;
  }
}

@function hitAllSpecialNestRule($selector) {
  @return containsModifier($selector) or containWhenFlag($selector) or containPseudoClass($selector);
}
```

**src/scss/mixins/mixin.scss**

```scss
@import './function';

/* Placeholder
 -------------------------- */
@mixin placeholder {
  &::-webkit-input-placeholder {
    @content;
  }

  &::-moz-placeholder {
    @content;
  }

  &:-ms-input-placeholder {
    @content;
  }
}

/* BEM
 *  -   中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
 *  __  双下划线：双下划线用来连接块和块的子元素
 *  --   双横线：双横线用来描述一个块或者块的子元素的一种状态
 -------------------------- */

// 块（block
@mixin b($block) {
  $b: $namespace+'-'+$block !global;

  .#{$b} {
    @content;
  }
}

// 元素（element)
@mixin e($element) {
  $e: $element !global;
  $selector: &;
  $current-selector: "";

  @each $unit in $element {
    $current-selector: #{$current-selector + "." + $b + $element-separator + $unit + ","};
  }

  @if hitAllSpecialNestRule($selector) {
    @at-root {
      #{$selector} {
        #{$current-selector} {
          @content;
        }
      }
    }
  }

  @else {
    @at-root {
      #{$current-selector} {
        @content;
      }
    }
  }
}

// 修饰符（modifier)
@mixin m($modifier) {
  $selector: &;
  $current-selector: "";

  @each $unit in $modifier {
    $current-selector: #{$current-selector + & + $modifier-separator + $unit + ","};
  }

  @at-root {
    #{$current-selector} {
      @content;
    }
  }
}

@mixin configurable-m($modifier, $E-flag: false) {
  $selector: &;
  $interpolation: '';

  @if $E-flag {
    $interpolation: $element-separator + $E-flag;
  }

  @at-root {
    #{$selector} {
      .#{$b + $interpolation + $modifier-separator + $modifier} {
        @content;
      }
    }
  }
}

@mixin spec-selector($specSelector: '', $element: $E, $modifier: false, $block: $B) {
  $modifier-combo: '';

  @if $modifier {
    $modifier-combo: $modifier-separator + $modifier;
  }

  @at-root {
    #{&}#{$specSelector}.#{$block + $element-separator + $element + $modifier-combo} {
      @content;
    }
  }
}

@mixin meb($modifier: false, $element: $E, $block: $B) {
  $selector: &;
  $modifier-combo: '';

  @if $modifier {
    $modifier-combo: $modifier-separator + $modifier;
  }

  @at-root {
    #{$selector} {
      .#{$block + $element-separator + $element + $modifier-combo} {
        @content;
      }
    }
  }
}

@mixin when($state) {
  @at-root {
    &.#{$state-prefix + $state} {
      @content;
    }
  }
}

@mixin extend-rule($name) {
  @extend #{'%shared-'+$name};
}

@mixin share-rule($name) {
  $rule-name: '%shared-'+$name;

  @at-root #{$rule-name} {
    @content;
  }
}

@mixin pseudo($pseudo) {
  @at-root #{&}#{':#{$pseudo}'} {
    @content;
  }
}

/* 通用 图片处理 $img 指路径资源
 -------------------------- */
@mixin base-icon($img, $width:16px, $height:16px) {
  display: inline-block;
  height: $height;
  position: relative;
  vertical-align: middle;
  width: $width;

  &::before {
    background: url("#{$icon-img-url}#{$img}") no-repeat;
    background-size: 100%;
    content: "";
    display: block;
    height: $height;
    position: absolute;
    top: 0;
    width: $width;

    @content;
  }
}

/* 1px 解决方案
 -------------------------- */
@mixin border-1px($color: #ccc, $radius: 2px, $style: solid) {
  position: relative;
  
  &::after {
    border: 1RPX $style $color;
    border-radius: $radius;
    box-sizing: border-box;
    content: "";
    display: block;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform-origin: 0 0;
    width: 100%;
    
    @content;

    @media (min-resolution: 2dppx) {
      border-radius: $radius * 2;
      height: 200%;
      transform: scale(0.5) translateZ(0);
      width: 200%;
    }

    @media (min-resolution: 3dppx) {
      border-radius: $radius * 3;
      height: 300%;
      transform: scale(0.333) translateZ(0);
      width: 300%;
    }
  }
}

@mixin ext-overflow($t) {
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  display: -webkit-box;
  -webkit-line-clamp: $t;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
}

@mixin text-overflow-1 {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 解决 320 的 兼容性问题
@mixin mini320 {
  @media screen and (min-width: 318px) and (max-width: 360px) {
    @content;
  }
}
```

**src/scss/index.scss**

```scss
@import "./mixins/mixin.scss";
```
#### 3. vue.config.js 配置全局引入样式

```js
module.exports = {
  runtimeCompiler: true,
  // 代理配置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // css全局引入样式
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/index.scss";`
      }
    }
  }
}
```
