<template >
  <div class="users-container">
    <p v-if="loading" id="loadingMessage">Loading...</p>

    <table v-if="!loading" class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Admin</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in users" :key="user.id">
          <th scope="row">{{ index +1 }}</th>
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
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

#loadingMessage {
  margin-top: 40px;
}

.fas {
  cursor: pointer;
}

.fa-plus {
  color: white;
}

.btn {
  margin-top: 10px;
  background-color: #131212;
  color: white;
}

.btn:hover {
  background-color: #272727;
}

@media only screen and (max-width: 1030px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  /*
	Label the data
	*/
  td:nth-of-type(1):before {
    content: "ID";
  }
  td:nth-of-type(2):before {
    content: "Name";
  }
  td:nth-of-type(3):before {
    content: "Username";
  }
  td:nth-of-type(4):before {
    content: "Email";
  }
  td:nth-of-type(5):before {
    content: "Admin";
  }
  td:nth-of-type(6):before {
    content: "Edit user";
  }
  td:nth-of-type(7):before {
    content: "Delete user";
  }
}

@media only screen and (min-width: 961px) {
  .users-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .table {
    width: 75%;
    margin-top: 40px;
  }
}
</style>
