window.onload = function(){
    
    var seed = {
        x: (2147483648 * Math.random()) | 0,
        y: (2147483648 * Math.random()) | 0,
        z: (2147483648 * Math.random()) | 0,
        w: (2147483648 * Math.random()) | 0
    };
    function randomInt(xors) {
        var t = xors.x ^ (xors.x << 11);
        xors.x = xors.y;
        xors.y = xors.z;
        xors.z = xors.w;
        return xors.w = (xors.w^(xors.w>>>19))^(t^(t>>>8));
    }
    function random(xors) {
        return randomInt(xors) / 2147483648;
    }
    function shuffle(xs){
        var v = Object.assign({}, seed);
        var xs = xs.slice();
        var ys = [];
        while(0 < xs.length){
            var i = Math.abs(randomInt(v)) % xs.length;
            ys.push(xs[i]);
            xs.splice(i, 1);
        }
        return ys;
    }

    var colorTuples = shuffle([
        ["#e309c6", "#e309c6"], 
        
    ]);

      var topColors = ["#04ad8f", "#a6ce48", "#f3a118", "#ea6435", "#17b297", "#e30983", "#2782c4", "#1aa6e7", "#b5b5b5", "#f29905", "#e50011", "#ccdc26", "#a5328d", "#0aaa60", "#91c423", "#f29300", "#ec5f69", "#22b69e", "#e63e9b", "#917220"];


    var topInput = document.querySelector("#top");
    var middleInput = document.querySelector("#middle");
    var bottomInput = document.querySelector("#bottom"); 

    var top = document.querySelector(".top");
    var middle = document.querySelector(".middle");
    var bottom = document.querySelector(".bottom");

    var foreground = document.getElementById("foreground");
    var image = document.getElementById("result");
	
    
    var container = document.querySelector(".container");
    var download = document.getElementById("download");

    var canvas = document.createElement("canvas");
    var g = canvas.getContext("2d");
	
	
	    
        


    function update(){
        setTimeout(function(){
            setText(topInput.value, middleInput.value, bottomInput.value);
        });
    }      
    middleInput.addEventListener("change", update);
    middleInput.addEventListener("keydown", update);    
    topInput.addEventListener("change", update);
    topInput.addEventListener("keydown", update);  
    bottomInput.addEventListener("change", update);
    bottomInput.addEventListener("keydown", update);        

    function setText(topText, middleText, bottomText){


        

        var topTextSize = 60;
        var topMiddlePadding = 30;
        var middleTextSize = 100;
        var middleBottomPadding = 20;        
        var bottomTextSize = 60;
        var margin = 60;
        var bottomTextLetterSpacing = 3;

        var topTextFont = `normal bold ${topTextSize}px/2 "Kitab"`;
        var middleTextFont = `normal 400 ${middleTextSize}px/2 Thuluth`;
        var bottomTextFont = `normal bold  ${bottomTextSize}px/2 Kitab`;

        // resize canvas
		
        g.font = topTextFont;
        var topMetrics = g.measureText(topText);
        g.font = middleTextFont;
        var middleMetrics = g.measureText(middleText);  
        g.font = bottomTextFont;
        var bottomMetrics = g.measureText(bottomText);  
        canvas.width = margin + Math.max(
            topMetrics.width, 
            middleMetrics.width, 
            bottomMetrics.width + bottomTextLetterSpacing * (bottomText.length - 1)
        ) + margin;
        canvas.height = margin + topTextSize + topMiddlePadding + middleTextSize + middleBottomPadding + bottomTextSize + margin;

        // prepare canvas
        g.save();		
        g.clearRect(0, 0, canvas.width, canvas.height);
        g.textBaseline = "top";



        // stroke top text 
        function iterate(callback){
            var xors = Object.assign({}, seed);
            g.save();

            g.font = topTextFont;        
            g.fillStyle = "white";
            g.strokeStyle = "white";
            g.lineJoin = "round";    
            g.lineWidth = 10.0;   
            var metrics = g.measureText(topText);
            g.translate(margin + (canvas.width - metrics.width - margin * 2.5) * 0.5, margin);
            var x = 0;
            for(var i = 0; i < topText.length; i++){
                var c = topText.slice(i, i + 1);
                var rot = random(xors) * 0.2;
                var metrics = g.measureText(c);
                g.save();
                
                callback(i, c);
                g.restore();
                g.translate(metrics.width, 0);
            }
            g.restore();
        }
        g.save();
        var xors = Object.assign({}, seed);
        


        var topColors = ["#04ad8f", "#a6ce48", "#f3a118", "#ea6435", "#17b297", "#e30983", "#2782c4", "#1aa6e7", "#b5b5b5", "#f29905", "#e50011", "#ccdc26", "#a5328d", "#0aaa60", "#91c423", "#f29300", "#ec5f69", "#22b69e", "#e63e9b", "#917220"];


  
        iterate(function(i, c){
            g.shadowColor = "transparent";

            g.strokeText(c, 0, 0);            
        });
        iterate(function(i, c){
            g.shadowColor = "rgba(0, 0, 0, 0.3)";
            g.shadowBlur = 10;
            g.fillStyle = topColors[i % topColors.length];
            g.fillText(c, 0, 0);
        });






        // centerize
        var metrics = g.measureText(middleText);
        g.translate((canvas.width - middleMetrics.width) * 0.5, margin + topTextSize + topMiddlePadding);

        // stroke outline
        g.font = middleTextFont;
        g.strokeStyle = "#fff";
        g.lineWidth = 20.0;
        g.shadowColor = "#03818a";
	    g.shadowOpacity = 5.0;
        g.shadowBlur = 10;
        g.lineCap = "round";
        g.lineJoin = "round";
        g.strokeText(middleText, 0, 0);
		
		
		      
        // fill charactors
        var x = 0;
        var xors = Object.assign({}, seed);
        for(var i = 0; i < middleText.length; i++){
            var c = middleText.slice(x,x =21);
			var rot = random(xors) * 5.2;

            // base color
            g.shadowColor = "rgba(0, 0, 0, 0.6)";
            g.shadowBlur = 10;
            g.fillStyle = colorTuples[i % colorTuples.length][0];
            g.fillText(c, 0, 0);

            g.save();

            // clip
            var rot = random(xors);
            g.beginPath();
            g.save();
            g.translate(middleTextSize * 0.5, middleTextSize * 0.5);            
            g.rotate(rot);
            g.translate(-middleTextSize * 0.5, -middleTextSize * 0.5);
            g.moveTo(-middleTextSize * 2, middleTextSize * 0.5);
            g.lineTo(middleTextSize * 2, middleTextSize * 0.5);
            g.lineTo(middleTextSize * 2, middleTextSize * 2);
            g.lineTo(-middleTextSize * 2, middleTextSize * 2);
            g.closePath();
            g.restore();
            g.clip();
			

            // upper color
            g.shadowColor = "none";
            g.shadowBlur = 0;
            g.fillStyle = colorTuples[i % colorTuples.length][1];
            g.fillText(c, 0, 0);

            g.restore();

            // go to next
            var metrics  = g.measureText(c);
            g.translate(metrics.width, 0);
			
        }
        
        g.restore();

        // bottom text
        g.save();
        g.strokeStyle = "#000";
        g.fillStyle = "#fff";
        g.lineWidth = 6.0;
        g.lineCap = "round";
        g.lineJoin = "round";
        g.textBaseline = "top";
        g.font = bottomTextFont; 
       
        var metrics = g.measureText(bottomText);
        g.translate(
            (canvas.width - metrics.width - (bottomText.length - 0) * bottomTextLetterSpacing) * 0.5, 
            margin + topTextSize + topMiddlePadding + middleTextSize + middleBottomPadding
        );

        for(var i = 0; i < bottomText.length; i++){
            var c = bottomText.slice(i, i + 1);
            g.shadowColor = "rgba(0, 0, 0, 0.3)";
            g.shadowBlur = 10;
            g.strokeText(c, 0, 0);
            g.shadowColor = "transparent";
            g.fillText(c, 0, 0);
            var metrics = g.measureText(c);
            g.translate(metrics.width + bottomTextLetterSpacing, 0);
        }

        g.restore();


        var url = canvas.toDataURL();
        image.src = url;
        download.href = url;

    }

    
    function _0x3889(_0x436d60,_0x45a656){var _0x537d20=_0x537d();return _0x3889=function(_0x38890a,_0x2ddafe){_0x38890a=_0x38890a-0x68;var _0x1d6763=_0x537d20[_0x38890a];return _0x1d6763;},_0x3889(_0x436d60,_0x45a656);}var _0x13ab13=_0x3889;function _0x537d(){var _0x5eaddf=['2085060ZfkYUs','value','1122zJBkNA','6883120tNvHzb','80670hKesDv','21130DwwBEg','7202848pbtKZD','5307757wLFUql','750844eMWklp'];_0x537d=function(){return _0x5eaddf;};return _0x537d();}(function(_0x422a62,_0x2fb866){var _0x4274ec=_0x3889,_0x299442=_0x422a62();while(!![]){try{var _0xfbfec=parseInt(_0x4274ec(0x68))/0x1+-parseInt(_0x4274ec(0x6d))/0x2+-parseInt(_0x4274ec(0x69))/0x3+parseInt(_0x4274ec(0x6f))/0x4+-parseInt(_0x4274ec(0x6e))/0x5*(-parseInt(_0x4274ec(0x6b))/0x6)+-parseInt(_0x4274ec(0x70))/0x7+-parseInt(_0x4274ec(0x6c))/0x8;if(_0xfbfec===_0x2fb866)break;else _0x299442['push'](_0x299442['shift']());}catch(_0x388c94){_0x299442['push'](_0x299442['shift']());}}}(_0x537d,0xf12ae),middleInput[_0x13ab13(0x6a)]='عَشَاء',update());

    download.addEventListener("click", function(){
        canvas.toBlob(function(blob) {
            saveAs(blob, middleInput.value + ".png");
        });
    });
};

 
