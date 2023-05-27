<template>
    <section class="main-hero-waves-area waves-area">
        <svg class="waves-svg" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28"
            preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352Z"></path>
            </defs>
            <g class="parallax">
                <use class="use" href="#gentle-wave" x="48" y="0"></use>
                <use class="use" href="#gentle-wave" x="48" y="3"></use>
                <use class="use" href="#gentle-wave" x="48" y="5"></use>
                <use class="use" href="#gentle-wave" x="48" y="7"></use>
            </g>
        </svg>
    </section>
</template>

<script setup>

</script>

<style lang="less" scoped>
.main-hero-waves-area {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -11px;
    z-index: 5;

    .waves-svg {
        width: 100%;
        height: 80px;

        @keyframes move-forever {
            0% {
                transform: translateX(-90px);
            }

            100% {
                transform: translateX(85px);
            }
        }

        use {
            animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
        }

        use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
            fill: rgba(223, 86, 209, 0.3);
        }

        use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
            fill: rgba(223, 86, 209, 0.5);
        }

        use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
            fill: rgba(223, 86, 209, 0.55);
        }

        use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
            fill: rgba(223, 86, 209, 0.35);
        }
    }
}
</style>