class IncludedHelpers {
    constructor (included) {
        this.data = [];

        for (let a_included of included) {
            this.data[a_included.type + '.' + a_included.id] = a_included;
        }
    }

    get (key) {
        return this.data[key];
    }
}


export default IncludedHelpers;