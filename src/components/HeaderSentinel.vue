<template>
<div class="header-sentinel" ref="sentinel"></div>
</template>

<script>
import {_throttle} from "@/public";

export default {
  name: "HeaderSentinel",
  data: function() {
    return {
      private_headerObserver: null,
    }
  },
  methods: {
    legacyContentScroll: _throttle(function() {
      let body = document.documentElement
      if(body.scrollTop > 60){
        this.$store.commit('setData', {
          key: 'headerAbove',
          value: 0
        })
      }else{
        this.$store.commit('setData', {
          key: 'headerAbove',
          value: 1
        })
      }
    }, 200),
  },
  mounted: function() {

    if (!('IntersectionObserver' in window)) {
    // eslint-disable-next-line no-constant-condition
    // if (true) {
      window.addEventListener('scroll', this.legacyContentScroll, true);
      return;
    }

    this.private_headerObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        this.$store.commit('setData', {
          key: 'headerAbove',
          value: 1
        })
      } else {
        this.$store.commit('setData', {
          key: 'headerAbove',
          value: 0
        })
      }
    }), {
      threshold: [0.0, 0.01, 1.0]
    });

    this.private_headerObserver.observe(this.$el);

  },
  beforeDestroy: function() {
    if (!('IntersectionObserver' in window)) {
    // eslint-disable-next-line no-constant-condition
    // if (true) {
      window.removeEventListener('scroll', this.legacyContentScroll, true);
      return;
    }

    this.private_headerObserver?.disconnect();

  }
}
</script>

<style scoped>
.header-sentinel {
  width: 100%;
  height: 64px;
  margin-bottom: -64px;
}
</style>
