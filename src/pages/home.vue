<template>
    <div id="home">
        <transition name="fade">
            <global-header v-if="ready" more="abc"></global-header>
        </transition>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            ready: false
        }
    },
    mounted: function() {
        this.ready = true
    }
}
</script>
<style lang="sass">
#home {
    .fang-kuai {
        position: absolute;
        bottom: 0px;
        width: 100px;
        height: 100px;
        background: red;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all 1.5s
    }
    .fade-enter,
    .fade-leave-active {
        transform: rotate(360deg);
        opacity: 0
    }
}
</style>
