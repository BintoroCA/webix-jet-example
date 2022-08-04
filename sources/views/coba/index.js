import {JetView} from "webix-jet";

export default class FormsView extends JetView{
	config(){
		return {
			view:"scrollview", scroll:"xy", body:{
				type:"space", cols:[
					{
						type:"wide", width:500, rows:[
							{ $subview:"coba.percobaanae" }
						]
					},
				]
			}
		};
	}
}