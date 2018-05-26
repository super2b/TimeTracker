<template>
  <div id="wrapper">
    <!--
    <p class="container" style="margin-top: 20px">
      <router-view></router-view>
    </p>
    -->
    <div class="container-fluid">
      <div class="row" style="min-height:calc(100vh);">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar navbar-custom">
          <div class="sticky-top sticky-offset">
            <ul class="nav flex-column nav-pills">
              <div class="nav-item" style="height:60px" />
              <li class="nav-item">
                <a class="nav-link" href="#">
                  主页 <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  已完成
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link  active" href="#">
                  已删除
                </a>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>其他功能</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  统计
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  备忘录
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-8 ml-sm-auto col-lg-10 px-18"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
          <div class="justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <notifications classes="vue-notification tt_notification" position="top center" width="100%" group="foo" />
            <router-view>
            </router-view>
          </div>
        </main>
      </div>
    </div>

    <b-navbar toggleable="md" type="dark" fixed="top" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Time Tracker</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">{{userName}}</b-nav-item>
          <b-nav-item href="#" @click='logout'>退出</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: this.getCookie('username')
    }
  },
  methods: {
    logout () {
      console.log('execute logout()...')
      this.delCookie('username')
      this.$router.replace('/')
      this.$router.go(0)
    }
  }
}
</script>
<style>
  .bg-info {
    background-color: #367bff !important;
  }
  .tt_notification  {
    padding: 10px;
    margin: 0;
  }
</style>
