<template>
    <div class="container">
        <div class="row justify-content-center mt-4">
            <div class="col-12">
<div class="card">
<div class="card-header">
<h3 class="card-title">  Users List   </h3>
<div class="card-tools">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNew"> <i class="fas fa-user-plus"> </i> Add New User </button>
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
<th>Modify</th>
</tr>
</thead>
<tbody>
<tr>
<td>183</td>
<td>John Doe</td>
<td>11-7-2014</td>
<td><span class="tag tag-success">Approved</span></td>
<td>
    <i class="fas fa-edit text-success"> </i>
    <i class="fas fa-trash text-danger"> </i>
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
        <h1 class="modal-title fs-5" id="addNewLabel"> Add New User </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="createUser" @keydown="form.onKeydown($event)">
        <div class="modal-body">
        <div class="form-group">
            <label for=""> Name </label>
            <input v-model="form.name" type="text" name="name" placeholder="name"
           class="form-control" :class="{'is-invalid': form.errors.has('name')}" />
        </div>
        <div class="form-group">
            <label for=""> Email </label>
            <input v-model="form.email" type="email" name="Email" placeholder="Email"
           class="form-control" :class="{'is-invalid': form.errors.has('Email')}" />
        </div>
        <div class="form-group">
            <label for=""> Bio </label>
            <input v-model="form.bio" type="text" name="Bio" placeholder="Bio"
           class="form-control" :class="{'is-invalid': form.errors.has('Bio')}" />
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
        <button type="button" class="btn btn-primary">Save</button>
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
               this.form.post('api/users') 
            }
        },
        mounted() {
            console.log('Component mounted.')
        }  
       
    }
</script>
