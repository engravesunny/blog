// 并发限制
import { App } from "vue";
import { AxiosResponse } from "axios";

export class PromiseControl {
  pool: Set<Promise<any>>;
  limit: number;
  awaitPool: Map<() => Promise<AxiosResponse<any, any>>, [Function, Function]>;
  addCount: number;
  removeCount: number;
  resolveCount: number;
  public finallyCallback: Function | null;
  constructor(limit: number) {
    this.pool = new Set();
    this.limit = limit;
    this.awaitPool = new Map();
    this.addCount = 0;
    this.resolveCount = 0;
    this.removeCount = 0;
    this.finallyCallback = null;
  }
  addTask(
    task: () => Promise<AxiosResponse<any, any>>,
    resolveCallback: Function = () => { },
    rejectCallback: Function = () => { }
  ) {
    this.addCount = this.addCount + 1;
    if (this.pool.size >= this.limit) {
      // 加入等待池
      this.awaitPool.set(task, [resolveCallback, rejectCallback]);
    } else {
      // task开始执行
      const taskRunning = task()
        .then((res) => {
          this.resolveCount = this.resolveCount + 1;
          resolveCallback.call(this, res);
          this.deleteCompletedTask(taskRunning);
          this.checkAwaitPool();
        })
        .catch((err) => {
          this.resolveCount = this.resolveCount + 1;
          rejectCallback.call(this, err);
          this.deleteCompletedTask(taskRunning);
          this.checkAwaitPool();
        });
      this.pool.add(taskRunning);
    }
  }
  checkAwaitPool() {
    if (this.awaitPool.size > 0) {
      for (const [task, [resolve, reject]] of this.awaitPool.entries()) {
        if (this.pool.size < this.limit) {
          // task开始执行
          const taskRunning = task()
            .then((res) => {
              this.resolveCount = this.resolveCount + 1;

              resolve.call(this, res);
              // 执行完毕,删除这个task
              this.deleteCompletedTask(taskRunning);
              // 检查等待池，传入并发池执行
              this.checkAwaitPool();
            })
            .catch((err) => {
              this.resolveCount = this.resolveCount + 1;
              reject.call(this, err);
              // 执行完毕,删除这个task
              this.deleteCompletedTask(taskRunning);
              // 检查等待池，传入并发池执行
              this.checkAwaitPool();
            });
          this.pool.add(taskRunning);
          this.requestAwaitPool(task);
        } else break;
      }
    } else return;
  }
  requestAwaitPool(task: () => Promise<AxiosResponse<any, any>>) {
    this.awaitPool.delete(task);
  }
  deleteTask(task: () => Promise<AxiosResponse<any, any>>) {
    const flag = this.awaitPool.delete(task);
    if (flag) {
      this.removeCount++;
    }
  }
  deleteCompletedTask(taskRunning: Promise<any>) {
    this.pool.delete(taskRunning);
    console.log(
      "当前任务状态：\n" +
      "resolveCount:" +
      this.resolveCount +
      "\n" +
      "removeCount:" +
      this.removeCount +
      "\n" +
      "addCount:" +
      this.addCount + "\n" +
      "poolCount:" + this.pool.size
    );
    setTimeout(() => {
      if (this.pool.size === 0 && this.finallyCallback) {
        // 并发池为空，结束本次并发
        this.finallyCallback.call(this);
        this.finallyCallback = null;
      }
    });
  }
}

export default {
  install(app: App<Element>, _options: any) {
    app.config.globalProperties.$promiseControl = new PromiseControl(10);
  },
};
