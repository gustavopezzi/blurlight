$(document).ready(function() {
    var rad = 250;
    var msX = msY = 0;
    var circs = [];

    var c = document.getElementById('canvas');
    var $ = c.getContext('2d');
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    var cols = function() {
        var rgb = [];
        rgb[0] = Math.floor(Math.random() * 130 + 10);
        rgb[1] = Math.floor(0.5 * Math.random() * 50);
        rgb[2] = Math.floor(0.5 * Math.random() * 255);
        return rgb;
    };

    var opac = 0.025;

    var draw = function() {
        $.globalCompositeOperation = 'source-over';
        $.fillStyle = 'rgba(0,0,0,1)';
        $.fillRect(0, 0, c.width, c.height);
        $.globalCompositeOperation = 'lighter';
        
        var obj = {};
        obj.col = cols();
        obj.x = msX;
        obj.y = msY;
        obj.grdblur = $.createRadialGradient(msX, msY, 0, msX, msY, rad);
        obj.alpha = 1;
        circs.push(obj);

        var arr = [];

        for (var i in circs) {
            $.beginPath();
            circs[i].grdblur.addColorStop(0, 'rgba(' + circs[i].col[0] + ',' + circs[i].col[1] + ',' + circs[i].col[2] + ',0.93)');
            circs[i].grdblur.addColorStop(0.1, 'rgba(' + circs[i].col[0] + ',' + circs[i].col[1] + ',' + circs[i].col[2] + ',0.93)');
            circs[i].grdblur.addColorStop(0.3, 'rgba(' + circs[i].col[0] + ',' + circs[i].col[1] + ',' + circs[i].col[2] + ',0.6)');
            circs[i].grdblur.addColorStop(0.5, 'rgba(' + circs[i].col[0] + ',' + circs[i].col[1] + ',' + circs[i].col[2] + ',0.1)');
            circs[i].grdblur.addColorStop(1, 'rgba(' + circs[i].col[0] + ',' + circs[i].col[1] + ',' + circs[i].col[2] + ',0)');

            $.fillStyle = circs[i].grdblur;
            $.arc(circs[i].x, circs[i].y, rad, 0, Math.PI * 2, true);
            $.globalAlpha = circs[i].alpha;
            $.fill();

            circs[i].alpha -= opac;

            if (circs[i].alpha <= 0)
                arr.push(i);
        }

        for (var j in arr)
            circs.splice(arr[j], 1);
    };

    window.addEventListener('mousemove', function(e) {
        msX = e.pageX;
        msY = e.pageY;
    }, false);

    window.addEventListener('touchmove', function(e) {
        e.preventDefault();
        msX = e.touches[0].pageX;
        msY = e.touches[0].pageY;
    }, false);

    window.addEventListener('resize', function() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
    }, false);

    var run = function() {
        window.requestAnimFrame(run);
        draw();
    }

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    run();
});