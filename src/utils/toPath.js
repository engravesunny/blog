import router from "../router";
const router1 = router
const toPath = (path,name) => {
    router1.push({
        path,
        query:{
            name
        }
    })
}

export default toPath
