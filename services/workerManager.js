const Worker = require("./worker");

class WorkerManager {
  constructor() {
    this.workers = new Map();
  }

  startWorker(userId) {
    if (!this.workers.has(userId)) {
      const worker = new Worker(userId);
      this.workers.set(userId, worker);
      worker.run();
    }
  }

  stopWorker(userId) {
    const worker = this.workers.get(userId);
    if (worker) {
      worker.isRunning = false;
      this.workers.delete(userId);
    }
  }
}

module.exports = new WorkerManager();
