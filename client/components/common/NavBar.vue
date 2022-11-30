<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="icon">
      <img src="../../public/logo.svg">
      <h1 class="title">
        Fritter
      </h1>
    </div>
    <div class="top">
      <h2><router-link to="/">
        Home
      </router-link></h2>
      <h2><router-link
        v-if="$store.state.username"
        to="/account"
      >
        Setting
      </router-link>
      <router-link
        v-else
        to="/login"
      >
        Login
      </router-link></h2>
    </div>
    <div class="bottom">
      <h2><a 
        v-if="$store.state.username"
        @click="logOut"
        href="#"
      >
        Log Out
      </a></h2>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<script>

import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'LogOut',
  mixins: [BlockForm],
  methods: {
    async logOut() {
      try {
        const r = await fetch('/api/users/session', {
          method: 'DELETE',
        });
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('setUsername', null);
        this.$router.push({name: 'Home'});
        this.$store.commit('alert', {
          message: 'You are now signed out!', status: 'success'
        });
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }     
    }
  }
};
</script>

<style scoped>
nav {
    /* padding: 1vw 2vw;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative; */

  /* padding: 8px 8px 8px 32px;
  background-color: #ccc;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s; */

  height: 100%; /* 100% Full-height */
  width: 15%; /* 15% width */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #ccc; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 30px; /* Place content 60px from the top */
  padding-left: 2%;
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.icon {
	display: block;
	align-items: center;
}

.top {
  font-size: 20px;
  /* display: grid; */
  height: 5;
  /* gap: 0px;
  grid-auto-flow: row;
  align-items: top; */
  
  position: absolute;
  /* top: 0; */
}

.bottom {
  font-size: 20px;
  /* display: grid; */
  height: 100;
  /* gap: 0px; */
  /* grid-auto-flow: row; */
  /* align-items: bottom; */
  /* vertical-align: bottom; */
  position: absolute;
  bottom: 0;
}

.alerts {
    width: 25%;
}
</style>
