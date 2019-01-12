define(require => {
    class Sprite {
        constructor(
            context,
            width,
            height,
            image,
            ticksPerFrame,
            frameIndexes
        ) {
            this.context = context;
            this.width = width;
            this.height = height;
            this.image = image;
            this.ticksPerFrame = ticksPerFrame;
            this.frameIndexes = frameIndexes;
            this.tickCount = 0;
            this.currentFrameIndex = 0;
        }

        static create(
            context,
            width,
            height,
            image,
            ticksPerFrame = 0,
            frameIndexes = [0, 1, 2]
        ) {
            return new Sprite(
                context,
                width,
                height,
                image,
                ticksPerFrame,
                frameIndexes
            );
        }

        update() {
            this.tickCount++;

            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;

                this.currentFrameIndex++;
                if (this.currentFrameIndex > this.frameIndexes.length - 1) {
                    this.currentFrameIndex = 0;
                }
            }
        }

        render() {
            this.context.drawImage(
                this.image,
                (this.currentFrameIndex * this.width) /
                    this.frameIndexes.length,
                0,
                this.width / this.frameIndexes.length,
                this.height,
                0,
                0,
                this.width / this.frameIndexes.length,
                this.height
            );
        }
    }

    return Sprite;
});
