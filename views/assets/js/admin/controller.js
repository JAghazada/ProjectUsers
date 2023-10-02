class Controller {
    constructor(model,view){
        this.model = model;
        this.view = view;
        this.view.Listeners();
        this.view._bindFunctions(this.BindAddUser);
        this.model._bindFunctions(this.BindAlert,this.BindClearInputs);

    }

    BindAddUser = (object)=>this.model.AddUser(object)
    BindAlert = (message,classname)=>this.view.Alert(message,classname);
    BindClearInputs = () =>this.view.ClearInputs();

}

const app = new Controller(new Model(),new View());