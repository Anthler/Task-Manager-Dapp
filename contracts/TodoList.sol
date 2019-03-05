//solium-disable linebreak-style
pragma solidity >=0.4.21 < 0.6.0;

contract Todo{

    uint public taskCount = 0;
    mapping(uint => Task) public tasks;
    event TaskCreated(uint id, string content, bool completed);

    struct Task{
        uint id;
        string description;
        bool completed;
    }

    constructor() public{
        addTask("This task is created by default by constructor");
    }

    function addTask(string memory _description) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _description, false);
        emit TaskCreated(taskCount, _description, false);

    }

}