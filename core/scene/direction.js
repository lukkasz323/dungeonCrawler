export var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["West"] = 3] = "West";
})(Direction || (Direction = {}));
export function getRightDirection(direction) {
    if (direction === Object.values(Direction).length / 2 - 1) {
        return 0;
    }
    else {
        return direction + 1;
    }
}
export function getLeftDirection(direction) {
    if (direction === 0) {
        return Object.values(Direction).length / 2 - 1;
    }
    else {
        return direction - 1;
    }
}
