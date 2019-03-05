const TodoList = artifacts.require("Todo");

contract("Todo", accounts => {
  before(async () => {
    this.TodoList = await TodoList.deployed();
  });

  it("deploys successfuly", async () => {
    const address = await this.TodoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("list tasks", async () => {
    const taskCount = await this.TodoList.taskCount();
    const task = await this.TodoList.tasks(taskCount);
    assert.equal(task.id.toNumber(), taskCount.toNumber());
    assert.equal(
      task.description,
      "This task is created by default by constructor"
    );
    assert.equal(task.completed, false);
    assert.equal(taskCount.toNumber(), 1);
  });

  it("add task", async () => {
    const result = await this.TodoList.addTask("Work on UI design");
    const taskCount = await this.TodoList.taskCount();
    assert.equal(taskCount, 2);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 2);
    assert.equal(event.content, "Work on UI design");
    assert.equal(event.completed, false);
  });
});
