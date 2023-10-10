// 节流函数
const throttle = (fn:Function, delay:number) => {
    let timer:any = null;
    return function(...args:any[]) {
        if(timer) return;
        timer = setTimeout(() => {
            fn.apply(this, args);
            clearTimeout(timer)
            timer = null;
        }, delay);
    }
}
