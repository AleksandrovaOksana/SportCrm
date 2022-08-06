<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
      <li
        v-for="link in links"
        :key="link.url"
        @click="$router.push(link.url)"
        :class="{
         'active': $route.path === link.url
        }"
      >
        <a
          class="waves-effect waves-orange pointer"
        >
        {{ link.title }}
       </a>
      </li>
    </ul>
</template>
<script>
export default {
 props: {value: Boolean},
 data: () => ({
  links: [
    {title: 'Аккаунт', url: '/'},
    {title: 'Площадки', url: '/areas'},
    {title: 'Категории', url: '/categories'}
  ]
 })
}
</script>

