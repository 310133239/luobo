#### 一个jq轮播插件依赖jq
> html代码例如
```
<div id="wrap">
	<div id="box">
		<ul >
			<li>3</li>
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>1</li>
		</ul>		
		<div id="pre">←</div>
		<div id="next">→</div>
	</div>
</div>
```
```
js调用
$("#box").luobo({
		ele:"#box ul",
		autopaly:2000,
		numMax:3,
		width:500,
	})
```
