Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
}

export function goFullscreenMode(elem){
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err)=>{ console.log(err) });
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen().catch((err)=>{ console.log(err) });
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen().catch((err)=>{ console.log(err) });
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen().catch((err)=>{ console.log(err) });
    }
}

export function exitFullscreenMode(){
    if (document.exitFullscreen) {
        document.exitFullscreen().catch((err)=>{ console.log(err) });
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen().catch((err)=>{ console.log(err) });
    } else if (document.mozExitFullScreen) {
        document.mozExitFullScreen().catch((err)=>{ console.log(err) });
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch((err)=>{ console.log(err) });
    }
}