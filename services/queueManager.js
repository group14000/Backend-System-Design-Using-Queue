const Queue = require("../models/Queue");

class QueueManager {
  async createQueue(userId) {
    const queue = new Queue({ userId, tasks: [] });
    await queue.save();
    return queue;
  }

  async getQueue(userId) {
    return await Queue.findOne({ userId });
  }

  async addTask(userId, task) {
    let queue = await this.getQueue(userId);
    if (!queue) {
      queue = await this.createQueue(userId);
    }
    queue.tasks.push(task);
    await queue.save();
  }

  async getNextTask(userId) {
    const queue = await this.getQueue(userId);
    if (!queue) return null;
    const task = queue.tasks.shift();
    await queue.save();
    return task;
  }

  async removeTask(userId, task) {
    const queue = await this.getQueue(userId);
    if (!queue) return;
    queue.tasks = queue.tasks.filter((t) => t !== task);
    await queue.save();
  }
}

module.exports = new QueueManager();
