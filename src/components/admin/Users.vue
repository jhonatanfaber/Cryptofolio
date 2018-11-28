<template >
  <div class="users-container">

    <p v-if="loading" id="loadingMessage">
        Loading...
    </p>

    <table v-if="!loading" class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
          <th scope="col">Admin</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in users" :key="user.id">
          <th scope="row">{{index+1}}</th>
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.username}}</td>
          <td>{{user.admin ? 'Yes' : 'No'}}</td>
          <td>
            <i class="fas fa-pen fa-lg" @click="editUser(user)"></i>
          </td>
          <td>
            <i class="fas fa-trash-alt fa-lg" @click="deleteUser(user.id, index)"></i>
          </td>
        </tr>
      </tbody>

      <NewUserModal v-if="showNewUserModal" @close="showNewUserModal = false"/>

      <EditUserModal
        v-if="showEditUserModal"
        @close="showEditUserModal = false"
        :user="userInformation"
      />

      <button id="show-modal" @click="showNewUserModal = true" class="btn btn-md">
        <i class="fas fa-plus"></i> Add User
      </button>
    </table>
  </div>
</template>

<script>
import NewUserModal from "./NewUserModal.vue";
import EditUserModal from "./EditUserModal.vue";

export default {
  data() {
    return {
      showNewUserModal: false,
      showEditUserModal: false,
      userInformation: {},
      loading: false
    };
  },
  methods: {
    deleteUser(id, index) {
      const userToDelete = {
        id,
        index
      };
      this.$store.dispatch("deleteUser", userToDelete);
    },
    editUser(userData) {
      this.userInformation = {
        id: userData.id,
        name: userData.name,
        password: userData.password,
        admin: userData.admin
      };
      this.showEditUserModal = true;
    }
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch("getUsers");
    this.loading = false;
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  components: {
    NewUserModal,
    EditUserModal
  }
};
</script>

<style scoped>

#loadingMessage{
    margin-top: 40px;
}

.users-container {
  display: flex;
  justify-content: center;
}

.table {
  width: 70%;
  margin-top: 40px;
}

.fas {
  cursor: pointer;
}

.fa-plus {
  color: white;
}

.btn {
  background-color: #212529;
  color: white;
}
</style>
