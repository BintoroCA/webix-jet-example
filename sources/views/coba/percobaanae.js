import {JetView} from "webix-jet";
import "webix/photo";
import axios from "axios";

export default class PersonView extends JetView {
	config(){

		const main_info = {
			margin:10,
			rows:[
				{
					view:"text", name:"fname",
					label:"First name", labelPosition:"top",
					placeholder:"First name",
					invalidMessage:"A name is required",
					tooltip:"Client's name is " + "#value#"
				},
                {
					view:"text", name:"lemail",
					label:"Email", labelPosition:"top",
					placeholder:"Email",
					invalidMessage:"A name is required",
					tooltip:"Client's name is " + "#value#"
				},
			]
		};


		const upper_section = {
			margin:48, cols:[
				main_info,
			]
		};

		function submitForm() {
 
            webix.message(JSON.stringify($$("form").getValues(), null, 2));
            const payload = $$("form").getValues()
                axios.post('http://localhost:5005/data', payload)
                .then((res)=>{console.log(res)})
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
                    
                    // () => {
					// 	if (this.$$("form").validate()){
					// 		webix.message("Saved (not really)!", "success");
					// 	}
					// }
				}
			]
		};

		return {
			rows:[
				{ template:"Profile information", type:"header" },
				{
					view:"form", id:"form",  padding:24,
					rows:[
						upper_section,
						buttons
					],
					rules:{
						"fname":webix.rules.isNotEmpty
					}
				}
			]
		};
	}
	init(){
		this.$$("form").setValues({
			fname:"Morgan"
		});

	}
}
