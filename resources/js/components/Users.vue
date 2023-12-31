<template>
    <div class="container">
        <div class="row justify-content-center mt-4">
            <div class="col-12">
<div class="card">
<div class="card-header">
<h3 class="card-title">  Users List   </h3>
<div class="card-tools">
    <button type="button" class="btn btn-primary" @click="newModal"> <i class="fas fa-user-plus"> </i> Add New User </button>
</div>
</div>

<div class="card-body table-responsive p-0">
<table class="table table-hover text-nowrap">
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Type</th>
<th>Date</th>

<th>Modify</th>
</tr>
</thead>
<tbody>
<tr v-for="user in users" :key="users.id">
<td>{{ user.id }}</td>
<td>{{user.name}}</td>
<td>{{user.email}}</td>
<td>{{user.type | propper}}</td>
<td>{{user.created_at | formatdate}}</td>
<td>
   
    <span style="cursor: pointer;" @click="editModal(user)">
        <i class="fas fa-edit text-success"> </i> /
    </span>
    <span  @click="deleteuser(user.id)" style="cursor: pointer;">
    <i  class="fas fa-trash text-danger"> </i>
    </span>
</td>
</tr>

</tbody>
</table>
</div>

</div>

</div>
        </div>
        <div class="modal fade" id="addNew" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addNewLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" v-show="!editMode"  id="addNewLabel"> Add New User </h1>
        <h1 class="modal-title fs-5" v-show="editMode" id="addNewLabel"> Update User </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="editMode? updateUser() : createUser()">
        <div class="modal-body">
        <div class="form-group">
            <label for=""> Name </label>
            <input v-model="form.name" type="text" name="name" placeholder="name"
           class="form-control" :class="{'is-invalid': form.errors.has('name')}" />
        </div>
        <div class="form-group">
            <label for=""> Email </label>
            <input v-model="form.email" type="email" name="Email" placeholder="Email"
           class="form-control" :class="{'is-invalid': form.errors.has('email')}" />
        </div>
        <div class="form-group">
            <label for=""> Bio </label>
            <div v-if="form.errors.has('bio')" class="text-danger">
            {{ form.errors.get('bio') }}
            </div>
            <input v-model="form.bio" type="text" name="Bio" placeholder="Bio"
           class="form-control" :class="{'is-invalid': form.errors.has('bio')}" />
        </div>
        <div class="form-group">
            <label for=""> Type </label>
            <select v-model="form.type" name="type" placeholder="type"
           class="form-control" :class="{'is-invalid': form.errors.has('type')}">
            <option value=""> Select User Type </option>
            <option value="admin"> Admin </option>
            <option value="user"> User </option>
        </select>
        </div>
        <div class="form-group">
            <label for=""> Password </label>
            <input v-model="form.password" type="password" name="password" placeholder="password"
           class="form-control" :class="{'is-invalid': form.errors.has('password')}" />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" v-show="!editMode" class="btn btn-primary">Save</button>
        <button type="submit" v-show="editMode" class="btn btn-success">Update</button>


      </div>
    </form>
    </div>

  </div>
</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                editMode:true,
                users: {} ,
                form: new Form({
                    name: '' ,
                    email:'' , 
                    password: '' ,
                    type:'' , 
                    bio: '' ,
                    photo:'' , 
                   
                })
            }
        },
        methods:{
            createUser(){
                this.$Progress.start()
                this.form.post('api/user').then(()=>{
                this.form.reset();
                Fire.$emit('AfterCreate');
                $('#addNew').modal('hide');
                this.$Progress.finish();
                Toast.fire({
                    icon:'success',
                    title: 'User Created Successfully'
                })
                });
                
            },
            loadUser(){
                axios.get('api/user').then(({data})=>(this.users= data.data));
            } , 
            deleteuser($id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.form.delete('api/user/'+ $id).then(()=>{
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                              'success'
                              )
                              Fire.$emit('AfterDelete');
                              Toast.fire({
                                icon: 'success',
                                title: 'User Deleted Successfully'
                                })
                                }).catch(()=>{
                                     Swal.fire(
                                        'Failed!',
                                        'Something went wrong.',
                                        'error')
                                        })
                                    }
                                })

                                        
            },
            updateUser(){
                // this.$Progress.start()
                console.log("update user");


            },
            editModal(user){
                this.editMode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user)

            },
            newModal(){
                this.editMode = false;
                this.form.reset();
                $('#addNew').modal('show');
            }
        },
        created(){
            this.$Progress.start()
            this.loadUser();
            this.$Progress.finish();

            Fire.$on('AfterCreate',()=>{
                this.loadUser();
            });
            Fire.$on('AfterDelete', ()=>{
                this.loadUser();
            })
        },
        mounted() {
            console.log('Component mounted.')
        }  
       
    }
</script>
