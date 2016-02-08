import Channel from './channel';
import {EVENT, RENDER_QUEUE, RENDER_TIME, MAX_QUEUE_SIZE} from './constants';

class WorkerBridge {
    constructor() {
        this.queue = [];
        this.channel = new Channel(self);
        this.channel.onMessage(this.handleMessage.bind(this));
        this.pollQueue();
        this.TIMEOUT = 5;
    }

    pollQueue(){
        self.setTimeout(() => {
            this.flushQueue();
            this.pollQueue();
        }, this.TIMEOUT);
    }

    handleMessage(data){
        switch (data.type) {
            case EVENT:
                handleEvent(data.args);
                break;
            case RENDER_TIME:
                this.rate = data.args.count / data.args.time;
                break;
            default: 
                console.log('Unknown operation %s', data);
        }
    }

    postMessage(msg) {
        this.queue.push(msg);
    }

    flushQueue(){
        if (this.queue.length === 0){
            return;
        }
        this.channel.send(RENDER_QUEUE, this.queue);
        this.queue = [];
    }

    handleEvent(args) {
        // TODO - Pass the events to the appropriate nodes/event Handlers
        console.log(args);
    }
}

export default new WorkerBridge();
