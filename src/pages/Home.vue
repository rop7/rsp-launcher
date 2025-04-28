<template>

  <div 
    @mousedown="startGlobalPress" 
    @touchstart="startGlobalPress">
  
    <v-row style="height: 100vh;">
      <v-col v-for="item in space" :key="item.id" md="3" cols="3">
        <v-menu 
          v-model="menuState[item.id]" 
          location="bottom" 
          v-show="longPressTriggered">
          <template v-slot:activator="{ props }">
            <v-card
              v-bind="props"
              class="folder-card"
              @click="handleClick"
              @mousedown.stop="startPress(item.id)"
              @mouseup.stop="cancelPress"
              @mouseleave.stop="cancelPress"
              @touchstart.stop="startPress(item.id)"
              @touchend.stop="cancelPress"
              @touchcancel.stop="cancelPress">
              
              <v-icon color="blue-grey" size="x-large" v-if="item.type === 'folder'">mdi-folder</v-icon>
              <v-icon color="grey" size="x-large" v-if="item.type === 'file'">mdi-file</v-icon>

              <v-card-subtitle class="text-center mt-2">
                {{ item.name }}
              </v-card-subtitle>
            </v-card>
          </template>

          <v-list id="menuList">
            <v-list-item @click="openFolder(item)">
              <v-list-item-title>Open</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteItem(item)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Menu global para toque longo fora dos itens -->
    <v-menu
      v-model="globalMenuState" 
      location="bottom" 
      v-if="longPressTriggered && globalMenuState"
      :style="`left: ${globalMenuPosition.x} !important; top: ${globalMenuPosition.y} !important; position: absolte`">
      <v-list 
        id="globalMenuList"  
        v-if="longPressTriggered && globalMenuState">
        <v-list-item @click="createNewFolder">
          <v-list-item-title>New Folder</v-list-item-title>
        </v-list-item>
        <v-list-item @click="refresh">
          <v-list-item-title>Refresh</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        space: [
          { id: 1, name: "documents", type: "folder" },
          { id: 2, name: "images", type: "folder" },
          { id: 3, name: "music", type: "folder" },
          { id: 4, name: "videos", type: "folder" },
          { id: 5, name: "downloads", type: "folder" },
          { id: 6, name: "development", type: "folder" },
          { id: 7, name: "stage", type: "folder" },
          { id: 8, name: "todo.txt", type: "file", mimetype: "txt" },
        ],
        menuState: {}, // Estado dos menus dos itens
        globalMenuState: false, // Estado do menu global
        pressTimer: null, // Timer do toque longo
        longPressTriggered: false, // Indica se o menu foi ativado
        globalMenuPosition: { x: 0, y: 0 }, // Posição do menu global
        globalMenuPositionTemp: { x: 0, y: 0 }, // Posição do menu global temporária
      };
    },
    created() {

      this.space.forEach((item) => {
        this.menuState[item.id] = false; // Inicializa os menus dos itens como fechados
      });

      window.addEventListener(`contextmenu`, (e) => {
        if (!this.longPressTriggered) {
          e.preventDefault();
        }
      });

      document.addEventListener('pointerenter', (e) => {
          this.globalMenuPositionTemp.x = parseInt(e.clientX) + 'px'
          this.globalMenuPositionTemp.y = parseInt(e.clientY) + 'px'
      })

    },

    methods: {
      openFolder(folder) {
        this.showToast(`Abrindo pasta: ${folder.name}`);
      },
      deleteItem(item) {
        this.showToast(`Excluindo: ${item.name}`);
      },
      createNewFolder() {
        this.showToast("Criando nova pasta...");
      },
      refresh() {
        this.showToast("Atualizando...");
      },
      showToast(message) {
        if (window.Bridge && window.Bridge.showToast) {
          window.Bridge.showToast(message, false);
        } else {
          console.warn("Bridge API não disponível");
        }
      },

      startPress(itemId) {

        this.globalMenuState = false
        this.cancelPress(); // Cancela qualquer timeout anterior
        this.longPressTriggered = false; // Reseta a flag

        this.pressTimer = setTimeout(() => {
          // Fecha todos os outros menus antes de abrir o novo
          Object.keys(this.menuState).forEach((id) => {
            this.menuState[id] = false;
          });

          // Abre o menu do item após 700ms
          this.menuState[itemId] = true;
          this.longPressTriggered = true; // Indica que foi um toque longo
          
        }, 700);
      },
      startGlobalPress(event) {

        this.cancelPress(); // Cancela qualquer timeout anterior
        this.longPressTriggered = false; // Reseta a flag

        this.globalMenuPosition.x = this.globalMenuPositionTemp.x
        this.globalMenuPosition.y = this.globalMenuPositionTemp.y

        this.pressTimer = setTimeout(() => {
          // Fecha todos os menus dos itens
          Object.keys(this.menuState).forEach((id) => {
            this.menuState[id] = false;
          });

          // Abre o menu global após 700ms
          this.globalMenuState = true;
          this.longPressTriggered = true; // Indica que foi um toque longo

        }, 700);
      },

      cancelPress() {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
        setTimeout(() => {
          this.globalMenuState = false
          this.longPressTriggered = false; // Reseta após um pequeno delay
        }, 50);
      },

      handleClick(e) {
        e.stopPropagation(); // Evita que o menu do item seja fechado ao clicar fora dele
        this.globalMenuState = false

      },
    },
  };
</script>

<style scoped>

  .folder-card {
    background-color: transparent;
    color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .folder-card:hover {
    transform: scale(1.05);
  }

  .v-menu .v-list {
    margin-left: 50px !important;
    width: 115px;
  }
  
</style>