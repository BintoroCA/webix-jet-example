import {JetView} from "webix-jet";

export default class LoginView extends JetView {
    config(){
        const layout = {
			margin:48, cols:[
				login_data,
			]
		};
        const login_data = {
            
            rows:[
                {
                    view: "text", name: "username", label:"username", labelPosition:"bottom" ,placeholder: "username", invalidMessage:"A name is required",tooltip:"Client's name is " + "#value#"
                },
                {
                    view: "text", name: "password", label:"password", labelPosition:"bottom" ,placeholder: "password", invalidMessage:"A name is required",tooltip:"Client's name is " + "#value#"
                },
            ]
        }
        const buttons = {
			margin:10,
			cols:[
				{},
				{
					view:"button", value:"Reset", autowidth:true,
					click:() => {
						this.$$("form").clear();
					},
					tooltip:"Click to clean the form"
				},
				{
					view:"button", value:"Submit", type:"form", autowidth:true,
					tooltip:"Save changes",
					click: submitForm
                    
				}
			]
		}

        function submitForm() {
 
            webix.message(JSON.stringify($$("form").getValues(), null, 2));
            const payload = $$("form").getValues()
                axios.post('http://localhost:5005/data', payload)
                .then((res)=>{console.log(res)})
            }

        return {
			rows:[
				{ template:"Login Form", type:"header" },
				{
					view:"form", id:"login",  padding:24,
					rows:[
						layout,
						buttons
					],
					rules:{
						"username":webix.rules.isNotEmpty
					}
				}
			]
		};
    }
    init(login){
		login.parse();
	}
}