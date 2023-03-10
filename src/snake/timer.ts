export class Timer {
    time: usize = 0;

    constructor(
        public trigger: usize,
    ) {}

    update(f: () => void): void {
        this.time ++;
        if (this.time >= this.trigger) {
            f();
            this.time = 0;
        }
    }
}
