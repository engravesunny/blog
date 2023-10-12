import { defineStore } from "pinia";

export const test = defineStore('test', {
    state:() => {
        return {
            name:'test'
        }
    }, 
    actions: {
        getName () {
            console.log(this);
        }
    }
})