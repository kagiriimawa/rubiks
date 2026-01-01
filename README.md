# Cubist

自作のJavaScriptライブラリです。
3x3ルービックキューブのSVG、およびその回転のアニメーションを作ることができます。

# 使い方

## cube(SVG)を作る
まずこれをします。
特定のelementをSVGに変えます。
初期設定として、**全面黒のキューブ**ができあがります。
```html
<script src="cubist.js"></script>

<!-- idで指定する場合 -->
<div id="cube1"></div>
<script>
  cube1 = CubistCube.makeCubeById('cube1');
</script>


<!-- idで指定する場合 -->
<div class="cube"></div>
<div class="cube"></div>
<script>
  cubesIterator = CubistCube.makeCubeByClass('cube');
  // もしくは
  cubes = ...CubistCube.makeCubeByClass('cube');
</script>