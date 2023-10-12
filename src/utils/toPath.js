import router from "../router";
import pubsub from 'pubsub-js'
const router1 = router
const toPath = (path, name) => {
    pubsub.publish('toTopFast')
    router1.push({
        path,
        query: {
            name
        }
    })
}

export default toPath
