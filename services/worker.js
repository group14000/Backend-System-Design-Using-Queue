const queueManager = require("./queueManager");

class Worker {
  constructor(userId) {
    this.userId = userId;
    this.isRunning = false;
  }

  async run() {
    this.isRunning = true;
    while (this.isRunning) {
      const task = await queueManager.getNextTask(this.userId);
      if (task) {
        await this.processTask(task);
        await queueManager.removeTask(this.userId, task);
      } else {
        this.isRunning = false;
      }
    }
  }

  async processTask(task) {
    // Process the task here
    console.log(`Processing task: ${task}`);
  }
}

module.exports = Worker;
