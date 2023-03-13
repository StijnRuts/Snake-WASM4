export class Timer {
    time: usize = 0;

    constructor(
        public trigger: usize,
    ) {}

    tick(): boolean {
        this.time ++;
        if (this.time >= this.trigger) {
            this.time = 0;
            return true;
        }
        return false;
    }
}
