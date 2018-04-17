<template>
  <div id="wrapper">
    <b-navbar toggleable="md" type="dark" variant="info" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Time Tracker</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="/home">首页</b-nav-item>
          <b-nav-item href="/list">列表</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Leiweibo</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <p class="container" style="margin-top: 20px">
      <router-view></router-view>
    </p>
  </div>
</template>
