


const getweeknumber = (date) => {
    switch (date) {
        case "SUNDAY":
            return 0;

        case "MONDAY":
            return 1;

        case "TUESDAY":
            return 2;

        case "WEDNESDAY":
            return 3;

        case "THURSDAY":
            return 4;

        case "FRIDAY":
            return 5;

        case "SATURDAY":
            return 6;

        default:
            break;
    }
};

export default getweeknumber;

