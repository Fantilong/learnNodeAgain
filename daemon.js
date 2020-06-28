const child_pro = require('child_process');
let worker;

/*
 * @description:
 * @param
 * @param
 * @param
 * @returns
 * */
function spawn(server, config){
    console.log("守护进程让服务器进程启动..");
    worker = child_pro.spawn('node', [server, config]);
    worker.on('exit', code => {
        console.log("守护进程监控到服务器进程退出");

        if(code !== 0){
            console.log("守护进程监控到服务器进程退出码不等于0，重启服务器进程");
            spawn(server, config);
        }
    });
}

/*
 * @description:
 * @param 
 * @param 
 * @param 
 * @returns 
 * */
 function main(argvs){
    spawn('main.js', argvs[0]);
     process.on('SIGTERM', () => {
         console.log("守护进程收到通信，向服务器进程通信");
         worker.kill();
         process.exit(0);
     });
 }

main(process.argv.slice(2));