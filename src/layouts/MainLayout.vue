<template>
  <div class="app-main-layout">
    <Navbar @showBar="isOpen = !isOpen" />
    <Sidebar v-bind:value="isOpen" />

    

    <main class="app-content" >
      <div class="app-page">
        <router-view />
      </div>
</main>

<div class="fixed-action-btn">
  <a class="modal-trigger btn-floating btn-large blue" href="#modal1" v-tooltip="'Создать новое занятие'"><i class="large material-icons">add</i> </a>
</div>
</div>
  <EventModal />
</template>

<script>
import Navbar from '@/components/app/NavbarView.vue'
import Sidebar from '@/components/app/SidebarView.vue'
import messages from '@/utils/messages'
import EventModal from '@/components/Calendar/EventModal'
export default {
    name: 'main-layout',
    data: () => ({
        isOpen: true
    }),
    components: {
        Navbar, Sidebar, EventModal
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
        error() {
            this.$store.getters.error
        }
    },
    created() {
        this.unwatch = this.$store.watch(
        (state, getters) => getters.error,
        (newValue) => {
            console.log(newValue);
            this.$error(messages[newValue.code] || 'Что-то пошло не так')

            },
        );
    }

}
</script>
