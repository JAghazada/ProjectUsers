class UserController{
    constructor(model,view){
        this.model = model;
        this.view  =view;
        this.view.Listeners();
        this.view._bindFuncs(this.BindSearchUser);
        this.model._bindFuncs(this.BindListUsers)

    }
    BindSearchUser = (obj)=>this.model.SearchUser(obj);
    BindListUsers = (users) =>this.view.ListUsers(users);
};
const app = new UserController(new UserModel(),new UserView())